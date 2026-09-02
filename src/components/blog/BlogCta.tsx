/**
 * BlogCta (LPS-1411).
 *
 * On-brand call-to-action band rendered before the footer on a blog page. Copy
 * and links are prop-driven so the agent can feed site-specific text/targets
 * (e.g. "Get a Free Quote" → the contact page); the defaults are safe generics.
 * A target starting with "/" routes via React Router; anything else (tel:,
 * mailto:, https:) renders a plain anchor. Token-driven for brand inheritance.
 */
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BlogCtaProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Small reassurance line under the buttons (e.g. "Licensed & insured"). */
  note?: string;
  className?: string;
}

function CtaAction({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-border text-foreground hover:border-primary/50 hover:text-primary",
  );
  const inner = (
    <>
      {label}
      {variant === "primary" ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );
  return href.startsWith("/") ? (
    <Link to={href} className={classes}>{inner}</Link>
  ) : (
    <a href={href} className={classes}>{inner}</a>
  );
}

export function BlogCta({
  title = "Ready to get started?",
  subtitle,
  primaryLabel = "Get in touch",
  // Home always exists; the agent overrides with a contact/quote page when present.
  primaryHref = "/",
  secondaryLabel,
  secondaryHref,
  note,
  className,
}: BlogCtaProps) {
  return (
    <section
      className={cn(
        "border-t border-border/60 bg-gradient-to-b from-background to-primary/[0.06]",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-20 text-center">
        <h2 className="font-bold tracking-tight text-foreground text-3xl md:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {primaryLabel && primaryHref ? (
            <CtaAction href={primaryHref} label={primaryLabel} variant="primary" />
          ) : null}
          {secondaryLabel && secondaryHref ? (
            <CtaAction href={secondaryHref} label={secondaryLabel} variant="secondary" />
          ) : null}
        </div>

        {note ? <p className="mt-6 text-sm text-muted-foreground">{note}</p> : null}
      </div>
    </section>
  );
}
