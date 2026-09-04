/**
 * LPS Validation Phase 3 — permanent runtime error observer.
 *
 * Generalizes the LPS-700 boot-window observer (formerly inline in
 * `main.tsx`) into a session-wide, idempotent installer. Captures four
 * signals and routes them through `error_buffer` → `telemetry_client`:
 *
 *   1. `pageerror`           — `window.addEventListener('error')`.
 *                              Same-origin filtered (D-03).
 *   2. `unhandledrejection`  — promise rejections.
 *   3. `blank_root`          — MutationObserver on `#root` + 10s timer.
 *                              Fires once if React never commits.
 *   4. `reporting_observer`  — `ReportingObserver` (deprecation/intervention/
 *                              crash). Tagged `telemetry_only: true` so
 *                              the backend logs but never repairs (D-05).
 *
 * Hard rules:
 *   - **NEVER monkey-patch the console** (D-04 / OBS-06). Round-1 review
 *     locked this. Patching floods on benign third-party warnings and
 *     masks original stack semantics. The bundle MUST NOT reassign the
 *     console's error method or call `Object.defineProperty(console, ...)`
 *     to redefine it.
 *   - Idempotent (D-01) — calling `installErrorObserver()` twice is safe;
 *     the second call returns a no-op teardown so HMR re-imports don't
 *     stack listeners.
 *   - All async paths swallow their own errors. Telemetry must never crash
 *     the host app.
 */

import { createErrorBuffer, type BufferedEvent, type ErrorBuffer } from "./error_buffer";
import { createTelemetryClient, type TelemetryClient } from "./telemetry_client";

export type ObserverEventType =
  | "pageerror"
  | "unhandledrejection"
  | "blank_root"
  | "reporting_observer";

export type ObserverEvent = BufferedEvent;

// ============================================================================
// Helpers extracted verbatim from main.tsx (LPS-700) — DO NOT MODIFY.
// These are battle-tested through the original boot-window flow; the new
// session-wide observer reuses them as-is.
// ============================================================================

/**
 * Serialize an arbitrary error-ish value into a plain object that can
 * cross the postMessage boundary. `structuredClone` doesn't preserve
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
 * `ErrorEvent.filename` usually arrives as `http://localhost:5173/src/App.tsx?t=123`;
 * downstream consumers want the stable `src/App.tsx` form.
 */
