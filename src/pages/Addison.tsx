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
 * Addison, TX geographic page (11/24/2026). Emphasis: a predominantly
 * multifamily / attached housing market, separate-town status next to Dallas,
 * and the 2026 comprehensive plan. Facts: Census 2020 place-by-county file,
 * ACS 2020–2024, TSHA, Town of Addison (Advance Addison 2050), DART.
 */
const Addison = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-dallas-county-addison">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="addison-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Dallas County", to: "/service-areas/dallas-county/" },
              { label: "Addison" },
            ]}
            eyebrow="Addison, Texas"
            title="Addison Residential Appraisals"
          >
            <p>
              Addison is a small town with an unusual housing profile: most of its homes are in multifamily
              buildings, and detached single-family houses are the minority. Appraising residential property here
              usually means working with condominiums, townhomes and a limited pool of detached-home sales — each
              compared within its own market.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Addison residential
              property for owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="addison-housing" heading="Addison’s housing mix">
            <FactTable
              caption="Addison housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Homes in buildings of 5 or more units", "About 73%"],
                ["Single-family detached", "About 13%"],
                ["Single-family attached (such as townhomes)", "About 5%"],
                ["Owner-occupied", "About 18%"],
                ["Median year built", "1998"],
              ]}
            />
            <p>
              These U.S. Census Bureau survey estimates describe the town as a whole and include rental apartments.
              For the owner-occupied market they explain why individual condominium, townhome and detached-home sales
              can be relatively few in any given period — and why the appraiser documents carefully how comparables
              were chosen.
            </p>
          </CitySection>

          <CitySection id="addison-property-types" heading="Compare like with like" tone="muted">
            <h3>Condominiums</h3>
            <p>
              Sales within the same project are usually the strongest evidence, followed by similar projects nearby.
              Association dues, reserves, amenities and any limits on leasing or financing are part of the property’s
              market, so the appraiser may ask for association documents.
            </p>
            <h3>Townhomes</h3>
            <p>
              Attached homes with fee-simple land are compared with other attached homes, with attention to unit
              size, garage and parking, end-unit position and community amenities.
            </p>
            <h3>Detached homes</h3>
            <p>
              With detached houses a small share of the town, the appraiser may need sales from outside Addison. Any
              such sale is explained and adjusted for the differences — including the different taxes and services
              of another jurisdiction — that the market supports.
            </p>
          </CitySection>

          <CitySection id="addison-town" heading="A separate town beside Dallas">
            <p>
              According to the Handbook of Texas, Addison grew from a railroad junction, took its name from its first
              postmaster in 1904 and incorporated in 1953 in an effort to avoid annexation by Dallas. Addison Airport
              was built in 1956, and the town grew from 595 residents in 1970 to 14,166 in 2000. The Census Bureau’s
              2020 place-by-county reference file places Addison in Dallas County. (The Handbook also mentions
              southern Collin County; the Census record does not list a Collin County portion.)
            </p>
            <p>
              Because Addison is its own municipality, an address there is not a Dallas address in jurisdictional
              terms, even where the two meet. The appraiser confirms the property’s city and county from public
              records.
            </p>
          </CitySection>

          <CitySection id="addison-planning" heading="Planning and transit" tone="muted">
            <p>
              The Town of Addison adopted its <em>Advance Addison 2050</em> Comprehensive Plan on February 10, 2026,
              setting policy for land use, housing, transportation and community facilities. DART’s Silver Line
              regional rail project includes Addison among the cities on its 26-mile route between DFW Airport and
              Plano.
            </p>
            <p>
              Plans and transit are location context. The appraisal reflects the property as of its effective date,
              and any influence of an airport, rail line or planned development has to appear in comparable sales
              rather than be assumed.
            </p>
          </CitySection>

          <CitySection id="addison-services" heading="Addison appraisal assignments">
            <ul>
              <li>
                <Link to="/residential-appraisal/">Full URAR appraisals</Link> for detached homes and townhomes. For a
                condominium unit, describe the property in your inquiry so the appropriate scope can be confirmed.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> and{" "}
                <Link to="/estate-date-of-death-appraisal/">estate appraisals</Link>.
              </li>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing appraisals</Link> for owners pricing a unit against
                recent project sales.
              </li>
              <li>
                <Link to="/desktop-appraisal/">Desktop appraisals</Link> where the intended use allows.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="addison-faq" heading="Addison appraisal questions" faqs={faqs.addison} />

          <CityClosingCta id="addison-cta" heading="Request an Addison appraisal">
            <p>
              Tell us the address, the property type (condominium, townhome or house), the purpose of the appraisal
              and any deadline. We will follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="addison-related"
            heading="Nearby appraisal guides"
            links={[
              { to: "/service-areas/dallas-county/north-dallas/", label: "North Dallas", note: "A description, not a city: confirming jurisdiction." },
              { to: "/service-areas/dallas-county/richardson/", label: "Richardson", note: "Silver Line stations and CityLine zoning." },
              { to: "/service-areas/denton-county/carrollton/", label: "Carrollton", note: "Three counties and a 1970s building boom." },
              { to: "/service-areas/dallas-county/", label: "Dallas County service areas", note: "All Dallas County communities we serve." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4801240", "Addison town"),
              { label: "Town of Addison — Comprehensive Plan (Advance Addison 2050)", href: "https://www.addisontx.gov/Business-Development/Plans-Studies/Comprehensive-Plan" },
              { label: "DART — Silver Line project fact sheet", href: "https://www.dart.org/docs/default-source/silverline/dart-silver-line-project-fact-sheets/carrolltonfactsheet080123.pdf" },
              { label: "Texas State Historical Association — Handbook of Texas, “Addison, TX”", href: "https://www.tshaonline.org/handbook/entries/addison-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

Addison.displayName = "Addison";

export default Addison;
