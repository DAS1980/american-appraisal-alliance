import React from "react";
import { motion } from "framer-motion";
import { MapPin, Shield, Clock, Section } from "lucide-react";

/** Primary production domain — canonical authority for americanappraisalalliance.com */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const differentiators = [
  {
    icon: MapPin,
    title: "Local DFW Market Expertise",
    description:
      "Deep knowledge of Dallas, Fort Worth, Collin, Denton, and Tarrant county data — our appraisers understand neighborhood-level market dynamics across the full DFW metroplex, including Dallas, Arlington, Plano, Irving, Frisco, McKinney, Garland, Denton, and surrounding communities.",
    highlight: "Dallas–Fort Worth Coverage",
  },
  {
    icon: Shield,
    title: "USPAP-Compliant Reports",
    description:
      "Every desktop appraisal delivered by American Appraisal Alliance is prepared in strict accordance with the Uniform Standards of Professional Appraisal Practice (USPAP). Our reports are accepted by lenders, attorneys, and courts — providing accurate, unbiased, defensible valuations you can rely on.",
    highlight: "Lender & Court Accepted",
  },
  {
    icon: Clock,
    title: "Fast Turnaround & Confidential Intake",
    description:
      "We understand that your transaction timeline matters. Desktop appraisals are completed efficiently, with a response to all inquiries within 1 business day. All inquiries are confidential. We respond within 1 business day.",
    highlight: "1 Business Day Response",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const DesktopAppraisalWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="83712761-9611-4da5-9b95-784426bf3f9e"
      ref={ref}
      id="desktop-appraisal-why-choose-us"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden w-full max-w-full"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 font-sans">
            Our Commitment to You
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Why Choose American Appraisal Alliance
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Accurate, unbiased, defensible valuations — delivered by licensed and
            certified appraisers with deep roots in the Dallas–Fort Worth market.
          </p>
        </motion.div>

        {/* Differentiator Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                className="group relative bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Gold accent bar */}
                <div
                  className="h-1 w-full"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  }}
                />

                <div className="p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-lg mb-6 flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(218 60% 18%) 0%, hsl(218 50% 24%) 100%)",
                    }}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Highlight badge */}
                  <span
                    className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 font-sans w-fit"
                    style={{
                      background: "hsl(42 92% 96%)",
                      color: "hsl(36 88% 32%)",
                    }}
                  >
                    {item.highlight}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Mission & Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-16 md:mt-20 rounded-lg overflow-hidden"
          style={{
            background:
              "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-12 py-10 md:py-12">
            {/* Mission */}
            <div className="text-center md:text-left">
              <span
                className="inline-block text-xs uppercase tracking-[0.2em] font-sans mb-3"
                style={{ color: "hsl(42 92% 68%)" }}
              >
                Our Mission
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-white leading-snug max-w-sm">
                Accurate, unbiased, defensible valuations.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-white/20 flex-shrink-0" />

            {/* Reassurance */}
            <div className="text-center md:text-left">
              <span
                className="inline-block text-xs uppercase tracking-[0.2em] font-sans mb-3"
                style={{ color: "hsl(42 92% 68%)" }}
              >
                Client Commitment
              </span>
              <p className="text-white/90 font-sans text-base md:text-lg leading-relaxed max-w-sm">
                All inquiries are confidential. We respond within 1 business day.
              </p>
              <p className="mt-2 text-white/60 font-sans text-sm">
                Serving Dallas, Fort Worth, Plano, Arlington, Irving, Frisco,
                McKinney, Garland, Denton, and the full DFW metroplex.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

DesktopAppraisalWhyChooseUs.displayName = "DesktopAppraisalWhyChooseUs";

export default DesktopAppraisalWhyChooseUs;
