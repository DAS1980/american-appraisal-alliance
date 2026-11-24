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
  RelatedLinks,
  SourceList,
} from "@/components/service-areas/CityPageKit";
import { censusSources } from "@/components/service-areas/sources";
import faqs from "@/data/service-area-faqs.json";

/**
 * North Dallas geographic page (11/24/2026). North Dallas is a descriptive
 * area of the City of Dallas, not a municipality, so this page deliberately
 * draws no boundaries. Emphasis: confirming jurisdiction and county, policy
 * vs. zoning, conservation-district ordinances. Facts: Census 2020
 * place-by-county file, ACS 2020–2024 (City of Dallas), City of Dallas
 * (ForwardDallas 2.0; Conservation Districts), TSHA (Denton County; Addison).
 */
const NorthDallas = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-dallas-county-north-dallas">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="north-dallas-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Dallas County", to: "/service-areas/dallas-county/" },
              { label: "North Dallas" },
            ]}
            eyebrow="North Dallas"
            title="North Dallas Home Appraisals"
          >
            <p>
              “North Dallas” is how many people describe the northern part of the City of Dallas, but it is not a
              city, and it has no single official boundary. That is exactly why an appraisal here starts with
              records rather than labels: the property’s actual city, county, zoning and subdivision.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of residential property in
              northern Dallas and nearby communities for owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="north-dallas-jurisdiction" heading="A description, not a jurisdiction">
            <p>
              Because the term is informal, two people can mean different areas when they say North Dallas. An
              appraisal report does not rely on that kind of label. It identifies the property by legal description
              and parcel, states the municipality and county, and defines a market area from the competing sales
              actually available — explaining its reasoning rather than borrowing a name.
            </p>
            <p>
              Several separate municipalities lie near the northern parts of Dallas. The Handbook of Texas notes, for
              example, that the Town of Addison incorporated in 1953 in an effort to avoid annexation by Dallas. A
              home on one side of a city line can carry different taxes, services and rules than a home nearby on the
              other, so the appraiser confirms the city before selecting comparables.
            </p>
          </CitySection>

          <CitySection id="north-dallas-counties" heading="Dallas reaches beyond Dallas County" tone="muted">
            <p>
              According to the U.S. Census Bureau’s 2020 place-by-county reference file, the City of Dallas extends
              into five counties: Dallas, Collin, Denton, Kaufman and Rockwall. Denton County, for example, borders
              Dallas County on the north, so some Dallas property in the city’s northern reaches sits outside Dallas
              County altogether.
            </p>
            <p>
              The county determines which appraisal district values a property for taxes and which public records
              apply. For a <Link to="/tax-assessment-appeal/">tax-protest appraisal</Link> in particular, the parcel’s
              county is established from the record before any comparable is chosen.
            </p>
          </CitySection>

          <CitySection id="north-dallas-zoning" heading="Policy, zoning and conservation districts">
            <p>
              On September 25, 2024, the Dallas City Council adopted <em>ForwardDallas 2.0</em>, an update to the
              city’s 2006 comprehensive plan that was amended in March 2026. The city states that the plan is a
              land-use guide and does not rezone property. An appraisal therefore relies on the property’s current
              zoning, available through the city’s public zoning maps.
            </p>
            <p>
              Dallas also uses conservation districts, each created by its own ordinance with its own standards and a
              review process for certain work. Whether a property lies in such a district — or in a planned development
              with its own conditions — is verified for the specific parcel, because it can affect what an owner may
              build or change.
            </p>
          </CitySection>

          <CitySection id="north-dallas-housing" heading="A citywide housing stock with many eras" tone="muted">
            <p>
              Census estimates for the City of Dallas as a whole (2020–2024) show a median year built of 1981, about
              48% of homes built before 1980, about 41% single-family detached and about 47% in buildings of five or
              more units. Those are citywide figures, not a profile of any northern neighborhood, and they underline a
              practical point: within Dallas, neighboring subdivisions can differ sharply in age, lot size and housing
              type.
            </p>
            <h3>How the appraiser handles it</h3>
            <ol>
              <li>Confirm city, county and zoning for the subject from public records.</li>
              <li>Identify the subdivision and its development era.</li>
              <li>Search for sales of similar type, age and setting, starting closest to the subject’s own subdivision.</li>
              <li>Explain any sale drawn from another subdivision or jurisdiction, and adjust only for differences the market supports.</li>
            </ol>
          </CitySection>

          <CitySection id="north-dallas-services" heading="Appraisal assignments in northern Dallas">
            <ul>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> for purchase, refinance and
                private use.
              </li>
              <li>
                <Link to="/estate-date-of-death-appraisal/">Estate and date-of-death appraisals</Link>, including
                retrospective effective dates.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> for attorneys and their clients.
              </li>
              <li>
                <Link to="/property-measurement-ansi-z765/">ANSI Z765 measurement</Link> where additions make the
                finished area uncertain.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="north-dallas-faq" heading="North Dallas appraisal questions" faqs={faqs["north-dallas"]} />

          <CityClosingCta id="north-dallas-cta" heading="Request an appraisal in northern Dallas">
            <p>
              Provide the property address, the purpose of the appraisal and any effective date. We will confirm the
              property’s jurisdiction and follow up about scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="north-dallas-related"
            heading="Nearby appraisal guides"
            links={[
              { to: "/service-areas/dallas-county/addison/", label: "Addison", note: "A separate town with a mostly multifamily housing mix." },
              { to: "/service-areas/dallas-county/richardson/", label: "Richardson", note: "Silver Line stations and CityLine zoning." },
              { to: "/service-areas/collin-county/plano/", label: "Plano", note: "Preserves, heritage districts and rental regulation." },
              { to: "/service-areas/dallas-county/", label: "Dallas County service areas", note: "All Dallas County communities we serve." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4819000", "Dallas city"),
              { label: "City of Dallas — ForwardDallas 2.0", href: "https://dallascityhall.com/departments/pnv/Forward-Dallas/Pages/default.aspx" },
              { label: "City of Dallas — Conservation Districts", href: "https://dallascityhall.com/departments/pnv/Pages/conservation-districts.aspx" },
              { label: "Texas State Historical Association — Handbook of Texas, “Addison, TX”", href: "https://www.tshaonline.org/handbook/entries/addison-tx" },
              { label: "Texas State Historical Association — Handbook of Texas, “Denton County”", href: "https://www.tshaonline.org/handbook/entries/denton-county" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

NorthDallas.displayName = "NorthDallas";

export default NorthDallas;
