import React from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Contact, Grid } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const cities = [
  "Dallas",
  "Fort Worth",
  "Arlington",
  "Plano",
  "Irving",
  "Garland",
  "Frisco",
  "McKinney",
  "Denton",
  "Mansfield",
  "Grand Prairie",
  "Lewisville",
  "Allen",
  "Carrollton",
  "Richardson",
];

const ContactServiceArea = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="7ded8a93-48d8-4159-8fb0-ab67a1899144"
      ref={ref}
      id="contact-service-area"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Service Coverage
            </span>
          </div>

          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto">
            Proudly Serving the DFW Metroplex
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We cover all major cities and surrounding communities across the
            Dallas–Fort Worth area. Whether you require a USPAP-compliant
            residential appraisal, a court-accepted valuation, or a specialized
            measurement report, our licensed appraisers are available throughout
            the DFW metroplex.
          </p>
        </motion.div>

        {/* City Badge Grid — exactly 15 cities */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12"
        >
          {cities.map((city) => (
            <motion.div
              key={city}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">
                {city}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-start sm:items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 sm:px-6 py-4 shadow-sm max-w-full text-left">
            <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm text-amber-900 font-medium break-words">
              Not sure if we cover your area?{" "}
              <a
                href="/contact/"
                className="underline underline-offset-2 hover:text-amber-700 transition-colors font-semibold"
              >
                Contact us
              </a>{" "}
              — we serve all communities across the Dallas–Fort Worth metroplex
              and surrounding counties.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ContactServiceArea.displayName = "ContactServiceArea";

export default ContactServiceArea;
