import React from "react";
import { siteConfig } from "@/config/site";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import AboutHero from "@/components/sections/AboutHero";
import AboutCompanyOverview from "@/components/sections/AboutCompanyOverview";
import AboutUSPAPCompliance from "@/components/sections/AboutUSPAPCompliance";
import AboutAppraiserCredentials from "@/components/sections/AboutAppraiserCredentials";
import AboutMissionStatement from "@/components/sections/AboutMissionStatement";
import AboutCTA from "@/components/sections/AboutCTA";
import Footer from "@/components/sections/Footer";

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="about">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="AboutHero">
          <AboutHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="AboutCompanyOverview">
          <AboutCompanyOverview />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="AboutUSPAPCompliance">
          <AboutUSPAPCompliance />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="AboutAppraiserCredentials">
          <AboutAppraiserCredentials />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="AboutMissionStatement">
          <AboutMissionStatement />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="AboutCTA">
          <AboutCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

About.displayName = "About";

export default About;
