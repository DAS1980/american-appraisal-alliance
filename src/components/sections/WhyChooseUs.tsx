import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Gavel, Building2, MapPin, FileCheck, Grid, Section } from "lucide-react";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Licensed & Certified Appraisers",
    description:
      "Every appraisal is completed by a state-licensed, certified residential or certified general appraiser — ensuring accuracy, credibility, and USPAP compliance on every assignment.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "We understand that timelines matter. American Appraisal Alliance delivers reports promptly without compromising the thoroughness and defensibility your transaction requires.",
  },
  {
    icon: Gavel,
    title: "Court-Accepted Reports",
    description:
      "Our USPAP-compliant appraisals are routinely accepted by courts, attorneys, and legal professionals for divorce proceedings, estate settlements, tax appeals, and litigation support.",
  },
  {
    icon: FileCheck,
    title: "Lender-Approved",
    description:
      "Reports are prepared to meet Fannie Mae, FHA/HUD, and conventional lender standards — giving mortgage professionals the documentation they need for underwriting and loan approval.",
  },
  {
    icon: MapPin,
    title: "Local DFW Market Expertise",
    description:
      "With deep roots in the Dallas–Fort Worth metroplex — covering Dallas, Fort Worth, Arlington, Plano, Frisco, McKinney, Irving, and surrounding communities — we bring unmatched local market knowledge to every valuation.",
  },
  {
    icon: Building2,
    title: "USPAP-Compliant Every Report",
    description:
      "Adherence to the Uniform Standards of Professional Appraisal Practice (USPAP) is not optional — it is the foundation of every report we issue. You can trust that our valuations are accurate, unbiased, and defensible.",
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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const WhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="48fa8807-9c51-4c8d-899f-3319b23f0134"
      ref={ref}
      id="why-choose-us"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden"
      aria-labelledby="why-choose-us-heading"
    >
      {/* Subtle decorative top border accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[image:var(--gradient-gold)]" aria-hidden="true" />

      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.22em] font-semibold text-amber-600 mb-3">
            Why Choose American Appraisal Alliance
          </span>
          <h2
            id="why-choose-us-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trusted Appraisers Serving the DFW Metroplex
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            American Appraisal Alliance combines licensed expertise, USPAP-compliant methodology, and
            intimate knowledge of the Dallas–Fort Worth real estate market to deliver valuations you
            can rely on — from the first contact to the final report.
          </p>
        </motion.div>

        {/* Differentiator Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                className="group relative bg-card rounded-lg border border-border p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              >
                {/* Icon container with gold accent */}
                <div className="flex items-center justify-center w-13 h-13 rounded-lg bg-primary/8 w-12 h-12 shrink-0">
                  <Icon
                    className="h-6 w-6"
                    style={{ color: "hsl(42 88% 48%)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-lg font-semibold text-foreground mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle gold bottom accent on hover */}
                <div
                  className="absolute bottom-0 left-0 w-full h-0.5 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[image:var(--gradient-gold)]"
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom trust statement */}
        <motion.div
          className="mt-14 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <p
            className="text-base md:text-lg font-medium text-foreground max-w-2xl mx-auto px-4 py-5 rounded-lg border border-border bg-muted/40"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span
              className="font-semibold bg-clip-text text-transparent bg-[image:var(--gradient-gold)]"
            >
              Accurate, unbiased, defensible valuations
            </span>
            {" "}— the standard we uphold on every appraisal assignment across the DFW metroplex.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = "WhyChooseUs";

export default WhyChooseUs;
