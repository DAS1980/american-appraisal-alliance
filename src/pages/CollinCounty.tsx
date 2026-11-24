import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { CityHero, CitySection, CityClosingCta, FactTable, SourceList } from "@/components/service-areas/CityPageKit";

const guides = [
  { to: "/service-areas/collin-county/allen/", city: "Allen", note: "Neighborhood plat eras and housing types from the city’s own map." },
  { to: "/service-areas/collin-county/celina/", city: "Celina", note: "A new-construction market, city vs. ETJ, and the historic square." },
  { to: "/service-areas/collin-county/frisco/", city: "Frisco", note: "Two counties, 200+ HOAs and the Rail District." },
  { to: "/service-areas/collin-county/mckinney/", city: "McKinney", note: "Historic designations, annexation and downtown timelines." },
  { to: "/service-areas/collin-county/plano/", city: "Plano", note: "Preserves, heritage districts and rental registration." },
  { to: "/service-areas/collin-county/prosper/", city: "Prosper", note: "A two-county town built mostly since 2010." },
];

/**
 * Collin County regional page (11/24/2026). Emphasis: a county-level housing
 * profile, the contrast between established and newly built cities, and cities
 * that cross county lines. Facts: ACS 2020–2024 county and place estimates,
 * Census 2020 place-by-county file.
 */
const CollinCounty = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-collin-county">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="collin-county-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Collin County" },
            ]}
            eyebrow="Collin County, Texas"
            title="Collin County Home Appraisals"
          >
            <p>
              Collin County holds some of the most established suburbs north of Dallas and some of its newest housing
              markets, often a short drive apart. Appraisals here depend on recognizing which kind of market a property
              belongs to — and on confirming which county a property is actually in.
            </p>
          </CityHero>

          <CitySection id="collin-county-profile" heading="A county of newer homes — unevenly distributed">
            <FactTable
              caption="Collin County housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Median year built", "2003"],
                ["Homes built 2010 or later", "About 33%"],
                ["Homes built before 1980", "About 10%"],
                ["Single-family detached", "About 68%"],
                ["Owner-occupied", "About 65%"],
              ]}
            />
            <p>
              The county average blends very different cities. Census estimates put the median year built at 2003 in
              Allen, but 2014 in Prosper and 2015 in Celina, where most homes date from 2010 or later. In the older
              markets, renovation and condition drive much of the difference between sales; in the newest, builder
              sales, lot premiums and incentives require the closest reading. Comparable searches therefore begin in
              the subject’s own city and subdivision.
            </p>
          </CitySection>

          <CitySection id="collin-county-lines" heading="Cities that cross the county line" tone="muted">
            <p>
              According to the U.S. Census Bureau’s 2020 place-by-county reference file, Frisco, Plano, Prosper and
              Celina each extend into Denton County as well as Collin County, and Richardson extends into Dallas County.
              The City of Dallas and Carrollton also include land in Collin County. Our directory lists each city under
              one county for navigation; the parcel record establishes the county — and the appraisal district — for
              any individual property.
            </p>
          </CitySection>

          <CitySection id="collin-county-guides" heading="Collin County appraisal guides">
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
              Richardson, which extends into Collin County, has its own guide under{" "}
              <Link to="/service-areas/dallas-county/richardson/">Dallas County</Link>.
            </p>
          </CitySection>

          <CityClosingCta id="collin-county-cta" heading="Request a Collin County appraisal">
            <p>
              Share the property address and the purpose of the appraisal. We will confirm the property’s county and
              follow up about scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <SourceList
            checked="November 24, 2026"
            sources={[
              { label: "U.S. Census Bureau — 2020 place-by-county reference file, Texas", href: "https://www2.census.gov/geo/docs/reference/codes2020/place_by_cou/st48_tx_place_by_county2020.txt" },
              { label: "U.S. Census Bureau — ACS 2020–2024 5-year housing estimates for Collin County (via Census Reporter)", href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US48085" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

CollinCounty.displayName = "CollinCounty";

export default CollinCounty;
