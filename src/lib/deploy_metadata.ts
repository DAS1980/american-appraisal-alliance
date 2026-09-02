/**
 * LPS Validation Phase 3 — deploy metadata accessor.
 *
 * Read-only accessor for the three runtime globals that identify the
 * iframe's deployment context. Set at build time via Vite's `define`
 * (only `__LPS_CONTEXT` for now) or at runtime by Django (`__LPS_PROJECT_ID`,
 * `__LPS_DEPLOY_SHA`).
 *
 * In dev / builder containers, `__LPS_PROJECT_ID` is not always present —
 * we fall back to parsing the URL params (the parent iframe sets
 * `?project_id=...`) and finally to `document.referrer`.
 *
 * `__LPS_DEPLOY_SHA` is wired by Phase 6 (production publish pipeline).
 * For Tier-4 (builder) telemetry, the literal `"unknown"` is acceptable —
 * the circuit breaker still groups by `(project_id, "unknown")`.
 */

export type LpsContext = "builder" | "production";

export interface DeployMetadata {
  /** Project UUID — empty string if not resolvable. */
  projectId: string;
  /** Git SHA of the published deploy — `"unknown"` in builder context. */
  deploySha: string;
  /** Routing context — defaults to `"builder"` when unset. */
  context: LpsContext;
}

declare global {
  interface Window {
    __LPS_PROJECT_ID?: string;
    __LPS_DEPLOY_SHA?: string;
    __LPS_CONTEXT?: LpsContext;
  }
}

export function getDeployMetadata(): DeployMetadata {
  if (typeof window === "undefined") {
    return { projectId: "", deploySha: "unknown", context: "builder" };
  }

  let projectId = window.__LPS_PROJECT_ID || "";
  if (!projectId) {
    try {
      projectId = new URL(window.location.href).searchParams.get("project_id") || "";
      if (!projectId && document.referrer) {
        projectId = new URL(document.referrer).searchParams.get("project_id") || "";
      }
    } catch {
      projectId = "";
    }
  }

  const deploySha = window.__LPS_DEPLOY_SHA || "unknown";
  const context: LpsContext = (window.__LPS_CONTEXT as LpsContext) || "builder";

  return { projectId, deploySha, context };
}
