import React from "react";
import { createRoot, type Root } from "react-dom/client";
import "./index.css";
import PreviewBootError from "./components/PreviewBootError";

// Runtime guard: clamp invalid Element.animate() iterations so one bad
// AI-generated motion.* transition never blanks the whole page.
// Must patch Element.prototype before any framer-motion code runs.
import "./lib/animateGuard";

// Quiet-HMR bridge — listens for lps:quiet:* HMR events from the
// dev server plugin and forwards to the HIDE_VITE_ERROR_OVERLAY
// postMessage handler in index.html. Loaded before React mounts so
// the overlay is hidden before any transform failure during a bulk
// agent-edit window.
import "./lib/quietHmr";

// Load custom embeddings (analytics, tracking pixels, etc.)
// Must be imported before App to ensure scripts run early
import "./lib/EmbeddingsLoader";

// Visual editor inspector (handles element selection in iframe)
import "./lib/inspector";

// Performance-by-default: optimize images, LCP preloading, lazy loading
import "./lib/PerformanceDefaults";

/**
 * LPS-700 — Guarded bootstrap.
 *
 * Why this pattern exists (and why the static `import App ... render(<App />)`
 * single-line bootstrap isn't enough):
 *
 * React error boundaries only catch errors thrown DURING RENDER of
 * already-mounted components.  They cannot catch:
 *
 *   1. Module-evaluation errors — e.g. a section file with
 *      `React.forwardRef` but missing `import React` throws
 *      `ReferenceError: React is not defined` when the module is
 *      parsed/evaluated, before any component has a chance to mount.
 *   2. Errors thrown during `createRoot().render()` itself, before
 *      the React tree is installed.
 *   3. Unhandled promise rejections from dynamic imports.
 *
 * With a static `import App`, any of the above leaves `<div id="root">`
 * empty with no user-facing feedback.  The iframe looks like a blank
 * white page — the failure mode that triggered LPS-700.
 *
 * This guarded bootstrap:
 *
 *   - Imports App dynamically via `import("./App")` so a throw during
 *     module evaluation lands in `.catch(...)` instead of a top-level
 *     uncaught exception.
 *   - Hooks `window.error` and `window.unhandledrejection` so we also
 *     capture failures that happen asynchronously (late `import()` of
 *     a lazy page, for example).
 *   - Renders `<PreviewBootError />` as a visible fallback so the user
 *     never sees a blank iframe.
 *   - Posts `APP_BOOT_FAILED` upward so the parent frame can surface a
 *     richer UI or trigger auto-repair.
 *
 * `APP_RENDERED` stays posted from inside `App.tsx` (the "the app is
 * actually visible" signal) and is NOT posted here — we don't want to
 * lie to the parent about successful render when only the module
 * resolution succeeded but rendering hasn't happened yet.
 */

const rootEl = document.getElementById("root");

// Defensive — `#root` is defined in index.html so this should never
// happen, but if the boilerplate's index.html were corrupted we don't
// want a null-deref masking the real problem.
if (!rootEl) {
  // eslint-disable-next-line no-console
  console.error("[main] #root element missing from index.html");
}

const root: Root | null = rootEl ? createRoot(rootEl) : null;

// Track whether we've already reported a boot failure so that duplicate
// error events (e.g. window.onerror firing for the same error that a
// dynamic-import .catch already handled) don't spam the parent.
let bootFailureReported = false;

// LPS-700 review gap: track whether the app has successfully mounted.
//
// The window.error / unhandledrejection listeners below are ONLY
// meaningful during the boot window.  Once React has committed and
// user code is running, runtime errors (click handler TypeError,
// failed async fetch, etc.) are owned by React error boundaries
// (`SectionErrorBoundary` / `RouteErrorBoundary` / `ErrorBoundary`),
// not by these global listeners.  Treating a post-mount click-handler
// throw as a "boot failure" would render `<PreviewBootError />` over
// the working app and post a spurious `APP_BOOT_FAILED` upward — the
// opposite of what we want.
//
// The flag flips when EITHER:
//   * a MutationObserver sees React commit the first child to
//     `#root` (the precise "app has mounted" signal), or
//   * a 10s safety timer fires (belt-and-suspenders for the case
//     where React never commits — e.g. the agent wrote a broken
//     App and `.catch` didn't fire because the throw happened
//     elsewhere).  10s is well past the parent's 6s overlay
//     ceiling.
let bootComplete = false;

/**
 * Serialize an arbitrary error-ish value into a plain object that can
 * cross the postMessage boundary.  `structuredClone` doesn't preserve
 * prototype methods, and `Error` instances lose `.message` / `.stack`
 * when naively JSON.stringified.
 */
function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack?.slice(0, 4000) ?? "",
    };
  }
  if (error && typeof error === "object") {
    try {
      return { message: String(error), raw: JSON.parse(JSON.stringify(error)) };
    } catch {
      return { message: String(error) };
    }
  }
  return { message: String(error) };
}

