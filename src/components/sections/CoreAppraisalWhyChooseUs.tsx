import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Gavel, MapPin, Clock, Scale, Section } from "lucide-react";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Reports",
    detail:
      "Every appraisal meets the Uniform Standards of Professional Appraisal Practice — accepted by lenders, courts, and the IRS.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & Certified Appraisers",
    detail:
      "Our team holds Texas-issued certifications and carries E&O insurance for your protection.",
  },
  {
    icon: Gavel,
    title: "Court-Accepted & Lender-Approved",
    detail:
      "Reports are prepared to withstand legal scrutiny and satisfy major lender underwriting requirements.",
  },
  {
    icon: MapPin,
    title: "Full DFW Metroplex Coverage",
    detail:
      "We serve Dallas, Fort Worth, Arlington, Plano, Irving, Frisco, McKinney, Denton, and surrounding communities.",
  },
  {
    icon: Clock,
    title: "Fast, Reliable Turnaround",
    detail:
      "Most reports delivered within 3–5 business days. Rush options available upon request.",
  },
  {
    icon: Scale,
    title: "Accurate, Unbiased Valuations",
    detail:
      "Independent from lenders, buyers, and sellers — our mission is delivering defensible, objective market values.",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const CoreAppraisalWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="727aa790-25c0-4929-940f-533e167a0619"
      ref={ref}
      id="core-appraisal-why-choose-us"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden"
      aria-labelledby="why-choose-heading"
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span
            className="inline-block text-xs md:text-sm uppercase tracking-[0.18em] font-semibold mb-3"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Our Credentials &amp; Commitment
          </span>

          <h2
            id="why-choose-heading"
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl mx-auto"
          >
            Why Choose American Appraisal Alliance?
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Licensed, certified, and court-accepted appraisers serving the full DFW metroplex.
          </p>
        </motion.div>

        {/* Differentiator cards grid — 6 items, 2 columns on md, 3 on lg */}
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
                className="group relative bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-6 md:p-7 flex flex-col gap-4"
              >
                {/* Gold accent bar on hover */}
                <div
                  className="absolute top-0 left-0 w-full h-0.5 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
                  aria-hidden="true"
                />

                {/* Icon container */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0"
                  style={{ background: "hsl(218 60% 20% / 0.08)" }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: "hsl(218 60% 20%)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-playfair text-lg font-semibold text-foreground mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom trust statement */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-sm font-medium text-foreground max-w-full flex-wrap justify-center text-left"
            style={{ borderColor: "hsl(42 88% 48% / 0.5)", background: "hsl(42 92% 52% / 0.07)" }}
          >
            <ShieldCheck
              className="h-5 w-5 flex-shrink-0"
              style={{ color: "hsl(42 88% 48%)" }}
              aria-hidden="true"
            />
            <span>
              Every report prepared in full compliance with{" "}
              <strong className="font-semibold">USPAP</strong> — the national standard for real estate appraisal practice.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

CoreAppraisalWhyChooseUs.displayName = "CoreAppraisalWhyChooseUs";

export default CoreAppraisalWhyChooseUs;
