import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Ruler, FileText, MapPin, Clock, Award } from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Licensed & Certified Appraisers",
    description:
      "Licensed and certified appraisers — not contractors or agents. Every ANSI Z765 measurement is performed by a credentialed professional held to strict state and federal standards.",
  },
  {
    icon: Ruler,
    title: "Strict ANSI Z765-2021 Compliance",
    description:
      "Strict ANSI Z765-2021 compliance on every measurement. We follow the nationally recognized standard for calculating residential square footage with precision on every engagement.",
  },
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Written Reports",
    description:
      "USPAP-compliant written reports accepted by lenders and courts. Our measurement reports satisfy the Uniform Standards of Professional Appraisal Practice, making them defensible in any professional context.",
  },
  {
    icon: MapPin,
    title: "Full DFW Metroplex Coverage",
    description:
      "Full DFW metroplex coverage including all 15 service cities. We serve Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and all surrounding DFW communities.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround & Professional Documentation",
    description:
      "Fast turnaround with professional-grade sketches and documentation. Receive a complete measurement report — including a detailed floor plan sketch and square footage breakdown — on a timeline that fits your transaction.",
  },
  {
    icon: FileText,
    title: "Accurate, Unbiased, Defensible Valuations",
    description:
      "Accurate, unbiased, defensible valuations. Our mission is to deliver objective, independently verified measurements that hold up to scrutiny from lenders, MLS systems, appraisers, and courts alike.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const PropertyMeasurementAnsiWhyChooseUs = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        id="property-measurement-ansi-why-choose-us"
        className="relative py-20 md:py-32 bg-background"
      >
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-14 md:mb-20"
          >
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.18em] text-[hsl(42_88%_48%)] font-semibold mb-3 font-sans">
              Our Credentials &amp; Commitment
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl mx-auto"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Why Choose American Appraisal Alliance?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              When precision matters — for lenders, MLS listings, legal proceedings, or a simple
              real estate transaction — the qualifications and standards of your measurement
              provider make all the difference.
            </p>
          </motion.div>

          {/* Differentiators Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={itemVariants}
                  className="group relative bg-card rounded-lg p-7 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Gold accent top bar */}
                  <div
                    className="absolute top-0 left-0 w-full h-[3px] rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg mb-5"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(218 60% 20% / 0.08) 0%, hsl(218 55% 22% / 0.12) 100%)",
                    }}
                  >
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg font-semibold text-foreground mb-3"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Mission Statement Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-16 rounded-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)",
            }}
          >
            <div className="px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p
                  className="text-xs uppercase tracking-[0.18em] text-white/60 mb-2 font-sans"
                >
                  Our Mission
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Accurate, unbiased, defensible valuations.
                </p>
                <p className="text-white/75 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
                  Every ANSI Z765 measurement report delivered by American Appraisal Alliance
                  reflects this commitment — grounded in USPAP compliance and the rigorous
                  standards of the Dallas–Fort Worth real estate market.
                </p>
              </div>

              {/* Compliance Badges */}
              <div className="flex-shrink-0 flex flex-col gap-3 text-sm text-white/90">
                {[
                  "USPAP Compliant",
                  "ANSI Z765-2021 Standard",
                  "Licensed &amp; Certified Appraisers",
                  "DFW Metroplex Coverage",
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <Check
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: "hsl(42 92% 58%)" }}
                      aria-hidden="true"
                    />
                    <span
                      dangerouslySetInnerHTML={{ __html: badge }}
                      className="font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
);

PropertyMeasurementAnsiWhyChooseUs.displayName =
  "PropertyMeasurementAnsiWhyChooseUs";

export default PropertyMeasurementAnsiWhyChooseUs;
