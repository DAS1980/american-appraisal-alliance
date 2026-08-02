import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import PropertyMeasurementAnsiHero from "@/components/sections/PropertyMeasurementAnsiHero";
import PropertyMeasurementAnsiWhatItIs from "@/components/sections/PropertyMeasurementAnsiWhatItIs";
import PropertyMeasurementAnsiWhyChooseUs from "@/components/sections/PropertyMeasurementAnsiWhyChooseUs";
import PropertyMeasurementAnsiCTA from "@/components/sections/PropertyMeasurementAnsiCTA";
import Footer from "@/components/sections/Footer";

const PropertyMeasurementAnsiZ765 = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="property_measurement__ansi_z765">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="PropertyMeasurementAnsiHero">
          <PropertyMeasurementAnsiHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PropertyMeasurementAnsiWhatItIs">
          <PropertyMeasurementAnsiWhatItIs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PropertyMeasurementAnsiWhyChooseUs">
          <PropertyMeasurementAnsiWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="PropertyMeasurementAnsiCTA">
          <PropertyMeasurementAnsiCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

PropertyMeasurementAnsiZ765.displayName = "PropertyMeasurementAnsiZ765";

export default PropertyMeasurementAnsiZ765;
