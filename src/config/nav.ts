// src/config/nav.ts
// Auto-generated from pages.manifest.json — do not edit manually.
// The groupNavItems() function enforces a hard cap of 7 top-level nav items.
// Any overflow is collected into a "More" dropdown group.
// LPS-1052: a Blog entry is always pinned above the overflow boundary so a
// newly-published blog never disappears under "More" on a 6+ page site.
// LPS-1704: the label is resolved from the blog page's manifest entry, so a
// renamed hub ("Resources") keeps the pin.

export interface NavItem {
  label: string;
  to?: string;
  children?: NavItem[];
}

const MAX_NAV_ITEMS = 7;
const BLOG_NAV_PATH = "/blog/";

function isBlog(item: NavItem): boolean {
  return item.to === BLOG_NAV_PATH;
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
  { label: "Appraisal Services", to: "/core-appraisal-services/" },
  { label: "Valuation Services", to: "/valuation-updates-reports/" },
  { label: "Measurement", to: "/measurement-analysis-services/" },
  { label: "Service Areas", children: [
    { label: "All Service Areas", to: "/service-areas/" },
    { label: "Collin County", to: "/service-areas/collin-county/", children: [
      { label: "Allen", to: "/service-areas/collin-county/allen/" },
      { label: "Celina", to: "/service-areas/collin-county/celina/" },
      { label: "Frisco", to: "/service-areas/collin-county/frisco/" },
      { label: "McKinney", to: "/service-areas/collin-county/mckinney/" },
      { label: "Plano", to: "/service-areas/collin-county/plano/" },
      { label: "Prosper", to: "/service-areas/collin-county/prosper/" },
    ] },
    { label: "Dallas County", to: "/service-areas/dallas-county/", children: [
      { label: "Addison", to: "/service-areas/dallas-county/addison/" },
      { label: "North Dallas", to: "/service-areas/dallas-county/north-dallas/" },
      { label: "Richardson", to: "/service-areas/dallas-county/richardson/" },
    ] },
    { label: "Denton County", to: "/service-areas/denton-county/", children: [
      { label: "Aubrey", to: "/service-areas/denton-county/aubrey/" },
      { label: "Carrollton", to: "/service-areas/denton-county/carrollton/" },
      { label: "Lewisville", to: "/service-areas/denton-county/lewisville/" },
      { label: "Little Elm", to: "/service-areas/denton-county/little-elm/" },
      { label: "The Colony", to: "/service-areas/denton-county/the-colony/" },
    ] },
  ] },
  { label: "About Us", to: "/about/" },
  { label: "Appraisal Insights", to: "/blog/" },
  { label: "More", children: [
    { label: "Contact", to: "/contact/" },
    { label: "Desktop Appraisal", to: "/desktop-appraisal/" },
    { label: "Exterior-Only (Drive-By) Appraisal", to: "/exterior-only-drive-by-appraisal/" },
    { label: "Pre-Listing Appraisal", to: "/pre-listing-appraisal/" },
    { label: "Pre-Purchase Appraisal", to: "/pre-purchase-appraisal/" },
    { label: "Estate / Date of Death Appraisal", to: "/estate-date-of-death-appraisal/" },
    { label: "PMI Removal Appraisal", to: "/pmi-removal-appraisal/" },
    { label: "Market Value Update (1004D / Recertification)", to: "/market-value-update-1004d-recertification/" },
    { label: "FHA/HUD Compliance Observation Report", to: "/fhahud-compliance-observation-report/" },
    { label: "Property Measurement (ANSI Z765)", to: "/property-measurement-ansi-z765/" },
    { label: "Gross Living Area (GLA) Certification", to: "/gross-living-area-gla-certification/" },
  ] },
];

export const navItems: NavItem[] = groupNavItems(_rawNavItems);
