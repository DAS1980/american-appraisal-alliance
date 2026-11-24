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
 * The Colony, TX geographic page (11/24/2026). Emphasis: a city that began as
 * one 1970s planned development, so development era is the key comparable
 * filter; lakeshore considerations. Facts: Census 2020 place-by-county file,
 * ACS 2020–2024, TSHA, City of The Colony (Lake Parks), USACE.
 */
const TheColony = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-denton-county-the-colony">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="the-colony-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Denton County", to: "/service-areas/denton-county/" },
              { label: "The Colony" },
            ]}
            eyebrow="The Colony, Texas"
            title="The Colony, TX Home Appraisals"
          >
            <p>
              The Colony did not grow from an old town center. It began as a single planned housing development in the
              1970s and became a city around it, then added newer neighborhoods over the decades that followed. That
              history makes development era one of the most useful ways to organize comparable sales here.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of homes in The Colony for
              owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="the-colony-origins" heading="A planned development that became a city">
            <p>
              In 1973 the Dallas developer Fox and Jacobs bought land on the eastern shore of Lake Lewisville for a new
              housing development — about 2,500 acres according to the City of The Colony, and some 3,000 acres in the
              Handbook of Texas account. The first families moved into its single-family homes in the fall of 1974, and
              the nearby lakeside community of Eastvale later consolidated with the city in 1987. A homeowners’ association initiated incorporation in 1977, after the land was released
              from the City of Frisco’s extraterritorial jurisdiction, and residents approved a council-manager charter
              in 1979. The city had 22,113 residents in 1990 and 26,531 in 2000.
            </p>
          </CitySection>

          <CitySection id="the-colony-eras" heading="Reading the housing by era" tone="muted">
            <FactTable
              caption="The Colony housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Homes built before 1980", "About 21%"],
                ["Homes built 2010 or later", "About 29%"],
                ["Median year built", "2001"],
                ["Single-family detached", "About 68%"],
                ["Owner-occupied", "About 60%"],
              ]}
            />
            <p>
              Census estimates show both layers of the city: a sizeable share of homes from its first decade and a
              large share built since 2010. Homes from the original development are generally best compared with one
              another, where differences in updates, additions and condition explain much of the variation in price.
              Newer subdivisions form their own comparison sets, with their own lot sizes, plans and amenities.
            </p>
            <h3>Updates matter most in the oldest homes</h3>
            <p>
              For homes several decades old, the appraiser records the subject’s improvements — roof, windows,
              systems, kitchens and baths — and verifies those of each comparable, because two similar homes of the
              same era can sell far apart depending on what has been done since construction.
            </p>
          </CitySection>

          <CitySection id="the-colony-lake" heading="On the eastern shore of Lewisville Lake">
            <p>
              The City of The Colony describes its location on the eastern shore of Lewisville Lake, with lake parks
              offering boat ramps, camping, fishing and swimming. Homes near the shoreline call for two checks: the
              property’s current flood-zone designation and whether a U.S. Army Corps of Engineers flowage easement
              affects the land. The Corps describes such an easement as private land on which the government holds the
              perpetual right to flood, with restrictions on use.
            </p>
            <p>
              Lake proximity is then examined through sales of homes with similar exposure, not assumed to add or
              subtract value.
            </p>
          </CitySection>

          <CitySection id="the-colony-county" heading="County and school district" tone="muted">
            <p>
              The U.S. Census Bureau’s 2020 place-by-county reference file places The Colony in Denton County. The
              Handbook of Texas notes that Lewisville Independent School District built the city’s early schools. School
              district boundaries do not always follow city limits, so the appraiser confirms the district for the
              specific property rather than assuming it from the address.
            </p>
          </CitySection>

          <CitySection id="the-colony-services" heading="Appraisal assignments in The Colony">
            <ul>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing appraisals</Link> for owners of updated or original
                homes.
              </li>
              <li>
                <Link to="/estate-date-of-death-appraisal/">Estate appraisals</Link> for homes held since the city’s
                early years.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> for attorneys and their clients.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="the-colony-faq" heading="The Colony appraisal questions" faqs={faqs["the-colony"]} />

          <CityClosingCta id="the-colony-cta" heading="Request an appraisal in The Colony">
            <p>
              Tell us the address, the home’s approximate age and major updates, and the purpose of the appraisal. We
              will follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="the-colony-related"
            heading="Nearby appraisal guides"
            links={[
              { to: "/service-areas/denton-county/little-elm/", label: "Little Elm", note: "Lakefront homes and the 2011 flood-map revision." },
              { to: "/service-areas/denton-county/lewisville/", label: "Lewisville", note: "Lake history and a planned mix of housing." },
              { to: "/service-areas/collin-county/frisco/", label: "Frisco", note: "Two counties, 200+ HOAs and the Rail District." },
              { to: "/service-areas/denton-county/", label: "Denton County service areas", note: "How Denton County’s markets differ." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4872530", "The Colony city"),
              { label: "City of The Colony — City History", href: "https://www.thecolonytx.gov/692/City-History" },
              { label: "City of The Colony — Lake Parks", href: "https://www.thecolonytx.gov/977/Lake-Parks" },
              { label: "U.S. Army Corps of Engineers — Adjacent landowner and flowage easement information", href: "https://www.swf-wc.usace.army.mil/lewisville/Realestate/Adjland.shtml" },
              { label: "Texas State Historical Association — Handbook of Texas, “The Colony, TX”", href: "https://www.tshaonline.org/handbook/entries/colony-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

TheColony.displayName = "TheColony";

export default TheColony;
