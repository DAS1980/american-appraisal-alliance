/**
 * LPS Validation Phase 3 — error buffer.
 *
 * Dedupe (by fingerprint, 60s window) + rate-limit (5 events/sec sliding) +
 * batched flush (every 500ms or on 10-event high-water mark) for runtime
 * error events captured by `error_observer.ts`.
 *
 * Telemetry must NEVER crash the host app:
 *   - All flush callbacks are wrapped in try/catch.
 *   - `teardown()` flushes synchronously then clears the timer so HMR /
 *     test re-imports don't leak intervals.
 *   - The `maxBufferSize` backstop drops oldest events if the flush
 *     callback hangs (e.g. telemetry endpoint slow).
 */

export interface BufferedEvent {
  type: "pageerror" | "unhandledrejection" | "blank_root" | "reporting_observer";
  fingerprint: string;
  message: string;
  stack?: string;
  file?: string;
  line?: number;
  column?: number;
  name?: string;
  source?: string;
  /** D-05: ReportingObserver events log to telemetry but never trigger repair. */
  telemetry_only?: boolean;
  /** ISO8601 timestamp captured at push time. */
  occurred_at: string;
}

export interface ErrorBufferOptions {
  /** Called with the drained queue. May be async; return value is ignored. */
  flush: (events: BufferedEvent[]) => void | Promise<void>;
  /** Default 60_000 (D-06). Identical fingerprints inside this window collapse. */
  dedupeWindowMs?: number;
  /** Default 5 (D-06). Sliding 1-second window. */
  rateLimitPerSec?: number;
  /** Default 500 (D-06). Periodic drain interval. */
  flushIntervalMs?: number;
  /** Default 50 (D-06). Hard cap; oldest dropped if flush stalls. */
  maxBufferSize?: number;
}

export interface ErrorBuffer {
  /** Push an event onto the queue. May be silently dropped (dedup / rate-limit). */
  push: (event: BufferedEvent) => void;
  /** Drain immediately. Useful for `beforeunload` or test-driven flushes. */
  forceFlush: () => void;
  /** Clear the interval and drain once. Safe to call multiple times. */
  teardown: () => void;
}

export function createErrorBuffer(opts: ErrorBufferOptions): ErrorBuffer {
  const dedupeWindowMs = opts.dedupeWindowMs ?? 60_000;
  const rateLimitPerSec = opts.rateLimitPerSec ?? 5;
  const flushIntervalMs = opts.flushIntervalMs ?? 500;
  const maxBufferSize = opts.maxBufferSize ?? 50;

  const queue: BufferedEvent[] = [];
  /** Map<fingerprint, lastSeenMs> — lazily evicted on lookup. */
  const seen = new Map<string, number>();
  /** Sliding 1s window of push timestamps for D-08 rate limiter. */
  const recentPushes: number[] = [];

  let flushTimer: ReturnType<typeof setInterval> | null = setInterval(() => {
    if (queue.length > 0) flush();
  }, flushIntervalMs);

  function isRateLimited(): boolean {
    const now = Date.now();
    while (recentPushes.length > 0 && now - recentPushes[0] > 1000) {
      recentPushes.shift();
    }
    if (recentPushes.length >= rateLimitPerSec) return true;
    recentPushes.push(now);
    return false;
  }

  function isDuplicate(fp: string): boolean {
    const now = Date.now();
    // Opportunistic eviction — keeps the map bounded without a separate timer.
    for (const [k, t] of seen) {
      if (now - t > dedupeWindowMs) seen.delete(k);
    }
    const last = seen.get(fp);
    if (last !== undefined && now - last <= dedupeWindowMs) return true;
    seen.set(fp, now);
    return false;
  }

  function flush(): void {
    if (queue.length === 0) return;
    const batch = queue.splice(0, queue.length);
    try {
      void opts.flush(batch);
    } catch {
      // Swallow — telemetry must never crash the app.
    }
  }

  return {
    push(event) {
      if (isDuplicate(event.fingerprint)) return;
      if (isRateLimited()) return;
      queue.push(event);
      if (queue.length >= maxBufferSize) {
        // Backstop — drop oldest beyond cap, then flush what remains.
        queue.splice(0, queue.length - maxBufferSize);
        flush();
      } else if (queue.length >= 10) {
        flush();
      }
    },
    forceFlush: flush,
    teardown() {
      if (flushTimer !== null) {
        clearInterval(flushTimer);
        flushTimer = null;
      }
      flush();
    },
  };
}
