/**
 * BlogPostCard (LPS-320).
 *
 * Single card in the blog listing grid. Matches the mockup at
 * gitlab.com/-/snippets/5987149:
 *
 *   - Rounded 4:3 image
 *   - CATEGORY · X MIN READ eyebrow (brand accent caps when category
 *     is present, muted-only when absent)
 *   - Title in the site's heading font (inherits, no hardcoded family)
 *   - 2-3 line excerpt
 *
 * The `featured` variant (used for the most-recent post in a listing —
 * always the first card since posts are pre-sorted by Django) renders
 * the title in the brand accent color.
 *
 * All colors / fonts / radii / spacing resolve via Tailwind to the
 * site's CSS-variable theme tokens — no hardcoded styles.
 */
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { isDraftPost, type BlogPost } from "@/lib/blog-data";

interface BlogPostCardProps {
  post: BlogPost;
  /** When true, renders the title in the brand accent color (most-recent post). */
  featured?: boolean;
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const hasCategory = Boolean(post.category);
  const metaBase =
    "text-xs tracking-[0.2em] uppercase font-semibold mb-3.5 min-h-[14px]";

  return (
    <Link
      to={post.post_path}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
    >
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-6">
        {post.featured_image ? (
          <img
            data-blog-post-id={post.id}
            data-blog-field="featured_image"
            src={post.featured_image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full bg-muted" aria-hidden="true" />
        )}
        {/* LPS-953 — DRAFT pill in the upper-right of the card image
            when the post is still status='draft'. Only renders against
            the agent's preview-side sync (include_drafts=true); the
            static GCS site's blog.json never carries drafts so this is
            invisible to published visitors. */}
        {isDraftPost(post) && (
          <span
            data-testid="blog-card-draft-pill"
            className="absolute top-3 right-3 inline-flex items-center rounded-full border border-primary/40 bg-background/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-primary shadow-sm"
            title="Draft — preview only, not live yet"
          >
            Draft
          </span>
        )}
      </div>

      {hasCategory ? (
        <div className={metaBase}>
          <span className="text-primary">{post.category}</span>
          <span className="text-muted-foreground mx-1.5" aria-hidden="true">
            ·
          </span>
          <span className="text-muted-foreground">
            {post.read_time_minutes} min read
          </span>
        </div>
      ) : (
        <div className={cn(metaBase, "text-muted-foreground")}>
          {post.read_time_minutes} min read
        </div>
      )}

      <h3
        className={cn(
          "font-semibold text-xl leading-snug tracking-tight mb-3 transition-colors duration-150",
          featured ? "text-primary" : "text-foreground group-hover:text-primary",
        )}
      >
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="text-base leading-[1.55] text-foreground/85 max-w-[560px] m-0">
          {post.excerpt}
        </p>
      )}
    </Link>
  );
}
