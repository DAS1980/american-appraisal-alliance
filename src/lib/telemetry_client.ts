/**
 * LPS Validation telemetry client.
 *
 * Routes a batch of buffered runtime-error events to the right ingestion
 * endpoint based on `window.__LPS_CONTEXT`:
 *
 *   - `"builder"`    → hand the batch to the editor as an `OBSERVER_BATCH`
 *                       postMessage; PreviewFrame POSTs it to
 *                       `/api/projects/{projectId}/runtime-errors/` with its own
 *                       credentials (LPS-1727 — this iframe used to borrow the
 *                       builder JWT to POST directly, which meant any script in
 *                       the preview could read it off `window`).
 *   - `"production"` → POST `/api/public/runtime-events/` with
 *                       `{project_id, deploy_sha, events}` and
 *                       `keepalive: true` so the request survives page
 *                       unload (matches Sentry's pattern). Unauthenticated by
 *                       design; unchanged.
 *
 * Production-branch behavior (Phase 6 / Plan 06-03):
 *   - POSTs to `/api/public/runtime-events/` with `keepalive: true`.
 *   - Retries once after 5s on 5xx (transient server / network), then drops.
 *   - Drops 4xx silently — server logged the bad request, no client loop.
 *   - Logs a `console.warn` and drops the batch when
 *     `window.__LPS_PROJECT_ID` or `window.__LPS_DEPLOY_SHA` is missing
 *     (fail loud on misconfigured deploys).
 *
 * Builder-branch retry/dedup semantics now live on the editor side and in
 * Django's per-event Redis dedup; this file just forwards the batch.
 */

import { getDeployMetadata } from "./deploy_metadata";
import { postToEditor } from "./editor_channel";
import type { BufferedEvent } from "./error_buffer";

export interface PostEventsResult {
  /** Whether the server accepted the batch (202 / 200 with `accepted: true`). */
  accepted: boolean;
  /** Server queued a repair RabbitMQ publish. */
  queued?: boolean;
  /** Count of events the server deduped (already seen in 60s window). */
  deduped?: number;
  /** Count of events processed (after server-side filtering). */
  events_count?: number;
  /** D-15: per-(project_id, deploy_sha) circuit breaker tripped. */
  circuit_breaker_tripped?: boolean;
  /** D-15: number of attempts already counted by the breaker. */
  attempts_used?: number;
  /** Underlying HTTP status (0 on network error). */
  status?: number;
}

export interface TelemetryClient {
  postEvents: (events: BufferedEvent[]) => Promise<PostEventsResult>;
}

interface TelemetryClientOptions {
  /** Optional override for tests. */
  fetchImpl?: typeof fetch;
}

export function createTelemetryClient(opts: TelemetryClientOptions = {}): TelemetryClient {
  const fetchImpl = opts.fetchImpl ?? fetch;

  return {
    async postEvents(events) {
      if (events.length === 0) return { accepted: false, status: 0 };
      const meta = getDeployMetadata();

      if (meta.context === "production") {
        // Phase 6 / Plan 06-03: live POST to the public ingestion endpoint
        // wired up in Plan 06-01. `keepalive: true` so the request survives
        // page unload (production sites are visited briefly).
        const projectId =
          (window as unknown as { __LPS_PROJECT_ID?: string }).__LPS_PROJECT_ID;
        const deploySha =
          (window as unknown as { __LPS_DEPLOY_SHA?: string }).__LPS_DEPLOY_SHA;
        if (!projectId || !deploySha) {
          console.warn(
            "[LPS] Tier 5 missing __LPS_PROJECT_ID/__LPS_DEPLOY_SHA — events dropped",
          );
          return { accepted: false, status: 0 };
        }
        const body = JSON.stringify({
          project_id: projectId,
          deploy_sha: deploySha,
          events,
        });
        const status = await postWithRetry(
          "/api/public/runtime-events/",
          body,
          fetchImpl,
        );
        // 202 expected on success; 4xx / final-5xx / network (0) all map to
        // `accepted: false` so the buffer treats them uniformly as drops.
        return { accepted: status >= 200 && status < 300, status };
      }

      // Builder context. The editor owns the authenticated POST — it already
      // holds the customer's credentials, so this iframe never needs them.
      // It also means only the editor sees the response, which is where the
      // circuit-breaker / PolishingOverlay decision belongs anyway.
      postToEditor({
        type: "OBSERVER_BATCH",
        payload: { deploy_sha: meta.deploySha, events },
      });
      // Fire-and-forget: `error_observer`'s flush discards this result, and the
      // real accept/dedup verdict now lands in the editor.
      return { accepted: true, events_count: events.length, status: 0 };
    },
  };
}

/**
 * Production-branch POST helper. Behaviors (Plan 06-03):
 *   1. POSTs to `/api/public/runtime-events/` with `keepalive: true` so the
 *      request survives page unload.
 *   2. Retries once after 5s on 5xx, then drops.
 *   3. Drops 4xx silently without retry (server logged the bad request).
 *   4. Network errors → retry once after 5s, then return 0 (caller treats
 *      0 as a drop, same as 4xx).
 *
 * Returns the final HTTP status (0 for unrecovered network failure). The
 * caller in `postEvents` translates this into a `PostEventsResult`.
 */
async function postWithRetry(
  url: string,
  body: string,
  fetchImpl: typeof fetch,
  attempt = 1,
): Promise<number> {
  try {
    const res = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
    if (res.status >= 500 && attempt === 1) {
      await sleep(5_000);
      return postWithRetry(url, body, fetchImpl, 2);
    }
    return res.status;
  } catch {
    if (attempt === 1) {
      await sleep(5_000);
      return postWithRetry(url, body, fetchImpl, 2);
    }
    return 0;
  }
}

const sleep = (ms: number): Promise<void> =>
  new Promise<void>((r) => setTimeout(r, ms));
