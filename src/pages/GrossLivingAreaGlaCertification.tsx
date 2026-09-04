import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import GrossLivingAreaCertificationHero from "@/components/sections/GrossLivingAreaCertificationHero";
import GrossLivingAreaWhatItIs from "@/components/sections/GrossLivingAreaWhatItIs";
import GrossLivingAreaWhyChooseUs from "@/components/sections/GrossLivingAreaWhyChooseUs";
import GrossLivingAreaCTA from "@/components/sections/GrossLivingAreaCTA";
import Footer from "@/components/sections/Footer";

const GrossLivingAreaGlaCertification = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="gross_living_area__gla__certification">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="GrossLivingAreaCertificationHero">
          <GrossLivingAreaCertificationHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="GrossLivingAreaWhatItIs">
          <GrossLivingAreaWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="GrossLivingAreaWhyChooseUs">
          <GrossLivingAreaWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="GrossLivingAreaCTA">
          <GrossLivingAreaCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

GrossLivingAreaGlaCertification.displayName = "GrossLivingAreaGlaCertification";

export default GrossLivingAreaGlaCertification;
