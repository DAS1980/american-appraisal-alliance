import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import FhaHudComplianceHero from "@/components/sections/FhaHudComplianceHero";
import FhaHudWhatItIs from "@/components/sections/FhaHudWhatItIs";
import FhaHudWhyChooseUs from "@/components/sections/FhaHudWhyChooseUs";
import FhaHudCTA from "@/components/sections/FhaHudCTA";
import Footer from "@/components/sections/Footer";
const FhahudComplianceObservationReport = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="fha_hud_compliance_observation_report">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="FhaHudComplianceHero">
          <FhaHudComplianceHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="FhaHudWhatItIs">
          <FhaHudWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="FhaHudWhyChooseUs">
          <FhaHudWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="FhaHudCTA">
          <FhaHudCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

FhahudComplianceObservationReport.displayName = "FhahudComplianceObservationReport";

export default FhahudComplianceObservationReport;
