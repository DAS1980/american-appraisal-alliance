// Shared source citations for geographic service-area pages (11/24/2026).

/**
 * Standard Census citations used by geographic pages: the 2020 place-by-county
 * reference file and ACS 2020–2024 5-year housing tables (accessed via Census
 * Reporter, which republishes the Bureau's estimates without an API key).
 */
export function censusSources(geoId: string, placeLabel: string) {
  return [
    {
      label: "U.S. Census Bureau — 2020 place-by-county reference file, Texas",
      href: "https://www2.census.gov/geo/docs/reference/codes2020/place_by_cou/st48_tx_place_by_county2020.txt",
    },
    {
      label: `U.S. Census Bureau — ACS 2020–2024 5-year housing estimates for ${placeLabel} (via Census Reporter)`,
      href: `https://censusreporter.org/data/table/?table=B25034&geo_ids=${geoId}`,
    },
  ];
}
