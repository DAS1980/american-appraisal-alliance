/**
 * PreviewBootError — visible fallback when the generated app fails to
 * load or mount.
 *
 * Why this component exists (LPS-700):
 *
 * React error boundaries cannot catch errors that fire BEFORE React
 * mounts — e.g. a module-evaluation `ReferenceError` thrown by
 * agent-written code. Without a fallback, the user sees a fully blank
 * `<div id="root">` and has no indication anything went wrong.
 *
 * This component is rendered directly by `main.tsx` (not by `<App />`)
 * when the dynamic `import("./App")` or the initial `root.render()`
 * throws. It's deliberately self-contained:
 *
 *   - No external dependencies beyond React itself
 *   - No imports from `src/components/ui/*` (which might also be broken
 *     in the same generation)
 *   - Inline styles instead of Tailwind classes (Tailwind pipeline might
 *     not be the source of the failure but inline is one less moving part)
 *
 * The visible message is intentionally generic and non-technical —
 * end users never see stack traces or raw error messages like
 * `ReferenceError: React is not defined`.  Structured error details
 * travel OUT of the iframe via the `APP_BOOT_FAILED` postMessage
 * (dispatched from `main.tsx`) so the parent frame / Sentry can
 * trigger repair or surface a richer UI.  This component's job is
 * just "don't be a blank screen."
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

interface PreviewBootErrorProps {
  /**
   * The error that caused bootstrap to fail. Kept in the prop
   * signature so future non-user-facing consumers (dev-mode overlay,
   * test harness) can read it, but intentionally NOT rendered into
   * the visible UI.
   */
  error?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PreviewBootError(_props: PreviewBootErrorProps) {
  return (
    <div
      role="alert"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        color: "#111",
        background: "#fafafa",
      }}
    >
      <div style={{ maxWidth: "440px", textAlign: "center" }}>
        <div
          style={{
            fontSize: "36px",
            lineHeight: "1",
            marginBottom: "16px",
          }}
          aria-hidden="true"
        >
          ⚠️
        </div>
        <h1
          style={{
            fontSize: "18px",
            fontWeight: 600,
            margin: "0 0 8px",
          }}
        >
          Preview failed to load
        </h1>
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            color: "#555",
            margin: "0",
          }}
        >
          We hit an issue while starting your preview. The builder will
          attempt to repair this automatically — please hold on a
          moment.
        </p>
        {/*
          NO raw error message / stack trace in the visible UI.  Seeing
          "ReferenceError: React is not defined" is bad UX for a
          non-technical user and leaks implementation detail.  The
          structured error details (name, message, stack, source) are
          already sent out via `APP_BOOT_FAILED` postMessage from
          main.tsx, which the parent frame routes to Sentry with the
          `error_type=blank_root` tag — engineers / support still get
          everything they need to debug.  End users get a friendly
          "hold on" message and nothing else.
        */}
      </div>
    </div>
  );
}
