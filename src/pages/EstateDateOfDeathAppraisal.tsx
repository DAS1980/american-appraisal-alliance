import React from "react";
// Primary production domain: https://americanappraisalalliance.com
export const SITE_BASE_URL = "https://americanappraisalalliance.com";
import { PageLayout } from "@/components/layout/PageLayout";

import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import EstateAppraisalHero from "@/components/sections/EstateAppraisalHero";
import EstateAppraisalWhatItIs from "@/components/sections/EstateAppraisalWhatItIs";
import EstateAppraisalWhatsIncluded from "@/components/sections/EstateAppraisalWhatsIncluded";
import EstateAppraisalWhyChooseUs from "@/components/sections/EstateAppraisalWhyChooseUs";
import EstateAppraisalCTA from "@/components/sections/EstateAppraisalCTA";
import Footer from "@/components/sections/Footer";

const EstateDateOfDeathAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="estate___date_of_death_appraisal">
      {/* Canonical URL for this page — authority: americanappraisalalliance.com */}
      <link
        rel="canonical"
        href={`${SITE_BASE_URL}/estate-date-of-death-appraisal`}
      />
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="EstateAppraisalHero">
          <EstateAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="EstateAppraisalWhatItIs">
          <EstateAppraisalWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="EstateAppraisalWhatsIncluded">
          <EstateAppraisalWhatsIncluded />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="EstateAppraisalWhyChooseUs">
          <EstateAppraisalWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="EstateAppraisalCTA">
          <EstateAppraisalCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

EstateDateOfDeathAppraisal.displayName = "EstateDateOfDeathAppraisal";

export default EstateDateOfDeathAppraisal;
