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
 * Little Elm, TX geographic page (11/24/2026). Emphasis: a lakefront town where
 * flood-map status, lake easements and rental registration are property-level
 * facts; a housing stock mostly built since 2010. Facts: Census 2020
 * place-by-county file, ACS 2020–2024, Town of Little Elm (FIRM; rental
 * registration), USACE, TSHA.
 */
const LittleElm = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-denton-county-little-elm">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="little-elm-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Denton County", to: "/service-areas/denton-county/" },
              { label: "Little Elm" },
            ]}
            eyebrow="Little Elm, Texas"
            title="Little Elm Home Appraisals"
          >
            <p>
              Little Elm sits on an arm of Lewisville Lake, and much of its housing is new. On the water, three
              property-level questions come up again and again: the current flood-zone designation, any federal
              flowage easement and, for rental homes, the town’s registration requirement. An appraisal answers them
              from records before drawing comparisons.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Little Elm homes for
              owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="little-elm-flood" heading="Flood maps changed in 2011">
            <p>
              The Town of Little Elm notes that FEMA updated the Denton County Flood Insurance Rate Map, with a revision
              effective April 18, 2011, and that the base flood elevations on those maps cover streams and Lake
              Lewisville. The town advises owners who were outside the flood zone before the revision to check their
              current status, and reminds residents that standard homeowners insurance does not cover flooding.
            </p>
            <p>
              An appraisal reports the flood-zone designation from the effective map for the specific property. It
              does not assume that a lake view, or a short distance from the shoreline, means any particular flood
              status — or any particular value.
            </p>
          </CitySection>

          <CitySection id="little-elm-easements" heading="Lake easements" tone="muted">
            <p>
              Lewisville Lake is managed by the U.S. Army Corps of Engineers, which publishes guidelines for owners of
              land next to government property and for land subject to a flowage easement — private land on which the
              government holds the perpetual right to flood, with limits on what owners may do there. When an easement
              affects a property, it is part of the property rights being appraised, and the appraiser identifies it
              from title, survey or plat information.
            </p>
          </CitySection>

          <CitySection id="little-elm-growth" heading="From crossroads to lake town">
            <p>
              The Handbook of Texas records Little Elm as established in 1844 on Little Elm Creek, with the county’s
              first post office in 1852. It stayed small for more than a century — 363 residents in 1976, by which time
              it had incorporated — and reached 3,646 residents in 2000, its growth tied to better roads and the lake.
            </p>
            <p>
              Census estimates for 2020–2024 show how much has been built since: a median year built of 2011, about 55%
              of homes built in 2010 or later and fewer than 2% before 1980. About 74% of homes are single-family
              detached and about 70% are owner-occupied. In a market this new, the subject’s own subdivision and phase
              are usually the best place to begin the search for comparable sales.
            </p>
          </CitySection>

          <CitySection id="little-elm-rentals" heading="Rental homes and registration" tone="muted">
            <p>
              Little Elm requires every non-owner-occupied home in the town to be registered annually as a rental
              property under its Neighborhood Integrity program. For an appraisal of a rental home — for an estate, a
              divorce or a sale — the appraiser may ask about leases, condition and registration. The appraisal still
              values the real property under the agreed scope.
            </p>
          </CitySection>

          <CitySection id="little-elm-services" heading="Little Elm appraisal assignments">
            <ul>
              <li>
                <Link to="/pre-purchase-appraisal/">Pre-purchase appraisals</Link> for buyers considering lakefront or
                lake-area homes.
              </li>
              <li>
                <Link to="/pmi-removal-appraisal/">PMI removal appraisals</Link> for recent buyers.
              </li>
              <li>
                <Link to="/estate-date-of-death-appraisal/">Estate appraisals</Link> and{" "}
                <Link to="/divorce-appraisal/">divorce appraisals</Link>, including rental property.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="little-elm-faq" heading="Little Elm appraisal questions" faqs={faqs["little-elm"]} />

          <CityClosingCta id="little-elm-cta" heading="Request a Little Elm appraisal">
            <p>
              Share the address, whether the home is owner-occupied or rented, the purpose of the appraisal and any
              deadline. We will follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="little-elm-related"
            heading="Other lake-area guides"
            links={[
              { to: "/service-areas/denton-county/the-colony/", label: "The Colony", note: "A 1970s planned community on the lake’s east shore." },
              { to: "/service-areas/denton-county/lewisville/", label: "Lewisville", note: "Lake history and a planned mix of housing." },
              { to: "/service-areas/denton-county/aubrey/", label: "Aubrey", note: "Acreage, a one-mile ETJ and Ray Roberts Lake." },
              { to: "/service-areas/denton-county/", label: "Denton County service areas", note: "How Denton County’s markets differ." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4843012", "Little Elm town"),
              { label: "Town of Little Elm — Flood Insurance Rate Map (FIRM)", href: "https://www.littleelm.gov/592/Flood-Insurance-Rate-Map-FIRM" },
              { label: "Town of Little Elm — Rental Property Registration", href: "https://www.littleelm.gov/1271/Rental-Registration" },
              { label: "U.S. Army Corps of Engineers — Adjacent landowner and flowage easement information", href: "https://www.swf-wc.usace.army.mil/lewisville/Realestate/Adjland.shtml" },
              { label: "Texas State Historical Association — Handbook of Texas, “Little Elm, TX”", href: "https://www.tshaonline.org/handbook/entries/little-elm-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

LittleElm.displayName = "LittleElm";

export default LittleElm;
