/**
 * useSeoMeta Hook
 * 
 * Updates document title and meta tags based on the current route
 * using SEO data from pages.manifest.json.
 * 
 * This ensures each page has the correct title and description
 * during SPA navigation.
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadManifest, type PagesManifest, type ManifestPage } from '@/lib/manifest';

/**
 * Find the current page based on the pathname.
 */
function findCurrentPage(manifest: PagesManifest, pathname: string): ManifestPage | undefined {
  // Normalize pathname (remove trailing slash except for root)
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  
  return manifest.pages.find((page) => {
    const pagePath = page.isHome ? '/' : `/${page.slug}`;
    return pagePath === normalizedPath;
  });
}

/**
 * Update meta tag content or create if it doesn't exist.
 */
function updateMetaTag(selector: string, content: string, attrName = 'content'): void {
  if (!content) return;
  
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  
  if (meta) {
    meta.setAttribute(attrName, content);
  } else {
    // Create the meta tag if it doesn't exist
    meta = document.createElement('meta');
    
    // Parse selector to set attributes
    if (selector.startsWith('meta[name=')) {
      const name = selector.match(/meta\[name="([^"]+)"\]/)?.[1];
      if (name) meta.setAttribute('name', name);
    } else if (selector.startsWith('meta[property=')) {
      const property = selector.match(/meta\[property="([^"]+)"\]/)?.[1];
      if (property) meta.setAttribute('property', property);
    }
    
    meta.setAttribute(attrName, content);
    document.head.appendChild(meta);
  }
}

/**
 * Hook that updates SEO meta tags based on the current route.
 * 
 * Usage:
 * ```tsx
 * function App() {
 *   useSeoMeta();
 *   return <Routes>...</Routes>;
 * }
 * ```
 */
export function useSeoMeta(): void {
  const location = useLocation();
  const [manifest, setManifest] = useState<PagesManifest | null>(null);

  // Load manifest on mount
  useEffect(() => {
    loadManifest().then(setManifest);
  }, []);

  // Update SEO meta tags when location or manifest changes
  useEffect(() => {
    if (!manifest) return;

    const currentPage = findCurrentPage(manifest, location.pathname);
    
    if (currentPage?.seo) {
      const { title, description, keywords, ogImage, canonicalUrl } = currentPage.seo;
      const siteName = manifest.site?.name ?? '';
      
      // Update document title
      if (title) {
        document.title = title;
      } else if (siteName) {
        // Fallback to site name with page name
        document.title = `${currentPage.name} | ${siteName}`;
      }
      
      // Update meta description
      if (description) {
        updateMetaTag('meta[name="description"]', description);
      }
      
      // Update keywords
      if (keywords && keywords.length > 0) {
        updateMetaTag('meta[name="keywords"]', keywords.join(', '));
      }
      
      // Update Open Graph tags
      if (title) {
        updateMetaTag('meta[property="og:title"]', title);
      }
      if (description) {
        updateMetaTag('meta[property="og:description"]', description);
      }
      if (ogImage) {
        updateMetaTag('meta[property="og:image"]', ogImage);
      }
      
      // Update Twitter Card tags
      if (title) {
        updateMetaTag('meta[name="twitter:title"]', title);
      }
      if (description) {
        updateMetaTag('meta[name="twitter:description"]', description);
      }
      
      // Update canonical URL
      if (canonicalUrl) {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (link) {
          link.href = canonicalUrl;
        } else {
          link = document.createElement('link');
          link.rel = 'canonical';
          link.href = canonicalUrl;
          document.head.appendChild(link);
        }
      }
    }
  }, [location.pathname, manifest]);
}

export default useSeoMeta;
