import React, { useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import HomeServices from "@/components/sections/HomeServices";
import ServiceArea from "@/components/sections/ServiceArea";
import TrustBar from "@/components/sections/TrustBar";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import HomeCTA from "@/components/sections/HomeCTA";
import Footer from "@/components/sections/Footer";

const SITE_BASE_URL = "https://americanappraisalalliance.com";
const CANONICAL_URL = `${SITE_BASE_URL}/`;

const Index = React.forwardRef<HTMLDivElement>((props, ref) => {
  useEffect(() => {
    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = CANONICAL_URL;
    } else {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = CANONICAL_URL;
      document.head.appendChild(canonical);
    }

    // Set og:url
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) {
      ogUrl.setAttribute("content", CANONICAL_URL);
    } else {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      ogUrl.setAttribute("content", CANONICAL_URL);
      document.head.appendChild(ogUrl);
    }
  }, []);

  return (
    <PageLayout currentPage="home">
      <div ref={ref}>
        <Header />
        <SectionErrorBoundary sectionName="Hero"><Hero /></SectionErrorBoundary>
        <SectionErrorBoundary sectionName="HomeServices"><HomeServices /></SectionErrorBoundary>
        <SectionErrorBoundary sectionName="ServiceArea"><ServiceArea /></SectionErrorBoundary>
        <SectionErrorBoundary sectionName="TrustBar"><TrustBar /></SectionErrorBoundary>
        <SectionErrorBoundary sectionName="WhyChooseUs"><WhyChooseUs /></SectionErrorBoundary>
        <SectionErrorBoundary sectionName="Testimonials"><Testimonials /></SectionErrorBoundary>
        <SectionErrorBoundary sectionName="HomeCTA"><HomeCTA /></SectionErrorBoundary>
        <Footer />
      </div>
    </PageLayout>
  );
});

Index.displayName = "Index";

export default Index;
