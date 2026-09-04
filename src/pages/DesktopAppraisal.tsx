import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import DesktopAppraisalHero from "@/components/sections/DesktopAppraisalHero";
import DesktopAppraisalOverview from "@/components/sections/DesktopAppraisalOverview";
import DesktopAppraisalWhyChooseUs from "@/components/sections/DesktopAppraisalWhyChooseUs";
import Footer from "@/components/sections/Footer";

/** Primary production domain for all canonical URL references */
export const SITE_BASE_URL = "https://americanappraisalalliance.com";

const DesktopAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="desktop_appraisal">
      <div ref={ref} className="w-full max-w-[100vw] overflow-x-hidden">
        <Header />
        <SectionErrorBoundary sectionName="DesktopAppraisalHero">
          <DesktopAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="DesktopAppraisalOverview">
          <DesktopAppraisalOverview />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="DesktopAppraisalWhyChooseUs">
          <DesktopAppraisalWhyChooseUs />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

DesktopAppraisal.displayName = "DesktopAppraisal";

export default DesktopAppraisal;
