import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Award, Scale, Clock, Lock } from "lucide-react";
import { siteConfig } from "@/config/site";

const differentiators = [
  {
    icon: Award,
    title: "Licensed & Certified Appraisers",
    description:
      "Licensed & certified appraisers serving the full DFW metroplex — from Dallas and Fort Worth to Plano, Frisco, McKinney, and every corner of the region.",
  },
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Reports",
    description:
      "USPAP-compliant reports accepted by all major lenders. Every PMI removal appraisal we deliver meets the rigorous standards required by the Homeowners Protection Act.",
  },
  {
    icon: MapPin,
    title: "Deep Local DFW Market Knowledge",
    description:
      "Deep knowledge of Dallas–Fort Worth neighborhood market trends means your appraisal accurately reflects current values in your specific community.",
  },
  {
    icon: Scale,
    title: "Objective, Unbiased Valuations",
    description:
      "Objective, unbiased valuations — no conflicts of interest. Our appraisers work exclusively for you, providing defensible, independent assessments your lender will trust.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Fast turnaround: reports delivered within 3–5 business days. We understand that eliminating your monthly PMI payment matters — we work efficiently without sacrificing accuracy.",
  },
  {
    icon: Lock,
    title: "Fully Confidential Process",
    description:
      "Confidential process — all inquiries handled with discretion. Your personal and property information is treated with the highest level of professional confidentiality.",
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

const PMIRemovalWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="62d7319d-d549-4683-a4a6-b4037bb19dfa"
      ref={ref}
      id="pmiremoval-why-choose-us"
      className="relative py-16 sm:py-20 md:py-32 bg-primary overflow-hidden"
      aria-labelledby="pmi-why-choose-heading"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 35%, hsl(42 88% 48% / 0.4) 0%, transparent 55%), radial-gradient(circle at 75% 70%, hsl(42 88% 48% / 0.25) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-amber-400 font-medium mb-4">
            Why American Appraisal Alliance
          </span>
          <h2
            id="pmi-why-choose-heading"
            className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto break-words"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Trusted Choice for PMI Removal in Dallas–Fort Worth
          </h2>
          <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            When your lender requires an independent appraisal to remove Private
            Mortgage Insurance, the quality and credibility of that report
            matters. Here is why DFW homeowners choose American Appraisal
            Alliance.
          </p>
          {/* Mission statement */}
          <p className="mt-5 text-amber-400 text-sm md:text-base font-medium italic">
            "Accurate, unbiased, defensible valuations."
          </p>
        </motion.div>

        {/* Differentiator cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                className="group relative bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 rounded-lg p-7 transition-all duration-300"
              >
                {/* Gold accent bar */}
                <div className="absolute top-0 left-7 w-10 h-0.5 bg-amber-400 rounded-full" />

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-400/15 mb-5 mt-3 group-hover:bg-amber-400/25 transition-colors duration-300">
                  <Icon
                    className="w-6 h-6 text-amber-400"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-white font-semibold text-lg mb-3 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom credibility note */}
        <motion.div
          className="mt-14 md:mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
        >
          <p className="text-white/55 text-sm max-w-xl mx-auto">
            Serving homeowners across the Dallas–Fort Worth metroplex —
            including Dallas, Fort Worth, Arlington, Plano, Irving, Garland,
            Frisco, McKinney, Denton, Mansfield, Grand Prairie, and surrounding
            DFW communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

PMIRemovalWhyChooseUs.displayName = "PMIRemovalWhyChooseUs";

export default PMIRemovalWhyChooseUs;
