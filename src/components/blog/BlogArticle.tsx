/**
 * BlogArticle (LPS-320).
 *
 * Full-article page rendered when the route matches
 * `/<page-slug>/blog/<post-slug>/` (or `/blog/<post-slug>/` for home).
 *
 * Layout per mockup (gitlab.com/-/snippets/5987149), in this exact order:
 *
 *   Breadcrumb · Eyebrow · Title · Byline · Cover · Body · Prev/Next · Back-to-blog
 *
 * `body_html` is the processed HTML from blog_html_processor (image dims,
 * lazy loading, H2 anchor IDs, internal interlinks). It is sanitized
 * server-side by that pipeline's Step 0 (LPS-1053): <script>/<iframe>/<style>
 * subtrees dropped, on* event handlers stripped, javascript:/data: URLs
 * neutralized — so it is safe to inject via `dangerouslySetInnerHTML`.
 *
 * NOTE on internal links: LPS-319 may inject `<a href="/services/blog/...">`
 * into the body for related-post interlinking. The boilerplate's
 * `LinkInterceptor` (in App.tsx) only SPA-navigates to top-level
 * `knownPaths`, so these links currently trigger a full page reload.
 * Acceptable for v1; the article shells are SSR pre-rendered so the
 * reload is fast and SEO-clean.
 */
import { Link } from "react-router-dom";

import { getPostsForPage, isDraftPost, type BlogPost } from "@/lib/blog-data";
import { BlogPrevNext } from "./BlogPrevNext";

import "./blog-prose.css";

interface BlogArticleProps {
  /** Page id from pages.manifest.json — the blog page the article lives on. */
  pageId: string;
  /** Page slug — used to build the breadcrumb + back-to-blog link. Empty for home. */
  pageSlug: string;
  /** Page display name for the breadcrumb (e.g. "Blog", "Services"). */
  pageName: string;
  /** URL slug of the article. */
  postSlug: string;
}

function formatPublishedAt(iso: string | null): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/** "/services" for named pages, "" for home — drives the breadcrumb link + back link. */
function buildBackHref(pageSlug: string): string {
  return pageSlug ? `/${pageSlug}` : "/";
}

// LPS-1053: CG always authors a leading <h1> in body_html (confirmed against
// real payloads). Rendering both that and the article-header title h1 would
// produce two <h1>s with the same text — a duplicate-h1 SEO smell. We resolve
// it by ALWAYS rendering the header h1 (the single page heading, tagged for
// the visual editor as the title field) and stripping the body's leading h1.
// Earlier we did the reverse — suppressed the header h1 — but that left the
// visible heading inside the body wrapper tagged data-blog-field="body", so a
// visual retitle edited body_html and left BlogPost.title stale in listing
// cards / SEO. Keeping the header h1 means a retitle always hits the title
// fast-path.
const LEADING_H1_RE = /^\s*<h1\b[^>]*>[\s\S]*?<\/h1>/i;
function stripLeadingH1(html: string): string {
  return html.replace(LEADING_H1_RE, "");
}

// LPS-1052: CG sometimes embeds the featured image as the leading element of
// body_html. The template also renders `featured_image` as a hero, so the same
// image shows twice (a cropped hero + the in-body copy). When the body already
// leads with the featured image, suppress the hero and let the in-body image
// stand — it renders at its natural size inside the prose column.
// Tolerant leading-image match: skip any nesting of common wrappers CG /
// blog_html_processor may emit (figure/div/picture/span/p), then the first
// <img>, with double, single, OR unquoted src. A strict double-quote/figure-only
// match silently missed the leading image when the processed HTML varied — the
// hero then re-rendered on top of the identical in-body image (LPS-1052/LPS-1096).
const LEADING_IMG_SRC_RE = /^\s*(?:<(?:p|div|figure|picture|span)\b[^>]*>\s*)*<img\b[^>]*\bsrc=(?:"([^"]+)"|'([^']+)'|([^\s"'>]+))/i;
function normalizeImgUrl(url: string): string {
  // Compare by the image's stable filename (the CA UUID), NOT the full URL: the
  // featured copy and the in-body copy of the SAME image can sit on different
  // hosts (CG-persistent vs the project's rehosted GCS bucket) and carry
  // different query/sizing params — the basename is the reliable identity.
  const clean = (url || "").split("?")[0].replace(/\/+$/, "").toLowerCase();
  const slash = clean.lastIndexOf("/");
  return slash >= 0 ? clean.slice(slash + 1) : clean;
}
function bodyLeadsWithFeaturedImage(html: string, featured: string): boolean {
  if (!featured) return false;
  const m = html.match(LEADING_IMG_SRC_RE);
  const src = m ? (m[1] ?? m[2] ?? m[3]) : "";
  return Boolean(src) && normalizeImgUrl(src) === normalizeImgUrl(featured);
}

