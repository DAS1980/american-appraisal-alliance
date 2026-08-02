/**
 * PageLayout Component
 *
 * Structural wrapper that provides consistent layout structure across all pages.
 * This is a MINIMAL wrapper - it does NOT include header/footer.
 *
 * Header and Footer are created as section components by the agent
 * and included in the page content directly. This ensures:
 * 1. Consistent branding (agent-designed header/footer)
 * 2. No duplicate headers/footers
 * 3. Clean separation of concerns
 */

import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

/** Production domain used for canonical and og:url tags — sourced from siteConfig */
const PRODUCTION_DOMAIN = siteConfig.url; // https://americanappraisalalliance.com

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  /** Current page ID for navigation highlighting (passed to children via context if needed) */
  currentPage?: string;
  /** @deprecated No longer used - header/footer are always provided by page sections */
  hideHeader?: boolean;
  /** @deprecated No longer used - header/footer are always provided by page sections */
  hideFooter?: boolean;
}

export function PageLayout({
  children,
  className,
  currentPage: _currentPage,
  hideHeader: _hideHeader,
  hideFooter: _hideFooter,
}: PageLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    // Build the canonical URL for the current page using the production domain
    const path = location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '');
    const canonicalUrl = `${PRODUCTION_DOMAIN}${path}`;

    // Update or create <link rel="canonical">
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Update or create <meta property="og:url">
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    } else {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.setAttribute('content', canonicalUrl);
      document.head.appendChild(ogUrl);
    }
  }, [location.pathname]);

  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {children}
    </div>
  );
}

export default PageLayout;
