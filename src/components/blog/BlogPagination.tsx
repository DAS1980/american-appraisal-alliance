/**
 * BlogPagination (LPS-320, extracted from BlogListing for reuse by BlogPage — LPS-1411).
 *
 * URL-driven (?page=N) so SSR pre-renders each page independently. Rendered
 * only by the non-filtered listing view; interactive category/search filtering
 * shows its full result set unpaginated.
 */
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { buildPageHref } from "./blogPageUtils";

interface BlogPaginationProps {
  pathname: string;
  currentPage: number;
  totalPages: number;
}

export function BlogPagination({ pathname, currentPage, totalPages }: BlogPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const buttonBase =
    "inline-flex items-center justify-center min-w-10 h-10 px-3.5 rounded-full text-sm font-medium";
  const arrowBase = "text-muted-foreground border-0";
  const numberBase = "border border-border text-foreground";

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-12"
      aria-label="Blog pagination"
    >
      {isFirst ? (
        <span
          className={cn(buttonBase, arrowBase, "opacity-40 cursor-default")}
          aria-hidden="true"
        >
          ←
        </span>
      ) : (
        <Link
          to={buildPageHref(pathname, prevPage)}
          className={cn(buttonBase, arrowBase, "hover:text-foreground")}
          aria-label="Previous page"
        >
          ←
        </Link>
      )}

      {pages.map((p) =>
        p === currentPage ? (
          <span
            key={p}
            className={cn(
              buttonBase,
              "bg-foreground text-background border border-foreground",
            )}
            aria-current="page"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            to={buildPageHref(pathname, p)}
            className={cn(buttonBase, numberBase, "hover:text-foreground")}
          >
            {p}
          </Link>
        ),
      )}

      {isLast ? (
        <span
          className={cn(buttonBase, arrowBase, "opacity-40 cursor-default")}
          aria-hidden="true"
        >
          →
        </span>
      ) : (
        <Link
          to={buildPageHref(pathname, nextPage)}
          className={cn(buttonBase, arrowBase, "hover:text-foreground")}
          aria-label="Next page"
        >
          →
        </Link>
      )}
    </nav>
  );
}
