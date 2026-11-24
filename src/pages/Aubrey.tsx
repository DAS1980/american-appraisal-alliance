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
 * Aubrey, TX geographic page (11/24/2026). Emphasis: a small city where new
 * subdivisions meet acreage and horse properties, the one-mile ETJ, and Ray
 * Roberts Lake flowage easements. Facts: Census 2020 place-by-county file,
 * ACS 2020–2024, City of Aubrey (ETJ), TSHA, USACE (Lewisville/Ray Roberts).
 */
const Aubrey = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-denton-county-aubrey">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="aubrey-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Denton County", to: "/service-areas/denton-county/" },
              { label: "Aubrey" },
            ]}
            eyebrow="Aubrey, Texas"
            title="Aubrey, TX Property Appraisals"
          >
            <p>
              Aubrey combines two very different property markets: new subdivision homes inside a small city, and
              rural acreage — including horse properties — in the country around it. A sound Aubrey appraisal keeps
              those markets apart and confirms whether a property sits inside the city, in its extraterritorial
              jurisdiction or beyond.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals in and around Aubrey for
              owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="aubrey-two-markets" heading="New subdivisions and an older rural base">
            <p>
              The Handbook of Texas traces Aubrey to a Texas and Pacific Railway section house in 1881 and describes an
              agricultural area known for peanuts and, in the words of some, as a “horse capital” of Texas, with sandy,
              fertile land that has attracted horse ranchers. The city had 1,500 residents in 2000.
            </p>
            <FactTable
              caption="Aubrey housing characteristics, ACS 2020–2024 5-year estimates"
              head={["Measure", "Estimate"]}
              rows={[
                ["Median year built", "2013"],
                ["Homes built 2010 or later", "About 59%"],
                ["Homes built 2020 or later", "About 30%"],
                ["Homes built before 1980", "About 10%"],
                ["Single-family detached", "About 87%"],
              ]}
            />
            <p>
              Census estimates show how quickly new housing has arrived — and also that an older layer remains. A
              recently built subdivision home and a decades-old house on a larger tract rarely compete for the same
              buyer, so they are appraised against different sets of sales.
            </p>
          </CitySection>

          <CitySection id="aubrey-etj" heading="Inside the city or in the ETJ" tone="muted">
            <p>
              The City of Aubrey explains that it maintains a one-mile extraterritorial jurisdiction around the city
              limits. In the ETJ the city regulates the subdivision of land but does not apply zoning, and property
              owners cannot simply choose which city’s ETJ they belong to.
            </p>
            <p>
              Whether a property is in the city, the ETJ or unincorporated Denton County affects the rules that apply
              to it and the services it receives. The appraiser confirms that status from boundary and parcel records
              and, where possible, compares the property with sales under similar rules.
            </p>
          </CitySection>

          <CitySection id="aubrey-acreage" heading="Appraising acreage and horse properties">
            <p>
              Rural properties are valued against other rural sales. The appraiser considers land area and usable
              acreage, road frontage and access, utilities such as well and septic systems, and improvements like
              barns, arenas and fencing — recognizing that the market may value some outbuildings far less than they
              cost to build. The scope of work is agreed in advance, because a large or specialized agricultural
              property may call for a different type of appraisal than a residence on a few acres.
            </p>
          </CitySection>

          <CitySection id="aubrey-lake" heading="Ray Roberts Lake and flowage easements" tone="muted">
            <p>
              The Handbook of Texas notes that Ray Roberts Dam was completed near Aubrey in 1986 on the Elm Fork of the
              Trinity River. The U.S. Army Corps of Engineers, which manages Ray Roberts and Lewisville lakes,
              publishes guidelines for owners of land next to government property and for land subject to a flowage
              easement — privately owned land on which the government holds the perpetual right to flood, with
              restrictions on what owners may do there.
            </p>
            <p>
              If a property carries a flowage easement, that easement is part of the property rights being appraised.
              The appraiser identifies it from title or survey information and considers its effect using market
              evidence.
            </p>
          </CitySection>

          <CitySection id="aubrey-services" heading="Aubrey appraisal assignments">
            <ul>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> for homes on subdivision lots
                or small acreage.
              </li>
              <li>
                <Link to="/estate-date-of-death-appraisal/">Estate and date-of-death appraisals</Link> for family
                properties.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> for attorneys and their clients.
              </li>
              <li>
                <Link to="/exterior-only-drive-by-appraisal/">Exterior-only appraisals</Link> where the intended use
                allows.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="aubrey-faq" heading="Aubrey appraisal questions" faqs={faqs.aubrey} />

          <CityClosingCta id="aubrey-cta" heading="Request an Aubrey-area appraisal">
            <p>
              Let us know the address, acreage, main improvements and the purpose of the appraisal. We will follow up
              to confirm whether the assignment fits our scope, along with fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="aubrey-related"
            heading="Other Denton County guides"
            links={[
              { to: "/service-areas/denton-county/little-elm/", label: "Little Elm", note: "Lakefront homes and the 2011 flood-map revision." },
              { to: "/service-areas/collin-county/celina/", label: "Celina", note: "City, ETJ and a new-construction market." },
              { to: "/service-areas/denton-county/lewisville/", label: "Lewisville", note: "Lake history and a planned mix of housing." },
              { to: "/service-areas/denton-county/", label: "Denton County service areas", note: "How Denton County’s markets differ." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              ...censusSources("16000US4804600", "Aubrey city"),
              { label: "City of Aubrey — Extra-Territorial Jurisdiction (ETJ)", href: "https://www.aubreytx.gov/330/Extra-Territorial-Jurisdiction-ETJ" },
              { label: "U.S. Army Corps of Engineers — Adjacent landowner and flowage easement information", href: "https://www.swf-wc.usace.army.mil/lewisville/Realestate/Adjland.shtml" },
              { label: "Texas State Historical Association — Handbook of Texas, “Aubrey, TX”", href: "https://www.tshaonline.org/handbook/entries/aubrey-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

Aubrey.displayName = "Aubrey";

export default Aubrey;
