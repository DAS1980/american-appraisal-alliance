import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

/**
 * Placeholder service-area page for Allen, TX. Minimal stub so "Allen"
 * in the Service Areas nav dropdown has a working destination; full content
 * to be designed separately.
 */
const AllenTx = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <PageLayout currentPage="allen-tx">
      <div ref={ref}>
        <Header />
        <main className="container max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[hsl(218_60%_20%)] mb-4">
            Allen, TX Real Estate Appraisals
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            USPAP-compliant appraisal services for Allen, Texas are coming soon to this page.
            In the meantime, please <a href="/contact/" className="underline hover:text-foreground transition-colors">contact us</a> or{" "}
            <a href="/request/" className="underline hover:text-foreground transition-colors">request an appraisal</a>.
          </p>
        </main>
        <Footer />
      </div>
    </PageLayout>
  );
});

AllenTx.displayName = "AllenTx";

export default AllenTx;
