// src/config/nav.ts
// Auto-generated from pages.manifest.json — do not edit manually.
// The groupNavItems() function enforces a hard cap of 6 top-level nav items.
// Any overflow is collected into a "More" dropdown group.
// LPS-1052: a Blog entry is always pinned above the overflow boundary so a
// newly-published blog never disappears under "More" on a 6+ page site.

export interface NavItem {
  label: string;
  to?: string;
  children?: NavItem[];
}

const MAX_NAV_ITEMS = 6;

function isBlog(item: NavItem): boolean {
  return item.label.trim().toLowerCase() === "blog";
}

function groupNavItems(items: NavItem[]): NavItem[] {
  if (items.length <= MAX_NAV_ITEMS) return items;

  const blogIndex = items.findIndex(isBlog);
  const nonBlog = blogIndex >= 0 ? items.filter((_, i) => i !== blogIndex) : items;
  const blog = blogIndex >= 0 ? items[blogIndex] : null;

  const slots = blog ? MAX_NAV_ITEMS - 2 : MAX_NAV_ITEMS - 1;
  const visible = nonBlog.slice(0, slots);
  const overflow = nonBlog.slice(slots);
  const pinned = blog ? [blog] : [];

  if (overflow.length === 0) {
    return [...visible, ...pinned];
  }
  return [...visible, ...pinned, { label: "More", children: overflow }];
}

const _rawNavItems: NavItem[] = [
  { label: "Core Appraisal Services", to: "/core-appraisal-services" },
  { label: "Valuation Updates & Reports", to: "/valuation-updates-reports" },
  { label: "Measurement & Analysis Services", to: "/measurement-analysis-services" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "More", children: [
    { label: "Desktop Appraisal", to: "/desktop-appraisal" },
    { label: "Exterior-Only (Drive-By) Appraisal", to: "/exterior-only-drive-by-appraisal" },
    { label: "Pre-Listing Appraisal", to: "/pre-listing-appraisal" },
    { label: "Pre-Purchase Appraisal", to: "/pre-purchase-appraisal" },
    { label: "Estate / Date of Death Appraisal", to: "/estate-date-of-death-appraisal" },
    { label: "PMI Removal Appraisal", to: "/pmi-removal-appraisal" },
    { label: "Market Value Update (1004D / Recertification)", to: "/market-value-update-1004d-recertification" },
    { label: "FHA/HUD Compliance Observation Report", to: "/fhahud-compliance-observation-report" },
    { label: "Property Measurement (ANSI Z765)", to: "/property-measurement-ansi-z765" },
    { label: "Gross Living Area (GLA) Certification", to: "/gross-living-area-gla-certification" },
  ] },
];

export const navItems: NavItem[] = groupNavItems(_rawNavItems);