export function BlogArticle({ pageId, pageSlug, pageName, postSlug }: BlogArticleProps) {
  const posts = getPostsForPage(pageId);
  // Case-insensitive: the router lowercases the URL before this lookup, so an
  // uppercase stored slug would never match ("Post not found"). Matches
  // getPostBySlug's normalization (blog-data.ts).
  const target = (postSlug || "").toLowerCase();
  const index = posts.findIndex((p) => (p.slug || "").toLowerCase() === target);
  const post: BlogPost | undefined = index === -1 ? undefined : posts[index];

  if (!post) {
    return (
      <div className="mx-auto max-w-[760px] px-4 md:px-8 py-24 text-center">
        <p className="text-muted-foreground">Post not found.</p>
        <Link
          to={buildBackHref(pageSlug)}
          className="inline-block mt-4 text-sm text-primary font-semibold tracking-[0.12em] uppercase"
        >
          ← Back to all posts
        </Link>
      </div>
    );
  }

  // posts are sorted most-recent first, so prev = newer (lower index)
  const prev = index > 0 ? posts[index - 1] : undefined;
  const next = index < posts.length - 1 ? posts[index + 1] : undefined;

  const publishedDate = formatPublishedAt(post.published_at);
  const backHref = buildBackHref(pageSlug);
  const hasCategory = Boolean(post.category);
  // Always render the header title h1; strip the body's leading h1 so there's
  // exactly one page heading (the title-tagged one). See LEADING_H1_RE note.
  const bodyHtml = stripLeadingH1(post.body_html);
  // LPS-1052: don't render the hero when the body already opens with the same
  // image — otherwise it appears twice (see bodyLeadsWithFeaturedImage note).
  const showFeaturedHero =
    Boolean(post.featured_image) &&
    !bodyLeadsWithFeaturedImage(bodyHtml, post.featured_image);

  return (
    <article>
      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <header className="max-w-[760px] mx-auto pt-20 pb-8">
          <nav
            className="text-sm text-muted-foreground mb-7"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link to={backHref} className="hover:text-foreground">
              {pageName}
            </Link>
          </nav>

          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="text-xs tracking-[0.2em] uppercase text-primary font-semibold">
              {hasCategory ? `${post.category} · ${post.read_time_minutes} min read` : `${post.read_time_minutes} min read`}
            </div>
            {/* LPS-953 — DRAFT pill. Only renders when post.status === 'draft';
                static GCS-published sites never carry drafts, so this is invisible
                in production builds. Kept inline with the eyebrow row so screenshot
                regressions on published articles produce a zero diff. */}
            {isDraftPost(post) && (
              <span
                data-testid="blog-draft-pill"
                className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-primary"
                title="This post is a draft. Say 'publish it' in chat when you're ready to go live."
              >
                Draft
              </span>
            )}
          </div>

          <h1
            data-blog-post-id={post.id}
            data-blog-field="title"
            className="font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight m-0 mb-6 text-foreground"
          >
            {post.title}
          </h1>

          <div className="text-sm text-muted-foreground pt-6 border-t border-border">
            {post.author && <span>By {post.author}</span>}
            {post.author && publishedDate && <span> · </span>}
            {publishedDate && <span>{publishedDate}</span>}
          </div>
        </header>
      </section>

      {showFeaturedHero && (
        <div className="max-w-[1040px] mx-auto px-4 md:px-8 mt-8 mb-14">
          <img
            data-blog-post-id={post.id}
            data-blog-field="featured_image"
            src={post.featured_image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-lg"
          />
        </div>
      )}

      <div
        data-blog-post-id={post.id}
        data-blog-field="body"
        className="blog-prose max-w-[720px] mx-auto px-2"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <BlogPrevNext prev={prev} next={next} />

      <div className="text-center my-14">
        <Link
          to={backHref}
          className="text-sm text-primary font-semibold tracking-[0.12em] uppercase"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
