import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import CoreAppraisalServiceCards from "@/components/sections/CoreAppraisalServiceCards";
import CoreAppraisalWhyChooseUs from "@/components/sections/CoreAppraisalWhyChooseUs";
import Footer from "@/components/sections/Footer";
import ServiceCardsGrid9ServicesResidentialUrar from "@/components/sections/ServiceCardsGrid9ServicesResidentialUrar";
// Site domain configuration — all canonical URLs and absolute references use this authority
import { SITE_CONFIG } from "@/config/site";

const CoreAppraisalServices = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="core-appraisal-services">
      <div ref={ref} className="overflow-x-hidden w-full max-w-[100vw]">
        <Header />
        <SectionErrorBoundary sectionName="ServiceCardsGrid9ServicesResidentialUrar">
          <ServiceCardsGrid9ServicesResidentialUrar />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="CoreAppraisalServiceCards">
          <CoreAppraisalServiceCards />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="CoreAppraisalWhyChooseUs">
          <CoreAppraisalWhyChooseUs />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

CoreAppraisalServices.displayName = "CoreAppraisalServices";

export default CoreAppraisalServices;
