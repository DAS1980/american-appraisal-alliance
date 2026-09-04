/**
 * Blog data accessor (LPS-320).
 *
 * `src/data/blog.json` is written at publish time by the agent's
 * `blog_data_sync` helper (utils/blog_data_sync.py) from Django's
 * `/api/projects/{id}/blog-data/` endpoint. An empty default file ships
 * with the boilerplate so the static import always resolves.
 *
 * Posts are pre-sorted most-recent first per page by Django so the
 * renderer's CSS-only `.featured` styling (most-recent gets brand
 * accent title) needs no JSX logic.
 */
import { useEffect, useState } from "react";
import blogData from "@/data/blog.json";

export interface BlogPost {
  id: string;
  page_id: string;
  page_slug: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Processed HTML from LPS-319's blog_html_processor (image dims, lazy
   *  load, h2 anchors, internal interlinks, tables de-styled). Inject via
   *  `dangerouslySetInnerHTML`. */
  body_html: string;
  category: string;
  read_time_minutes: number;
  /** Rehosted GCS URL when available, else the CG-provided original. */
  featured_image: string;
  author: string;
  tags: string[];
  /** ISO-8601 string, may be null for draft-state edge cases. */
  published_at: string | null;
  /** LPS-321 — ISO-8601 timestamp of the last write. Drives sitemap
   *  `<lastmod>` + JSON-LD `dateModified`. Optional for backward compat
   *  with older Django backends. */
  updated_at?: string | null;
  /** LPS-321 — deterministic meta description (first 160 chars of body,
   *  HTML-stripped) computed server-side. NOT the user-editable `excerpt`. */
  meta_description?: string;
  /** LPS-321 — inherits Page.noindex. When true the boilerplate excludes
   *  this post from sitemap entries and emits a robots noindex meta tag. */
  page_noindex?: boolean;
  /** LPS-953: optional workflow status for preview drafts.
 * Drafts appear only with include_drafts=true and are excluded from publish sync.
 */
  status?: "draft" | "published";
  /** Relative URL under the chosen page, always starting with `/blog/`.
   *  Examples: `/blog/why-x` (home page), `/services/blog/why-x` (named page). */
  post_path: string;
}

export interface BlogPageMeta {
  page_id: string;
  page_slug: string;
  page_name: string;
  post_count: number;
}

interface BlogData {
  version: number;
  pages_with_blog: BlogPageMeta[];
  posts: BlogPost[];
}

const data = blogData as BlogData;

/** All published posts on a given page, most-recent first. */
export function getPostsForPage(pageId: string): BlogPost[] {
  return data.posts.filter((p) => p.page_id === pageId);
}

/** Look up a single post by page + slug. Returns undefined if not found. */
export function getPostBySlug(pageId: string, slug: string): BlogPost | undefined {
  // Case-insensitive slug match: the router lowercases /blog/<slug> before the
  // lookup, so a post stored with an uppercase slug would otherwise be
  // unreachable ("Post not found"). Web slugs are case-insensitive by
  // convention; this also heals any legacy non-canonical slug without a rebuild.
  const target = (slug || "").toLowerCase();
  return data.posts.find(
    (p) => p.page_id === pageId && (p.slug || "").toLowerCase() === target,
  );
}

/** Pages where the project has at least one published post. */
export function getBlogPages(): BlogPageMeta[] {
  return data.pages_with_blog;
}

/** Is the given page configured to render the blog listing? */
export function hasBlogSection(pageId: string): boolean {
  return data.pages_with_blog.some((p) => p.page_id === pageId);
}

/** Page-meta lookup by id. */
export function getBlogPageMeta(pageId: string): BlogPageMeta | undefined {
  return data.pages_with_blog.find((p) => p.page_id === pageId);
}
export function isDraftPost(post: BlogPost): boolean {
  return post.status === "draft";
}

// ---------------------------------------------------------------------------
// Runtime live-data hook
// ---------------------------------------------------------------------------
// blog.json is baked into the JS bundle at build time. A user who loaded the
// site before a new publish has that stale bundle in memory. SPA navigation
// (Home → Blog) reads the in-memory module, not the network, so new posts
// never appear without a full page reload.
//
// blog-data.json is written to public/ by sync_blog_data() alongside
// src/data/blog.json, so Vite copies it into dist/ and rclone uploads it to
// GCS with Cache-Control: no-cache. Fetching it at component mount gives
// every SPA navigation fresh post data without a full reload.
//
// Module-level promise: one fetch per page load, shared across all BlogListing
// instances. Initialises to null so the first mount triggers the request.
let _liveBlogDataPromise: Promise<BlogData> | null = null;

function fetchLiveBlogData(): Promise<BlogData> {
  if (!_liveBlogDataPromise) {
    _liveBlogDataPromise = fetch(
      `${import.meta.env.BASE_URL}blog-data.json`,
      { cache: "no-cache" },
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d): BlogData => (d && Array.isArray(d.posts) ? d : (blogData as BlogData)))
      .catch((): BlogData => blogData as BlogData);
  }
  return _liveBlogDataPromise;
}

/**
 * Returns posts for `pageId`, initialising immediately from the static bundle
 * and updating after the live `blog-data.json` fetch resolves. Covers both:
 *  - SPA navigation (Home → Blog) where the bundle may predate the latest publish
 *  - Direct URL / refresh which already get a fresh bundle (hook is a no-op upgrade)
 */
export function usePostsForPage(pageId: string | null): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    pageId ? (blogData as BlogData).posts.filter((p) => p.page_id === pageId) : [],
  );

  useEffect(() => {
    if (!pageId) {
      setPosts([]);
      return;
    }
    // Show static bundle data instantly (avoids empty-flash while fetching).
    setPosts((blogData as BlogData).posts.filter((p) => p.page_id === pageId));
    // Then upgrade to live data.
    fetchLiveBlogData().then((data) => {
      setPosts(data.posts.filter((p) => p.page_id === pageId));
    });
  }, [pageId]);

  return posts;
}
