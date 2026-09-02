/**
 * BlogPage (LPS-1411).
 *
 * The full data-driven blog page anatomy — hero → filters → featured-large →
 * grid → bottom CTA — assembled from token-driven pieces so it inherits each
 * project's brand. This is what a newly-created blog page scaffolds to, and what
 * an existing authored dummy-card section is replaced with, so there's ONE
 * seamless on-brand listing instead of a bolted-on "From the journal" strip.
 *
 * State (category + search) lives here; the default unfiltered view is
 * URL-paginated (?page=N) so SSR pre-renders each page. Interactive filtering
 * shows its full result set unpaginated. Sub-sections are individually
 * toggleable so a page that already has its own hero/CTA can suppress ours.
 */
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { usePostsForPage, getBlogPageMeta } from "@/lib/blog-data";
import { BlogPostCard } from "./BlogPostCard";
import { BlogHero } from "./BlogHero";
import { BlogFilters, ALL_CATEGORIES } from "./BlogFilters";
import { BlogFeatured } from "./BlogFeatured";
import { BlogPagination } from "./BlogPagination";
import { BlogCta, type BlogCtaProps } from "./BlogCta";
import { useResolvedPageId } from "./useResolvedPageId";
import {
  readPageNumber,
  deriveCategories,
  postMatchesQuery,
  shouldRenderBlogPage,
} from "./blogPageUtils";

const POSTS_PER_PAGE = 9;
const EMPTY_STATE_CLASS = "py-10 text-center text-base text-muted-foreground";

interface BlogPageProps {
  /** Page id from pages.manifest.json. Inferred from the pathname when absent. */
  pageId?: string;
  eyebrow?: string;
  /** Hero + document heading. Defaults to the manifest page name. */
  heading?: string;
  intro?: string;
  showHero?: boolean;
  showFilters?: boolean;
  showFeatured?: boolean;
  showCta?: boolean;
  /** Copy/links for the bottom CTA. Omitted fields fall back to safe generics. */
  cta?: BlogCtaProps;
  className?: string;
}

export function BlogPage({
  pageId,
  eyebrow = "Blog",
  heading,
  intro,
  showHero = true,
  showFilters = true,
  showFeatured = true,
  showCta = true,
  cta,
  className,
}: BlogPageProps) {
  const location = useLocation();
  const resolvedPageId = useResolvedPageId(pageId, location.pathname);
  const posts = usePostsForPage(resolvedPageId);
  const pageMeta = useMemo(
    () => (resolvedPageId ? getBlogPageMeta(resolvedPageId) : undefined),
    [resolvedPageId],
  );

  const [active, setActive] = useState<string>(ALL_CATEGORIES);
  const [query, setQuery] = useState<string>("");

  const categories = useMemo(() => [ALL_CATEGORIES, ...deriveCategories(posts)], [posts]);
  const isFiltering = active !== ALL_CATEGORIES || query.trim() !== "";

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) => (active === ALL_CATEGORIES || p.category === active) && postMatchesQuery(p, query),
      ),
    [posts, active, query],
  );

  const hasNoPosts = posts.length === 0;
  // A page that renders its own hero is standalone blog content, so it keeps its
  // shell (hero + empty state + CTA) even with zero posts (LPS-1516). An injected
  // section (no hero) collapses to null when empty.
  if (!shouldRenderBlogPage(Boolean(resolvedPageId), posts.length, showHero)) {
    return null;
  }

  const title = heading || pageMeta?.page_name || "Blog";
  // Drop the eyebrow when it just repeats the title (a page literally named
  // "Blog" otherwise shows the word twice), and give a bare hero a tasteful
  // default subtitle so it reads as intentional, not empty.
  const heroEyebrow =
    eyebrow && eyebrow.trim().toLowerCase() !== title.trim().toLowerCase() ? eyebrow : "";
  const heroSubtitle = intro ?? "The latest articles, guides, and updates from our team.";
  const urlPage = readPageNumber(location.search);

  const featuredShown = showFeatured && filtered.length > 0 && (isFiltering || urlPage === 1);
  const featured = featuredShown ? filtered[0] : undefined;
  const gridSource = featuredShown ? filtered.slice(1) : filtered;

  // Unfiltered view paginates via the URL (SSR-friendly); filtering shows all matches.
  const totalPages = Math.max(1, Math.ceil(gridSource.length / POSTS_PER_PAGE));
  const safePage = Math.min(urlPage, totalPages);
  const visible = isFiltering
    ? gridSource
    : gridSource.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);
  const showPagination = !isFiltering && totalPages > 1;

  return (
    <div data-blog-listing-section="" className={className}>
      {showHero ? <BlogHero eyebrow={heroEyebrow} title={title} subtitle={heroSubtitle} /> : null}

      <div className="mx-auto max-w-6xl px-4 md:px-8 py-12 md:py-16">
        {showFilters && !hasNoPosts ? (
          <BlogFilters
            categories={categories}
            active={active}
            query={query}
            onCategory={setActive}
            onQuery={setQuery}
            className="mb-12"
          />
        ) : null}

        {featured ? <BlogFeatured post={featured} className="mb-14" /> : null}

        {hasNoPosts ? (
          <p className={EMPTY_STATE_CLASS}>No articles published yet — check back soon.</p>
        ) : filtered.length === 0 ? (
          <p className={EMPTY_STATE_CLASS}>No articles match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {showPagination ? (
          <BlogPagination pathname={location.pathname} currentPage={safePage} totalPages={totalPages} />
        ) : null}
      </div>

      {showCta ? <BlogCta {...cta} /> : null}
    </div>
  );
}
