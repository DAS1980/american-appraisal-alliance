/**
 * Pages Manifest Utilities
 * 
 * Provides client-side access to pages.manifest.json for navigation
 * and page metadata.
 */

// Type definitions for pages.manifest.json
export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  noindex: boolean;
  structuredDataType: string;
  structuredData: Record<string, unknown> | null;
}

export interface ManifestPage {
  id: string;
  name: string;
  slug: string;
  isHome: boolean;
  seo: PageSeo;
  sections: string[];
  inNavigation: boolean;
  filePath?: string;
  pageId?: string;
}

// Section registry types
export interface SectionRegistryEntry {
  file: string;
  description: string;
  props?: string[];
  usedOn: string[];
}

export interface LayoutEntry {
  file: string;
  description: string;
}

export interface PagesManifest {
  site: {
    name: string;
    domain: string;
    language: string;
    defaultSeo?: {
      titleTemplate?: string;
      ogImage?: string;
    };
  };
  pages: ManifestPage[];
  navigation: {
    header: string[];
    footer: string[];
  };
  sections: Record<string, SectionRegistryEntry>;
  layout?: {
    header?: LayoutEntry;
    footer?: LayoutEntry;
    pageLayout?: LayoutEntry;
  };
}

// Default manifest for development/fallback
const DEFAULT_MANIFEST: PagesManifest = {
  site: {
    name: 'My Website',
    domain: '',
    language: 'en',
  },
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '',
      isHome: true,
      seo: {
        title: 'Welcome',
        description: '',
        keywords: [],
        ogImage: '',
        canonicalUrl: '',
        noindex: false,
        structuredDataType: '',
        structuredData: null,
      },
      sections: [],
      inNavigation: true,
    },
  ],
  navigation: {
    header: ['home'],
    footer: ['home'],
  },
  sections: {},
};

// Cached manifest data
let cachedManifest: PagesManifest | null = null;

/**
 * Load the pages manifest.
 * 
 * In development, imports the manifest directly.
 * Caches the result for subsequent calls.
 */
export async function loadManifest(): Promise<PagesManifest> {
  if (cachedManifest) {
    return cachedManifest;
  }

  try {
    // Dynamic import of the manifest file
    // Vite handles this correctly in both dev and prod
    const response = await fetch('/pages.manifest.json');
    if (response.ok) {
      cachedManifest = await response.json();
      return cachedManifest!;
    }
  } catch (error) {
    console.warn('[manifest] Failed to load pages.manifest.json:', error);
  }

  // Fallback to default manifest
  cachedManifest = DEFAULT_MANIFEST;
  return cachedManifest;
}

/**
 * Get manifest synchronously (returns cached or default).
 * Use loadManifest() for guaranteed up-to-date data.
 */
export function getManifestSync(): PagesManifest {
  return cachedManifest || DEFAULT_MANIFEST;
}

/**
 * Get a page by its ID or slug.
 */
export function getPage(
  manifest: PagesManifest,
  idOrSlug: string
): ManifestPage | undefined {
  return manifest.pages.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug
  );
}

/**
 * Get the home page.
 */
export function getHomePage(manifest: PagesManifest): ManifestPage | undefined {
  return manifest.pages.find((p) => p.isHome);
}

/**
 * Get pages for header navigation.
 */
export function getHeaderNavigation(manifest: PagesManifest): ManifestPage[] {
  const headerPageIds = manifest.navigation.header;
  return headerPageIds
    .map((id) => manifest.pages.find((p) => p.id === id))
    .filter((p): p is ManifestPage => p !== undefined && p.inNavigation);
}

/**
 * Get pages for footer navigation.
 */
export function getFooterNavigation(manifest: PagesManifest): ManifestPage[] {
  const footerPageIds = manifest.navigation.footer;
  return footerPageIds
    .map((id) => manifest.pages.find((p) => p.id === id))
    .filter((p): p is ManifestPage => p !== undefined && p.inNavigation);
}

/**
 * Get the URL path for a page.
 */
export function getPagePath(page: ManifestPage): string {
  return page.isHome ? '/' : `/${page.slug}`;
}

/**
 * Get the full URL for a page (if domain is configured).
 */
export function getPageUrl(
  manifest: PagesManifest,
  page: ManifestPage
): string {
  const path = getPagePath(page);
  if (manifest.site.domain) {
    return `${manifest.site.domain}${path}`;
  }
  return path;
}

// =============================================================================
// Section Registry Utilities
// =============================================================================

/**
 * Get a section entry from the registry by name.
 */
export function getSection(
  manifest: PagesManifest,
  sectionName: string
): SectionRegistryEntry | undefined {
  return manifest.sections[sectionName];
}

/**
 * Get all sections used on a specific page.
 */
export function getSectionsForPage(
  manifest: PagesManifest,
  pageId: string
): Array<{ name: string } & SectionRegistryEntry> {
  const page = manifest.pages.find((p) => p.id === pageId);
  if (!page) return [];

  return page.sections
    .map((sectionName) => {
      const section = manifest.sections[sectionName];
      if (section) {
        return { name: sectionName, ...section };
      }
      return null;
    })
    .filter((s): s is { name: string } & SectionRegistryEntry => s !== null);
}

/**
 * Get all pages that use a specific section.
 */
export function getPagesUsingSection(
  manifest: PagesManifest,
  sectionName: string
): ManifestPage[] {
  const section = manifest.sections[sectionName];
  if (!section) return [];

  return section.usedOn
    .map((pageId) => manifest.pages.find((p) => p.id === pageId))
    .filter((p): p is ManifestPage => p !== undefined);
}

/**
 * Check if a section is shared (used on multiple pages).
 */
export function isSectionShared(
  manifest: PagesManifest,
  sectionName: string
): boolean {
  const section = manifest.sections[sectionName];
  return section ? section.usedOn.length > 1 : false;
}

/**
 * Get all available section names.
 */
export function getAllSectionNames(manifest: PagesManifest): string[] {
  return Object.keys(manifest.sections);
}

/**
 * Check if a section exists in the registry.
 */
export function sectionExists(
  manifest: PagesManifest,
  sectionName: string
): boolean {
  return sectionName in manifest.sections;
}

/**
 * Get section file path by name.
 */
export function getSectionFilePath(
  manifest: PagesManifest,
  sectionName: string
): string | undefined {
  return manifest.sections[sectionName]?.file;
}
