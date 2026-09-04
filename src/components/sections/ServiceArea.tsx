import React from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Contact, Grid, Section, Flower } from "lucide-react";

const cities = [
  "Addison",
  "Allen",
  "Anna",
  "Aubrey",
  "Carrollton",
  "Coppell",
  "Corinth",
  "Dallas",
  "Fairview",
  "Farmers Branch",
  "Flower Mound",
  "Garland",
  "Grapevine",
  "Irving",
  "Lewisville",
  "Little Elm",
  "Lucas",
  "McKinney",
  "Melissa",
  "Murphy",
  "Parker",
  "Princeton",
  "Richardson",
  "Sachse",
  "Southlake",
  "The Colony",
  "Wylie",
];

const ServiceArea = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="7b33efce-5700-4e7f-94c2-ac20fe793576"
      ref={ref}
      id="service-area"
      className="relative py-20 md:py-32 bg-background overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ background: "hsl(42 88% 48%)" }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin
              className="h-5 w-5"
              style={{ color: "hsl(42 88% 48%)" }}
            />
            <span
              className="text-xs md:text-sm uppercase tracking-widest font-semibold"
              style={{ color: "hsl(42 88% 48%)" }}
            >
              Our Coverage Area
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "hsl(218 60% 20%)",
            }}
          >
            Serving the Entire DFW Metroplex
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            American Appraisal Alliance provides USPAP-compliant real estate
            appraisals across the full Dallas–Fort Worth metroplex. From urban
            cores to suburban communities, our licensed appraisers bring local
            market expertise to every assignment.
          </p>
        </motion.div>

        {/* City Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-12 md:mb-16"
        >
          {cities.map((city) => (
            <motion.div
              key={city}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
              }}
              className="group flex items-center gap-2.5 px-4 py-3 rounded-lg border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: "hsl(218 60% 20% / 0.15)",
                backgroundColor: "hsl(218 60% 20% / 0.03)",
                boxShadow: "0 1px 4px hsl(218 65% 14% / 0.06)",
              }}
            >
              <CheckCircle
                className="h-4 w-4 flex-shrink-0 transition-colors duration-300"
                style={{ color: "hsl(42 88% 48%)" }}
              />
              <span
                className="text-sm font-medium leading-tight"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "hsl(218 60% 20%)",
                }}
              >
                {city}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="relative rounded-xl px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 border overflow-hidden"
          style={{
            backgroundColor: "hsl(218 60% 20%)",
            borderColor: "hsl(218 60% 20%)",
          }}
        >
          {/* Gold accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
            style={{ backgroundColor: "hsl(42 88% 48%)" }}
          />
          <div className="pl-2 text-center md:text-left">
            <p
              className="text-white font-semibold text-base md:text-lg mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Don't see your city listed?
            </p>
            <p
              className="text-white/75 text-sm leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We serve communities throughout the greater DFW metroplex and
              surrounding North Texas areas. Contact us to confirm coverage for
              your property.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <MapPin className="h-5 w-5" style={{ color: "hsl(42 88% 48%)" }} />
            <span
              className="text-white/90 text-sm font-medium whitespace-nowrap"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Dallas–Fort Worth, TX &amp; Beyond
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ServiceArea.displayName = "ServiceArea";

export default ServiceArea;
