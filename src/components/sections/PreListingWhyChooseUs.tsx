import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, FileText, Award, Clock, Lock } from "lucide-react";

const SITE_BASE_URL = "https://americanappraisalalliance.com";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Independent & Unbiased",
    description:
      "We have no stake in your sale price. Our valuations are objective, defensible, and free from agent or lender influence.",
  },
  {
    icon: MapPin,
    title: "Local DFW Market Expertise",
    description:
      "Deep knowledge of Dallas, Fort Worth, Plano, Frisco, McKinney, and all 15 cities across the DFW metroplex.",
  },
  {
    icon: FileText,
    title: "USPAP-Compliant Reports",
    description:
      "Every appraisal meets Uniform Standards of Professional Appraisal Practice — accepted by lenders, attorneys, and courts.",
  },
  {
    icon: Award,
    title: "Licensed & Certified Appraisers",
    description:
      "Our appraisers hold Texas state licensure and certifications, ensuring credibility and professional accountability.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Reports typically delivered within 3–5 business days — so you can list on your timeline without delays.",
  },
  {
    icon: Lock,
    title: "Confidential & Professional",
    description:
      "All inquiries and reports are handled with strict confidentiality. We respond within 1 business day.",
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

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const PreListingWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="pre-listing-why-choose-us"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="pre-listing-why-heading"
    >
      {/* Subtle decorative top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-16"
        >
          {/* Eyebrow */}
          <span
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-3"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Our Credentials &amp; Commitment
          </span>

          <h2
            id="pre-listing-why-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto"
            style={{ color: "hsl(218 65% 14%)", fontFamily: "'Playfair Display', serif" }}
          >
            Why Choose American Appraisal Alliance
          </h2>

          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Accurate, unbiased, defensible valuations — delivered by licensed DFW appraisers
            you can trust when it matters most.
          </p>
        </motion.div>

        {/* Differentiator grid — exactly 6 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                className="group relative rounded-lg border border-border bg-card p-6 md:p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gold accent top bar on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
                  aria-hidden="true"
                />

                {/* Icon badge */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-5"
                  style={{ backgroundColor: "hsl(42 88% 48% / 0.12)" }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "hsl(42 88% 48%)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-semibold mb-2 leading-snug"
                  style={{ color: "hsl(218 65% 14%)", fontFamily: "'Playfair Display', serif" }}
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

        {/* Bottom trust reinforcement strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-14 md:mt-16 rounded-lg px-6 py-5 md:py-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 border border-border"
          style={{ backgroundColor: "hsl(218 65% 14% / 0.04)" }}
        >
          {[
            "USPAP-Compliant",
            "Texas State Licensed",
            "Serving All of DFW",
            "Court & Lender Accepted",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: "hsl(42 88% 48%)" }}
                aria-hidden="true"
              />
              <span
                className="text-sm font-semibold tracking-wide"
                style={{ color: "hsl(218 65% 14%)" }}
              >
                {badge}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

PreListingWhyChooseUs.displayName = "PreListingWhyChooseUs";

export default PreListingWhyChooseUs;
