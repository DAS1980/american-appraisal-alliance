/**
 * Site configuration
 * Primary production domain and base URL for all generated URLs and references.
 * Domain: https://americanappraisalalliance.com
 *
 * Business contact details and approved business statements live here so
 * every component reads the same owner-confirmed values (confirmed
 * 11/24/2026). Change them here — never hard-code them in components.
 */
export const siteConfig = {
  name: "American Appraisal Alliance",
  /** Legal entity that operates the business (DBA: American Appraisal Alliance) */
  legalName: "JAS Appraisal Services LLC",
  /** Primary production base URL (no trailing slash) */
  url: "https://americanappraisalalliance.com",
  /** Bare domain authority */
  domain: "americanappraisalalliance.com",

  /** Business telephone — display format */
  phone: "(469) 936-4240",
  /** Business telephone — tel: link */
  phoneHref: "tel:+14699364240",

  /** Appraisal requests and order-related inquiries */
  ordersEmail: "orders@aaarea.net",
  /** General website inquiries, customer support, and privacy inquiries */
  supportEmail: "support@aaarea.net",

  hours: "Monday–Friday, 8:00 AM–5:00 PM Central Time",
  hoursShort: "Mon–Fri, 8:00 AM–5:00 PM CT",

  /** Service-area business — no physical address is published. */
  serviceArea: "Dallas–Fort Worth metropolitan area",
  serviceAreaStatement: "Proudly serving the Dallas–Fort Worth metropolitan area.",
} as const;

/** Owner-approved business statements (11/24/2026). */
export const businessStatements = {
  license: "Texas Certified Residential Real Estate Appraiser — License No. 1324410-CR",
  licenseTitle: "Texas Certified Residential Real Estate Appraiser",
  licenseNumber: "1324410-CR",
  experience: "Providing professional real estate appraisal services since 1986.",
  experienceShort: "Serving Clients Since 1986",
  professionalServices:
    "Independent, professional real estate appraisals for lenders, attorneys, homeowners, and real estate professionals.",
  professionalServicesShort: "Independent & Professional",
  response: "We respond to appraisal requests within one business day.",
  scheduling:
    "Scheduling is subject to availability, property location, and assignment requirements.",
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
