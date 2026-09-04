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
 * 
 * Usage:
 * <PageLayout currentPage="about">
 *   <Header />
 *   <YourPageSections />
 *   <Footer />
 * </PageLayout>
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
  // Note: currentPage, hideHeader, hideFooter are kept for backward compatibility
  // but are no longer used. The agent creates Header/Footer as section components.
  
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {children}
    </div>
  );
}

export default PageLayout;
