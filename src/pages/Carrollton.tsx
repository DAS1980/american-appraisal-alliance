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
 * Carrollton, TX geographic page (11/24/2026). Emphasis: a three-county city,
 * a 1970s building boom and the renovation spectrum it produced, rail access.
 * Facts: Census 2020 place-by-county file, ACS 2020–2024, TSHA, DART.
 */
const Carrollton = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-denton-county-carrollton">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="carrollton-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Denton County", to: "/service-areas/denton-county/" },
              { label: "Carrollton" },
            ]}
            eyebrow="Carrollton, Texas"
            title="Carrollton Home Appraisals"
          >
            <p>
              Carrollton spans three counties, and a large share of its homes date from a single decade of rapid
              growth in the 1970s. Two homes built in the same year on the same street can now be worlds apart in
              condition and finish — which makes renovation, not just age, a central question in Carrollton
              appraisals.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Carrollton homes for
              owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="carrollton-counties" heading="Three counties, one city">
            <p>
              Carrollton is listed in our Denton County directory, but the city is not confined to it. The U.S.
              Census Bureau’s 2020 place-by-county reference file places Carrollton in Dallas, Denton and Collin
              counties, and the Handbook of Texas describes the city the same way.
            </p>
            <p>
              The parcel’s county decides which appraisal district values it for taxes and which public records
              apply. For a <Link to="/tax-assessment-appeal/">tax-protest appraisal</Link>, the appraiser confirms the
              county before choosing comparables, and favors sales valued under the same district where the market
              allows.
            </p>
          </CitySection>

          <CitySection id="carrollton-boom" heading="The 1970s boom and what followed" tone="muted">
            <p>
              The Handbook of Texas records Carrollton growing from 13,855 residents in 1970 to 40,595 in 1980 — and
              notes that almost three-quarters of the city’s year-round housing units at that time had been built
              during the 1970s. Growth continued to 82,169 residents in 1990 and 109,576 in 2000.
            </p>
            <FactTable
              caption="Carrollton housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Median year built", "1988"],
                ["Homes built before 1980", "About 26%"],
                ["Homes built 2010 or later", "About 16%"],
                ["Single-family detached", "About 58%"],
                ["Homes in buildings of 5 or more units", "About 29%"],
              ]}
            />
            <p>
              Today’s Census estimates describe a mature city with a substantial older housing stock and a smaller
              share of new construction than suburbs farther north.
            </p>
          </CitySection>

          <CitySection id="carrollton-renovation" heading="When age is not the whole story">
            <p>
              In neighborhoods built within a few years of each other, the differences between sales often come down
              to what owners have done since: kitchens and baths, roofs, windows, mechanical systems, additions and
              conversions. The appraiser documents the subject’s updates carefully and verifies those of the
              comparables, because an unadjusted comparison between an original-condition home and a fully renovated
              one says little about either.
            </p>
            <p>
              Additions and enclosed garages also make finished square footage a frequent question. Where it matters,{" "}
              <Link to="/property-measurement-ansi-z765/">ANSI Z765 measurement</Link> or a{" "}
              <Link to="/gross-living-area-gla-certification/">gross living area certification</Link> can settle it.
            </p>
          </CitySection>

          <CitySection id="carrollton-rail" heading="Rail and the historic downtown" tone="muted">
            <p>
              The Handbook of Texas describes Carrollton’s growth as a rail shipping point after the Cotton Belt line
              crossed the Katy there in 1888. Today DART’s Green Line serves the Downtown Carrollton station, and
              DART’s Silver Line project fact sheet places a Carrollton station at 1205 North Denton Drive with
              connections to the Green Line, Downtown Carrollton and area trails.
            </p>
            <p>
              Station proximity is a location characteristic, not a guaranteed premium; the appraisal considers it
              only to the extent comparable sales show the market’s response as of the effective date.
            </p>
          </CitySection>

          <CitySection id="carrollton-services" heading="Carrollton appraisal assignments">
            <ul>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing appraisals</Link> that account for the home’s updates.
              </li>
              <li>
                <Link to="/estate-date-of-death-appraisal/">Estate and date-of-death appraisals</Link> for long-held
                family homes.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> for attorneys and their clients.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> and{" "}
                <Link to="/market-value-update-1004d-recertification/">1004D updates</Link>.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="carrollton-faq" heading="Carrollton appraisal questions" faqs={faqs.carrollton} />

          <CityClosingCta id="carrollton-cta" heading="Request a Carrollton appraisal">
            <p>
              Share the address, a summary of major updates, the purpose of the appraisal and any deadline. We will
              follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="carrollton-related"
            heading="Nearby appraisal guides"
            links={[
              { to: "/service-areas/denton-county/lewisville/", label: "Lewisville", note: "Lake history and a planned mix of housing." },
              { to: "/service-areas/dallas-county/addison/", label: "Addison", note: "A mostly multifamily housing market." },
              { to: "/service-areas/dallas-county/north-dallas/", label: "North Dallas", note: "Confirming jurisdiction in northern Dallas." },
              { to: "/service-areas/denton-county/", label: "Denton County service areas", note: "How Denton County’s markets differ." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4813024", "Carrollton city"),
              { label: "DART — Silver Line project fact sheet: Carrollton", href: "https://www.dart.org/docs/default-source/silverline/dart-silver-line-project-fact-sheets/carrolltonfactsheet080123.pdf" },
              { label: "Texas State Historical Association — Handbook of Texas, “Carrollton, TX”", href: "https://www.tshaonline.org/handbook/entries/carrollton-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

Carrollton.displayName = "Carrollton";

export default Carrollton;
