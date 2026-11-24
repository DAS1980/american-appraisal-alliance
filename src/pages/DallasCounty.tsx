import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { CityHero, CitySection, CityClosingCta, FactTable, SourceList } from "@/components/service-areas/CityPageKit";

const guides = [
  { to: "/service-areas/dallas-county/addison/", city: "Addison", note: "A mostly multifamily housing mix and condo/townhome comparables." },
  { to: "/service-areas/dallas-county/north-dallas/", city: "North Dallas", note: "Confirming jurisdiction, county and zoning in northern Dallas." },
  { to: "/service-areas/dallas-county/richardson/", city: "Richardson", note: "Silver Line stations, CityLine zoning and the Innovation Quarter." },
];

/**
 * Dallas County regional page (11/24/2026). Emphasis: the county's older,
 * more varied housing stock compared with its northern neighbors, and cities
 * that reach across county lines. Facts: ACS 2020–2024 county estimates,
 * Census 2020 place-by-county file.
 */
const DallasCounty = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-dallas-county">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="dallas-county-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Dallas County" },
            ]}
            eyebrow="Dallas County, Texas"
            title="Dallas County Home Appraisals"
          >
            <p>
              Dallas County’s housing is older and more varied than that of the counties to its north, with a large
              share of homes built before 1980 and a large share in multifamily buildings. That variety makes property
              type, era and renovation the first questions in many Dallas County appraisals.
            </p>
          </CityHero>

          <CitySection id="dallas-county-profile" heading="An older and more varied housing stock">
            <FactTable
              caption="Dallas County housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Median year built", "1983"],
                ["Homes built before 1980", "About 45%"],
                ["Homes built 2010 or later", "About 14%"],
                ["Single-family detached", "About 52%"],
                ["Homes in buildings of 5 or more units", "About 37%"],
              ]}
            />
            <p>
              By comparison, Census estimates put the median year built at 2003 in both Collin and Denton counties.
              Within Dallas County, neighboring areas can differ sharply: an older detached home, a townhome and a
              condominium unit each belong to a different market, and two houses of the same age can differ widely in
              updates. The appraiser filters first by property type and era, then by location and condition.
            </p>
          </CitySection>

          <CitySection id="dallas-county-lines" heading="City and county lines" tone="muted">
            <p>
              The U.S. Census Bureau’s 2020 place-by-county reference file shows that several cities in Dallas County
              extend beyond it: the City of Dallas reaches into Collin, Denton, Kaufman and Rockwall counties,
              Richardson into Collin County, Carrollton into Collin and Denton counties, and Lewisville into Denton
              County. A city name alone does not establish the county. The parcel record does — and with it the
              appraisal district responsible for tax valuation.
            </p>
          </CitySection>

          <CitySection id="dallas-county-guides" heading="Dallas County appraisal guides">
            <ul className="!list-none !pl-0 grid gap-4 sm:grid-cols-2">
              {guides.map((g) => (
                <li key={g.to} className="rounded-lg border border-slate-200 p-5 hover:border-[hsl(42_88%_48%)] transition-colors">
                  <Link to={g.to} className="text-lg font-semibold !no-underline">
                    {g.city}
                  </Link>
                  <p className="mt-2 text-sm text-slate-600">{g.note}</p>
                </li>
              ))}
            </ul>
            <p>
              Carrollton and Lewisville, which also include land in Dallas County, have guides under{" "}
              <Link to="/service-areas/denton-county/">Denton County</Link>.
            </p>
          </CitySection>

          <CityClosingCta id="dallas-county-cta" heading="Request a Dallas County appraisal">
            <p>
              Share the property address, its type and the purpose of the appraisal. We will confirm the property’s
              jurisdiction and follow up about scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <SourceList
            checked="November 24, 2026"
            sources={[
              { label: "U.S. Census Bureau — 2020 place-by-county reference file, Texas", href: "https://www2.census.gov/geo/docs/reference/codes2020/place_by_cou/st48_tx_place_by_county2020.txt" },
              { label: "U.S. Census Bureau — ACS 2020–2024 5-year housing estimates for Dallas County (via Census Reporter)", href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US48113" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

DallasCounty.displayName = "DallasCounty";

export default DallasCounty;
