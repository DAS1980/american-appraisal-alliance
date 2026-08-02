import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Scale, AlertTriangle, Grid, Key, Section } from "lucide-react";

const keyPoints = [
  {
    icon: Scale,
    title: "Independent Valuation",
    description:
      "Independent valuation separate from the county's mass-appraisal process — conducted by a licensed, certified appraiser with no affiliation to the county appraisal district.",
  },
  {
    icon: FileText,
    title: "USPAP-Compliant Report",
    description:
      "USPAP-compliant report accepted by Texas appraisal review boards, meeting the highest professional standards required for formal Appraisal Review Board (ARB) hearings.",
  },
  {
    icon: CheckCircle,
    title: "Market-Based Evidence",
    description:
      "Based on actual comparable sales and market evidence, not algorithmic estimates — our appraisers analyze real MLS transactions and public records specific to your DFW neighborhood.",
  },
  {
    icon: AlertTriangle,
    title: "Defensible Protest Support",
    description:
      "Provides documented, defensible support for your protest hearing with Dallas CAD, Tarrant CAD, Collin CAD, or Denton CAD — giving you credible, professional evidence to present.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const TaxAssessmentWhatItIs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="tax-assessment-what-it-is"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={fadeUp}
          className="max-w-3xl mb-14"
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-[hsl(42_88%_48%)] mb-4">
            Service Overview
          </span>
          <h2 className="font-['Playfair_Display',_Georgia,_serif] text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(218_60%_20%)] leading-tight mb-6">
            What Is a Tax Assessment Appeal Appraisal?
          </h2>
          <div className="space-y-4 text-foreground/80 text-base md:text-lg leading-relaxed">
            <p>
              A{" "}
              <span className="font-semibold text-[hsl(218_60%_20%)]">Tax Assessment Appeal Appraisal</span>{" "}
              is an independent, USPAP-compliant appraisal conducted specifically to challenge a county's
              assessed property value when a homeowner believes that value is inflated. Unlike a standard
              lender appraisal — which establishes fair market value for financing purposes — a tax
              assessment appeal appraisal is prepared exclusively for{" "}
              <span className="font-semibold text-[hsl(218_60%_20%)]">formal protest proceedings</span>{" "}
              at the county appraisal district level.
            </p>
            <p>
              Each year, county appraisal districts across the Dallas-Fort Worth metroplex — including
              Dallas CAD, Tarrant CAD, Collin CAD, and Denton CAD — use mass-appraisal methodologies to
              estimate property values for tax purposes. These automated processes cannot account for the
              unique characteristics of your individual property, neighborhood conditions, or recent
              comparable sales that may indicate a lower value. The result is that many DFW property
              owners receive a Notice of Appraised Value that significantly exceeds their home's true
              fair market value.
            </p>
            <p>
              An independent appraisal from American Appraisal Alliance provides the credible, objective
              evidence needed to formally challenge that assessment before your county's Appraisal Review
              Board (ARB). Our reports are prepared in full accordance with USPAP standards and are
              accepted in formal protest hearings throughout the DFW metroplex.
            </p>
          </div>
        </motion.div>

        {/* Gold accent divider */}
        <div
          className="w-16 h-1 rounded-full mb-14"
          style={{ background: "hsl(42 88% 48%)" }}
        />

        {/* Key Points Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {keyPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.article
                key={point.title}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex gap-5 p-6 rounded-lg bg-white border border-[hsl(218_60%_20%)]/10 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-[hsl(218_60%_20%)]/8">
                  <Icon className="h-5 w-5 text-[hsl(218_60%_20%)]" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display',_Georgia,_serif] text-lg font-semibold text-[hsl(218_60%_20%)] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-foreground/75 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* How It Differs Callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          variants={fadeUp}
          className="mt-12 rounded-lg border-l-4 border-[hsl(42_88%_48%)] bg-[hsl(218_60%_20%)]/5 p-6 md:p-8"
        >
          <h3 className="font-['Playfair_Display',_Georgia,_serif] text-xl font-semibold text-[hsl(218_60%_20%)] mb-4">
            How a Tax Appeal Appraisal Differs from a Lender Appraisal
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/80 leading-relaxed">
            <div>
              <p className="font-semibold text-[hsl(218_60%_20%)] mb-2">Lender / Mortgage Appraisal</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(42_88%_48%)] font-bold leading-none mt-0.5">&#8212;</span>
                  <span>Ordered by a lender for underwriting purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(42_88%_48%)] font-bold leading-none mt-0.5">&#8212;</span>
                  <span>Used to secure financing or refinance a mortgage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(42_88%_48%)] font-bold leading-none mt-0.5">&#8212;</span>
                  <span>Delivered to the lending institution, not the property owner</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[hsl(218_60%_20%)] mb-2">Tax Assessment Appeal Appraisal</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(42_88%_48%)] font-bold leading-none mt-0.5">&#8212;</span>
                  <span>Ordered by the property owner for protest purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(42_88%_48%)] font-bold leading-none mt-0.5">&#8212;</span>
                  <span>Presented to the county Appraisal Review Board (ARB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(42_88%_48%)] font-bold leading-none mt-0.5">&#8212;</span>
                  <span>Formatted to meet CAD and ARB evidentiary standards</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-sm text-foreground/70 italic border-t border-[hsl(218_60%_20%)]/10 pt-4">
            American Appraisal Alliance prepares tax assessment appeal appraisals in full compliance with
            USPAP standards and the evidentiary requirements of Texas county appraisal districts — so you
            arrive at your protest hearing with credible, professionally documented evidence.
          </p>
        </motion.div>

      </div>
    </section>
  );
});

TaxAssessmentWhatItIs.displayName = "TaxAssessmentWhatItIs";

export default TaxAssessmentWhatItIs;
