import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

/**
 * Placeholder service-area page for Carrollton, TX. Minimal stub so
 * "Carrollton" has a working destination; full content to be designed separately.
 */
const Carrollton = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="service-areas-denton-county-carrollton">
      <div ref={ref}>
        <Header />
        <main className="container max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[hsl(218_60%_20%)] mb-4">
            Carrollton, TX Real Estate Appraisals
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            USPAP-compliant appraisal services for Carrollton, Texas are coming soon to this page.
            In the meantime, please <a href="/contact/" className="underline hover:text-foreground transition-colors">contact us</a> or{" "}
            <a href="/request/" className="underline hover:text-foreground transition-colors">request an appraisal</a>.
          </p>
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

Carrollton.displayName = "Carrollton";

export default Carrollton;
