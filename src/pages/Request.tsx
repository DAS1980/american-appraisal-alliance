import React from "react";

/** Primary production domain for American Appraisal Alliance */
export const SITE_BASE_URL = "https://americanappraisalalliance.com";

import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import RequestIntakeForm from "@/components/sections/RequestIntakeForm";
import RequestServiceArea from "@/components/sections/RequestServiceArea";
import RequestReassurance from "@/components/sections/RequestReassurance";
import Footer from "@/components/sections/Footer";

const Request = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="request">
      <div ref={ref}>
        <Header />
        {/* Hero + inquiry form combined (11/24/2026) so the form is visible on arrival */}
        <SectionErrorBoundary sectionName="RequestIntakeForm">
          <RequestIntakeForm />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="RequestServiceArea">
          <RequestServiceArea />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="RequestReassurance">
          <RequestReassurance />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

Request.displayName = "Request";

export default Request;
