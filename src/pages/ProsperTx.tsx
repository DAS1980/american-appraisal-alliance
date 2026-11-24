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
 * Prosper, TX geographic page (11/24/2026). Emphasis: two-county town,
 * comprehensive-plan updates and tollway design guidelines, a housing stock
 * mostly built since 2010, Old Town. Facts: Census 2020 place-by-county file,
 * ACS 2020–2024, Town of Prosper (History; Comprehensive Plan), TSHA.
 */
const ProsperTx = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="prosper-tx">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="prosper-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Collin County", to: "/service-areas/collin-county/" },
              { label: "Prosper" },
            ]}
            eyebrow="Prosper, Texas"
            title="Prosper, TX Residential Appraisals"
          >
            <p>
              Prosper sits across a county line and has grown, almost entirely in recent years, from a small railroad
              town into a community of new single-family neighborhoods. An appraisal here turns on precise
              identification: which county, which subdivision and which phase of development a home belongs to.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Prosper homes for
              owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="prosper-county" heading="One town, two counties">
            <p>
              The U.S. Census Bureau’s 2020 place-by-county reference file places the Town of Prosper in both Collin
              and Denton counties. A Prosper address does not tell you which side of that line a home is on; the
              parcel record does. The county determines which appraisal district values the property for taxes and
              which public records the appraiser consults — a central question in any{" "}
              <Link to="/tax-assessment-appeal/">tax-protest appraisal</Link>.
            </p>
          </CitySection>

          <CitySection id="prosper-growth" heading="From railroad stop to new subdivisions" tone="muted">
            <p>
              The Town of Prosper’s history describes two earlier settlements, Rock Hill and Richland, merging when
              the St. Louis and San Francisco railroad arrived in 1902; the town incorporated in 1914. The Handbook
              of Texas records a small population for most of the twentieth century — 1,018 residents in 1990 and
              2,097 in 2000.
            </p>
            <p>
              Census estimates for 2020–2024 show how much has changed since: about 72% of Prosper’s homes were
              built in 2010 or later and about one in five in 2020 or later, with a median year built of 2014. About
              89% of homes are single-family detached and about 88% are owner-occupied. These are citywide survey
              estimates, not neighborhood figures.
            </p>
            <h3>What that means for comparables</h3>
            <p>
              In a market this new, the subject’s own subdivision — and often its own builder and phase — is usually
              the best source of comparable sales. Builder sales are part of that evidence when their terms,
              incentives and included features are verified. Differences in lot size, community amenities and
              association costs between subdivisions are examined rather than assumed.
            </p>
          </CitySection>

          <CitySection id="prosper-planning" heading="A plan that keeps being updated">
            <p>
              Prosper adopted its Comprehensive Plan in August 2012. In February 2022 the Town Council added design
              guidelines for the Dallas North Tollway to the plan, and in August 2023 it updated the plan to reflect
              changes in residential and commercial growth. The town also maintains a Downtown Master Plan (2022) and
              an Old Town insert to its plan.
            </p>
            <p>
              For an appraisal, a comprehensive plan is policy, not zoning. The appraiser relies on the property’s
              current zoning and conditions as of the effective date, and treats planned corridors and development
              as context unless sales show the market has already responded.
            </p>
          </CitySection>

          <CitySection id="prosper-old-town" heading="Old Town and older homes" tone="muted">
            <p>
              Prosper plans for its original town center separately, through an Old Town insert and a Downtown Master
              Plan. Older housing is a very small part of the market: Census estimates put homes built before 1980 at
              under 2% of the town’s housing. An older Prosper home rarely has many truly similar sales nearby, so the
              appraiser may widen the search and explains why the chosen sales are reasonable substitutes for the
              subject’s age, size and condition.
            </p>
          </CitySection>

          <CitySection id="prosper-services" heading="Prosper appraisal assignments">
            <ul>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing appraisals</Link> for sellers competing with new
                construction.
              </li>
              <li>
                <Link to="/pre-purchase-appraisal/">Pre-purchase appraisals</Link> for buyers weighing builder pricing.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> and{" "}
                <Link to="/estate-date-of-death-appraisal/">estate appraisals</Link>.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="prosper-faq" heading="Prosper appraisal questions" faqs={faqs.prosper} />

          <CityClosingCta id="prosper-cta" heading="Start a Prosper appraisal inquiry">
            <p>
              Include the address, subdivision, purpose of the appraisal and any effective date. We will contact you
              to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="prosper-related"
            heading="Nearby appraisal guides"
            links={[
              { to: "/service-areas/collin-county/celina/", label: "Celina", note: "City, ETJ and a new-construction market." },
              { to: "/service-areas/collin-county/frisco/", label: "Frisco", note: "Two counties, 200+ HOAs and the Rail District." },
              { to: "/service-areas/collin-county/mckinney/", label: "McKinney", note: "Historic designations and annexation." },
              { to: "/service-areas/collin-county/", label: "Collin County service areas", note: "All Collin County communities we serve." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4859696", "Prosper town"),
              { label: "Town of Prosper — History", href: "https://www.prospertx.gov/299/History" },
              { label: "Town of Prosper — Comprehensive Plan", href: "https://www.prospertx.gov/258/Comprehensive-Plan" },
              { label: "Texas State Historical Association — Handbook of Texas, “Prosper, TX”", href: "https://www.tshaonline.org/handbook/entries/prosper-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

ProsperTx.displayName = "ProsperTx";

export default ProsperTx;
