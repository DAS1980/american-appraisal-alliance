import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import TaxAssessmentAppealHero from "@/components/sections/TaxAssessmentAppealHero";
import TaxAssessmentWhatItIs from "@/components/sections/TaxAssessmentWhatItIs";
import TaxAssessmentWhoNeedsIt from "@/components/sections/TaxAssessmentWhoNeedsIt";
import TaxAssessmentWhatsIncluded from "@/components/sections/TaxAssessmentWhatsIncluded";
import TaxAssessmentTurnaround from "@/components/sections/TaxAssessmentTurnaround";
import TaxAssessmentCTA from "@/components/sections/TaxAssessmentCTA";
import Footer from "@/components/sections/Footer";

const TaxAssessmentAppeal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="tax-assessment-appeal">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="TaxAssessmentAppealHero">
          <TaxAssessmentAppealHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="TaxAssessmentWhatItIs">
          <TaxAssessmentWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="TaxAssessmentWhoNeedsIt">
          <TaxAssessmentWhoNeedsIt />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="TaxAssessmentWhatsIncluded">
          <TaxAssessmentWhatsIncluded />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="TaxAssessmentTurnaround">
          <TaxAssessmentTurnaround />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="TaxAssessmentCTA">
          <TaxAssessmentCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

TaxAssessmentAppeal.displayName = "TaxAssessmentAppeal";

export default TaxAssessmentAppeal;
