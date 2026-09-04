/**
 * Runtime guard for Element.prototype.animate().
 *
 * The Web Animations API throws `Failed to execute 'animate' on 'Element':
 * iterationCount must be non-negative` when the `iterations` option is a
 * negative finite number, -Infinity, or NaN.  framer-motion's WAAPI
 * adapter passes `iterations: repeat + 1` straight through, so any
 * AI-generated `<motion.* transition={{ repeat: "infinite" | -1 | NaN }} />`
 * takes down the whole page with an uncaught TypeError.
 *
 * We patch `.animate()` to clamp invalid `iterations` to 1 (single play)
 * and log a one-time warning per call site.  Preserves the original API
 * return value (an Animation object) so no downstream `.finished` / `.cancel`
 * calls break.  Positive finite and `Infinity` pass through unchanged.
 */

const WARN_ONCE_KEY = "__lpsAnimateGuardWarned" as const;

function isInvalidIterations(value: unknown): boolean {
  if (value === undefined) return false;
  if (typeof value !== "number") return true;
  if (Number.isNaN(value)) return true;
  if (value === -Infinity) return true;
  return Number.isFinite(value) && value < 0;
}

function install() {
  if (typeof Element === "undefined") return;
  const proto = Element.prototype as typeof Element.prototype & {
    [WARN_ONCE_KEY]?: boolean;
  };
  if (proto[WARN_ONCE_KEY]) return; // already patched

  const original = proto.animate;
  if (typeof original !== "function") return;

  proto.animate = function patchedAnimate(
    this: Element,
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions,
  ) {
    if (
      options &&
      typeof options === "object" &&
      isInvalidIterations(options.iterations)
    ) {
      // Don't spam — one warning per page load is enough to surface the bug.
      if (!(window as unknown as Record<string, unknown>)[WARN_ONCE_KEY]) {
        (window as unknown as Record<string, unknown>)[WARN_ONCE_KEY] = true;
        // eslint-disable-next-line no-console
        console.warn(
          "[animateGuard] Clamped invalid Element.animate() iterations",
          options.iterations,
          "→ 1. Check framer-motion transition={{ repeat }} values in recently generated components.",
        );
      }
      options = { ...options, iterations: 1 };
    }
    return original.call(this, keyframes, options);
  };

  proto[WARN_ONCE_KEY] = true;
}

install();

export {};
