import React from "react";
import { createRoot, type Root } from "react-dom/client";
import "./index.css";
import PreviewBootError from "./components/PreviewBootError";

// Runtime guard: clamp invalid Element.animate() iterations so one bad
// AI-generated motion.* transition never blanks the whole page.
// Must patch Element.prototype before any framer-motion code runs.
import "./lib/animateGuard";

// Runtime contrast guard (LPS-1025): shape-agnostic safety net that injects a
// dark scrim under any full-bleed background image carrying light text that
// lacks one — catches the cases the agent's write-time overlay fix can't see
// (CSS background-image, nested images, weak via-black mid-stops, vibe/clone
// writes). Reads the rendered DOM, so it works regardless of source shape.
import "./lib/contrastGuard";

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

// LPS-903 — forwards Vite HMR connect/disconnect to the parent so
// PreviewFrame can react instantly when the dev server dies (pod
// evicted, OOM, Vite crash) instead of waiting for Django's status push.
import "./lib/previewHealthEmitter";

// LPS-943 — `PerformanceDefaults` was removed: it ran client-side after React
// hydration, mutating `<img src>` on every Unsplash image AFTER the browser
// had already started fetching the original. That caused a second HTTP
// request per image and a `<link rel="preload">` injected after `load`
// (useless for LCP). Image optimisation now happens at SSR/build time in
// `scripts/prerender.mjs` where the bytes can actually be saved before they
// hit the wire.

// LPS Validation Phase 3 — permanent runtime error observer.
// Generalizes the LPS-700 boot-window observer into a session-wide observer.
// Captures window.error, unhandledrejection, blank-#root, ReportingObserver
// and routes batches through telemetry_client — via the editor in builder
// context, direct to the public endpoint in production.
// The legacy APP_BOOT_FAILED postMessage path below is preserved as a
// parallel fallback signal (per Phase 3 D-13) and will be removed in a
// later phase once the new path is proven.
import { installErrorObserver } from "./lib/error_observer";
import { isFromEditor, postToEditor } from "./lib/editor_channel";

// LPS-1727 — earliest possible "the real boilerplate booted" signal, read by
// PreviewFrame's boot-confirm watchdog to tell a live preview from a gateway
// error page (LPS-1598). This replaces the old LPS_REQUEST_AUTH message, which
// served double duty as the boot ping while also asking the editor to hand over
// its auth token; the token exchange is gone entirely.
postToEditor({ type: "LPS_BOOT_PING" });

// Upload projects (react_source / static_html / static_zip) cold-start with a
// heavier first-paint graph than AI-generated sites — real hero imagery, full
// route table, npm install just finished. The 10s blank-root default catches
// healthy-but-slow renders as defects and fires a useless repair turn. Widen
// to 20s for uploads; JS exceptions still fire repair via window.error /
// unhandledrejection / dynamic-import .catch.
const _uploadType = (import.meta.env.VITE_UPLOAD_TYPE ?? "") as string;
const _isUpload =
  _uploadType === "react_source" ||
  _uploadType === "static_html" ||
  _uploadType === "static_zip";
installErrorObserver(_isUpload ? { blankRootTimeoutMs: 20_000 } : {});

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
 *   - Renders `<PreviewBootError />` as a visible fallback so the user
 *     never sees a blank iframe.
 *   - Posts `APP_BOOT_FAILED` upward so the parent frame can surface a
 *     richer UI or trigger auto-repair.
 *
 * `APP_RENDERED` stays posted from inside `App.tsx` (the "the app is
 * actually visible" signal) and is NOT posted here — we don't want to
 * lie to the parent about successful render when only the module
 * resolution succeeded but rendering hasn't happened yet.
 *
 * Phase 3 (LPS validation v2-lite+): the boot-window scope of the
 * window.error / unhandledrejection / MutationObserver listeners is
 * now owned by `lib/error_observer.ts` which runs for the full
 * session, not just the boot window. The dynamic-import .catch and
 * the `APP_BOOT_FAILED` postMessage below stay as a backwards-compat
 * fallback path so existing PreviewFrame handlers keep working.
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

let bootRepairPending = false;
let lastBootError: unknown = null;

function renderBootError(): void {
  try {
    root?.render(
      <PreviewBootError error={lastBootError} repairPending={bootRepairPending} />
    );
  } catch (renderErr) {
    // eslint-disable-next-line no-console
    console.error("[main] PreviewBootError itself failed to render", renderErr);
  }
}

window.addEventListener("message", (event: MessageEvent) => {
  if (!isFromEditor(event)) return;
  const data = event.data;
  if (!data || data.type !== "PREVIEW_BOOT_REPAIR_STATE") return;
  const pending = Boolean(data.repairPending);
  if (pending === bootRepairPending) return;
  bootRepairPending = pending;
  
  if (bootFailureReported) renderBootError();
});

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
  
  lastBootError = error;
  renderBootError();

  // Notify the parent frame (Next.js PreviewFrame) so it can clear the
  // loading overlay and surface an actionable state. No-op when unframed.
  postToEditor({ type: "APP_BOOT_FAILED", payload });
}

