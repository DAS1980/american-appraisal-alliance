import React from "react";
// Site base URL: https://americanappraisalalliance.com
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Gavel, MapPin, Scale, Clock } from "lucide-react";

/** Primary production domain — americanappraisalalliance.com */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Reports",
    description:
      "Every estate appraisal meets Uniform Standards of Professional Appraisal Practice, ensuring defensibility in court and with the IRS.",
  },
  {
    icon: FileText,
    title: "IRS Form 706 Ready",
    description:
      "Our retrospective appraisals are formatted and documented to satisfy IRS estate tax filing requirements.",
  },
  {
    icon: Gavel,
    title: "Court-Accepted & Attorney-Approved",
    description:
      "Trusted by probate attorneys and CPAs across the DFW metroplex for legally binding estate proceedings.",
  },
  {
    icon: MapPin,
    title: "Local DFW Market Expertise",
    description:
      "Deep knowledge of Dallas, Tarrant, Collin, and Denton county markets ensures accurate historical valuations.",
  },
  {
    icon: Scale,
    title: "Neutral & Unbiased",
    description:
      "As independent appraisers, we provide objective valuations free from conflicts of interest — critical in estate and probate matters.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "We understand estate timelines are time-sensitive. We respond within 1 business day and deliver reports promptly.",
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

const EstateAppraisalWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="estate-appraisal-why-choose-us"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="estate-why-heading"
    >
      {/* Subtle top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Estate &amp; Probate Appraisals
          </span>

          <h2
            id="estate-why-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Choose American Appraisal Alliance
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Estate and date-of-death appraisals demand precision, impartiality,
            and strict adherence to professional standards. Our licensed DFW
            appraisers deliver defensible, USPAP-compliant valuations trusted by
            attorneys, CPAs, and courts throughout the Dallas–Fort Worth
            metroplex.
          </p>

          {/* Mission statement */}
          <div
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border"
            style={{
              borderColor: "hsl(42 88% 48% / 0.4)",
              background: "hsl(42 88% 48% / 0.06)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "hsl(42 88% 48%)" }}
              aria-hidden="true"
            />
            <p
              className="text-sm font-semibold italic"
              style={{ color: "hsl(218 60% 20%)" }}
            >
              Accurate, unbiased, defensible valuations.
            </p>
          </div>
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
                variants={cardVariants}
                className="group relative rounded-lg border border-border bg-card p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gold accent line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg mb-5"
                  style={{
                    background: "hsl(218 60% 20% / 0.06)",
                  }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: "hsl(218 60% 20%)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-semibold text-foreground mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
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

        {/* Bottom Trust Strip */}
        <motion.div
          className="mt-14 md:mt-18 rounded-lg px-8 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-border"
          style={{ background: "hsl(218 60% 20% / 0.04)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <div className="text-center md:text-left">
            <p
              className="text-base font-semibold text-foreground mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Serving the Dallas–Fort Worth Metroplex
            </p>
            <p className="text-sm text-muted-foreground">
              Dallas · Fort Worth · Arlington · Plano · Irving · Garland ·
              Frisco · McKinney · Denton · and surrounding DFW communities
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(42 88% 48%)" }}
                aria-hidden="true"
              />
              USPAP Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(42 88% 48%)" }}
                aria-hidden="true"
              />
              IRS Form 706 Ready
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(42 88% 48%)" }}
                aria-hidden="true"
              />
              Court-Accepted Reports
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(42 88% 48%)" }}
                aria-hidden="true"
              />
              Licensed DFW Appraisers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

EstateAppraisalWhyChooseUs.displayName = "EstateAppraisalWhyChooseUs";

export default EstateAppraisalWhyChooseUs;
