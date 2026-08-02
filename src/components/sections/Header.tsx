import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, Contact, Home, Navigation } from "lucide-react";
import { NavDropdown, MobileNavItems } from "@/components/NavDropdown";
import { navItems } from "@/config/nav";
import { cn } from "@/lib/utils";

const Header = React.forwardRef<HTMLElement>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Track scroll for shadow enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      id="header"
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-primary border-b border-white/10",
        scrolled
          ? "shadow-[0_4px_24px_hsl(218_65%_14%/0.35)]"
          : "shadow-[0_2px_12px_hsl(218_65%_14%/0.18)]"
      )}
    >
      {/* Thin gold accent bar at the very top */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
        aria-hidden="true"
      />

      <nav
        className="container max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16 md:h-18"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="American Appraisal Alliance — Home"
        >
          {/* Monogram badge */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-md font-bold text-sm select-none shrink-0 transition-transform duration-200 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
              color: "hsl(218 65% 14%)",
            }}
            aria-hidden="true"
          >
            AAA
          </div>

          {/* Wordmark */}
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className="font-bold text-white tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", lineHeight: 1.15 }}
            >
              American Appraisal Alliance
            </span>
            <span
              className="text-white/55 tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em" }}
            >
              DFW Certified Appraisals
            </span>
          </div>

          {/* Short label on very small screens */}
          <span
            className="sm:hidden font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem" }}
          >
            AAA
          </span>
        </Link>

        {/* ── Desktop Navigation ── */}
        <div className="hidden lg:flex flex-1 justify-center px-6">
          <NavDropdown
            items={navItems}
            className="flex items-center gap-1"
            linkClassName="text-sm font-medium text-white/85 hover:text-white px-3 py-1.5 rounded transition-colors duration-150 hover:bg-white/8"
          />
        </div>

        {/* ── Desktop CTA + Mobile Toggle ── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Phone number — desktop only */}
          <a
            href="tel:+14699364240"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-white/75 hover:text-white transition-colors duration-150 px-2 py-1.5 rounded hover:bg-white/8 whitespace-nowrap"
            aria-label="Call American Appraisal Alliance at (469) 936-4240"
          >
            <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(42 92% 58%)" }} />
            (469) 936-4240
          </a>

          {/* "Contact" link — desktop only, small text link */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex text-sm font-medium text-white/75 hover:text-white transition-colors duration-150 px-2 py-1.5 rounded hover:bg-white/8"
          >
            Contact
          </Link>

          {/* Primary CTA — Request an Appraisal */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex font-semibold px-4 py-2 text-sm rounded-md transition-all duration-200 hover:brightness-110 active:scale-95 shadow-[var(--shadow-gold)] whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
              color: "hsl(218 65% 14%)",
              border: "none",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Link to="/request">Request an Appraisal</Link>
          </Button>

          {/* Mobile hamburger — only when navItems exist */}
          {navItems.length > 0 && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-white/85 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Open navigation menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[340px] p-0 border-0 flex flex-col"
                style={{ background: "hsl(218 65% 14%)" }}
              >
                {/* Sheet header */}
                <div
                  className="flex items-center gap-3 px-5 py-4 border-b"
                  style={{ borderColor: "hsl(218 50% 24%)" }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded font-bold text-xs"
                    style={{
                      background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                      color: "hsl(218 65% 14%)",
                    }}
                    aria-hidden="true"
                  >
                    AAA
                  </div>
                  <div className="flex flex-col leading-none">
                    <span
                      className="font-bold text-white text-sm"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      American Appraisal Alliance
                    </span>
                    <span
                      className="text-white/45 uppercase tracking-widest"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem" }}
                    >
                      DFW Certified Appraisals
                    </span>
                  </div>
                </div>

                {/* Mobile nav links */}
                <nav
                  className="flex flex-col flex-1 overflow-y-auto px-3 py-3 gap-0.5"
                  aria-label="Mobile navigation"
                >
                  <MobileNavItems
                    items={navItems}
                    onNavigate={() => setIsOpen(false)}
                    linkClassName="text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-md px-3 py-2.5 transition-colors"
                  />

                  {/* Contact link in mobile menu */}
                  <Link
                    to="/contact"
                    className="text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 rounded-md px-3 py-2.5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>

                </nav>

                {/* Mobile CTA */}
                <div
                  className="px-4 py-4 border-t"
                  style={{ borderColor: "hsl(218 50% 24%)" }}
                >
                  <Button
                    asChild
                    className="w-full font-semibold text-sm py-2.5 rounded-md transition-all duration-200 hover:brightness-110"
                    style={{
                      background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                      color: "hsl(218 65% 14%)",
                      border: "none",
                    }}
                  >
                    <Link to="/request" onClick={() => setIsOpen(false)}>
                      Request an Appraisal
                    </Link>
                  </Button>

                  <p
                    className="text-center text-white/40 mt-2.5"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem" }}
                  >
                    USPAP-Compliant · DFW Metroplex
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
