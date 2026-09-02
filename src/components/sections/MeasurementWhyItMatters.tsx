import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Scale, Shield, FileText, Grid, Key, Section } from "lucide-react";

const keyPoints = [
  {
    icon: AlertTriangle,
    stat: "$10,000s",
    headline: "Valuation Impact",
    body: "Incorrect square footage can overvalue or undervalue a property by tens of thousands of dollars — affecting listing price, loan amount, and assessed tax value.",
  },
  {
    icon: FileText,
    stat: "ANSI Z765-2021",
    headline: "Lender & GSE Requirements",
    body: "Lenders and Fannie Mae require ANSI Z765-2021-compliant measurements for loan underwriting. Non-conforming measurements can delay or derail a transaction.",
  },
  {
    icon: CheckCircle,
    stat: "Buyer & Seller",
    headline: "Protecting All Parties",
    body: "Accurate GLA protects buyers from overpaying and sellers from underpricing. An independent, certified measurement eliminates ambiguity and supports fair negotiations.",
  },
  {
    icon: Scale,
    stat: "Courts & CADs",
    headline: "Legal & Tax Authority Use",
    body: "Courts and tax authorities rely on certified measurements for appraisal disputes and assessment appeals. Certified data strengthens your position in any formal proceeding.",
  },
  {
    icon: Shield,
    stat: "USPAP",
    headline: "Defensible in Any Proceeding",
    body: "USPAP-compliant measurement reports are defensible in legal and regulatory proceedings, giving clients, attorneys, and lenders the confidence they require.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const MeasurementWhyItMatters = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="bdfe078a-c28c-4210-9ee8-f0c6e3305deb"
      ref={ref}
      id="measurement-why-it-matters"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden"
      aria-labelledby="why-measurements-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground mb-4">
            Professional Standards · ANSI Z765-2021 · USPAP Compliance
          </span>

          <h2
            id="why-measurements-heading"
            className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight"
          >
            Why Accurate Measurements Matter
          </h2>

          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            In real estate, precision is not optional. Inaccurate square footage and gross
            living area (GLA) calculations carry significant financial, legal, and regulatory
            consequences for homeowners, buyers, sellers, and lenders across the
            Dallas–Fort Worth metroplex.
          </p>
        </motion.div>

        {/* Key Points Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {keyPoints.slice(0, 3).map((point) => {
            const Icon = point.icon;
            return (
              <motion.article
                key={point.headline}
                variants={itemVariants}
                className="group relative bg-card border border-border rounded-lg p-7 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Gold accent bar */}
                <div
                  className="absolute top-0 left-0 w-full h-1 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Icon + Stat Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(218 60% 20% / 0.08) 0%, hsl(218 60% 20% / 0.14) 100%)",
                    }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {point.stat}
                  </span>
                </div>

                <h3 className="font-['Playfair_Display',serif] text-lg font-semibold text-foreground mb-2">
                  {point.headline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.body}</p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Second row — 2 cards centered */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {keyPoints.slice(3).map((point) => {
            const Icon = point.icon;
            return (
              <motion.article
                key={point.headline}
                variants={itemVariants}
                className="group relative bg-card border border-border rounded-lg p-7 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  }}
                  aria-hidden="true"
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(218 60% 20% / 0.08) 0%, hsl(218 60% 20% / 0.14) 100%)",
                    }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {point.stat}
                  </span>
                </div>

                <h3 className="font-['Playfair_Display',serif] text-lg font-semibold text-foreground mb-2">
                  {point.headline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.body}</p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom Callout Banner */}
        <motion.div
          className="mt-14 md:mt-20 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            style={{
              background:
                "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)",
            }}
          >
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] font-medium mb-2" style={{ color: "hsl(42 92% 68%)" }}>
                ANSI Z765-2021 · USPAP-Compliant
              </p>
              <h3 className="font-['Playfair_Display',serif] text-xl md:text-2xl font-bold text-white leading-snug">
                Our measurements meet lender, court, and MLS standards — every time.
              </h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                American Appraisal Alliance delivers certified measurement reports that satisfy
                the strictest requirements of Fannie Mae, FHA/HUD, county appraisal districts,
                and the courts — providing defensible, USPAP-compliant documentation for the
                entire Dallas–Fort Worth metroplex.
              </p>
            </div>

            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-3 md:flex-col md:gap-2 flex-shrink-0">
              {["USPAP Compliant", "ANSI Z765-2021", "Fannie Mae Ready", "FHA/HUD Accepted"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium border"
                    style={{
                      borderColor: "hsl(42 88% 48% / 0.5)",
                      color: "hsl(42 92% 68%)",
                      background: "hsl(42 88% 48% / 0.1)",
                    }}
                  >
                    <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

MeasurementWhyItMatters.displayName = "MeasurementWhyItMatters";

export default MeasurementWhyItMatters;
