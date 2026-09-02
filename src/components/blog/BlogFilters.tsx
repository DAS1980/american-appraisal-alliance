/**
 * BlogFilters (LPS-1411).
 *
 * Search box + category pills for a blog listing. Fully controlled — the parent
 * (BlogPage) owns `active`/`query` state and does the filtering. Categories are
 * derived from the page's posts (see blogPageUtils.deriveCategories); "All" is
 * always first. Token-driven so the active pill matches the site's brand accent.
 */
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

export const ALL_CATEGORIES = "All";

interface BlogFiltersProps {
  /** Category labels including the leading "All". */
  categories: string[];
  active: string;
  query: string;
  onCategory: (category: string) => void;
  onQuery: (query: string) => void;
  className?: string;
}

export function BlogFilters({
  categories,
  active,
  query,
  onCategory,
  onQuery,
  className,
}: BlogFiltersProps) {
  const showSearch = true;
  const showPills = categories.length > 1;
  if (!showPills && !showSearch) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div className="relative w-full md:max-w-xs">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>

      {showPills ? (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
