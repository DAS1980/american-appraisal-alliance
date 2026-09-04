import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";

export const SITE_BASE_URL = "https://americanappraisalalliance.com";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import DivorceAppraisalHero from "@/components/sections/DivorceAppraisalHero";
import DivorceAppraisalWhatItIs from "@/components/sections/DivorceAppraisalWhatItIs";
import DivorceAppraisalWhoNeedsIt from "@/components/sections/DivorceAppraisalWhoNeedsIt";
import DivorceAppraisalWhatsIncluded from "@/components/sections/DivorceAppraisalWhatsIncluded";
import DivorceAppraisalTurnaround from "@/components/sections/DivorceAppraisalTurnaround";
import DivorceAppraisalCTA from "@/components/sections/DivorceAppraisalCTA";
import Footer from "@/components/sections/Footer";

const DivorceAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="divorce-appraisal" baseUrl={SITE_BASE_URL}>
      <div ref={ref} className="overflow-x-hidden w-full max-w-[100vw]">
        <Header />
        <SectionErrorBoundary sectionName="DivorceAppraisalHero">
          <DivorceAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="DivorceAppraisalWhatItIs">
          <DivorceAppraisalWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="DivorceAppraisalWhoNeedsIt">
          <DivorceAppraisalWhoNeedsIt />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="DivorceAppraisalWhatsIncluded">
          <DivorceAppraisalWhatsIncluded />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="DivorceAppraisalTurnaround">
          <DivorceAppraisalTurnaround />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="DivorceAppraisalCTA">
          <DivorceAppraisalCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

DivorceAppraisal.displayName = "DivorceAppraisal";

export default DivorceAppraisal;