interface ViteErrorPayload {
  plugin?: string;
  id?: string;
  loc?: { file?: string; line?: number; column?: number };
  message?: string;
}

let lastViteError: ViteErrorPayload | null = null;

if (typeof import.meta !== "undefined" && import.meta.hot) {
  import.meta.hot.on(
    "vite:error",
    (info: { err?: ViteErrorPayload } | ViteErrorPayload) => {
      const err =
        (info as { err?: ViteErrorPayload }).err ?? (info as ViteErrorPayload);
      if (err) lastViteError = err;
    }
  );
}

function normalizeViteId(id: string): string {
  const match = id.match(/(src\/[^\s?)#]+)/);
  return match ? match[1] : id.replace(/^\/?(?:workspace\/)?/, "");
}

async function resolveDynamicImportLocation(
  importError: unknown
): Promise<{ file: string; line: number; column: number } | undefined> {
  if (lastViteError) {
    const file =
      lastViteError.loc?.file ?? lastViteError.id ?? "";
    if (file) {
      return {
        file: normalizeViteId(file),
        line: lastViteError.loc?.line ?? 0,
        column: lastViteError.loc?.column ?? 0,
      };
    }
    if (lastViteError.message) {
      const m = lastViteError.message.match(
        /from\s+["'](?:\/?)(src\/[^"']+)["']/
      );
      if (m) return { file: m[1], line: 0, column: 0 };
    }
  }

  const message =
    importError instanceof Error ? importError.message : String(importError ?? "");
  const stackMatch =
    importError instanceof Error
      ? importError.stack?.match(/(src\/[^\s?:)#]+):(\d+):(\d+)/)
      : null;
  if (stackMatch) {
    return {
      file: stackMatch[1],
      line: parseInt(stackMatch[2], 10) || 0,
      column: parseInt(stackMatch[3], 10) || 0,
    };
  }
  const messageMatch = message.match(/(src\/[^\s?:)#]+):(\d+):(\d+)/);
  if (messageMatch) {
    return {
      file: messageMatch[1],
      line: parseInt(messageMatch[2], 10) || 0,
      column: parseInt(messageMatch[3], 10) || 0,
    };
  }
  return undefined;
}

import("./App")
  .then(({ default: App }) => {
    if (!root) return;
    try {
      root.render(<App />);
    } catch (renderError) {
      reportBootFailure(renderError, "render");
    }
  })
  .catch(async (importError) => {
    // "Failed to fetch dynamically imported module" is browser-generated for
    // network-level fetch failures (Vite dev server momentarily unavailable).
    // Retry once after 2s before declaring a boot failure — covers the case
    // where a concurrent production build briefly invalidated the module graph
    // (mpaHtmlGeneratorPlugin add/unlink during multi-page builds).
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
          .catch(async (retryError) => {
            // Retry also failed — treat as a genuine boot failure.
            const location = await resolveDynamicImportLocation(retryError);
            reportBootFailure(retryError, "dynamic-import", location);
          });
      }, 2000);
      return;
    }

    const location = await resolveDynamicImportLocation(importError);
    reportBootFailure(importError, "dynamic-import", location);

  });
