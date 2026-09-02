import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import PreListingAppraisalHero from "@/components/sections/PreListingAppraisalHero";
import PreListingServiceDetail from "@/components/sections/PreListingServiceDetail";
import PreListingWhyChooseUs from "@/components/sections/PreListingWhyChooseUs";
import PreListingCTA from "@/components/sections/PreListingCTA";
import Footer from "@/components/sections/Footer";

const SITE_BASE_URL = "https://americanappraisalalliance.com";

const PreListingAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout
      currentPage="pre_listing_appraisal"
      canonicalUrl={`${SITE_BASE_URL}/pre-listing-appraisal`}
    >
      <div ref={ref} className="overflow-x-hidden w-full max-w-[100vw]">
        <Header />
        <SectionErrorBoundary sectionName="PreListingAppraisalHero">
          <PreListingAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PreListingServiceDetail">
          <PreListingServiceDetail />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PreListingWhyChooseUs">
          <PreListingWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PreListingCTA">
          <PreListingCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

PreListingAppraisal.displayName = "PreListingAppraisal";

export default PreListingAppraisal;