function normalizeWorkspaceFilePath(filename: string | undefined): string {
  if (!filename) return "";
  const match = filename.match(/(?:^|\/)(src\/[^\s?:)#]+)/);
  return match?.[1] ?? "";
}

/**
 * Pull the first workspace file reference out of a stack trace.
 *
 * Strips Vite's `?t=timestamp` / `?import` cache-busting query so callers
 * get a stable `src/...:line:col` reference (or zeros if no workspace
 * frame is found — e.g. library-internal throws).
 */
function extractTopFrame(
  stack: string | undefined,
): { file: string; line: number; column: number } {
  if (!stack) return { file: "", line: 0, column: 0 };
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

// ============================================================================
// D-03: Same-origin filter.
// Drops `pageerror` events from third-party scripts (analytics, tag managers,
// chat widgets) so a broken GTM iframe never triggers an LPS repair.
// ============================================================================

function isSameOrigin(filename: string | undefined): boolean {
  // Empty filename = inline / module-eval throw. Treat as same-origin
  // because the throw originated inside our bundle.
  if (!filename) return true;
  try {
    return new URL(filename, location.href).origin === location.origin;
  } catch {
    return true;
  }
}

// LPS-989: rejections with no agent-actionable payload (undefined/null/{}/
// stripped Error) are downgraded to telemetry_only so they don't drive repair.
const _UNACTIONABLE_MESSAGES = new Set([
  "undefined",
  "null",
  "[object Object]",
  "Error",
  "",
]);

// Throws originating in these files must not recurse into repair.
const _OBSERVER_INTERNAL_FILES = [
  "/lib/error_observer",
  "/lib/error_buffer",
  "/lib/telemetry_client",
  "/lib/previewHealthEmitter",
  "/lib/animateGuard",
];

function isActionableRuntimeError(parts: {
  message: string;
  file: string;
  stack: string;
}): boolean {
  const msg = (parts.message || "").trim();
  if (_UNACTIONABLE_MESSAGES.has(msg)) return false;
  if (!parts.file && !parts.stack) return false;
  return true;
}

function isObserverInternal(stack: string | undefined): boolean {
  if (!stack) return false;
  return _OBSERVER_INTERNAL_FILES.some((needle) => stack.includes(needle));
}

// ============================================================================
// D-07: Fingerprint via Web Crypto SHA-256 (16 hex chars).
// Falls back to a cheap non-crypto hash for environments that lack
// `crypto.subtle` (some test runners). Server-side dedup uses the same
// formula so client and server fingerprints align.
// ============================================================================

async function fingerprint(parts: {
  file?: string;
  line?: number;
  name?: string;
  message?: string;
}): Promise<string> {
  const src = `${parts.file ?? ""}|${parts.line ?? 0}|${parts.name ?? ""}|${(parts.message ?? "").slice(0, 200)}`;
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = new TextEncoder().encode(src);
    const digest = await crypto.subtle.digest("SHA-256", buf);
    const hex = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hex.slice(0, 16);
  }
  let h = 0;
  for (let i = 0; i < src.length; i++) h = (h * 31 + src.charCodeAt(i)) | 0;
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 16);
}

// ============================================================================
// Module state — singleton install guard (D-01 idempotence).
// ============================================================================

let installed = false;
let buffer: ErrorBuffer | null = null;
let telemetry: TelemetryClient | null = null;
let teardownFns: Array<() => void> = [];

export interface InstallOptions {
  /** Default `"#root"` — the React mount target. */
  rootSelector?: string;
  /** Default 30_000 ms — raised from 10s after staging false-positives on
   *  cold Vite dev servers where first paint of heavy section graphs
   *  legitimately exceeds 10s. */
  blankRootTimeoutMs?: number;
  /** Override for tests. */
  buffer?: ErrorBuffer;
  /** Override for tests. */
  telemetry?: TelemetryClient;
}

/**
 * Install the permanent runtime error observer. Returns a teardown
 * function. Calling twice is safe — the second call returns a no-op.
 */
export function installErrorObserver(opts: InstallOptions = {}): () => void {
  if (installed) return () => {};
  installed = true;

  telemetry = opts.telemetry ?? createTelemetryClient();
  buffer =
    opts.buffer ??
    createErrorBuffer({
      flush: async (events) => {
        if (!telemetry) return;
        await telemetry.postEvents(events);
      },
    });

  // -- Signal 1: window.error ---------------------------------------------

  const onError = async (event: ErrorEvent) => {
    if (!isSameOrigin(event.filename)) return;
    const serialized = serializeError(event.error ?? event.message);
    const stackFrame = extractTopFrame(serialized.stack as string | undefined);
    const file = normalizeWorkspaceFilePath(event.filename) || stackFrame.file;
    const line = event.lineno || stackFrame.line;
    const column = event.colno || stackFrame.column;
    const message = (serialized.message as string) || String(event.message ?? "");
    const stack = (serialized.stack as string) || "";
    const internal = isObserverInternal(stack);
    const actionable =
      !internal && isActionableRuntimeError({ message, file, stack });
    const fp = await fingerprint({
      file,
      line,
      name: serialized.name as string,
      message,
    });
    buffer?.push({
      type: "pageerror",
      fingerprint: fp,
      message,
      stack,
      file,
      line,
      column,
      name: serialized.name as string,
      source: "window.error",
      telemetry_only: !actionable,
      occurred_at: new Date().toISOString(),
    });
  };
  window.addEventListener("error", onError, true);
  teardownFns.push(() => window.removeEventListener("error", onError, true));

  // -- Signal 2: unhandled promise rejection ------------------------------

  const onRejection = async (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const serialized = serializeError(reason);
    const stackFrame = extractTopFrame(serialized.stack as string | undefined);
    const message = (serialized.message as string) || String(reason);
    const stack = (serialized.stack as string) || "";
    const internal = isObserverInternal(stack);
    const actionable =
      !internal &&
      isActionableRuntimeError({ message, file: stackFrame.file, stack });
    const fp = await fingerprint({
      file: stackFrame.file,
      line: stackFrame.line,
      name: serialized.name as string,
      message,
    });
    buffer?.push({
      type: "unhandledrejection",
      fingerprint: fp,
      message,
      stack,
      file: stackFrame.file,
      line: stackFrame.line,
      column: stackFrame.column,
      name: serialized.name as string,
      source: "unhandledrejection",
      telemetry_only: !actionable,
      occurred_at: new Date().toISOString(),
    });
  };
  window.addEventListener("unhandledrejection", onRejection);
  teardownFns.push(() =>
    window.removeEventListener("unhandledrejection", onRejection),
  );

  // -- Signal 3: blank #root after timeout (preserved from LPS-700) -------

  const rootSelector = opts.rootSelector ?? "#root";
  const blankRootTimeoutMs = opts.blankRootTimeoutMs ?? 30_000;
  const root = document.querySelector(rootSelector);
  if (root) {
    let mounted = (root as Element).childElementCount > 0;
    const observer = new MutationObserver(() => {
      if ((root as Element).childElementCount > 0) {
        mounted = true;
        observer.disconnect();
      }
    });
    observer.observe(root, { childList: true });
    const t = setTimeout(async () => {
      if (mounted) return;
      // Distinguish "React tried to render but produced nothing" (real bug
      // — repair-eligible) from "React never mounted" (still loading on
      // cold container OR App.tsx itself broken; in the latter case the
      // pageerror / unhandledrejection signals will catch it separately
      // with a real file:line — no need to fire blank_root for repair).
      const reactMounted =
        typeof window !== "undefined" &&
        (window as { __lps_react_mounted?: boolean }).__lps_react_mounted ===
          true;
      const message = `Root remained empty after ${Math.round(
        blankRootTimeoutMs / 1000,
      )}s`;
      const fp = await fingerprint({ message });
      buffer?.push({
        type: "blank_root",
        fingerprint: fp,
        message,
        source: "blank_root",
        // Repair-eligible ONLY when React actually mounted and still
        // produced an empty root — i.e. App rendered null, or all
        // top-level children threw into error boundaries. The "react
        // never mounted" case is logged as telemetry so we still see
        // it in dashboards but the agent isn't asked to repair a page
        // that simply hadn't finished booting.
        telemetry_only: !reactMounted,
        occurred_at: new Date().toISOString(),
      });
    }, blankRootTimeoutMs);
    teardownFns.push(() => {
      clearTimeout(t);
      observer.disconnect();
    });
  }

  // -- Signal 4: ReportingObserver (telemetry only — D-05) ----------------

  const ReportingObserverCtor = (
    window as unknown as {
      ReportingObserver?: new (
        cb: (reports: Array<{ type: string; body: unknown }>) => void,
        opts: { buffered: boolean },
      ) => { observe: () => void; disconnect: () => void };
    }
  ).ReportingObserver;
  if (typeof ReportingObserverCtor !== "undefined") {
    try {
      const ro = new ReportingObserverCtor(
        async (reports) => {
          for (const r of reports) {
            const message = `${r.type}: ${JSON.stringify(r.body).slice(0, 200)}`;
            const fp = await fingerprint({ name: r.type, message });
            buffer?.push({
              type: "reporting_observer",
              fingerprint: fp,
              message,
              name: r.type,
              source: "reporting_observer",
              // CRITICAL (D-05): never triggers repair — backend logs only.
              telemetry_only: true,
              occurred_at: new Date().toISOString(),
            });
          }
        },
        { buffered: true },
      );
      ro.observe();
      teardownFns.push(() => ro.disconnect());
    } catch {
      // ReportingObserver unsupported in this engine — skip silently.
    }
  }

  // D-04 self-check: this module never patches the console. The plan-03-04
  // grep test asserts that fact against the bundled lib/ directory.

  return function teardown() {
    if (!installed) return;
    installed = false;
    for (const fn of teardownFns) {
      try {
        fn();
      } catch {
        // swallow — teardown must be idempotent and crash-free
      }
    }
    teardownFns = [];
    buffer?.teardown();
    buffer = null;
    telemetry = null;
  };
}
