/**
 * BlogListingSection (LPS-1052, LPS-1411)
 *
 * The blog section the agent injects into / swaps onto a page. It delegates to
 * <BlogPage>, the full data-driven anatomy (hero → filters → featured → grid →
 * CTA), and picks how much of it to show via `variant`:
 *
 *   variant="page"    — full anatomy. Used when this IS the blog page's content
 *                       (a newly-created dedicated blog page): hero + filters +
 *                       featured-large + grid + bottom CTA.
 *   variant="section" — DEFAULT. Filters + featured-large + grid, no hero/CTA.
 *                       Used when injecting into / replacing a section on a page
 *                       that already has its own hero (and often a CTA), so we
 *                       drop in the search/filter + real posts without doubling
 *                       the page chrome.
 *
 * Kept as the injected element (agent emits `<BlogListingSection pageId=… />`) so
 * the backfill/detector/consolidation machinery and the visual editor's section
 * selection are unchanged. With no posts: variant="page" still renders its
 * anatomy (hero + empty state + CTA) so a freshly-created blog page isn't blank
 * (LPS-1516); variant="section" renders nothing (BlogPage's empty-state contract)
 * so it never leaves an orphaned strip on a page that has its own chrome.
 */
import { BlogPage } from "@/components/blog/BlogPage";

interface BlogListingSectionProps {
  /** Page id from `pages.manifest.json`. Inferred from the pathname when absent. */
  pageId?: string;
  /** Hero eyebrow (page variant only). */
  eyebrow?: string;
  /** Hero title. Defaults to the manifest page name. */
  heading?: string;
  /** Hero subtitle / intro (page variant only). */
  intro?: string;
  /** How much of the blog anatomy to render. Defaults to the modest section. */
  variant?: "page" | "section";
  /** Extra container classes for one-off layout tweaks via the inspector. */
  className?: string;
}

export function BlogListingSection({
  pageId,
  eyebrow,
  heading,
  intro,
  variant = "section",
  className,
}: BlogListingSectionProps) {
  const isPage = variant === "page";
  return (
    <BlogPage
      pageId={pageId}
      eyebrow={eyebrow}
      heading={heading}
      intro={intro}
      showHero={isPage}
      showFilters
      showFeatured
      showCta={isPage}
      className={className}
    />
  );
}

// LPS-1935: default export alongside the named one. The engine refresh repairs a
// copy lacking the named export, and post-LPS-1770 a default-only copy means a page
// default-imports it — a named-only replacement would block every commit.
export default BlogListingSection;
