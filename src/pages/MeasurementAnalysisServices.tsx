import React, { useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import MeasurementAnalysisHero from "@/components/sections/MeasurementAnalysisHero";
import MeasurementServiceCards from "@/components/sections/MeasurementServiceCards";
import MeasurementWhyItMatters from "@/components/sections/MeasurementWhyItMatters";
import MeasurementCTA from "@/components/sections/MeasurementCTA";
import Footer from "@/components/sections/Footer";

const SITE_BASE_URL = "https://americanappraisalalliance.com";

const MeasurementAnalysisServices = React.forwardRef<HTMLDivElement>((props, ref) => {
  useEffect(() => {
    const canonicalHref = `${SITE_BASE_URL}/measurement-analysis-services`;
    let link = document.querySelector("link[rel='canonical']") as HTMLElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalHref);
    return () => {
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  return (
    <PageLayout currentPage="measurement-analysis-services">
      <div ref={ref} className="overflow-x-hidden w-full max-w-full">
        <Header />
        <SectionErrorBoundary sectionName="MeasurementAnalysisHero">
          <MeasurementAnalysisHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="MeasurementServiceCards">
          <MeasurementServiceCards />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="MeasurementWhyItMatters">
          <MeasurementWhyItMatters />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="MeasurementCTA">
          <MeasurementCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

MeasurementAnalysisServices.displayName = "MeasurementAnalysisServices";

export default MeasurementAnalysisServices;
