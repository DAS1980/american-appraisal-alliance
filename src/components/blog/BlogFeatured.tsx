/**
 * BlogFeatured (LPS-1411).
 *
 * The latest post rendered large — image on one side, meta/title/excerpt on the
 * other — matching the "featured" treatment on reference blog pages. The image
 * fills its half edge-to-edge (the card has no outer padding; only the text
 * column is padded), so it covers its container instead of floating inside a
 * gutter. Reuses `post.post_path` routing so it's consistent with the grid.
 */
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { isDraftPost, type BlogPost } from "@/lib/blog-data";
import { formatPostDate } from "./blogPageUtils";

interface BlogFeaturedProps {
  post: BlogPost;
  className?: string;
}

export function BlogFeatured({ post, className }: BlogFeaturedProps) {
  const date = formatPostDate(post.published_at);

  return (
    <Link
      to={post.post_path}
      className={cn(
        "group grid overflow-hidden rounded-2xl border border-border/70 bg-card md:grid-cols-2",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <div className="relative min-h-[240px] bg-muted md:min-h-[340px]">
        {post.featured_image ? (
          <img
            data-blog-post-id={post.id}
            data-blog-field="featured_image"
            src={post.featured_image}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
          {isDraftPost(post) ? "Draft" : "Featured"}
        </span>
      </div>

      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
          {post.category ? <span className="text-primary">{post.category}</span> : null}
          {post.category ? (
            <span className="text-muted-foreground" aria-hidden="true">·</span>
          ) : null}
          <span className="text-muted-foreground">{post.read_time_minutes} min read</span>
        </div>

        <h2 className="font-bold leading-tight tracking-tight text-foreground text-2xl md:text-3xl lg:text-4xl transition-colors group-hover:text-primary">
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="mt-4 line-clamp-3 text-base leading-relaxed text-foreground/80 md:text-lg">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          {date ? <span className="text-sm text-muted-foreground">{date}</span> : <span />}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
