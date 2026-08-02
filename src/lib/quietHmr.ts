/**
 * Quiet HMR client hook (LPS-327 follow-up).
 *
 * Listens for ``lps:quiet:start`` / ``lps:quiet:end`` custom HMR events
 * emitted by ``quietHmrPlugin`` in ``vite.config.ts``.
 *
 * During a quiet window, we use a ``MutationObserver`` on ``document.body``
 * to catch insertions of Vite's ``<vite-error-overlay>`` custom element,
 * cross-reference with the most recent ``vite:error`` payload, and remove
 * the overlay **only when the error matches our suppression filter**:
 *
 *   - error.plugin ∈ { vite:import-analysis, vite:react-swc, vite:css,
 *                      vite-plugin-react-swc }
 *   - error.loc.file (or error.id) contains ``/src/``
 *
 * Anything outside that filter passes through as a normal Vite overlay,
 * so unrelated errors raised during a quiet window are still visible.
 *
 * Safety layers (any one of these can exit the window):
 *   1. Plugin broadcasts ``lps:quiet:end`` on idle state.
 *   2. ``safetyTimer`` here forces exit after the plugin-provided
 *      ``expires_at`` or 90 s, whichever is sooner.
 *   3. Plugin-side TTL check drops expired state on next read.
 *
 * Must be imported before React mounts (``main.tsx`` does this) so the
 * observer is live before Vite can create any overlay during the window.
 */

type QuietStartPayload = {
  request_id: string | null;
  expires_at: number | null;
};

type QuietEndPayload = {
  request_id: string | null;
  end_status: string;
};

type ViteErrorLoc = { file?: string; line?: number; column?: number };
type ViteErrorInfo = {
  plugin?: string;
  loc?: ViteErrorLoc;
  id?: string;
  message?: string;
};

const TARGET_PLUGINS = [
  'vite:import-analysis',
  'vite:react-swc',
  'vite-plugin-react-swc',
  'vite:css',
];

// Fallback ONLY used when the server didn't provide a usable
// ``expires_at``. When present, we trust the server value — the
// daemon caps TTL at 1080 s (the vibe consumer deadline), so a
// long parallel page-create window (~15 min) stays suppressed for
// its full duration instead of prematurely exiting at 90 s.
const FALLBACK_QUIET_MS = 90_000;

let isQuiet = false;
let safetyTimer: ReturnType<typeof setTimeout> | null = null;
let suppressedCount = 0;
const recentErrors: ViteErrorInfo[] = [];

function clearSafetyTimer() {
  if (safetyTimer !== null) {
    clearTimeout(safetyTimer);
    safetyTimer = null;
  }
}

function matchesSuppressionFilter(err: ViteErrorInfo | undefined): boolean {
  if (!err) return false;
  const plugin = err.plugin ?? '';
  const hasTargetPlugin = TARGET_PLUGINS.some((p) => plugin.includes(p));
  if (!hasTargetPlugin) return false;

  const path = err.loc?.file ?? err.id ?? '';
  // Accept both absolute (``/workspace/src/...``) and relative (``src/...``).
  if (!/(^|\/)src\//.test(path)) return false;

  return true;
}

function installOverlayObserver() {
  if (!document.body) {
    // Can happen if this module runs before <body> parses; re-run on DOM ready.
    document.addEventListener('DOMContentLoaded', installOverlayObserver, {
      once: true,
    });
    return;
  }

  const observer = new MutationObserver((mutations) => {
    if (!isQuiet) return;
    for (const mut of mutations) {
      mut.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.tagName.toLowerCase() !== 'vite-error-overlay') return;

        const latest = recentErrors[recentErrors.length - 1];
        if (matchesSuppressionFilter(latest)) {
          node.remove();
          suppressedCount += 1;
          console.log(
            `[quiet-hmr] suppressed overlay plugin=${latest?.plugin} path=${
              latest?.loc?.file ?? latest?.id ?? 'unknown'
            } total=${suppressedCount}`,
          );
        } else {
          console.log(
            `[quiet-hmr] overlay passed through (out of filter) plugin=${
              latest?.plugin ?? 'unknown'
            } path=${latest?.loc?.file ?? latest?.id ?? 'unknown'}`,
          );
        }
      });
    }
  });

  observer.observe(document.body, { childList: true });
}

function enterQuiet(reason: string) {
  console.log('[quiet-hmr] client entering quiet window:', reason);
  isQuiet = true;
  document.body?.setAttribute('data-lps-quiet', '1');
}

function exitQuiet(reason: string) {
  console.log(
    `[quiet-hmr] client exiting quiet window: ${reason} (suppressed=${suppressedCount})`,
  );
  clearSafetyTimer();
  isQuiet = false;
  document.body?.removeAttribute('data-lps-quiet');
}

function armSafetyTimer(expiresAtSec: number | null) {
  clearSafetyTimer();
  const now = Date.now();
  let ms: number;
  if (expiresAtSec && expiresAtSec * 1000 > now) {
    // Trust the server-provided expiry. It's already bounded daemon-side
    // to _VIBE_DEADLINE (1080 s); clamping again here was the bug that
    // made bulk edits exit quiet mode prematurely at 90 s.
    ms = expiresAtSec * 1000 - now;
  } else {
    ms = FALLBACK_QUIET_MS;
  }
  safetyTimer = setTimeout(() => {
    exitQuiet('safety-timeout');
  }, ms);
}

