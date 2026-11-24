import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import {
  CityHero,
  CitySection,
  CityFaq,
  CityClosingCta,
  FactTable,
  SourceList,
} from "@/components/service-areas/CityPageKit";
import faqs from "@/data/service-area-faqs.json";

/** Denton County communities with local appraisal guides. */
const guides = [
  { to: "/service-areas/denton-county/aubrey/", city: "Aubrey", note: "Acreage and horse properties, a one-mile ETJ, Ray Roberts Lake." },
  { to: "/service-areas/denton-county/carrollton/", city: "Carrollton", note: "Three counties and a 1970s building boom." },
  { to: "/service-areas/denton-county/lewisville/", city: "Lewisville", note: "Lake history, flowage easements and a planned housing mix." },
  { to: "/service-areas/denton-county/little-elm/", city: "Little Elm", note: "Lakefront homes, 2011 flood maps and rental registration." },
  { to: "/service-areas/denton-county/the-colony/", city: "The Colony", note: "A 1970s planned community on the lake’s east shore." },
];

/** Cities filed under other county pages that also extend into Denton County. */
const crossCounty = [
  { to: "/service-areas/collin-county/frisco/", city: "Frisco" },
  { to: "/service-areas/collin-county/plano/", city: "Plano" },
  { to: "/service-areas/collin-county/prosper/", city: "Prosper" },
  { to: "/service-areas/collin-county/celina/", city: "Celina" },
  { to: "/service-areas/dallas-county/north-dallas/", city: "Dallas (North Dallas)" },
];

/**
 * Denton County regional page (11/24/2026). Emphasis: physical geography and
 * lakes, a county-level housing profile, and cities that cross county lines.
 * Facts: TSHA "Denton County", ACS 2020–2024 county estimates, Census 2020
 * place-by-county file, USACE Lewisville Lake.
 */
const DentonCounty = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-denton-county">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="denton-county-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Denton County" },
            ]}
            eyebrow="Denton County, Texas"
            title="Denton County Residential Appraisals"
          >
            <p>
              Denton County runs from established suburbs on the Dallas County line to lakeside towns and rural
              acreage toward its northern edge. No single set of assumptions fits all of it — which is why an
              appraisal here begins by placing the property in the right local market, under the right county.
            </p>
          </CityHero>

          <CitySection id="denton-county-land" heading="Prairie, Cross Timbers and two large lakes">
            <p>
              The Handbook of Texas describes a county of about 911 square miles bordering Dallas and Tarrant counties
              on the south. The western half lies on the Grand Prairie, an eastern sliver on the edge of the Blackland
              Prairie, and the sandy Eastern Cross Timbers run through the middle. The Elm Fork of the Trinity River
              crosses the east-central county, where Lewisville Lake now lies; Ray Roberts Dam was completed in 1986
              near Aubrey in the northeast; and Grapevine Lake is partly in the county’s south.
            </p>
            <p>
              The U.S. Army Corps of Engineers manages Lewisville and Ray Roberts lakes and publishes guidelines for
              land next to government property and for land subject to flowage easements — private land on which the
              government holds the perpetual right to flood. Near either lake, flood-zone status and easements are
              confirmed for the specific property.
            </p>
          </CitySection>

          <CitySection id="denton-county-housing" heading="A largely recent housing stock — with exceptions" tone="muted">
            <FactTable
              caption="Denton County housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Median year built", "2003"],
                ["Homes built 2010 or later", "About 33%"],
                ["Homes built before 1980", "About 12%"],
                ["Single-family detached", "About 69%"],
                ["Owner-occupied", "About 66%"],
              ]}
            />
            <p>
              County averages hide wide local differences. Among the communities we profile, Census estimates put the
              median year built at 1988 in Carrollton and 1997 in Lewisville, but 2011 in Little Elm and 2013 in
              Aubrey. The Handbook of Texas notes that Lewisville, The Colony and the Denton County part of Carrollton
              grew as Dallas suburbs, while the county’s population rose from 47,432 in 1960 to 143,126 in 1980. A
              comparable search therefore starts in the subject’s own city and neighborhood, and the appraiser explains
              any reach beyond it.
            </p>
          </CitySection>

          <CitySection id="denton-county-lines" heading="Cities that cross the county line">
            <p>
              Several cities in and around Denton County extend into neighboring counties, according to the U.S.
              Census Bureau’s 2020 place-by-county reference file. Carrollton reaches into Dallas and Collin counties,
              Lewisville into Dallas County, and Frisco, Plano, Prosper, Celina and the City of Dallas all include land
              in Denton County as well as elsewhere.
            </p>
            <p>
              Our directory files each city under one county for navigation only. For any property, the parcel record
              establishes the actual county — and with it the appraisal district that values the property for taxes and
              the public records the appraiser relies on.
            </p>
            <p>Other guides for cities that include part of Denton County:</p>
            <ul>
              {crossCounty.map((c) => (
                <li key={c.to}>
                  <Link to={c.to}>{c.city}</Link>
                </li>
              ))}
            </ul>
          </CitySection>

          <CitySection id="denton-county-guides" heading="Denton County appraisal guides" tone="muted">
            <ul className="!list-none !pl-0 grid gap-4 sm:grid-cols-2">
              {guides.map((g) => (
                <li key={g.to} className="rounded-lg border border-slate-200 bg-white p-5 hover:border-[hsl(42_88%_48%)] transition-colors">
                  <Link to={g.to} className="text-lg font-semibold !no-underline">
                    {g.city}
                  </Link>
                  <p className="mt-2 text-sm text-slate-600">{g.note}</p>
                </li>
              ))}
            </ul>
          </CitySection>

          <CityFaq id="denton-county-faq" heading="Denton County appraisal questions" faqs={faqs["denton-county"]} />

          <CityClosingCta id="denton-county-cta" heading="Request a Denton County appraisal">
            <p>
              Share the property address, its city if you know it, and the purpose of the appraisal. We will confirm
              the property’s county and follow up about scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <SourceList
            checked="November 24, 2026"
            sources={[
              { label: "Texas State Historical Association — Handbook of Texas, “Denton County”", href: "https://www.tshaonline.org/handbook/entries/denton-county" },
              { label: "U.S. Census Bureau — 2020 place-by-county reference file, Texas", href: "https://www2.census.gov/geo/docs/reference/codes2020/place_by_cou/st48_tx_place_by_county2020.txt" },
              { label: "U.S. Census Bureau — ACS 2020–2024 5-year housing estimates for Denton County (via Census Reporter)", href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US48121" },
              { label: "U.S. Army Corps of Engineers — Adjacent landowner and flowage easement information", href: "https://www.swf-wc.usace.army.mil/lewisville/Realestate/Adjland.shtml" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

DentonCounty.displayName = "DentonCounty";

export default DentonCounty;
