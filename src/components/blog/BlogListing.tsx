/**
 * BlogListing (LPS-320).
 *
 * Two render modes:
 *
 *   variant="standalone" — big "THE JOURNAL" eyebrow + page-name H1 + grid + pagination.
 *     Used when the blog listing IS the whole page (the original Phase 0 mockup behavior).
 *
 *   variant="section" — modest "From the journal" heading + grid + pagination. No big hero.
 *     Used when the listing is appended to an existing page's content (Option B).
 *     `pageId` is optional in this mode — the component reads the current pathname
 *     and looks up the matching manifest page to determine which posts to show.
 *
 * Pagination uses ?page=N in the URL so SSR can pre-render each listing page
 * independently.
 */
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { usePostsForPage, getBlogPageMeta } from "@/lib/blog-data";
import { useResolvedPageId } from "./useResolvedPageId";
import { BlogPagination } from "./BlogPagination";
import { readPageNumber } from "./blogPageUtils";

const POSTS_PER_PAGE = 9;

export type BlogListingVariant = "standalone" | "section";

interface BlogListingProps {
  /** Page id from pages.manifest.json. Optional in `section` variant — when absent,
   *  the component infers it from the current pathname via the manifest. */
  pageId?: string;
  /** Layout mode. Defaults to "standalone" for back-compat. */
  variant?: BlogListingVariant;
  showHeader?: boolean;
}

export function BlogListing({ pageId, variant = "standalone", showHeader = true }: BlogListingProps) {
  const location = useLocation();
  const currentPage = readPageNumber(location.search);

  const resolvedPageId = useResolvedPageId(pageId, location.pathname);

  const allPosts = usePostsForPage(resolvedPageId);
  const pageMeta = useMemo(
    () => (resolvedPageId ? getBlogPageMeta(resolvedPageId) : undefined),
    [resolvedPageId],
  );

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const visible = allPosts.slice(start, start + POSTS_PER_PAGE);

  const showPagination = allPosts.length > POSTS_PER_PAGE;
  const isFirstPage = safePage === 1;

  // In section variant, render nothing if this page has no blog content. Lets
  // PageLayout / the global portal mount this component unconditionally.
  if (variant === "section" && (!resolvedPageId || allPosts.length === 0)) {
    return null;
  }

  if (variant === "section") {
    const grid = (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {visible.map((post, idx) => (
            <BlogPostCardLazy
              key={post.id}
              post={post}
              featured={isFirstPage && idx === 0}
            />
          ))}
        </div>

        {showPagination && (
          <BlogPagination
            pathname={location.pathname}
            currentPage={safePage}
            totalPages={totalPages}
          />
        )}
      </>
    );

    // LPS-1411: when embedded in <BlogListingSection> (which owns the container
    // + header), render only the grid — otherwise we double-wrap the section
    // (nested max-width + padding). The parent provides the container rhythm.
    if (!showHeader) return grid;

    // Standalone (BlogListingPortal fallback for legacy pages with no inline
    // <BlogListingSection>): own container + header. Derive the heading from the
    // page name so a named page (e.g. "News") reads "News" — matching the
    // agent-fed heading an inline section would carry — instead of a hardcoded
    // generic string. Falls back to the editorial default when there's no meta.
    const fallbackHeading = pageMeta?.page_name || "From the journal";
    return (
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16">
        <header className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
            Latest
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-foreground">
            {fallbackHeading}
          </h2>
        </header>
        {grid}
      </section>
    );
  }

  // Standalone variant — the original mockup hero + grid.
  const heading = pageMeta?.page_name || "Blog";

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <section className="pt-20 pb-12 max-w-[760px]">
        <div className="text-sm tracking-widest uppercase text-primary font-semibold mb-4">
          The journal
        </div>
        <h1 className="font-semibold text-4xl sm:text-5xl leading-tight tracking-tight m-0 mb-5 text-foreground">
          {heading}
        </h1>
      </section>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 pt-14 pb-24">
          {visible.map((post, idx) => (
            <BlogPostCardLazy
              key={post.id}
              post={post}
              featured={isFirstPage && idx === 0}
            />
          ))}
        </div>
      ) : (
        <div className="pt-14 pb-24">
          <p className="text-muted-foreground text-base">No posts yet.</p>
        </div>
      )}

      {showPagination && (
        <BlogPagination
          pathname={location.pathname}
          currentPage={safePage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

// Forward-import to avoid circular import (BlogPostCard imports types from blog-data).
import { BlogPostCard as BlogPostCardLazy } from "./BlogPostCard";