// ``import.meta.hot`` is undefined in production builds; the guard lets
// this file be safely imported without gating the import site on env.
console.log(
  `[quiet-hmr] client script loaded; import.meta.hot=${Boolean(import.meta.hot)}`,
);

if (import.meta.hot) {
  console.log('[quiet-hmr] client registering lps:quiet:start/end listeners');

  installOverlayObserver();

  // Cold-load handoff: if the plugin's transformIndexHtml injected
  // an initial quiet state because we refreshed mid-window, honor it
  // before the WS lps:quiet:start event can race against the first
  // failing module transform.
  type InitialQuiet = { request_id: string | null; expires_at: number | null };
  const initial = (window as unknown as {
    __LPS_QUIET_INITIAL__?: InitialQuiet;
  }).__LPS_QUIET_INITIAL__;
  if (initial && initial.expires_at && initial.expires_at * 1000 > Date.now()) {
    console.log(
      `[quiet-hmr] cold-load into quiet window request_id=${initial.request_id} expires_at=${initial.expires_at}`,
    );
    enterQuiet(
      `cold-load request_id=${initial.request_id} expires_at=${initial.expires_at}`,
    );
    armSafetyTimer(initial.expires_at);
  }

  // Collect vite:error payloads so the observer can cross-reference
  // when an overlay appears. Keep only the last few — Vite fires
  // vite:error *before* the overlay insertion, so "most recent" is
  // the right correlation heuristic.
  import.meta.hot.on('vite:error', (info: { err?: ViteErrorInfo } | ViteErrorInfo) => {
    const err = (info as { err?: ViteErrorInfo }).err ?? (info as ViteErrorInfo);
    recentErrors.push({
      plugin: err?.plugin,
      loc: err?.loc,
      id: err?.id,
      message: err?.message,
    });
    while (recentErrors.length > 10) recentErrors.shift();
  });

  import.meta.hot.on('lps:quiet:start', (payload: QuietStartPayload) => {
    console.log(
      `[quiet-hmr] client received start request_id=${payload?.request_id} expires_at=${payload?.expires_at}`,
    );
    enterQuiet(
      `request_id=${payload?.request_id} expires_at=${payload?.expires_at}`,
    );
    armSafetyTimer(payload?.expires_at ?? null);
  });

  import.meta.hot.on('lps:quiet:end', (payload: QuietEndPayload) => {
    console.log(
      `[quiet-hmr] client received end request_id=${payload?.request_id} status=${payload?.end_status}`,
    );

    // Telemetry: fire-and-forget POST of the suppressed-error count
    // so the daemon can include it in generation_metrics. Synchronous
    // via ``navigator.sendBeacon`` where available; falls back to
    // fetch with keepalive for broader support.
    if (suppressedCount > 0) {
      const telemetry = JSON.stringify({
        suppressed_error_count: suppressedCount,
        request_id: payload?.request_id ?? null,
      });
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            '/__lps/quiet/telemetry',
            new Blob([telemetry], { type: 'application/json' }),
          );
        } else {
          void fetch('/__lps/quiet/telemetry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: telemetry,
            keepalive: true,
          }).catch(() => {});
        }
      } catch (err) {
        console.warn('[quiet-hmr] telemetry POST failed:', err);
      }
    }

    exitQuiet(
      `request_id=${payload?.request_id} status=${payload?.end_status}`,
    );

    const status = payload?.end_status ?? 'cleared';

    // Terminal states that reload: the daemon publishes a chat
    // message with any user-facing explanation already, so the
    // preview just needs a clean slate.
    //   success      — normal commit
    //   cleared      — manual-test / http-triggered idle
    //   rolled_back  — finalize gate refused, tree reset to pre_edit_sha
    //   cancelled    — outer deadline or shutdown signal cancelled the task
    if (
      status === 'success' ||
      status === 'cleared' ||
      status === 'rolled_back' ||
      status === 'cancelled'
    ) {
      setTimeout(() => {
        window.location.reload();
      }, 50);
      return;
    }

    // Explicit ``error`` status (daemon caught an exception inside the
    // quiet window but didn't roll back — rare). Leave the page as-is;
    // the caller will have published its own user-visible error.
    console.log('[quiet-hmr] end_status=error, skipping reload');
  });
} else {
  console.warn(
    '[quiet-hmr] client script: import.meta.hot is falsy — listeners NOT registered. ' +
      'Either running in a production build or HMR is disabled.',
  );
}

// Expose for console inspection / future telemetry hook.
declare global {
  interface Window {
    __lpsQuiet?: {
      isActive: () => boolean;
      suppressedCount: () => number;
      recentErrors: () => ViteErrorInfo[];
    };
  }
}
window.__lpsQuiet = {
  isActive: () => isQuiet,
  suppressedCount: () => suppressedCount,
  recentErrors: () => recentErrors.slice(),
};

export {};
