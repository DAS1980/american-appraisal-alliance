import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

/**
 * Structural placeholder hub for /service-areas/collin-county/. Lists city
 * pages only; substantive content to be developed separately.
 */
const CollinCounty = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-collin-county">
      <div ref={ref}>
        <Header />
        <main className="container max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[hsl(218_60%_20%)] mb-4">
            Collin County Service Areas
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            American Appraisal Alliance serves the following Collin County communities. Some cities, such as Frisco,
            extend into neighboring counties, so a property’s county and city limits are confirmed from parcel
            records during each assignment.
          </p>
          <ul className="space-y-2 text-left max-w-xs mx-auto">
            <li>
              <Link to="/service-areas/collin-county/allen/" className="underline hover:text-foreground transition-colors">
                Allen
              </Link>
              <span className="block text-sm text-muted-foreground">
                Local guide: neighborhood plat eras, housing types and the Downtown District.
              </span>
            </li>
            <li>
              <Link to="/service-areas/collin-county/celina/" className="underline hover:text-foreground transition-colors">
                Celina
              </Link>
            </li>
            <li>
              <Link to="/service-areas/collin-county/frisco/" className="underline hover:text-foreground transition-colors">
                Frisco
              </Link>
              <span className="block text-sm text-muted-foreground">
                Local guide: two counties, 200+ HOAs and the Rail District.
              </span>
            </li>
            <li>
              <Link to="/service-areas/collin-county/mckinney/" className="underline hover:text-foreground transition-colors">
                McKinney
              </Link>
              <span className="block text-sm text-muted-foreground">
                Local guide: historic designations, annexation and downtown timelines.
              </span>
            </li>
            <li>
              <Link to="/service-areas/collin-county/plano/" className="underline hover:text-foreground transition-colors">
                Plano
              </Link>
              <span className="block text-sm text-muted-foreground">
                Local guide: preserves, heritage districts and rental registration.
              </span>
            </li>
            <li>
              <Link to="/service-areas/collin-county/prosper/" className="underline hover:text-foreground transition-colors">
                Prosper
              </Link>
            </li>
          </ul>
          <p className="mt-10">
            <Link
              to="/request/#appraisal-form"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg px-7 py-3 font-semibold shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)", color: "hsl(218 65% 14%)" }}
            >
              Request an Appraisal
            </Link>
          </p>
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

CollinCounty.displayName = "CollinCounty";

export default CollinCounty;
