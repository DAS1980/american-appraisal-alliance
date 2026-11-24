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
 * Allen, TX geographic page (11/24/2026). Emphasis: development periods and
 * housing types recorded in the City of Allen's Residential Neighborhoods GIS,
 * subdivision/phase-based comparable selection, jurisdiction vs. ZIP code, and
 * the new Downtown District. Facts: Allen research enrichment of 11/24/2026
 * (City of Allen GIS and website; TSHA Handbook of Texas).
 */
const AllenTx = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="allen-tx">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="allen-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Collin County", to: "/service-areas/collin-county/" },
              { label: "Allen" },
            ]}
            eyebrow="Allen, Texas"
            title="Allen, TX Home Appraisals"
          >
            <p>
              Most of Allen’s single-family neighborhoods were platted within a span of about twenty years, and the
              city keeps a detailed public map of them. For an appraiser, that record is a practical starting point:
              it shows when a neighborhood was created, what kind of housing it holds and how large it is — the
              details that decide which sales really compare.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Allen homes for
              owners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="allen-waves" heading="Allen’s neighborhoods were built in waves">
            <p>
              The Handbook of Texas records Allen as a railroad town established in 1870 that stayed small for most
              of a century, then grew quickly from the late 1960s: from 1,940 residents in 1970 to 8,314 in 1980,
              18,309 in 1990 and 43,554 in 2000. The City of Allen’s Residential Neighborhoods map shows the same
              story in the ground itself. Grouping its single-family detached neighborhoods by the plat year the
              city records:
            </p>
            <FactTable
              caption="Single-family detached neighborhoods by recorded plat decade, City of Allen Residential Neighborhoods map"
              head={["Plat decade", "Neighborhoods · homes recorded"]}
              rows={[
                ["1960s", "1 neighborhood · 183 homes"],
                ["1970s", "9 neighborhoods · 2,205 homes"],
                ["1980s", "12 neighborhoods · 3,833 homes"],
                ["1990s", "29 neighborhoods · 11,133 homes"],
                ["2000s", "36 neighborhoods · 8,944 homes"],
                ["2010s", "23 neighborhoods · 3,205 homes"],
                ["2020s", "1 neighborhood · count not recorded"],
              ]}
            />
            <p>
              Roughly two-thirds of the single-family homes counted in the map sit in neighborhoods platted between
              1990 and 2009. The largest include Twin Creeks (platted 1993, 2,512 homes recorded), Lost Creek Ranch
              (2002), Fountain Park (1982), Cottonwood Bend (1991) and Starcreek (2005). Plat year marks when a
              neighborhood was laid out, not when every house in it was finished, so it is a guide to era rather
              than a substitute for each property’s own records.
            </p>
          </CitySection>

          <CitySection id="allen-comparables" heading="Why subdivision and phase come before distance" tone="muted">
            <p>
              Because Allen’s subdivisions were laid out in distinct eras, the most reliable comparable is usually
              found inside the subject’s own subdivision — and ideally its own phase. A sale half a
              mile away in a neighborhood platted twenty years earlier may share a ZIP code but differ in lot size,
              construction era, floor plans and amenities.
            </p>
            <h3>How the appraiser works through it</h3>
            <ol>
              <li>Identify the subject’s subdivision, phase and plat from public records.</li>
              <li>Search the same subdivision and phase first, then neighborhoods of a similar era and size.</li>
              <li>Widen the search only when the market area lacks recent, similar sales — and explain why.</li>
              <li>Adjust for real differences (size, condition, updates, lot) supported by market evidence.</li>
            </ol>
          </CitySection>

          <CitySection id="allen-housing-types" heading="More than detached homes">
            <p>
              Of the 176 neighborhood and association areas in the city’s map, 112 are classified as single-family
              detached, 15 as single-family attached such as townhomes, 28 as multifamily, 14 as senior residential
              and 3 as mixed use. Each type competes in its own market. A townhome is compared with other attached
              homes, and a property in a senior or age-restricted community is compared with similar communities,
              because the pool of buyers is different.
            </p>
            <p>
              The map, maintained by the city’s Community Enhancement department, covers both neighborhoods and
              homeowners associations. Association dues, amenities and deed restrictions
              are part of a property’s market context, so the appraiser may ask for the association name and its
              governing documents.
            </p>
          </CitySection>

          <CitySection id="allen-downtown" heading="Downtown Allen: a new district with its own review board" tone="muted">
            <p>
              Allen’s historic core is being reshaped through a public process. According to the City of Allen, a
              resident-led steering committee worked from June 2021 to July 2022 on what became the Downtown Allen
              Revitalization Plan. In January 2023 the city replaced its “Central Business District” zoning with a
              Downtown District and created a Downtown Design Review Board to oversee modifications within the
              district and designate culturally significant structures.
            </p>
            <p>
              Since then the city has approved a $7.8 million purchase of about seven acres at the northeast corner
              of US 75 and West Main Street (March 2025) and, in March 2026, agreements for a $17 million Downtown
              Catalyst Project near McDermott Drive and Allen Drive that plans to preserve the original fire station
              and the “Blue House,” once the town’s early library.
            </p>
            <p>
              For an appraisal, the zoning district and any design-review requirements are verified facts about a
              property. Approved projects that are not yet built are noted as context and weighed only to the extent
              the market already reflects them.
            </p>
          </CitySection>

          <CitySection id="allen-boundaries" heading="Creeks, city limits and ZIP codes">
            <p>
              The city’s GIS maps a network of creeks running through Allen — among them Cottonwood, Rowlett, West
              Rowlett, Watters, Mustang and Sloan creeks — along with dozens of public parks and a hike-and-bike trail
              system. Homes backing onto a creek corridor or greenbelt are checked for flood-zone status, and any
              difference in value has to be shown by comparable sales rather than assumed.
            </p>
            <p>
              In the City of Allen’s address map, nearly every address carries one of two ZIP codes, 75013 or 75002,
              in close to equal numbers. ZIP codes are still delivery areas rather than city limits: the same map
              shows a handful of 75002 addresses assigned to neighboring communities, and the city separately maps an
              extraterritorial jurisdiction (ETJ) outside its limits. Whether a property is inside Allen affects taxes,
              zoning and services, so the appraiser confirms it from boundary and parcel records.
            </p>
          </CitySection>

          <CitySection id="allen-services" heading="Allen appraisal assignments" tone="muted">
            <ul>
              <li>
                <Link to="/pre-listing-appraisal/">Pre-listing appraisals</Link> for owners pricing a home against
                recent sales in their own subdivision.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce appraisals</Link> and{" "}
                <Link to="/estate-date-of-death-appraisal/">estate and date-of-death appraisals</Link> for attorneys,
                executors and families.
              </li>
              <li>
                <Link to="/pmi-removal-appraisal/">PMI removal appraisals</Link> for owners whose loan servicer asks
                for an independent value.
              </li>
              <li>
                <Link to="/tax-assessment-appeal/">Tax assessment appeal appraisals</Link> that compare the subject
                with sales from its own development era.
              </li>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> for purchase, refinance and private use.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="allen-faq" heading="Allen appraisal questions" faqs={faqs.allen} />

          <CityClosingCta id="allen-cta" heading="Request an Allen appraisal">
            <p>
              Share the address, subdivision if you know it, the purpose of the appraisal and any relevant dates. We
              will follow up to confirm scope, fee and scheduling.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="allen-related"
            heading="Neighboring appraisal guides"
            links={[
              { to: "/service-areas/collin-county/plano/", label: "Plano", note: "Preserves, heritage districts and rental regulation." },
              { to: "/service-areas/collin-county/mckinney/", label: "McKinney", note: "Historic designations and annexation boundaries." },
              { to: "/service-areas/collin-county/frisco/", label: "Frisco", note: "Two counties, 200+ HOAs and the Rail District." },
              { to: "/service-areas/collin-county/", label: "Collin County service areas", note: "All Collin County communities we serve." },
            ]}
          />

          <SourceList
            checked="November 24, 2026"
            sources={[
              { label: "City of Allen GIS — Residential Neighborhoods (public)", href: "https://gismaps.cityofallen.org/arcgis/rest/services/CommunityEnhancement/Residential_Neighborhoods_Public/FeatureServer/0" },
              { label: "City of Allen GIS — Reference map (addresses, creeks, parks, trails, city limits)", href: "https://gismaps.cityofallen.org/arcgis/rest/services/ReferenceData/AllenMap4Tyler/MapServer" },
              { label: "City of Allen — Downtown Revitalization", href: "https://www.cityofallen.org/departments/community_development/allen_downtown_revitalization.php" },
              { label: "Texas State Historical Association — Handbook of Texas, “Allen, TX”", href: "https://www.tshaonline.org/handbook/entries/allen-tx" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

AllenTx.displayName = "AllenTx";

export default AllenTx;
