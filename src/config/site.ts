/**
 * Site configuration
 * Primary production domain and base URL for all generated URLs and references.
 * Domain: https://americanappraisalalliance.com
 */
export const siteConfig = {
  name: "American Appraisal Alliance",
  /** Primary production base URL (no trailing slash) */
  url: "https://americanappraisalalliance.com",
  /** Bare domain authority */
  domain: "americanappraisalalliance.com",
  email: "info@americanappraisalalliance.com",
  phone: "(214) 555-0100",
  serviceArea: "Dallas–Fort Worth Metroplex",
} as const;

/** Named alias so callers can use SITE_CONFIG or siteConfig interchangeably */
export const SITE_CONFIG = siteConfig;

export type SiteConfig = typeof siteConfig;

/**
 * Builds an absolute URL for the given path using the primary production domain.
 * @param path - Relative path (e.g. "/core-appraisal-services")
 */
export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
