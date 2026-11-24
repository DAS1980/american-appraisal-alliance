import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { CityHero, CitySection, CityClosingCta } from "@/components/service-areas/CityPageKit";
import { siteConfig } from "@/config/site";

/** City guides with substantive, research-backed local content (11/24/2026). */
const cityGuides = [
  {
    to: "/service-areas/collin-county/plano/",
    city: "Plano",
    summary: "Nature preserves and greenbelts, the heritage program around Historic Downtown Plano, and rental-property registration.",
  },
  {
    to: "/service-areas/collin-county/frisco/",
    city: "Frisco",
    summary: "A city split between Collin and Denton counties, more than 200 HOAs, and reinvestment in the Rail District.",
  },
  {
    to: "/service-areas/collin-county/mckinney/",
    city: "McKinney",
    summary: "Several distinct historic designations, city limits drawn from annexation ordinances, and downtown redevelopment timelines.",
  },
  {
    to: "/service-areas/dallas-county/richardson/",
    city: "Richardson",
    summary: "Silver Line stations, the Envision Richardson plan, CityLine’s three zoning districts and the Innovation Quarter.",
  },
];

const counties = [
  {
    to: "/service-areas/collin-county/",
    name: "Collin County",
    cities: [
      ["Allen", "/service-areas/collin-county/allen/"],
      ["Celina", "/service-areas/collin-county/celina/"],
      ["Frisco", "/service-areas/collin-county/frisco/"],
      ["McKinney", "/service-areas/collin-county/mckinney/"],
      ["Plano", "/service-areas/collin-county/plano/"],
      ["Prosper", "/service-areas/collin-county/prosper/"],
    ],
  },
  {
    to: "/service-areas/dallas-county/",
    name: "Dallas County",
    cities: [
      ["Addison", "/service-areas/dallas-county/addison/"],
      ["North Dallas", "/service-areas/dallas-county/north-dallas/"],
      ["Richardson", "/service-areas/dallas-county/richardson/"],
    ],
  },
  {
    to: "/service-areas/denton-county/",
    name: "Denton County",
    cities: [
      ["Aubrey", "/service-areas/denton-county/aubrey/"],
      ["Carrollton", "/service-areas/denton-county/carrollton/"],
      ["Lewisville", "/service-areas/denton-county/lewisville/"],
      ["Little Elm", "/service-areas/denton-county/little-elm/"],
      ["The Colony", "/service-areas/denton-county/the-colony/"],
    ],
  },
] as const;

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

          <CitySection id="service-areas-guides" heading="Local appraisal guides">
            <p>
              These guides explain the local features an appraiser considers when defining a market area and
              selecting comparable sales — drawn from municipal sources, not generic city descriptions.
            </p>
            <ul className="!list-none !pl-0 grid gap-4 sm:grid-cols-2">
              {cityGuides.map((g) => (
                <li key={g.to} className="rounded-lg border border-slate-200 p-5 hover:border-[hsl(42_88%_48%)] transition-colors">
                  <Link to={g.to} className="text-lg font-semibold !no-underline">
                    {g.city} appraisal guide
                  </Link>
                  <p className="mt-2 text-sm text-slate-600">{g.summary}</p>
                </li>
              ))}
            </ul>
          </CitySection>

          <CitySection id="service-areas-counties" heading="Communities by county" tone="muted">
            <p>
              Counties are used here to organize the list. A property’s actual county, city limits and appraisal
              district are confirmed from parcel records during each assignment — several DFW cities extend into
              more than one county.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {counties.map((c) => (
                <div key={c.to} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="!mt-0">
                    <Link to={c.to} className="!no-underline">{c.name}</Link>
                  </h3>
                  <ul className="!list-none !pl-0 !space-y-1">
                    {c.cities.map(([label, to]) => (
                      <li key={to}>
                        <Link to={to}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p>
              Don’t see your community? Call <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> or email{" "}
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
