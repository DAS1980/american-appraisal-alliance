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
import faqs from "@/data/service-area-faqs.json";

/**
 * Frisco, TX geographic page (11/24/2026). Emphasis: two-county jurisdiction,
 * HOA / planned-development structure and Rail District reinvestment. Facts:
 * DAS City Research Profile — Frisco (municipal sources checked 11/13–11/22/2026).
 */
const FriscoTx = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="frisco-tx">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="frisco-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Collin County", to: "/service-areas/collin-county/" },
              { label: "Frisco" },
            ]}
            eyebrow="Frisco, Texas"
            title="Frisco Residential Appraisal Services"
          >
            <p>
              In Frisco, two homes with the same city name on the mailing label can sit in different counties,
              belong to different homeowners associations and fall under different planned-development rules.
              Sorting out those details early is what keeps a Frisco appraisal accurate and defensible.
            </p>
            <p>
              American Appraisal Alliance prepares independent, USPAP-compliant appraisals of Frisco homes for
              owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="frisco-county" heading="Start with the county line">
            <p>
              Frisco extends across both Collin County and Denton County. The City of Frisco publishes separate,
              county-specific guidance for voter registration and property tax administration, and its public GIS
              maps show county and city boundaries as distinct layers.
            </p>
            <p>
              For an appraisal, the parcel record — not the postal address — establishes the county. That matters
              most in <Link to="/tax-assessment-appeal/">property tax protests</Link>, where the appraisal district
              and its records follow the county in which the parcel sits. It also helps when choosing comparables
              and reviewing public records for a home near the county line.
            </p>
          </CitySection>

          <CitySection id="frisco-hoa" heading="More than 200 HOAs and planned-development zoning" tone="muted">
            <p>
              The City of Frisco reports more than 200 homeowners associations, maintains a voluntary HOA directory
              and runs a Five Star Neighborhood program. Its zoning guidance also explains that Planned Development
              regulations take precedence over the general zoning ordinance where they apply, and the city’s GIS
              separates subdivisions, parcels, zoning and annexation areas.
            </p>
            <h3>How HOAs and planned developments enter the analysis</h3>
            <ul>
              <li>
                <strong>Comparable selection.</strong> Sales from the same association, or one with similar
                amenities, dues and restrictions, are usually the most reliable starting point.
              </li>
              <li>
                <strong>Property rights and restrictions.</strong> Deed restrictions and architectural rules are
                part of what a buyer acquires, so the appraiser may ask for the association name and governing
                documents.
              </li>
              <li>
                <strong>Zoning.</strong> When a planned development governs the property, its rules — not the
                general zoning district — describe what is permitted.
              </li>
            </ul>
            <p>
              None of these factors automatically adds to or subtracts from value. Each is identified, described
              and tested against local sales.
            </p>
          </CitySection>

          <CitySection id="frisco-rail-district" heading="The Rail District: reinvestment in Frisco’s original downtown">
            <p>
              Frisco’s Downtown Rail District has been the focus of significant public reinvestment. The city reports
              that construction is complete on the Main Street streetscape, 4th Street Plaza, a parking garage and
              Elm Street parking improvements, and city news in October 2026 described an $83 million downtown
              reinvestment. In August 2026, the Frisco Community Development Corporation adopted a Rail District
              Reinvestment Grant Program aimed at façades, streetscapes, patios and other building improvements.
            </p>
            <p>
              For appraisal purposes, homes in and near the historic downtown may draw a different set of buyers
              than homes in Frisco’s HOA-governed subdivisions, so the appraiser tests whether sales from those
              areas truly belong in the same market area. Completed public improvements are
              part of the neighborhood as of the effective date; grant programs and work still under way are noted
              but not treated as finished features.
            </p>
          </CitySection>

          <CitySection id="frisco-corridors" heading="Corridors and civic landmarks" tone="muted">
            <p>
              The city’s own widening project describes the Frisco stretch of the Dallas North Tollway as the
              segment from SH 121 (Sam Rayburn Tollway) up to US 380, paired with Dallas Parkway as the frontage
              road. Two civic reference points are also useful for describing location: City Hall on Frisco Square
              Boulevard, and Frisco Commons, a 63-acre city park on McKinney Road that city records date to 2004.
            </p>
            <p>
              Major corridors bring access and commercial activity, and also traffic exposure. Where a home sits
              relative to a tollway, frontage road or large park is a location characteristic the appraiser
              examines with paired sales, without assuming in advance whether it helps or hurts.
            </p>
          </CitySection>

          <CitySection id="frisco-prepare" heading="Information that helps a Frisco appraisal">
            <ol>
              <li>The property’s legal description or county parcel number, if you have it.</li>
              <li>Your HOA name and, if available, its deed restrictions and current dues.</li>
              <li>A list of significant improvements, with dates and any permits.</li>
              <li>For a tax protest, the appraisal district’s notice of value and the relevant effective date.</li>
              <li>Anything unusual about the lot — easements, drainage areas or frontage on a major road.</li>
            </ol>
          </CitySection>

          <CitySection id="frisco-services" heading="Frisco appraisal assignments" tone="muted">
            <ul>
              <li>
                <Link to="/tax-assessment-appeal/">Tax assessment appeal appraisals</Link> with the correct county identified.
              </li>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing</Link> and{" "}
                <Link to="/pre-purchase-appraisal/">pre-purchase</Link> appraisals for sellers and buyers.
              </li>
              <li>
                <Link to="/pmi-removal-appraisal/">PMI removal appraisals</Link> when a lender requires a current valuation.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> and{" "}
                <Link to="/market-value-update-1004d-recertification/">1004D updates</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="frisco-faq" heading="Frisco appraisal questions" faqs={faqs.frisco} />

          <CityClosingCta id="frisco-cta" heading="Request a Frisco appraisal">
            <p>
              Tell us the property address, the county if you know it, the reason for the appraisal and any deadline.
              We will contact you to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="frisco-related"
            heading="More local appraisal guides"
            links={[
              { to: "/service-areas/collin-county/mckinney/", label: "McKinney", note: "Historic designations and city-limit checks." },
              { to: "/service-areas/collin-county/plano/", label: "Plano", note: "Preserves, heritage districts and rental regulation." },
              { to: "/service-areas/dallas-county/richardson/", label: "Richardson", note: "Rail-oriented planning and CityLine." },
              { to: "/service-areas/collin-county/", label: "Collin County service areas", note: "All Collin County communities we serve." },
            ]}
          />

          <SourceList
            checked="November 2026"
            sources={[
              { label: "City of Frisco — Tax Administration", href: "https://www.friscotexas.gov/145/Tax-Administration" },
              { label: "City of Frisco — Voter Registration", href: "https://www.friscotexas.gov/1558/Voter-Registration" },
              { label: "City of Frisco — Neighborhoods", href: "https://www.friscotexas.gov/977/Neighborhoods" },
              { label: "City of Frisco — Zoning Verification & Event Letters", href: "https://www.friscotexas.gov/2025/Zoning-Verification-Event-Letters" },
              { label: "City of Frisco — GIS", href: "https://www.friscotexas.gov/168/GIS" },
              { label: "City of Frisco — Downtown Redevelopment", href: "https://www.friscotexas.gov/1599/Downtown-Redevelopment" },
              { label: "City of Frisco — Rail District Grants", href: "https://www.friscotexas.gov/1972/Rail-District-Grants" },
              { label: "City of Frisco — DNT and Dallas Parkway Widening", href: "https://www.friscotexas.gov/1843/DNT-and-Dallas-Parkway-Widening" },
              { label: "City of Frisco — Frisco Commons", href: "https://www.friscotexas.gov/Facilities/Facility/Details/Frisco-Commons-104" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

FriscoTx.displayName = "FriscoTx";

export default FriscoTx;
