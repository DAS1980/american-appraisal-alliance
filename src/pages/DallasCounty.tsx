import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

/**
 * Structural placeholder hub for /service-areas/dallas-county/. Lists city
 * pages only; substantive content to be developed separately.
 */
const DallasCounty = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-dallas-county">
      <div ref={ref}>
        <Header />
        <main className="container max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[hsl(218_60%_20%)] mb-4">
            Dallas County Service Areas
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            American Appraisal Alliance serves the following Dallas County communities. A property’s county and
            city limits are confirmed from parcel records during each assignment.
          </p>
          <ul className="space-y-2 text-left max-w-xs mx-auto">
            <li>
              <Link to="/service-areas/dallas-county/addison/" className="underline hover:text-foreground transition-colors">
                Addison
              </Link>
            </li>
            <li>
              <Link to="/service-areas/dallas-county/north-dallas/" className="underline hover:text-foreground transition-colors">
                North Dallas
              </Link>
            </li>
            <li>
              <Link to="/service-areas/dallas-county/richardson/" className="underline hover:text-foreground transition-colors">
                Richardson
              </Link>
              <span className="block text-sm text-muted-foreground">
                Local guide: Silver Line stations, CityLine zoning and the Innovation Quarter.
              </span>
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

DallasCounty.displayName = "DallasCounty";

export default DallasCounty;
