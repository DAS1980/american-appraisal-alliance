/**
 * BlogPrevNext (LPS-320).
 *
 * Prev/next neighbors for an article page. Posts are pre-sorted
 * most-recent first, so prev = newer (lower index) and next = older.
 *
 * Two-column grid (single column on mobile), uppercase label + title link
 * (inherits the site heading font, no hardcoded family), hover fade.
 */
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog-data";

interface BlogPrevNextProps {
  prev?: BlogPost;
  next?: BlogPost;
}

const linkBase =
  "block transition-opacity duration-150 hover:opacity-65";

export function BlogPrevNext({ prev, next }: BlogPrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="max-w-[760px] mx-auto mt-20 pt-8 px-2 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6"
      aria-label="Previous and next posts"
    >
      {prev ? (
        <Link to={prev.post_path} className={linkBase}>
          <div className="text-xs text-muted-foreground font-semibold mb-2 tracking-[0.12em] uppercase">
            ← Previous
          </div>
          <h4 className="font-semibold text-xl leading-[1.25] tracking-[-0.01em] m-0 text-foreground">
            {prev.title}
          </h4>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link to={next.post_path} className={cn(linkBase, "sm:text-right")}>
          <div className="text-xs text-muted-foreground font-semibold mb-2 tracking-[0.12em] uppercase">
            Next →
          </div>
          <h4 className="font-semibold text-xl leading-[1.25] tracking-[-0.01em] m-0 text-foreground">
            {next.title}
          </h4>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
