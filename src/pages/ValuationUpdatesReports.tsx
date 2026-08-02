import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import ValuationUpdatesHero from "@/components/sections/ValuationUpdatesHero";
import ValuationUpdatesServiceCards from "@/components/sections/ValuationUpdatesServiceCards";
import ValuationUpdatesWhoNeeds from "@/components/sections/ValuationUpdatesWhoNeeds";
import ValuationUpdatesCTA from "@/components/sections/ValuationUpdatesCTA";
import Footer from "@/components/sections/Footer";

const ValuationUpdatesReports = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="valuation-updates-reports">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="ValuationUpdatesHero">
          <ValuationUpdatesHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ValuationUpdatesServiceCards">
          <ValuationUpdatesServiceCards />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ValuationUpdatesWhoNeeds">
          <ValuationUpdatesWhoNeeds />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ValuationUpdatesCTA">
          <ValuationUpdatesCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

ValuationUpdatesReports.displayName = "ValuationUpdatesReports";

export default ValuationUpdatesReports;
