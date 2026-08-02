import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import ExteriorOnlyDriveByAppraisalHero from "@/components/sections/ExteriorOnlyDriveByAppraisalHero";
import ExteriorOnlyServiceDetail from "@/components/sections/ExteriorOnlyServiceDetail";
import ExteriorOnlyWhyChooseUs from "@/components/sections/ExteriorOnlyWhyChooseUs";
import ExteriorOnlyAppraisalCTA from "@/components/sections/ExteriorOnlyAppraisalCTA";
import Footer from "@/components/sections/Footer";

const ExteriorOnlyDriveByAppraisal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="exterior_only__drive_by__appraisal">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="ExteriorOnlyDriveByAppraisalHero">
          <ExteriorOnlyDriveByAppraisalHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ExteriorOnlyServiceDetail">
          <ExteriorOnlyServiceDetail />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ExteriorOnlyWhyChooseUs">
          <ExteriorOnlyWhyChooseUs />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ExteriorOnlyAppraisalCTA">
          <ExteriorOnlyAppraisalCTA />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

ExteriorOnlyDriveByAppraisal.displayName = "ExteriorOnlyDriveByAppraisal";

export default ExteriorOnlyDriveByAppraisal;
