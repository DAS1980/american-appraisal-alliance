/**
 * LPS-1727 — the one trusted postMessage channel between this preview and the
 * builder editor that embeds it.
 *
 * Inbound: a message is only honoured when its `source` IS our parent frame, so
 * an unrelated window that obtains a handle on this document cannot drive the
 * inspector or inject state. Outbound: addressed to the editor's exact origin
 * rather than `"*"`.
 *
 * Resolving that origin is the subtle part. `document.referrer` is NOT reliable:
 * it names the embedder only on the parent-initiated load. After any full-page
 * navigation *inside* this iframe it becomes our own previous URL — and because
 * this module re-evaluates on that new document, a referrer-only implementation
 * locks in the preview's own origin and silently kills the channel in both
 * directions (outbound dropped by the browser on target-origin mismatch,
 * inbound rejected on origin comparison). That is reachable in ordinary use: any
 * `<a href>` to a path outside the manifest, and every nav click on a
 * static_html/static_zip upload, perform a real navigation.
 *
 * Origin sources, in descending authority:
 *   1. `param`    — the `lpsEditorOrigin` query param the editor puts on our
 *                   iframe src. Authoritative: it comes from the editor itself.
 *   2. `storage`  — sessionStorage, which survives the in-frame navigations that
 *                   drop the query param.
 *   3. `referrer` — only when it is NOT our own origin (see above).
 *   4. `adopted`  — the real origin of a message proven to come from
 *                   `window.parent`, used to correct a weak derivation.
 *
 * A mismatch against an *authoritative* origin is rejected outright. A mismatch
 * against a weakly-derived one is corrected, so a bad derivation can never wedge
 * the channel permanently shut. `source === window.parent` remains the actual
 * security boundary; origin equality is defence in depth on top of it.
 */

const STORAGE_KEY = "__lps_editor_origin";
const ORIGIN_PARAM = "lpsEditorOrigin";

type OriginSource = "param" | "storage" | "referrer" | "adopted";

let cached: string | null = null;
let cachedSource: OriginSource | null = null;

function isFramed(): boolean {
  return typeof window !== "undefined" && window.parent !== window;
}

/** Reduce an absolute http(s) URL to its origin; null for anything else. */
function normalizeOrigin(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function readStoredOrigin(): string | null {
  try {
    return normalizeOrigin(window.sessionStorage.getItem(STORAGE_KEY));
  } catch {
    // sessionStorage can throw (privacy modes, partitioned storage).
    return null;
  }
}

function remember(origin: string, source: OriginSource): void {
  cached = origin;
  cachedSource = source;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, origin);
  } catch {
    // Non-fatal: we re-derive on the next navigation.
  }
}

function resolveOrigin(): string | null {
  if (cached) return cached;
  if (!isFramed()) return null;

  let fromParam: string | null = null;
  try {
    fromParam = normalizeOrigin(
      new URL(window.location.href).searchParams.get(ORIGIN_PARAM)
    );
  } catch {
    // Unparseable location — fall through.
  }
  if (fromParam) {
    remember(fromParam, "param");
    return cached;
  }

  const fromStorage = readStoredOrigin();
  if (fromStorage) {
    remember(fromStorage, "storage");
    return cached;
  }

  const fromReferrer = normalizeOrigin(document.referrer);
  // A referrer equal to our own origin means we arrived by navigating inside the
  // frame, so it says nothing about the embedder.
  if (fromReferrer && fromReferrer !== window.location.origin) {
    remember(fromReferrer, "referrer");
    return cached;
  }

  return null;
}

// Resolve at import, before the router's first navigation strips the query
// param (routeNotifier wraps pushState/replaceState). resolveOrigin is otherwise
// only reached on the first message in or out, by which point the param is gone,
// the referrer is empty in an embedded frame, and nothing was ever stored.
resolveOrigin();

export function getEditorOrigin(): string | null {
  return resolveOrigin();
}

/** Test seam — clears resolution state so it can be re-exercised. */
export function resetEditorOriginCache(): void {
  cached = null;
  cachedSource = null;
}

/** True only for messages posted by the frame that embeds this preview. */
export function isFromEditor(event: MessageEvent): boolean {
  if (!isFramed()) return false;
  // The real boundary: an arbitrary window holding a handle on this document is
  // not our parent, so it can never drive the preview.
  if (event.source !== window.parent) return false;

  const known = resolveOrigin();
  if (known && event.origin === known) return true;

  // The editor told us its origin directly, and this message disagrees with it.
  // Reject rather than adopt — otherwise the authoritative value is worthless.
  if (known && cachedSource === "param") return false;

  // Weakly derived (or absent) origin. The window identity above already proves
  // the sender is our embedder, so correct the derivation instead of dropping
  // every message with no route to recovery.
  if (event.origin && event.origin !== "null") {
    remember(event.origin, "adopted");
    return true;
  }
  return false;
}

export function postToEditor(message: unknown): void {
  if (!isFramed()) return;
  // Reaching "*" now requires an editor old enough not to send the param, on a
  // document that navigated in-frame, with sessionStorage unavailable. Keeping
  // the fallback matters because dropping the message instead would starve
  // PreviewFrame's boot-confirm watchdog and cause remount/wake loops
  // (LPS-1598). Safe because nothing sent upward is a secret — the builder JWT
  // no longer enters this document at all.
  const target = resolveOrigin() ?? "*";
  try {
    window.parent.postMessage(message, target);
  } catch {
    // Exotic cross-origin failures have no recovery path.
  }
}
