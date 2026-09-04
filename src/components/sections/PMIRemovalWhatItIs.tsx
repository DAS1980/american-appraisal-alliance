import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, TrendingDown, FileText, Home, Clock, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

const benefits = [
  {
    icon: TrendingDown,
    title: "Eliminates Monthly PMI Premium",
    description:
      "Saves homeowners hundreds of dollars per year by documenting that your current market value exceeds the 80% LTV threshold required by lenders.",
  },
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Report",
    description:
      "Every appraisal is prepared in strict accordance with the Uniform Standards of Professional Appraisal Practice — accepted by all major lenders and mortgage servicers.",
  },
  {
    icon: FileText,
    title: "Lender-Ready Documentation",
    description:
      "The written report is formatted and documented to meet lender requirements under the Homeowners Protection Act, streamlining the PMI cancellation process.",
  },
  {
    icon: Home,
    title: "Full Interior & Exterior Inspection",
    description:
      "Our licensed appraisers conduct a thorough on-site inspection and comparable sales analysis to support a defensible, accurate valuation.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Reports are typically delivered within 3–5 business days of inspection, so you can submit your PMI cancellation request without unnecessary delay.",
  },
];

const includedItems = [
  "Full interior and exterior inspection",
  "Comparable sales analysis (comps)",
  "USPAP-compliant written appraisal report",
  "Lender-ready documentation",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
  }),
};

const PMIRemovalWhatItIs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="fbe38064-30c3-4351-8b39-3610f68c8a9c"
      ref={ref}
      id="pmiremoval-what-it-is"
      className="relative py-16 sm:py-20 md:py-32 bg-background overflow-x-hidden"
      aria-labelledby="pmi-what-it-is-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Section header */}
        <motion.div
          className="mb-14 md:mb-20 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
        >
          <Badge
            variant="outline"
            className="mb-4 text-xs uppercase tracking-widest border-[hsl(42_88%_48%)] text-[hsl(42_88%_48%)] bg-[hsl(42_88%_48%/0.08)]"
          >
            PMI Removal Appraisal
          </Badge>
          <h2
            id="pmi-what-it-is-heading"
            className="font-['Playfair_Display',serif] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(218_60%_20%)] leading-tight mb-5 break-words"
          >
            What Is a PMI Removal Appraisal?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A PMI Removal Appraisal is an independent, USPAP-compliant appraisal that documents your
            home's current fair market value to support the cancellation of Private Mortgage Insurance
            under the Homeowners Protection Act. If your property's value has appreciated, a certified
            appraisal is the definitive method to demonstrate to your lender that your loan-to-value
            ratio has fallen below the 80% threshold — triggering your right to cancel PMI.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Explanatory copy */}
          <div className="space-y-10">

            {/* Who Needs It */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
            >
              <h3 className="font-['Playfair_Display',serif] text-xl md:text-2xl font-semibold text-[hsl(218_60%_20%)] mb-3">
                Who Needs This Appraisal?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This service is designed for homeowners in the Dallas–Fort Worth metroplex — including
                Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and
                surrounding DFW communities — who believe their property value has risen enough to
                bring their loan-to-value ratio below 80%, making them eligible to request PMI
                cancellation from their lender. If you purchased your home with less than 20% down and
                have been paying PMI, you may be entitled to remove it once sufficient equity has been
                established.
              </p>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={2}
            >
              <h3 className="font-['Playfair_Display',serif] text-xl md:text-2xl font-semibold text-[hsl(218_60%_20%)] mb-4">
                {"What's Included in the Report"}
              </h3>
              <ul className="space-y-3">
                {includedItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="h-5 w-5 flex-shrink-0 mt-0.5"
                      style={{ color: "hsl(42 88% 48%)" }}
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Turnaround */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={3}
            >
              <h3 className="font-['Playfair_Display',serif] text-xl md:text-2xl font-semibold text-[hsl(218_60%_20%)] mb-3">
                Expected Turnaround Time
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Reports are typically delivered within{" "}
                <span className="font-semibold text-foreground">3–5 business days</span>{" "}
                of the on-site inspection. Our licensed appraisers serving the DFW metroplex work
                efficiently to ensure you receive a complete, defensible appraisal report without
                unnecessary delay — so you can submit your PMI cancellation request to your lender
                promptly.
              </p>
            </motion.div>

            {/* LTV Threshold note */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={4}
              className="rounded-lg border border-[hsl(218_60%_20%/0.15)] bg-[hsl(218_60%_20%/0.04)] p-5"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span
                  className="font-semibold"
                  style={{ color: "hsl(218 60% 20%)" }}
                >
                  80% LTV Threshold:
                </span>{" "}
                Under the Homeowners Protection Act, lenders are required to cancel PMI once a
                borrower's loan balance falls to 80% of the home's original value. However, if your
                property has appreciated, a current USPAP-compliant appraisal demonstrating that
                current market value exceeds the 80% LTV threshold can accelerate your eligibility —
                often years ahead of schedule.
              </p>
            </motion.div>
          </div>

          {/* RIGHT — Benefit highlights */}
          <div className="space-y-5">
            <motion.p
              className="text-xs uppercase tracking-widest font-semibold mb-6"
              style={{ color: "hsl(42 88% 48%)" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
            >
              Key Benefits
            </motion.p>

            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index + 2}
                className="flex gap-4 p-5 rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="flex-shrink-0 h-11 w-11 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(42 88% 48% / 0.10)" }}
                  aria-hidden="true"
                >
                  <benefit.icon
                    className="h-5 w-5"
                    style={{ color: "hsl(42 88% 48%)" }}
                  />
                </div>
                <div>
                  <h4 className="font-['Playfair_Display',serif] text-base font-semibold text-[hsl(218_60%_20%)] mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.article>
            ))}

            {/* Savings callout */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={benefits.length + 2}
              className="rounded-lg p-5 text-white"
              style={{
                background:
                  "linear-gradient(135deg, hsl(218 60% 20%) 0%, hsl(218 50% 28%) 100%)",
              }}
            >
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-2"
                style={{ color: "hsl(42 92% 58%)" }}
              >
                The Bottom Line
              </p>
              <p className="text-sm leading-relaxed text-white/90">
                Eliminating PMI can save Dallas–Fort Worth homeowners{" "}
                <span className="font-semibold text-white">hundreds of dollars per year</span>.
                An independent, USPAP-compliant appraisal from {siteConfig.name} is
                the credible, lender-accepted documentation you need to make that happen.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

PMIRemovalWhatItIs.displayName = "PMIRemovalWhatItIs";

export default PMIRemovalWhatItIs;