/**
 * Convert Vite/dev-server filenames into workspace-relative paths.
 *
 * ErrorEvent.filename usually arrives as a full URL like
 * `http://localhost:5173/src/App.tsx?t=123`; repair tools need the
 * stable `src/App.tsx` form.
 */
function normalizeWorkspaceFilePath(filename: string | undefined): string {
  if (!filename) return "";
  const match = filename.match(/(?:^|\/)(src\/[^\s?:)#]+)/);
  return match?.[1] ?? "";
}

/**
 * Pull the first workspace file reference out of a stack trace.
 *
 * Module-eval failures throw at one specific source line, but Chrome
 * stacks prefix each frame with the transformed dev-server URL — e.g.
 * `http://localhost:5173/src/components/sections/Header.tsx?t=...:29:11`.
 * We want just `src/components/sections/Header.tsx:29:11` so the
 * agent-side /repair-runtime/ handler has a concrete surgical target.
 *
 * Returns `{ file, line, column }` with empty strings / zeros when no
 * workspace frame is found (e.g. library-internal throws).
 */
function extractTopFrame(
  stack: string | undefined
): { file: string; line: number; column: number } {
  if (!stack) return { file: "", line: 0, column: 0 };
  // Strip Vite's ?t=timestamp / ?import cache-busting query params so
  // downstream consumers see a stable `src/...` path.
  const frameRegex =
    /(?:https?:\/\/[^)\s]+?)?\/?(src\/[^\s?)]+?)(?:\?[^:\s)]*)?:(\d+):(\d+)/;
  const match = stack.match(frameRegex);
  if (!match) return { file: "", line: 0, column: 0 };
  return {
    file: normalizeWorkspaceFilePath(match[1]),
    line: parseInt(match[2], 10) || 0,
    column: parseInt(match[3], 10) || 0,
  };
}

function reportBootFailure(
  error: unknown,
  source: string,
  locationHint?: { file?: string; line?: number; column?: number }
): void {
  if (bootFailureReported) return;
  // LPS-700 review gap: ignore errors that arrive after the app has
  // mounted.  A post-mount click-handler TypeError or async fetch
  // rejection is NOT a boot failure — it's a runtime error React
  // boundaries are responsible for catching / reporting via the
  // RUNTIME_ERROR postMessage path.  Returning early here prevents
  // the overlay + spurious `APP_BOOT_FAILED` signal.
  if (bootComplete) return;
  bootFailureReported = true;

  const serialized = serializeError(error);
  // Prefer caller-provided location (ErrorEvent has exact filename/
  // lineno/colno); fall back to parsing the stack.  Either path yields
  // a concrete `src/...` reference when one exists, which the agent's
  // /repair-runtime/ handler uses as its surgical target.
  const stackFrame = extractTopFrame(serialized.stack as string | undefined);
  const hintFile = locationHint?.file?.trim() ?? "";
  const file = hintFile || stackFrame.file;
  const line =
    hintFile && locationHint?.line != null && locationHint.line > 0
      ? locationHint.line
      : stackFrame.line;
  const column =
    hintFile && locationHint?.column != null && locationHint.column > 0
      ? locationHint.column
      : stackFrame.column;

  const payload = {
    ...serialized,
    source, // "dynamic-import" | "render" | "window.error" | "unhandledrejection"
    file,   // e.g. "src/components/sections/Header.tsx" or "" if unknown
    line,   // 1-indexed line in the source file, 0 when unknown
    column, // 1-indexed column, 0 when unknown
    timestamp: Date.now(),
  };

  // eslint-disable-next-line no-console
  console.error("[main] APP_BOOT_FAILED", payload);

  // Render the fallback inside the iframe first — if this also throws
  // the catch below keeps us from looping back into another failure.
  try {
    root?.render(<PreviewBootError error={error} />);
  } catch (renderErr) {
    // eslint-disable-next-line no-console
    console.error("[main] PreviewBootError itself failed to render", renderErr);
  }

  // Notify the parent frame (Next.js PreviewFrame) so it can clear the
  // loading overlay and surface an actionable state.  `window.parent`
  // is always defined (same window if not framed, so the postMessage
  // is harmless).
  try {
    window.parent.postMessage(
      { type: "APP_BOOT_FAILED", payload },
      "*"
    );
  } catch {
    // postMessage can throw on exotic cross-origin scenarios — there's
    // no reasonable recovery so we swallow silently.
  }
}

