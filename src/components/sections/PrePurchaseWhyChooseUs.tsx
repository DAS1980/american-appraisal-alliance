import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, MapPin, Award, Clock, Lock } from "lucide-react";
// Primary production domain: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";
// Site base URL: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";

const differentiators = [
  {
    icon: Shield,
    title: "Truly Independent from Your Lender",
    description:
      "Truly independent from your lender — no conflict of interest. Your appraisal is ordered by you, for you, with no lender influence over the outcome.",
  },
  {
    icon: Award,
    title: "USPAP-Compliant Reports",
    description:
      "USPAP-compliant reports accepted by courts, attorneys, and lenders. Every appraisal we deliver meets the Uniform Standards of Professional Appraisal Practice.",
  },
  {
    icon: MapPin,
    title: "Deep Local DFW Expertise",
    description:
      "Deep local expertise across all 15 DFW market areas — from Dallas and Fort Worth to Plano, Frisco, McKinney, Arlington, Irving, Garland, Denton, and beyond.",
  },
  {
    icon: CheckCircle,
    title: "Licensed & Certified Appraisers",
    description:
      "Licensed and certified appraisers with years of DFW experience. American Appraisal Alliance's team holds state-recognized credentials and a proven track record in the Dallas–Fort Worth metroplex.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Fast turnaround — results within 3–5 business days. We understand that closing timelines are tight, and we deliver accurate, defensible valuations without unnecessary delays.",
  },
  {
    icon: Lock,
    title: "Confidential Intake & Prompt Response",
    description:
      "Confidential intake — we respond within 1 business day. All inquiries are handled with the utmost discretion, and you will hear from a licensed DFW appraiser promptly.",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const PrePurchaseWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="90c6d8a7-8689-42e4-98b3-f770daadb6e3"
      ref={ref}
      id="pre-purchase-why-choose-us"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 font-sans">
            Why DFW Buyers Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Independent, Accurate, Defensible — Backed by Local Expertise
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            When you need a pre-purchase appraisal in the Dallas–Fort Worth metroplex,
            American Appraisal Alliance delivers what matters most: an unbiased,
            USPAP-compliant valuation you can trust before you close.
          </p>
          {/* Mission statement */}
          <p className="mt-3 text-sm font-semibold tracking-wide text-amber-600 font-sans uppercase">
            Accurate, unbiased, defensible valuations.
          </p>
        </motion.div>

        {/* Differentiator Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
              >
                {/* Icon badge */}
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom Trust Strip */}
        <motion.div
          className="mt-14 rounded-lg bg-primary px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          {/* Left: seal icon */}
          <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-white/10">
            <Award className="h-8 w-8 text-amber-400" />
          </div>

          {/* Center: copy */}
          <div className="flex-1 text-center md:text-left">
            <p className="font-serif text-xl md:text-2xl font-bold text-white leading-snug">
              Serving the Entire Dallas–Fort Worth Metroplex
            </p>
            <p className="mt-2 text-sm md:text-base text-white/80 font-sans leading-relaxed">
              From Dallas and Fort Worth to Arlington, Plano, Irving, Garland, Frisco,
              McKinney, Denton, Mansfield, Grand Prairie, Lewisville, Allen, Carrollton,
              and Richardson — American Appraisal Alliance brings certified, USPAP-compliant
              pre-purchase appraisals to every corner of DFW.
            </p>
          </div>

          {/* Right: checkmark list */}
          <ul className="flex-shrink-0 space-y-2 text-sm text-white/90 font-sans min-w-[220px]">
            {[
              "USPAP-Compliant Reports",
              "Court & Lender Accepted",
              "Licensed & Certified Appraisers",
              "Results in 3–5 Business Days",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
});

PrePurchaseWhyChooseUs.displayName = "PrePurchaseWhyChooseUs";

export default PrePurchaseWhyChooseUs;
