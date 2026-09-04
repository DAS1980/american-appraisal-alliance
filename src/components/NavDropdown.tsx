import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import type { NavItem } from "@/config/nav";

/**
 * A single row inside an open dropdown panel. A leaf item (no `children`)
 * renders as a plain link. An item WITH `children` (e.g. a county exposing
 * its cities) renders as a link that ALSO opens a nested flyout submenu to
 * the right on hover — the county name stays clickable and still navigates
 * to its own hub page.
 */
function NavFlyoutRow({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (!item.children?.length) {
    return (
      <Link
        to={item.to!}
        onClick={onNavigate}
        className="block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap"
      >
        {item.label}
      </Link>
    );
  }

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between gap-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
        {item.to ? (
          <Link to={item.to} onClick={onNavigate} className="flex-1 whitespace-nowrap">
            {item.label}
          </Link>
        ) : (
          <span className="flex-1 whitespace-nowrap">{item.label}</span>
        )}
        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      </div>

      {open && (
        <div className="absolute top-0 left-full ml-1 min-w-[10rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50 animate-in fade-in-0 zoom-in-95">
          {item.children.map((child) => (
            <NavFlyoutRow key={child.to ?? child.label} item={child} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

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
      {item.to ? (
        // LPS-850: parent page is clickable; chevron toggles the submenu.
        <span className={cn(linkClassName, "inline-flex items-center gap-1")}>
          <Link to={item.to}>{item.label}</Link>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center cursor-pointer"
            aria-expanded={open}
            aria-haspopup="true"
            aria-label={`Toggle ${item.label} submenu`}
          >
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>
        </span>
      ) : (
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
      )}

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[12rem] max-h-[70vh] overflow-visible rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50 animate-in fade-in-0 zoom-in-95">
          {item.children?.map((child) => (
            <NavFlyoutRow key={child.to ?? child.label} item={child} onNavigate={() => setOpen(false)} />
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

/**
 * A collapsible accordion group for mobile nav. Recurses for a second level
 * (e.g. a county row exposing its cities) — `depth > 0` rows use the same
 * muted sub-item style as existing leaf links instead of the top-level
 * `linkClassName`, so nesting reads as a sub-level without a redesign.
 */
function MobileNavGroup({
  item,
  linkClassName,
  onNavigate,
  depth = 0,
}: {
  item: NavItem;
  linkClassName?: string;
  onNavigate?: () => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Collapse on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const rowClassName = depth === 0
    ? cn(
        "flex w-full items-center justify-between rounded-md px-3 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground",
        linkClassName
      )
    : "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {item.to ? (
        // LPS-850: parent page is a tappable link; chevron toggles children.
        <div className={rowClassName}>
          <Link to={item.to} onClick={onNavigate} className="flex-1">
            {item.label}
          </Link>
          <CollapsibleTrigger
            className="cursor-pointer pl-2"
            aria-label={`Toggle ${item.label} submenu`}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
        </div>
      ) : (
        <CollapsibleTrigger className={cn(rowClassName, "cursor-pointer")}>
          {item.label}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
      )}
      <CollapsibleContent>
        <div className="ml-3 border-l border-border pl-3 mt-1 flex flex-col gap-0.5">
          {item.children?.map((child) =>
            child.children?.length ? (
              <MobileNavGroup
                key={child.to ?? child.label}
                item={child}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            ) : (
              <Link
                key={child.to}
                to={child.to!}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {child.label}
              </Link>
            )
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default NavDropdown;
