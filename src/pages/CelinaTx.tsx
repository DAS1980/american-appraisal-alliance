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
import { censusSources } from "@/components/service-areas/sources";
import faqs from "@/data/service-area-faqs.json";

/**
 * Celina, TX geographic page (11/24/2026). Emphasis: a predominantly new,
 * owner-occupied housing stock; the city vs. ETJ vs. "Future Celina" planning
 * area; two-county geography; the historic square. Facts: Census 2020
 * place-by-county file, ACS 2020–2024, Celina 2040 Comprehensive Plan, TSHA.
 */
const CelinaTx = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="celina-tx">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="celina-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Collin County", to: "/service-areas/collin-county/" },
              { label: "Celina" },
            ]}
            eyebrow="Celina, Texas"
            title="Celina Home Appraisals"
          >
            <p>
              Celina is one of the newest housing markets in North Texas: by Census estimates, roughly two of every
              three homes in the city were built in 2010 or later. Around a historic downtown square, subdivisions
              continue to open — some inside the city and some in its extraterritorial
              jurisdiction. Getting those distinctions right is the first step in a reliable Celina appraisal.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Celina homes for
              owners, buyers, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="celina-new-market" heading="A market built mostly in the last fifteen years">
            <p>
              The U.S. Census Bureau’s American Community Survey (2020–2024 five-year estimates) describes a housing
              stock unlike most of the Dallas–Fort Worth area:
            </p>
            <FactTable
              caption="Celina housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Median year built", "2015"],
                ["Homes built 2010 or later", "About 66%"],
                ["Homes built 2020 or later", "About 32%"],
                ["Single-family detached", "About 97%"],
                ["Owner-occupied", "About 93%"],
              ]}
            />
            <p>
              When most of the market is new, many of the most relevant sales are builder sales or early resales in
              the same or similar subdivisions. Those sales need careful reading: incentives, lot premiums, finished
              upgrades and the timing of the contract can all differ from a resale a few streets away. Census
              figures are survey estimates with margins of error and describe the city as a whole, not any
              particular neighborhood.
            </p>
          </CitySection>

          <CitySection id="celina-boundaries" heading="City, ETJ and “Future Celina”" tone="muted">
            <p>
              The <em>Celina 2040</em> Comprehensive Plan, adopted in 2021, plans for about 76 square miles: the
              city itself, its extraterritorial jurisdiction (ETJ), and “Future Celina” areas covered by boundary
              agreements with neighboring cities. The plan notes that a large portion of that area lies in the ETJ,
              including the Light Farms community, and that inclusion in the planning area does not guarantee
              future annexation.
            </p>
            <p>
              A Celina mailing address therefore does not settle whether a home is inside the city. Jurisdiction
              shapes property taxes, municipal services and land-use rules, so the appraiser confirms it from
              boundary and parcel records and prefers comparables with the same status.
            </p>
            <h3>Two counties</h3>
            <p>
              The Census Bureau’s 2020 place-by-county reference file places the City of Celina in both Collin and
              Denton counties. The parcel record — not the address — establishes the county, and with it the
              appraisal district responsible for tax valuation.
            </p>
          </CitySection>

          <CitySection id="celina-square" heading="The square at the center">
            <p>
              The Handbook of Texas records Celina as established in 1879; the town moved about a mile north when the
              St. Louis, San Francisco and Texas Railway arrived in 1902, and it incorporated in 1907. According to
              the city’s comprehensive plan, the three-sided downtown square largely standing today was built by
              J. Fred Smith, and Celina was designated a Main Street City by the Texas Historical Commission and the
              National Trust for Historic Preservation in 1997.
            </p>
            <p>
              Older homes near the square form a small segment of a market dominated by new construction. When such a
              home is appraised, comparables of similar age and character are scarce, and the appraiser documents how
              far the search had to reach and why the selected sales are reasonable substitutes.
            </p>
          </CitySection>

          <CitySection id="celina-roads" heading="Roads that organize growth" tone="muted">
            <p>
              The comprehensive plan describes Celina as bisected by Preston Road, with the Dallas North Tollway
              alignment running generally along its western side, and anticipates development at key intersections
              of the future Collin County Outer Loop. Planned roadways are context, not current conditions: an
              appraisal reflects the property and its surroundings as of the effective date.
            </p>
          </CitySection>

          <CitySection id="celina-services" heading="Celina appraisal assignments">
            <ul>
              <li>
                <Link to="/pre-purchase-appraisal/">Pre-purchase appraisals</Link> for buyers comparing new
                construction with resales.
              </li>
              <li>
                <Link to="/pmi-removal-appraisal/">PMI removal appraisals</Link> for recent buyers whose servicer asks
                for a current value.
              </li>
              <li>
                <Link to="/tax-assessment-appeal/">Tax assessment appeal appraisals</Link> with the correct county
                and appraisal district identified.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> and{" "}
                <Link to="/divorce-appraisal/">divorce appraisals</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="celina-faq" heading="Celina appraisal questions" faqs={faqs.celina} />

          <CityClosingCta id="celina-cta" heading="Request a Celina appraisal">
            <p>
              Send the address, the subdivision if you know it, the purpose of the appraisal and any deadline. We will
              follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="celina-related"
            heading="Nearby appraisal guides"
            links={[
              { to: "/service-areas/collin-county/prosper/", label: "Prosper", note: "Another two-county town with a new-construction market." },
              { to: "/service-areas/collin-county/mckinney/", label: "McKinney", note: "Historic designations and annexation boundaries." },
              { to: "/service-areas/denton-county/aubrey/", label: "Aubrey", note: "A one-mile ETJ and acreage near Ray Roberts Lake." },
              { to: "/service-areas/collin-county/", label: "Collin County service areas", note: "All Collin County communities we serve." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4813684", "Celina city"),
              { label: "City of Celina — Celina 2040 Comprehensive Plan (Celina EDC)", href: "https://celinaedc.com/assets/main/adopted-celina-comprehensive-plan---reduced-for-web.pdf" },
              { label: "Texas State Historical Association — Handbook of Texas, “Celina, TX”", href: "https://www.tshaonline.org/handbook/entries/celina-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

CelinaTx.displayName = "CelinaTx";

export default CelinaTx;