// Global listeners — catch errors that escape the dynamic-import path
// DURING the boot window only.
//
// Named handler references so `markBootComplete` can detach them once
// React commits.  If we kept the anonymous arrow inline, we couldn't
// remove them later and every post-mount click-handler TypeError
// would incorrectly call `reportBootFailure`.
const onWindowError = (event: ErrorEvent) => {
  // `event.error` may be null for some cross-origin script errors; fall
  // back to a synthesized message so we still post something useful.
  // ErrorEvent carries exact filename/lineno/colno — hand them to
  // reportBootFailure so downstream /repair-runtime/ gets a precise
  // source location without having to parse the stack.
  const hint = {
    // Normalize dev-server URLs so downstream sees a stable src/ path.
    file: normalizeWorkspaceFilePath(event.filename),
    line: event.lineno ?? 0,
    column: event.colno ?? 0,
  };
  reportBootFailure(event.error ?? event.message, "window.error", hint);
};

const onUnhandledRejection = (event: PromiseRejectionEvent) => {
  reportBootFailure(event.reason, "unhandledrejection");
};

window.addEventListener("error", onWindowError);
window.addEventListener("unhandledrejection", onUnhandledRejection);

/**
 * Close the boot window.
 *
 * Called when React commits the first child to `#root` (via
 * MutationObserver) or when the 10s safety timer fires, whichever
 * comes first.  After this runs:
 *
 *   * `bootComplete = true` — `reportBootFailure` becomes a no-op, so
 *     any stray post-mount error that slips past the removeListener
 *     below still can't produce a spurious `APP_BOOT_FAILED`.
 *   * The window-level error and unhandledrejection listeners are
 *     detached — React error boundaries + the section-level
 *     `RUNTIME_ERROR` postMessage path own post-mount error reporting
 *     from this point on.
 *
 * Idempotent: safe to call multiple times (MutationObserver may fire
 * before the safety timer expires, etc.).
 */
function markBootComplete(): void {
  if (bootComplete) return;
  bootComplete = true;
  window.removeEventListener("error", onWindowError);
  window.removeEventListener("unhandledrejection", onUnhandledRejection);
}

// Precise "app has mounted" signal: React's first commit adds an
// element child to `#root`.  MutationObserver fires synchronously
// after that commit, so we close the boot window at the exact moment
// the user starts seeing content.  Much tighter than a fixed timer
// for the common case — a slow click handler error at t+500ms no
// longer races a 5s/10s timer.
if (rootEl) {
  const mountObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "childList" && m.addedNodes.length > 0) {
        markBootComplete();
        mountObserver.disconnect();
        return;
      }
    }
  });
  mountObserver.observe(rootEl, { childList: true });
}

// Safety timer: if React never commits (broken App that didn't throw
// via dynamic-import — e.g. a runtime throw inside a top-level
// component's module init that the browser reports via window.error
// before `.catch` resolves) close the boot window anyway after 10s
// so subsequent unrelated errors aren't still funneled into the boot
// path.  10s is deliberately past the parent PreviewFrame's 6s
// overlay ceiling: by the time this fires, the parent has already
// either rendered our `<PreviewBootError />` or given up waiting.
const BOOT_WINDOW_MAX_MS = 10_000;
setTimeout(markBootComplete, BOOT_WINDOW_MAX_MS);

// Dynamic App import — the primary bootstrap path.  Any throw during
// module evaluation (missing React binding, syntax error in a top-level
// import, etc.) lands in `.catch` instead of crashing uncaught.
import("./App")
  .then(({ default: App }) => {
    if (!root) return;
    try {
      root.render(<App />);
      // NOTE: APP_RENDERED is posted from inside App.tsx's own mount
      // useEffect, not here.  Doing it from here would signal success
      // as soon as `render()` returns, but React 18 concurrent render
      // doesn't guarantee the tree is actually committed by then.
    } catch (renderError) {
      reportBootFailure(renderError, "render");
    }
  })
  .catch((importError) => {
    // "Failed to fetch dynamically imported module" is browser-generated for
    // network-level fetch failures (Vite dev server momentarily unavailable).
    // It is distinct from Vite transform errors, which produce specific
    // messages.  Retry once after 2s before declaring a boot failure —
    // covers the case where a concurrent production build briefly invalidated
    // the module graph.
    const isTransientFetchError =
      typeof (importError as { message?: unknown })?.message === "string" &&
      (importError as { message: string }).message.includes(
        "Failed to fetch dynamically imported module"
      );

    if (isTransientFetchError) {
      setTimeout(() => {
        import("./App")
          .then(({ default: App }) => {
            // Boot window may have closed during the 2s wait; guard both
            // conditions so we don't render into a stale root.
            if (!root || bootComplete) return;
            try {
              root.render(<App />);
            } catch (renderError) {
              reportBootFailure(renderError, "render");
            }
          })
          .catch((retryError) => {
            // Retry also failed — treat as a genuine boot failure.
            reportBootFailure(retryError, "dynamic-import");
          });
      }, 2000);
      return;
    }

    reportBootFailure(importError, "dynamic-import");
  });
