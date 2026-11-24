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
 * Lewisville, TX geographic page (11/24/2026). Emphasis: a city shaped by the
 * lake, interstate and airport; single-family and multifamily as separate
 * markets; USACE flowage easements; Dallas/Denton county split. Facts: Census
 * 2020 place-by-county file, ACS 2020–2024, TSHA, USACE Lewisville Lake.
 */
const Lewisville = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-denton-county-lewisville">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="lewisville-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Denton County", to: "/service-areas/denton-county/" },
              { label: "Lewisville" },
            ]}
            eyebrow="Lewisville, Texas"
            title="Lewisville, TX Real Estate Appraisals"
          >
            <p>
              Lewisville grew alongside a federal reservoir, an interstate and a major airport. The result is a city
              with a genuine mix of housing — detached homes, townhomes and a large multifamily sector — and with some
              property near the lake where federal flood rights may apply. Each of those facts shapes how a
              Lewisville appraisal is approached.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Lewisville residential
              property for owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="lewisville-lake" heading="A city built beside a reservoir">
            <p>
              According to the U.S. Army Corps of Engineers, the City of Dallas built the original Lake Dallas in the
              1920s, with Garza Dam on the Elm Fork of the Trinity River completed in 1927. The Corps began building the
              Lewisville Dam in 1948; the lake it created was completed in 1955 and later renamed Lewisville Lake,
              combining with the earlier lake after the old dam was breached.
            </p>
            <p>
              The Handbook of Texas ties Lewisville’s growth to that expansion, to Interstate 35E and to
              Dallas–Fort Worth International Airport: the city had 5,439 residents in 1960, 46,521 in 1990 and 77,737
              in 2000. It describes Lewisville as “a planned mix of single and multiple family housing.”
            </p>
          </CitySection>

          <CitySection id="lewisville-easements" heading="Flowage easements near the lake" tone="muted">
            <p>
              The Corps publishes guidelines for owners of land adjacent to government property at Lewisville and Ray
              Roberts lakes and for land carrying a flowage easement. It describes a flowage easement as privately
              owned land on which the government holds the perpetual right to flood, with restrictions on what owners
              may do there, and it advises buyers to consider these issues before purchasing adjacent property.
            </p>
            <p>
              For an appraisal, an easement like this is part of the property rights being valued. The appraiser
              identifies it from title, survey or plat information, checks the property’s flood-zone designation, and
              looks to sales of similarly affected properties before reaching a conclusion.
            </p>
          </CitySection>

          <CitySection id="lewisville-housing" heading="Single-family and multifamily as separate markets">
            <FactTable
              caption="Lewisville housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Single-family detached", "About 46%"],
                ["Single-family attached (such as townhomes)", "About 6%"],
                ["Homes in buildings of 5 or more units", "About 40%"],
                ["Owner-occupied", "About 46%"],
                ["Median year built", "1997"],
              ]}
            />
            <p>
              These Census estimates include rental apartments, and they show why property type is the first filter
              in any Lewisville search for comparables. A detached home, a townhome and a condominium unit each draw
              different buyers and carry different ownership costs, so each is compared with sales of its own kind
              before location and condition are weighed.
            </p>
          </CitySection>

          <CitySection id="lewisville-counties" heading="Denton County — and Dallas County" tone="muted">
            <p>
              Lewisville appears in our Denton County directory, but the U.S. Census Bureau’s 2020 place-by-county
              reference file places the city in both Denton and Dallas counties. The parcel record establishes which
              county — and which appraisal district — applies to a specific property.
            </p>
          </CitySection>

          <CitySection id="lewisville-services" heading="Lewisville appraisal assignments">
            <ul>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> for detached homes and
                townhomes.
              </li>
              <li>
                <Link to="/pre-purchase-appraisal/">Pre-purchase appraisals</Link> for buyers considering lake-area
                property.
              </li>
              <li>
                <Link to="/tax-assessment-appeal/">Tax assessment appeal appraisals</Link> with the correct county
                identified.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce</Link> and{" "}
                <Link to="/estate-date-of-death-appraisal/">estate appraisals</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="lewisville-faq" heading="Lewisville appraisal questions" faqs={faqs.lewisville} />

          <CityClosingCta id="lewisville-cta" heading="Discuss a Lewisville appraisal">
            <p>
              Send the address, property type, the purpose of the appraisal and any known easements or deadlines. We
              will follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="lewisville-related"
            heading="Nearby appraisal guides"
            links={[
              { to: "/service-areas/denton-county/the-colony/", label: "The Colony", note: "A 1970s planned community on the lake’s east shore." },
              { to: "/service-areas/denton-county/little-elm/", label: "Little Elm", note: "Lakefront homes and the 2011 flood-map revision." },
              { to: "/service-areas/denton-county/carrollton/", label: "Carrollton", note: "Three counties and a 1970s building boom." },
              { to: "/service-areas/denton-county/", label: "Denton County service areas", note: "How Denton County’s markets differ." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4842508", "Lewisville city"),
              { label: "U.S. Army Corps of Engineers — History of Lewisville Lake", href: "https://www.swf-wc.usace.army.mil/lewisville/Information/History.shtml" },
              { label: "U.S. Army Corps of Engineers — Adjacent landowner and flowage easement information", href: "https://www.swf-wc.usace.army.mil/lewisville/Realestate/Adjland.shtml" },
              { label: "Texas State Historical Association — Handbook of Texas, “Lewisville, TX (Denton County)”", href: "https://www.tshaonline.org/handbook/entries/lewisville-tx-denton-county" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

Lewisville.displayName = "Lewisville";

export default Lewisville;
