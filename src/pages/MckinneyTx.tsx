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
  RelatedLinks,
  SourceList,
} from "@/components/service-areas/CityPageKit";
import faqs from "@/data/service-area-faqs.json";

/**
 * McKinney, TX geographic page (11/24/2026). Emphasis: distinct historic
 * designations, municipal jurisdiction vs. postal address, and downtown
 * reinvestment timelines. Facts: DAS City Research Profile — McKinney
 * (municipal sources checked 11/15–11/22/2026).
 */
const MckinneyTx = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="mckinney-tx">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="mckinney-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Collin County", to: "/service-areas/collin-county/" },
              { label: "McKinney" },
            ]}
            eyebrow="McKinney, Texas"
            title="McKinney, TX Real Estate Appraisals"
          >
            <p>
              McKinney pairs a preserved historic downtown — with walking tours of its older homes and commercial
              buildings — with a city boundary that has grown through annexation. Appraising a McKinney home well
              means knowing which historic rules, if any, apply to it and whether it actually lies inside the city.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of McKinney residential
              property for homeowners, estates, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="mckinney-designations" heading="“Historic” can mean several different things in McKinney">
            <p>
              The City of McKinney established two historic districts by ordinance during the 1980s, and its
              preservation resources and GIS maps today distinguish several separate layers. Each has a different
              meaning, and a property can fall within one without falling within another.
            </p>
            <FactTable
              caption="Historic designations published by the City of McKinney"
              head={["Designation", "What it identifies"]}
              rows={[
                ["Local historic districts", "Areas established by city ordinance, with mapped boundaries."],
                ["Historic overlay (H) and Commercial Historic District", "Overlay and commercial district designations, mapped separately from the other historic layers."],
                ["National Register resources", "Buildings listed on the National Register of Historic Places, shown as their own GIS layer."],
                ["Historic Downtown Cultural District", "A cultural district designation centered on downtown."],
                ["HNIZ and NEZ", "Historic Neighborhood Improvement Zone and Neighborhood Empowerment Zone incentive boundaries."],
              ]}
            />
            <h3>Why the appraiser checks the exact designation</h3>
            <p>
              The city also publishes a Certificate of Appropriateness map, which signals that some exterior work is
              subject to review. A designation can therefore shape what a buyer may do with a property, and in some
              cases what programs it may qualify for. The appraiser identifies the specific designation, if any, for
              the subject and each comparable, and compares like with like. The designation itself is not treated as
              an automatic plus or minus; local sales determine whether it matters.
            </p>
          </CitySection>

          <CitySection id="mckinney-jurisdiction" heading="Inside the city limits, or just outside them?" tone="muted">
            <p>
              A McKinney mailing address does not prove a property is within the City of McKinney. The city’s GIS
              city-limit layer is built from annexation ordinances and was last updated March 17, 2026, when checked
              in November 2026. A separate resident-resources map shows subdivision, HOA, jurisdiction and school
              boundary layers.
            </p>
            <p>
              Jurisdiction can affect property taxes, zoning and municipal services, so the appraiser confirms it at
              the parcel level and favors comparables that share the subject’s jurisdiction. Zoning permissions in
              McKinney also vary parcel by parcel, so nearness to downtown is not evidence of a particular permitted
              use.
            </p>
          </CitySection>

          <CitySection id="mckinney-downtown" heading="Downtown reinvestment on a published timeline">
            <p>
              McKinney’s Town Center zoning district promotes pedestrian-oriented, mixed-use infill. The city adopted
              a boundary map for Tax Increment Reinvestment Zone No. 1 on July 9, 2026, and policy guidelines on
              October 20, 2026. Separately, the city’s downtown city-owned property redevelopment page, describing
              plans as of September 2025, schedules infrastructure reconstruction from late 2026 through 2028.
            </p>
            <p>
              Those dates matter for an appraisal. A report reflects the property and its surroundings on the
              effective date. Adopted plans are context; scheduled reconstruction is not yet a completed
              improvement, and its influence — if any — must appear in market evidence before it affects value.
            </p>
          </CitySection>

          <CitySection id="mckinney-parks" heading="Parks, trails and open space" tone="muted">
            <p>
              By the parks department’s own count, checked in November 2026, McKinney’s public open space totals
              nearly 3,000 acres, tied together by about 80 miles of trails for walking and cycling. The city’s GIS
              portal maps those parks and trails
              alongside zoning, which helps an appraiser describe a home’s setting precisely instead of relying on
              general neighborhood descriptions.
            </p>
          </CitySection>

          <CitySection id="mckinney-services" heading="Appraisals for older and newer McKinney homes">
            <p>
              McKinney’s range of settings — historic downtown streets, annexed areas and HOA neighborhoods — calls
              for different appraisal approaches. Common assignments include:
            </p>
            <ul>
              <li>
                <Link to="/estate-date-of-death-appraisal/">Estate and date-of-death appraisals</Link>, for example
                when an estate holds an older home whose designation status must be documented as of a past date.
              </li>
              <li>
                <Link to="/gross-living-area-gla-certification/">Gross living area certification</Link> and{" "}
                <Link to="/property-measurement-ansi-z765/">ANSI Z765 measurement</Link> where additions or
                conversions make the finished area uncertain.
              </li>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing appraisals</Link> to support pricing before a sale.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> and{" "}
                <Link to="/divorce-appraisal/">divorce appraisals</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="mckinney-faq" heading="McKinney appraisal questions" faqs={faqs.mckinney} />

          <CityClosingCta id="mckinney-cta" heading="Start a McKinney appraisal inquiry">
            <p>
              Include the address, the purpose and effective date of the appraisal, and anything you already know
              about historic designation or jurisdiction. We will follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="mckinney-related"
            heading="Other Collin County guides"
            links={[
              { to: "/service-areas/collin-county/frisco/", label: "Frisco", note: "County-line checks, HOAs and the Rail District." },
              { to: "/service-areas/collin-county/plano/", label: "Plano", note: "Open space, heritage districts and rentals." },
              { to: "/service-areas/dallas-county/richardson/", label: "Richardson", note: "Silver Line stations and CityLine zoning." },
              { to: "/service-areas/collin-county/", label: "Collin County service areas", note: "Every Collin County community on our list." },
            ]}
          />

          <SourceList
            checked="November 2026"
            sources={[
              { label: "City of McKinney — Historic Preservation Resources", href: "https://www.mckinneytexas.org/350/Historic-Preservation-Resources" },
              { label: "City of McKinney — Historic Resources GIS service", href: "https://maps.mckinneytexas.org/mckinney/rest/services/MapServices/HistoricResources/FeatureServer" },
              { label: "City of McKinney — Walking Tours", href: "https://www.mckinneytexas.org/357/Walking-Tours" },
              { label: "City of McKinney — GIS Maps & Data Sets", href: "https://www.mckinneytexas.org/158/GIS-Maps-Data-Sets" },
              { label: "City of McKinney — City limits GIS layer", href: "https://maps.mckinneytexas.org/mckinney/rest/services/MapServices/EngineeringBoundaries/MapServer/7/iteminfo" },
              { label: "City of McKinney — Where Can I Build That?", href: "https://www.mckinneytexas.org/1647/Where-Can-I-Build-That-Help-Page" },
              { label: "City of McKinney — Downtown Development", href: "https://www.mckinneytexas.org/1216/Downtown-Development" },
              { label: "City of McKinney — Downtown City-Owned Property Redevelopment", href: "https://www.mckinneytexas.org/2096/Downtown-City-Owned-Property-Redevelopme" },
              { label: "City of McKinney — Parks & Trails", href: "https://www.mckinneytexas.org/612/Parks-Trails" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

MckinneyTx.displayName = "MckinneyTx";

export default MckinneyTx;
