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
 * Richardson, TX geographic page (11/24/2026). Emphasis: transit-oriented
 * planning, separately zoned redevelopment districts and the difference
 * between adopted policy and built conditions. Facts: DAS City Research
 * Profile — Richardson (municipal sources checked 11/13–11/24/2026).
 */
const Richardson = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-dallas-county-richardson">
      <div ref={ref}>
        <Header />
        <main>
          <CityHero
            id="richardson-hero"
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Service Areas", to: "/service-areas/" },
              { label: "Dallas County", to: "/service-areas/dallas-county/" },
              { label: "Richardson" },
            ]}
            eyebrow="Richardson, Texas"
            title="Richardson Home Appraisals"
          >
            <p>
              Richardson is in the middle of a deliberate shift: new regional rail stations, a comprehensive plan
              adopted in 2024 and redevelopment districts with their own zoning. For homeowners and their advisors,
              the practical question is how much of that change is already reflected in the market — and how much
              is still on paper.
            </p>
            <p>
              American Appraisal Alliance provides independent, USPAP-compliant appraisals of Richardson residential
              property for homeowners, attorneys, lenders and real estate professionals.
            </p>
          </CityHero>

          <CitySection id="richardson-rail" heading="A city re-planning around rail">
            <p>
              According to the City of Richardson, DART Silver Line passenger service began on October 25, 2025.
              The 26-mile line links Plano with DFW Airport, and Richardson’s stations are CityLine/Bush and
              UT Dallas.
            </p>
            <p>
              One year earlier, on November 11, 2024, the city approved <em>Envision Richardson</em>, a comprehensive
              plan replacing its 2009 framework. The plan identifies enhancement areas and encourages
              transit-oriented development near DART stations.
            </p>
            <p>
              The companion Cotton Belt Trail is being built in phases. The city describes completed Phase 1 bridge
              work, Phase 2 construction that began in spring 2025 covering more than 11 miles of segments between
              Addison and Plano, and a future Phase 3 — so the trail should not be assumed to be open along its
              full length.
            </p>
          </CitySection>

          <CitySection id="richardson-cityline" heading="CityLine: one name, three zoning districts" tone="muted">
            <p>
              On a map, CityLine reads as one place, bounded by Central Expressway on the west and Wyndham Lane on
              the east. In zoning terms it is three: the City of Richardson governs the planned development
              through a separate ordinance for each segment.
            </p>
            <FactTable
              caption="CityLine planned-development segments, City of Richardson"
              head={["Segment", "General extent"]}
              rows={[
                ["CityLine West", "Central Expressway to the DART rail line"],
                ["CityLine", "DART rail line to Plano Road"],
                ["CityLine East", "Plano Road to Wyndham Lane"],
              ]}
            />
            <p>
              Within and around the district, CityLine Park ties into the Central Trail and the CityLine DART
              station. Below CityLine, the city’s Spring Creek Nature Area protects a hardwood forest of over 100
              acres that connects with the Galatyn Woodland Preserve — a reminder that a mixed-use district and a
              forest preserve can sit within a short distance of each other.
            </p>
          </CitySection>

          <CitySection id="richardson-iq" heading="The Richardson Innovation Quarter">
            <p>
              The Innovation Quarter is a district of roughly 1,200 acres, generally bounded by US 75, Campbell
              Road, Plano Road and Apollo Road. The city and UT Dallas opened the 27,500-square-foot IQ headquarters
              at 1302 East Collins Boulevard on September 15, 2022, and the city reported a nearly two-mile Duck
              Creek Trail extension next to it. In August 2025 the city reviewed planned-development rezoning and
              public infrastructure investment for the district.
            </p>
            <p>
              The district’s boundary is a planning description, not a ZIP code or a neighborhood boundary. When a
              home lies near the district, the appraiser describes the surrounding land uses accurately and looks to
              sales — not to the district’s name — for any effect on value.
            </p>
          </CitySection>

          <CitySection id="richardson-parks" heading="Parks and creek corridors" tone="muted">
            <p>
              Richardson’s parks department lists, among others, Canyon Creek Park, Prairie Creek Park, Cottonwood
              Park, CityLine Park and the Galatyn Woodland Preserve. Creek corridors and preserves like these can
              separate one residential area from the next, which is one reason the appraiser examines where a
              comparable sits — not just how far away it is.
            </p>
          </CitySection>

          <CitySection id="richardson-method" heading="Turning Richardson’s planning record into appraisal evidence">
            <ol>
              <li>
                <strong>Confirm current zoning.</strong> Richardson’s interactive Zoning Atlas reports current zoning
                and special permits; its downloadable PDF is updated annually, so the interactive version is the
                better reference.
              </li>
              <li>
                <strong>Separate policy from what is built.</strong> A comprehensive plan or rezoning describes what
                may happen. The appraisal describes the property and neighborhood as they exist on the effective date.
              </li>
              <li>
                <strong>Let sales show the market’s response.</strong> Rail access, new districts and trails are
                considered only to the extent comparable sales demonstrate their influence.
              </li>
              <li>
                <strong>Define the market area carefully.</strong> Corridors, district boundaries and greenbelts can
                divide homes that are close together on a map.
              </li>
            </ol>
          </CitySection>

          <CitySection id="richardson-services" heading="Richardson appraisal assignments" tone="muted">
            <ul>
              <li>
                <Link to="/residential-appraisal/">Full URAR residential appraisals</Link> for purchase, refinance and private use.
              </li>
              <li>
                <Link to="/pre-purchase-appraisal/">Pre-purchase appraisals</Link> for buyers weighing a home near a
                station or redevelopment district.
              </li>
              <li>
                <Link to="/divorce-appraisal/">Divorce</Link> and{" "}
                <Link to="/estate-date-of-death-appraisal/">estate appraisals</Link> for attorneys and families.
              </li>
              <li>
                <Link to="/tax-assessment-appeal/">Tax assessment appeal appraisals</Link> and{" "}
                <Link to="/desktop-appraisal/">desktop appraisals</Link> where the scope allows.
              </li>
            </ul>
          </CitySection>

          <CityFaq id="richardson-faq" heading="Richardson appraisal questions" faqs={faqs.richardson} />

          <CityClosingCta id="richardson-cta" heading="Talk with us about a Richardson property">
            <p>
              Send the address, the purpose of the appraisal and any timing requirements. We will reply to confirm
              scope, fee and scheduling before accepting the assignment.
            </p>
          </CityClosingCta>

          <RelatedLinks
            id="richardson-related"
            heading="Neighboring appraisal guides"
            links={[
              { to: "/service-areas/collin-county/plano/", label: "Plano", note: "Silver Line endpoint, preserves and heritage districts." },
              { to: "/service-areas/collin-county/frisco/", label: "Frisco", note: "A two-county city with 200+ HOAs." },
              { to: "/service-areas/collin-county/mckinney/", label: "McKinney", note: "Historic designations and annexation." },
              { to: "/service-areas/dallas-county/", label: "Dallas County service areas", note: "Richardson, Addison and North Dallas." },
            ]}
          />

          <SourceList
            checked="November 2026"
            sources={[
              { label: "City of Richardson — DART Silver Line", href: "https://www.cor.net/departments/traffic-transportation/cotton-belt-rail-line" },
              { label: "City of Richardson — Silver Line service announcement (10/31/2025)", href: "https://www.cor.net/Home/Components/News/News/8408/149" },
              { label: "City of Richardson — Comprehensive Planning", href: "https://www.cor.net/departments/development-services/comprehensive-planning-6014" },
              { label: "City of Richardson — Cotton Belt Trail", href: "https://www.cor.net/departments/transportation-mobility/active-transportation/project-updates/cotton-belt-trail" },
              { label: "City of Richardson — CityLine Planned Development", href: "https://www.cor.net/departments/development-services/regulations-and-guidelines/cityline-planned-development" },
              { label: "City of Richardson — Zoning Atlas", href: "https://www.cor.net/departments/development-services/maps/zoning-atlas" },
              { label: "City of Richardson — Innovation Quarter HQ opens (09/15/2022)", href: "https://www.cor.net/Home/Components/News/News/6583/73" },
              { label: "City of Richardson — Week in Review (08/22/2025)", href: "https://www.cor.net/Home/Components/News/News/8300/149" },
              { label: "City of Richardson — Park Locations", href: "https://www.cor.net/departments/parks-recreation/parks-trails/park-locations-rules" },
              { label: "City of Richardson — Spring Creek Nature Area", href: "https://www.cor.net/departments/parks-recreation/parks-trails/spring-creek-nature-area" },
            ]}
          />
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

Richardson.displayName = "Richardson";

export default Richardson;
