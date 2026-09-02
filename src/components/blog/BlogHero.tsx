/**
 * BlogHero (LPS-1411).
 *
 * On-brand hero for a dedicated blog page: eyebrow + large page-name title +
 * subtitle. All colors/type/spacing resolve to the site's CSS-variable theme
 * tokens (no hardcoded families or hexes) so it inherits each project's brand.
 * The subtle brand-tinted gradient uses `--primary` at low alpha so it reads on
 * both light and dark themes.
 */
import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

interface BlogHeroProps {
  /** Small label above the title. Empty string hides it. */
  eyebrow?: string;
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  className?: string;
}

export function BlogHero({ eyebrow = "Blog", title, subtitle, className }: BlogHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60",
        "bg-gradient-to-b from-primary/[0.07] via-background to-background",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-16 md:py-24 text-center">
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-5 font-bold tracking-tight text-foreground text-4xl sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
