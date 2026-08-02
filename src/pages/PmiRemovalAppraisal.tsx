import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import { siteConfig } from "@/config/site";
import Header from "@/components/sections/Header";
import PMIRemovalAppraisalHero from "@/components/sections/PMIRemovalAppraisalHero";
import PMIRemovalWhatItIs from "@/components/sections/PMIRemovalWhatItIs";
import PMIRemovalWhyChooseUs from "@/components/sections/PMIRemovalWhyChooseUs";
import PMIRemovalCTA from "@/components/sections/PMIRemovalCTA";
import Footer from "@/components/sections/Footer";

const PmiRemovalAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="pmi_removal_appraisal">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="PMIRemovalAppraisalHero">
          <PMIRemovalAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PMIRemovalWhatItIs">
          <PMIRemovalWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PMIRemovalWhyChooseUs">
          <PMIRemovalWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PMIRemovalCTA">
          <PMIRemovalCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

PmiRemovalAppraisal.displayName = "PmiRemovalAppraisal";

export default PmiRemovalAppraisal;
