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
 * Plano, TX geographic page (11/24/2026). Emphasis: open-space geography,
 * the heritage program and rental-property regulation as factors in defining
 * a competing market area. Facts: DAS City Research Profile — Plano
 * (municipal sources checked 11/13–11/23/2026).
 */
const PlanoTx = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="plano-tx">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="plano-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Collin County", to: "/service-areas/collin-county/" },
              { label: "Plano" },
            ]}
            eyebrow="Plano, Texas"
            title="Home Appraisals in Plano, Texas"
          >
            <p>
              Plano homes share city limits with an 800-acre nature preserve, a historic downtown with its own
              heritage protections, and busy corporate and retail corridors. Those settings rarely compete for the
              same buyers, which is why a reliable Plano appraisal starts by defining the right market area
              before choosing a single comparable sale.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant residential appraisals in Plano for
              homeowners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="plano-market-area" heading="Why a Plano comparable search is more than a radius">
            <p>
              Drawing a circle around a Plano address can capture homes on both sides of a greenbelt, a heritage
              district boundary or a commercial corridor. Sales inside that circle are close, but they are not
              necessarily alternatives a typical buyer would weigh against each other.
            </p>
            <p>
              An appraiser’s first task is to identify the area where the subject property actually competes —
              similar setting, similar property type, similar influences — and then select sales from it. The
              sections below describe the Plano features that most often shape that decision.
            </p>
          </CitySection>

          <CitySection id="plano-open-space" heading="Preserves and greenbelts that frame Plano neighborhoods" tone="muted">
            <p>
              The City of Plano lists several large preserves and creek greenbelts among its parks, several of
              them along the city’s edges and creek corridors:
            </p>
            <FactTable
              caption="Selected Plano preserves, greenbelts and parks, City of Plano"
              head={["Open space", "Scale and setting"]}
              rows={[
                ["Oak Point Park & Nature Preserve", "Approximately 800 acres of park and preserve land."],
                ["Arbor Hills Nature Preserve", "Approximately 200 acres along Plano’s western edge."],
                ["Chisholm Trail", "A creek-side trail corridor through the middle of the city."],
                ["Cottonwood Creek Greenbelt", "An east-side corridor with connections toward Richardson and Allen."],
                ["Windhaven Meadows Park", "A 123-acre neighborhood park; others include Old Shepard Place, Stoney Hollow and Timber Brook."],
              ]}
            />
            <h3>What this means for an appraisal</h3>
            <p>
              Backing onto a preserve or trail is a location characteristic, not a guaranteed premium. Buyers may
              value privacy and views; others may weigh foot traffic or trailhead parking. The appraiser looks for
              sales with and without similar exposure and makes an adjustment only when the market supports one.
              Park names are also not subdivision names, so the appraiser relies on recorded plats and parcel data —
              not proximity to a park — to describe the neighborhood.
            </p>
          </CitySection>

          <CitySection id="plano-heritage" heading="Historic Downtown Plano and the heritage program">
            <p>
              Plano maintains a dedicated Historic Downtown Plano resource, and its Development Services department
              described two heritage districts and 35 heritage landmarks when checked in November 2026. The city’s
              boards include a Heritage Commission, whose remit covers places of historic or architectural
              significance, and an advisory board made up of owners within the Downtown Plano Public Improvement
              District.
            </p>
            <h3>Why designation status matters</h3>
            <p>
              A heritage designation can influence which exterior changes an owner may make. For an older downtown
              home, the most meaningful comparables are often other properties with similar status and age — not
              newer homes a short drive away along the Legacy corporate and retail corridor. Because designations
              apply property by property, the appraiser verifies status with city records rather than assuming it
              from an address or neighborhood label.
            </p>
          </CitySection>

          <CitySection id="plano-rentals" heading="Rental and investor-owned property in Plano" tone="muted">
            <p>
              The City of Plano operates separate registration and inspection programs for multifamily rental
              property and for hotels and motels, and a registration program for short-term rentals. These are
              regulatory categories, but they are useful context when an appraisal involves a rental home.
            </p>
            <p>
              If you are ordering an appraisal for a Plano rental — for an estate, a divorce, a refinance or a
              sale — be prepared to share lease terms, the property’s condition and any applicable registration.
              The appraisal values the real property under the agreed scope; it does not value a rental business.
            </p>
          </CitySection>

          <CitySection id="plano-projects" heading="Rail service and public projects: status, not promises">
            <p>
              Plano is one endpoint of the 26-mile DART Silver Line, which connects to DFW Airport and has carried
              passengers since October 25, 2025, according to the City of Richardson. Plano also publishes an
              interactive capital-improvement map with project status, along with zoning resources that identify
              districts, permitted uses and active petitions.
            </p>
            <p>
              An appraisal is tied to an effective date. A completed rail line is part of the market on that date;
              a proposed road or zoning petition is not. The appraiser checks a project’s current status and
              considers it only to the extent sales show the market has responded.
            </p>
          </CitySection>

          <CitySection id="plano-services" heading="Plano appraisal assignments" tone="muted">
            <p>American Appraisal Alliance accepts a range of residential assignments in Plano, including:</p>
            <ul>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> for purchase, refinance or private use.
              </li>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing appraisals</Link> for owners setting an asking price.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> and{" "}
                <Link to="/estate-date-of-death-appraisal/">estate and date-of-death appraisals</Link>, including
                retrospective effective dates.
              </li>
              <li>
                <Link to="/tax-assessment-appeal/">Tax assessment appeal appraisals</Link> documenting market value as of a specific date.
              </li>
              <li>
                <Link to="/property-measurement-ansi-z765/">ANSI Z765 measurement</Link> for homes where finished
                square footage is in question.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="plano-faq" heading="Plano appraisal questions" faqs={faqs.plano} />

          <CityClosingCta id="plano-cta" heading="Discuss a Plano appraisal">
            <p>
              Share the property address, the purpose of the appraisal and any relevant dates. We will follow up to
              confirm scope, fee and scheduling before an assignment is accepted.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="plano-related"
            heading="Nearby service-area guides"
            links={[
              { to: "/service-areas/dallas-county/richardson/", label: "Richardson", note: "Silver Line stations, CityLine and the Innovation Quarter." },
              { to: "/service-areas/collin-county/frisco/", label: "Frisco", note: "Two counties, 200+ HOAs and the Rail District." },
              { to: "/service-areas/collin-county/mckinney/", label: "McKinney", note: "Historic designations and annexation boundaries." },
              { to: "/service-areas/", label: "All service areas", note: "Collin, Dallas and Denton County communities." },
            ]}
          />

          <SourceList
            checked="November 2026"
            sources={[
              { label: "City of Plano — Nature Preserves & Trails", href: "https://www.plano.gov/nature-preserves-trails" },
              { label: "City of Plano — Neighborhood Parks", href: "https://www.plano.gov/neighborhood-parks" },
              { label: "City of Plano — Historic Downtown Plano", href: "https://www.plano.gov/historic-downtown-plano" },
              { label: "City of Plano — Development Services", href: "https://www.plano.gov/development-services" },
              { label: "City of Plano — Boards and Commissions", href: "https://www.plano.gov/boards-and-commissions" },
              { label: "City of Plano — Property Managers", href: "https://www.plano.gov/property-managers" },
              { label: "City of Plano — Zoning Resources", href: "https://www.plano.gov/zoning-resources" },
              { label: "City of Plano — Capital Improvement Program", href: "https://www.plano.gov/cip" },
              { label: "City of Richardson — DART Silver Line", href: "https://www.cor.net/departments/traffic-transportation/cotton-belt-rail-line" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

PlanoTx.displayName = "PlanoTx";

export default PlanoTx;
