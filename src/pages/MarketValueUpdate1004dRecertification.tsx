import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
// Primary production domain: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import MarketValueUpdateHero from "@/components/sections/MarketValueUpdateHero";
import MarketValueUpdateDetails from "@/components/sections/MarketValueUpdateDetails";
import MarketValueUpdateWhyChooseUs from "@/components/sections/MarketValueUpdateWhyChooseUs";
import MarketValueUpdateCTA from "@/components/sections/MarketValueUpdateCTA";
import Footer from "@/components/sections/Footer";

const MarketValueUpdate1004dRecertification = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="market_value_update__1004d___recertification">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="MarketValueUpdateHero">
          <MarketValueUpdateHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="MarketValueUpdateDetails">
          <MarketValueUpdateDetails />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="MarketValueUpdateWhyChooseUs">
          <MarketValueUpdateWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="MarketValueUpdateCTA">
          <MarketValueUpdateCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

MarketValueUpdate1004dRecertification.displayName = "MarketValueUpdate1004dRecertification";

export default MarketValueUpdate1004dRecertification;
