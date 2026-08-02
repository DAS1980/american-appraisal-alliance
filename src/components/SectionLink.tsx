import { forwardRef, AnchorHTMLAttributes, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * SectionLink - Anchor-based navigation for single-page landing pages
 * 
 * Use this for in-page section navigation (e.g., Header nav links).
 * For multi-page routing, use NavLink from react-router-dom instead.
 * 
 * Features:
 * - Smooth scrolling to sections with matching id
 * - Offset support for fixed headers
 * - Active state styling based on current hash
 * 
 * @example
 * // In Header component:
 * <SectionLink href="#features">Features</SectionLink>
 * <SectionLink href="#pricing" className="hover:text-primary">Pricing</SectionLink>
 * 
 * // Corresponding section:
 * <section id="features">...</section>
 */

interface SectionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target section id (must start with #) */
  href: string;
  /** Additional classes for active state */
  activeClassName?: string;
  /** Offset from top for fixed headers (default: 80px) */
  offset?: number;
}

const SectionLink = forwardRef<HTMLAnchorElement, SectionLinkProps>(
  ({ href, className, activeClassName, offset = 80, onClick, children, ...props }, ref) => {
    const isActive = typeof window !== "undefined" && window.location.hash === href;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Only handle anchor links
        if (href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.slice(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });

            // Update URL hash without jumping
            window.history.pushState(null, "", href);
          }
        }

        // Call original onClick if provided
        onClick?.(e);
      },
      [href, offset, onClick]
    );

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

SectionLink.displayName = "SectionLink";

export { SectionLink };
export type { SectionLinkProps };

