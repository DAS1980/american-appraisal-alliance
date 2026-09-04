import React from "react";

// Primary production domain — all canonical URLs and absolute references use this authority
export const SITE_BASE_URL = "https://americanappraisalalliance.com";

import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import ResidentialAppraisalHero from "@/components/sections/ResidentialAppraisalHero";
import ResidentialAppraisalWhatItIs from "@/components/sections/ResidentialAppraisalWhatItIs";
import ResidentialAppraisalWhoNeedsIt from "@/components/sections/ResidentialAppraisalWhoNeedsIt";
import ResidentialAppraisalWhatsIncluded from "@/components/sections/ResidentialAppraisalWhatsIncluded";
import ResidentialAppraisalTurnaround from "@/components/sections/ResidentialAppraisalTurnaround";
import ResidentialAppraisalCTA from "@/components/sections/ResidentialAppraisalCTA";
import Footer from "@/components/sections/Footer";

const ResidentialAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="residential-appraisal">
      <div ref={ref} className="overflow-x-hidden w-full max-w-[100vw]">
        <Header />
        <SectionErrorBoundary sectionName="ResidentialAppraisalHero">
          <ResidentialAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ResidentialAppraisalWhatItIs">
          <ResidentialAppraisalWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ResidentialAppraisalWhoNeedsIt">
          <ResidentialAppraisalWhoNeedsIt />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ResidentialAppraisalWhatsIncluded">
          <ResidentialAppraisalWhatsIncluded />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ResidentialAppraisalTurnaround">
          <ResidentialAppraisalTurnaround />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ResidentialAppraisalCTA">
          <ResidentialAppraisalCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

ResidentialAppraisal.displayName = "ResidentialAppraisal";

export default ResidentialAppraisal;
