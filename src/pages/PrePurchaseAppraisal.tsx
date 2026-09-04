import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
// Primary production domain: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";
import Header from "@/components/sections/Header";
import PrePurchaseAppraisalHero from "@/components/sections/PrePurchaseAppraisalHero";
import PrePurchaseAppraisalDetails from "@/components/sections/PrePurchaseAppraisalDetails";
import PrePurchaseWhyChooseUs from "@/components/sections/PrePurchaseWhyChooseUs";
import PrePurchaseAppraisalCTA from "@/components/sections/PrePurchaseAppraisalCTA";
import Footer from "@/components/sections/Footer";

const PrePurchaseAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="pre_purchase_appraisal">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="PrePurchaseAppraisalHero">
          <PrePurchaseAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PrePurchaseAppraisalDetails">
          <PrePurchaseAppraisalDetails />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PrePurchaseWhyChooseUs">
          <PrePurchaseWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PrePurchaseAppraisalCTA">
          <PrePurchaseAppraisalCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

PrePurchaseAppraisal.displayName = "PrePurchaseAppraisal";

export default PrePurchaseAppraisal;
