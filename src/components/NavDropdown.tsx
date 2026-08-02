import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import type { NavItem } from "@/config/nav";

/** A single dropdown group for items with `children`. */
function NavDropdownGroup({
  item,
  linkClassName,
}: {
  item: NavItem;
  linkClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          linkClassName,
          "inline-flex items-center gap-1 cursor-pointer"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[12rem] max-h-[70vh] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50 animate-in fade-in-0 zoom-in-95">
          {item.children?.map((child) => (
            <Link
              key={child.to}
              to={child.to!}
              onClick={() => setOpen(false)}
              className="block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * NavDropdown — Renders navigation items with dropdown support.
 *
 * Renders flat items as `<Link>` and items with `children` as dropdown groups.
 * The grouping/capping logic lives in `nav.ts` (deterministic, runs at import
 * time), so `navItems` is always pre-capped before this component sees it.
 *
 * Usage in Header.tsx:
 * ```tsx
 * import { NavDropdown } from "@/components/NavDropdown";
 * import { navItems } from "@/config/nav";
 *
 * <NavDropdown items={navItems} linkClassName="text-sm font-medium hover:text-primary" />
 * ```
 */
export function NavDropdown({
  items,
  className,
  linkClassName,
}: {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {items.map((item) =>
        item.children ? (
          <NavDropdownGroup
            key={item.label}
            item={item}
            linkClassName={linkClassName}
          />
        ) : (
          <Link key={item.to} to={item.to!} className={linkClassName}>
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

/**
 * MobileNavItems — Renders navigation items for mobile hamburger menus.
 *
 * Flat items render as links. Items with `children` render as collapsible
 * accordion groups (tap to expand/collapse). Designed to be placed inside
 * a Sheet or sidebar mobile menu.
 *
 * Usage in Header.tsx (inside mobile menu):
 * ```tsx
 * import { MobileNavItems } from "@/components/NavDropdown";
 * import { navItems } from "@/config/nav";
 *
 * <Sheet>
 *   <SheetContent>
 *     <MobileNavItems
 *       items={navItems}
 *       onNavigate={() => setIsOpen(false)}
 *       linkClassName="text-base font-medium"
 *     />
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export function MobileNavItems({
  items,
  className,
  linkClassName,
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  /** Called after a link is clicked — use to close the mobile menu. */
  onNavigate?: () => void;
}) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {items.map((item) =>
        item.children ? (
          <MobileNavGroup
            key={item.label}
            item={item}
            linkClassName={linkClassName}
            onNavigate={onNavigate}
          />
        ) : (
          <Link
            key={item.to}
            to={item.to!}
            onClick={onNavigate}
            className={cn(
              "block rounded-md px-3 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground",
              linkClassName
            )}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

/** A collapsible accordion group for mobile nav. */
function MobileNavGroup({
  item,
  linkClassName,
  onNavigate,
}: {
  item: NavItem;
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Collapse on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
          linkClassName
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-3 border-l border-border pl-3 mt-1 flex flex-col gap-0.5">
          {item.children?.map((child) => (
            <Link
              key={child.to}
              to={child.to!}
              onClick={onNavigate}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default NavDropdown;
