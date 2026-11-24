import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { CityHero, CitySection, CityClosingCta } from "@/components/service-areas/CityPageKit";
import { siteConfig } from "@/config/site";

/** Every service-area guide, grouped by the county page it is filed under (11/24/2026). */
const counties = [
  {
    to: "/service-areas/collin-county/",
    name: "Collin County",
    cities: [
      { city: "Allen", to: "/service-areas/collin-county/allen/", summary: "Neighborhood plat eras and housing types from the city’s own map; the new Downtown District." },
      { city: "Celina", to: "/service-areas/collin-county/celina/", summary: "A mostly new housing market; city vs. ETJ; a historic Main Street square." },
      { city: "Frisco", to: "/service-areas/collin-county/frisco/", summary: "Collin and Denton counties, more than 200 HOAs, and Rail District reinvestment." },
      { city: "McKinney", to: "/service-areas/collin-county/mckinney/", summary: "Distinct historic designations, annexation-based city limits, downtown timelines." },
      { city: "Plano", to: "/service-areas/collin-county/plano/", summary: "Preserves and greenbelts, the heritage program, rental-property registration." },
      { city: "Prosper", to: "/service-areas/collin-county/prosper/", summary: "A two-county town built mostly since 2010; tollway design guidelines." },
    ],
  },
  {
    to: "/service-areas/dallas-county/",
    name: "Dallas County",
    cities: [
      { city: "Addison", to: "/service-areas/dallas-county/addison/", summary: "A mostly multifamily housing mix; condominium and townhome comparables." },
      { city: "North Dallas", to: "/service-areas/dallas-county/north-dallas/", summary: "A description, not a city: confirming jurisdiction, county and zoning." },
      { city: "Richardson", to: "/service-areas/dallas-county/richardson/", summary: "Silver Line stations, Envision Richardson, CityLine and the Innovation Quarter." },
    ],
  },
  {
    to: "/service-areas/denton-county/",
    name: "Denton County",
    cities: [
      { city: "Aubrey", to: "/service-areas/denton-county/aubrey/", summary: "Acreage and new subdivisions, a one-mile ETJ, Ray Roberts Lake." },
      { city: "Carrollton", to: "/service-areas/denton-county/carrollton/", summary: "Three counties, a 1970s building boom and the renovation spectrum it left." },
      { city: "Lewisville", to: "/service-areas/denton-county/lewisville/", summary: "Lake history, flowage easements and a planned single- and multifamily mix." },
      { city: "Little Elm", to: "/service-areas/denton-county/little-elm/", summary: "Lakefront homes, the 2011 flood-map revision and rental registration." },
      { city: "The Colony", to: "/service-areas/denton-county/the-colony/", summary: "A 1970s planned community on the east shore of Lewisville Lake." },
    ],
  },
];

const ServiceAreas = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="service-areas-hero"
            crumbs={[{ label: "Home", to: "/" }, { label: "Service Areas" }]}
            eyebrow="Dallas–Fort Worth Metroplex"
            title="Appraisal Service Areas in Dallas–Fort Worth"
          >
            <p>
              American Appraisal Alliance provides residential real estate appraisals across the Dallas–Fort Worth
              metropolitan area and applicable surrounding communities. We are a service-area business: appraisals
              are completed at or for the subject property, and we do not maintain public offices in the cities
              listed below.
            </p>
          </CityHero>

          <CitySection id="service-areas-guides" heading="Local appraisal guides by county">
            <p>
              Each guide explains the local features an appraiser considers when defining a market area and selecting
              comparable sales — drawn from municipal, Census and other authoritative sources, not generic city
              descriptions.
            </p>
            <p>
              Counties organize this list for navigation only. Several of these cities extend into more than one
              county, and a property’s actual county, city limits and appraisal district are confirmed from parcel
              records during each assignment.
            </p>
            <div className="space-y-10 mt-6">
              {counties.map((c) => (
                <div key={c.to}>
                  <h3 className="!mt-0">
                    <Link to={c.to} className="!no-underline">{c.name}</Link>
                  </h3>
                  <ul className="!list-none !pl-0 grid gap-4 sm:grid-cols-2">
                    {c.cities.map((g) => (
                      <li key={g.to} className="rounded-lg border border-slate-200 p-5 hover:border-[hsl(42_88%_48%)] transition-colors">
                        <Link to={g.to} className="text-lg font-semibold !no-underline">
                          {g.city}
                        </Link>
                        <p className="mt-2 text-sm text-slate-600">{g.summary}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CitySection>

          <CitySection id="service-areas-other" heading="Don’t see your community?" tone="muted">
            <p>
              Call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> or email{" "}
              <a href={`mailto:${siteConfig.ordersEmail}`}>{siteConfig.ordersEmail}</a> to ask whether a property is
              within our coverage area.
            </p>
          </CitySection>

          <CityClosingCta id="service-areas-cta" heading="Request an appraisal anywhere we serve">
            <p>Tell us the property address and the purpose of the appraisal, and we will follow up to discuss the assignment.</p>
          </CityClosingCta>
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

ServiceAreas.displayName = "ServiceAreas";

export default ServiceAreas;
