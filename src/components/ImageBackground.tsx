import { forwardRef, HTMLAttributes, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ImageBackgroundProps extends HTMLAttributes<HTMLElement> {
  /** Image src from the Image Pool */
  src: string;
  /** Descriptive alt text */
  alt: string;
  /** Extra img attributes (fetchpriority, loading, etc.) */
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;
  /** Wrapper element — defaults to "section" */
  as?: "section" | "div";
  // "dark" (default) = dark mask + text-white; "light" = pale mask + dark text (faded/light-tint photos).
  tone?: "dark" | "light";
}

/**
 * ImageBackground — full-bleed background image with an always-on gradient mask.
 *
 * The gradient mask is structurally guaranteed by this component — the AI does not
 * need to write or remember the overlay div. Text inside is always readable
 * regardless of pool image brightness or color saturation.
 *
 * Layer order (internal):
 *   1. <img> — absolute, full cover, behind everything
 *   2. gradient mask — from-black/85 → via-black/80 → to-black/70 (dark) or
 *      from-white/85 … (light), always present
 *   3. {children} — caller's content; wrap in <div className="container relative z-10">
 *
 * This component guarantees its own contrast (mask + matching text tone), so it
 * opts out of the runtime contrastGuard via `data-lps-no-contrast-guard` — the
 * guard otherwise mis-judged image heroes with mixed text (white headline + a
 * navy trust-bar / CTAs) as "wants light" and veiled the whole section
 * near-white, washing the headline out (LPS-1215).
 *
 * Usage:
 * ```tsx
 * <ImageBackground
 *   src="<pool-url>?w=1920&h=1080&fit=crop"
 *   alt="Hero background"
 *   imgProps={{ fetchpriority: "high", loading: "eager" }}
 *   className="min-h-[85vh] md:min-h-screen flex items-center"
 * >
 *   <div className="container relative z-10">
 *     <h1 className="text-white">Headline</h1>
 *     <p className="text-white/90">Subheadline</p>
 *   </div>
 * </ImageBackground>
 * ```
 *
 * Do NOT add another overlay or gradient inside — the mask is already applied.
 */
const ImageBackground = forwardRef<HTMLElement, ImageBackgroundProps>(
  ({ src, alt, imgProps, as: Tag = "section", tone = "dark", className, children, ...props }, ref) => {
    const mask =
      tone === "light"
        ? "from-white/85 via-white/80 to-white/70"
        : "from-black/85 via-black/80 to-black/70";
    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        // Owns its own contrast (mask + matching text tone) — opt out of the
        // runtime contrastGuard so it can't veil this section (LPS-1215).
        data-lps-no-contrast-guard=""
        // `w-full` because width:auto only spans the container in normal flow — as a
        // flex/grid item it shrinks to fit-content, leaving the parent's background
        // beside the image. (LPS-1561)
        className={cn("relative isolate overflow-hidden w-full", tone === "light" && "light", className)}
        // Keep {...props} here, spread onto this root and LAST: heroes root on
        // this component and the section-id stamper relies on data-section-id
        // reaching the DOM through it (LPS-1759). Moving or dropping it makes
        // every hero silently invisible to section analytics.
        {...props}
      >
        {/* Layers 1+2 carry -z-10 so any in-flow content sits above them WITHOUT
            depending on a caller `relative z-10` or a transient animation transform
            (reveals are transform-only since LPS-1068 — once it completes the
            transform is removed, so it can't be load-bearing for stacking). The
            wrapper's `isolate` confines -z-10 to this section's stacking context, so
            the bg can never escape behind a sibling section. (LPS-1311) */}
        {/* Layer 1 — background image */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover -z-10"
          {...imgProps}
        />
        {/* Layer 2 — always-on gradient mask guaranteeing text readability on any pool image. */}
        <div className={cn("absolute inset-0 bg-gradient-to-b pointer-events-none -z-10", mask)} />
        {/* Layer 3 — caller content */}
        {children}
      </Tag>
    );
  }
);

ImageBackground.displayName = "ImageBackground";

// Named AND default export: generated sections import this both ways
// (`import { ImageBackground }` and `import ImageBackground`). Supporting both
// prevents the "does not provide an export named 'default'" module-link crash
// that blanks the whole preview when the AI picks the default-import shape.
export { ImageBackground };
export default ImageBackground;
export type { ImageBackgroundProps };
