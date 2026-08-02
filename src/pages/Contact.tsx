import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import ContactHero from "@/components/sections/ContactHero";
import ContactServiceArea from "@/components/sections/ContactServiceArea";
import ContactDetails from "@/components/sections/ContactDetails";
import ContactAppraisalLink from "@/components/sections/ContactAppraisalLink";
import Footer from "@/components/sections/Footer";

const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="contact">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="ContactHero">
          <ContactHero />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ContactServiceArea">
          <ContactServiceArea />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ContactDetails">
          <ContactDetails />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ContactAppraisalLink">
          <ContactAppraisalLink />
        </SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

Contact.displayName = "Contact";

export default Contact;
