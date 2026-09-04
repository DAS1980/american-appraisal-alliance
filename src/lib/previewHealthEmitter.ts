// LPS-903: Forwards Vite HMR connection events to the parent
// PreviewFrame so the dashboard can detect a dead dev server
// instantly — no need to wait for Django's container-status push.
//
// Vite 5+ exposes `vite:ws:disconnect` and `vite:ws:connect` on
// `import.meta.hot`.  We mirror them as `PREVIEW_HEALTH_LOST`
// and `PREVIEW_HEALTH_RESTORED` postMessages so the parent can
// flip its loading overlay deterministically.
//
// Dev-only: `import.meta.hot` is undefined in production builds.
// Loaded before App so any pre-render disconnect (e.g. pod evicted
// during cold start) is reported.

import { postToEditor } from "./editor_channel";

type PreviewHealthEvent =
  | "PREVIEW_HEALTH_LOST"
  | "PREVIEW_HEALTH_RESTORED"
  | "PREVIEW_RELOADING";

const post = (type: PreviewHealthEvent): void => {
  postToEditor({ type, timestamp: Date.now() });
};

if (import.meta.hot) {
  import.meta.hot.on("vite:ws:disconnect", () => post("PREVIEW_HEALTH_LOST"));
  import.meta.hot.on("vite:ws:connect", () => post("PREVIEW_HEALTH_RESTORED"));
  // LPS-954: surface Vite full reloads so the parent can keep its
  // "Refreshing preview…" overlay up instead of exposing the bg-white
  // iframe wrapper during the iframe navigation window.
  import.meta.hot.on("vite:beforeFullReload", () => post("PREVIEW_RELOADING"));
}

export {};
