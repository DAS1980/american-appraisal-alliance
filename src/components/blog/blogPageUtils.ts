/**
 * Shared helpers for the blog listing/page components (LPS-1411).
 *
 * Pagination is URL-driven (?page=N) so SSR can pre-render each page
 * independently; date formatting is centralised so the featured card and
 * any future meta rows read identically.
 */
import { type BlogPost } from "@/lib/blog-data";

export function readPageNumber(search: string): number {
  const params = new URLSearchParams(search);
  const raw = params.get("page");
  const n = raw ? Number.parseInt(raw, 10) : 1;
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export function buildPageHref(pathname: string, page: number): string {
  if (page <= 1) return pathname;
  const params = new URLSearchParams();
  params.set("page", String(page));
  return `${pathname}?${params.toString()}`;
}

/** "Mar 6, 2026" from an ISO date; empty string when absent/unparseable. */
export function formatPostDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Distinct category labels across a page's posts, most-frequent-preserving
 * insertion order (posts are pre-sorted most-recent first). Used to build the
 * filter pills — "All" is prepended by the caller.
 */
export function deriveCategories(posts: BlogPost[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of posts) {
    const c = (p.category || "").trim();
    if (c && !seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  return out;
}

/** Whether <BlogPage> renders (LPS-1516): a dedicated page shows its shell even
 *  with zero posts; an injected section collapses to null when empty. */
export function shouldRenderBlogPage(
  hasResolvedPageId: boolean,
  postCount: number,
  isDedicatedPage: boolean,
): boolean {
  if (!hasResolvedPageId) return false;
  if (postCount === 0 && !isDedicatedPage) return false;
  return true;
}

/** Case-insensitive match of a post against a free-text query (title/excerpt/category/tags). */
export function postMatchesQuery(post: BlogPost, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    post.title,
    post.excerpt,
    post.category,
    ...(post.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}
