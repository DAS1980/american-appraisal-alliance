import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

/**
 * Structural placeholder hub for /service-areas/. Lists county hubs only;
 * substantive content to be developed separately.
 */
const ServiceAreas = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas">
      <div ref={ref}>
        <Header />
        <main className="container max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[hsl(218_60%_20%)] mb-4">
            Service Areas
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            American Appraisal Alliance serves the following counties. Full content for this page is coming soon.
          </p>
          <ul className="space-y-2 text-left max-w-xs mx-auto">
            <li>
              <Link to="/service-areas/collin-county/" className="underline hover:text-foreground transition-colors">
                Collin County
              </Link>
            </li>
            <li>
              <Link to="/service-areas/dallas-county/" className="underline hover:text-foreground transition-colors">
                Dallas County
              </Link>
            </li>
            <li>
              <Link to="/service-areas/denton-county/" className="underline hover:text-foreground transition-colors">
                Denton County
              </Link>
            </li>
          </ul>
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

ServiceAreas.displayName = "ServiceAreas";

export default ServiceAreas;
