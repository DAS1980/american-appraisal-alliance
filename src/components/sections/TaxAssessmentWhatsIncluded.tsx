import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, BarChart2, Grid, Users, Award, Shield, Contact, Icon, Key, Section } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const deliverables = [
  {
    icon: FileText,
    title: "USPAP-Compliant Written Appraisal Report",
    description:
      "A fully USPAP-compliant written appraisal report establishing fair market value as of the effective date of your assessment — prepared by a licensed Texas-certified appraiser and accepted by Texas Appraisal Review Boards.",
  },
  {
    icon: BarChart2,
    title: "Comparable Sales Analysis",
    description:
      "A thorough comparable sales analysis using MLS data, public records, and county deed transfers to identify the most relevant market evidence supporting your property's true fair market value.",
  },
  {
    icon: Grid,
    title: "Adjustment Grid & Market Analysis",
    description:
      "An adjustment grid demonstrating how the subject property compares to market comps across key characteristics — square footage, condition, location, amenities — to justify any value differences.",
  },
  {
    icon: Award,
    title: "ARB-Formatted Report",
    description:
      "Report formatted and accepted for formal Appraisal Review Board (ARB) protest hearings. Our documentation meets the evidentiary standards required by Texas county appraisal districts.",
  },
  {
    icon: Shield,
    title: "Multi-CAD Support",
    description:
      "Supports formal property tax protests with Dallas CAD, Tarrant CAD, Collin CAD, and Denton CAD. Our appraisers are familiar with the specific submission and hearing requirements of each district.",
  },
  {
    icon: Users,
    title: "Expert Appraiser Availability",
    description:
      "Your appraiser is available to provide written testimony, supplemental documentation, or clarification if requested during your ARB hearing — giving you professional support throughout the protest process.",
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TaxAssessmentWhatsIncluded = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="tax-assessment-whats-included"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="whats-included-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge
            variant="outline"
            className="mb-4 border-[hsl(42_88%_48%)] text-[hsl(42_88%_40%)] bg-[hsl(42_88%_48%/0.08)] text-xs uppercase tracking-widest font-semibold px-4 py-1"
          >
            Scope of Work
          </Badge>
          <h2
            id="whats-included-heading"
            className="text-3xl md:text-4xl font-bold text-[hsl(218_60%_20%)] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What's Included in Your CAD Appeal Appraisal
          </h2>
          <p
            className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Every Tax Assessment Appeal Appraisal from American Appraisal Alliance is a comprehensive,
            USPAP-compliant engagement designed to give you the strongest possible evidence for your
            county protest. Below is a detailed overview of what your appraisal package includes.
          </p>
        </motion.div>

        {/* Deliverables Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {deliverables.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="group relative bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-4"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[hsl(218_60%_20%/0.07)] flex-shrink-0">
                <item.icon className="w-6 h-6 text-[hsl(218_60%_20%)]" />
              </div>
              {/* Content */}
              <div>
                <h3
                  className="text-base font-semibold text-[hsl(218_60%_20%)] mb-2 leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.description}
                </p>
              </div>
              {/* Gold accent bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg bg-[hsl(42_88%_48%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
        </motion.div>

        {/* Key Bullets Panel */}
        <motion.div
          className="bg-[hsl(218_60%_20%)] rounded-xl p-8 md:p-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Key Highlights */}
            <div>
              <h3
                className="text-xl md:text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Service Highlights
              </h3>
              <ul className="space-y-4">
                {[
                  "Independent appraisal to challenge inflated county tax assessments",
                  "Supports formal appeal with Dallas CAD, Tarrant CAD, Collin CAD, Denton CAD",
                  "Can result in significant property tax savings",
                  "Report prepared by a licensed Texas-certified appraiser",
                  "Accepted by Texas Appraisal Review Boards (ARB)",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(42_88%_58%)] flex-shrink-0 mt-0.5" />
                    <span
                      className="text-white/90 text-sm leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Compliance Note */}
            <div className="flex flex-col gap-6">
              <div className="bg-white/10 rounded-lg p-6 border border-white/15">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-5 h-5 text-[hsl(42_88%_58%)] flex-shrink-0 mt-0.5" />
                  <h4
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    USPAP Compliance Guarantee
                  </h4>
                </div>
                <p
                  className="text-white/85 text-sm leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  All reports are USPAP-compliant and prepared by licensed Texas-certified appraisers.
                  Our appraisals meet the standards required by the Uniform Standards of Professional
                  Appraisal Practice and are accepted by county appraisal districts and Appraisal
                  Review Boards throughout the Dallas–Fort Worth metroplex.
                </p>
              </div>

              <div className="bg-[hsl(42_88%_48%/0.15)] rounded-lg p-6 border border-[hsl(42_88%_58%/0.25)]">
                <h4
                  className="text-base font-semibold text-[hsl(42_88%_65%)] mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  DFW County Coverage
                </h4>
                <p
                  className="text-white/85 text-sm leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  We support formal property tax protests across all major Dallas–Fort Worth
                  county appraisal districts, including Dallas CAD, Tarrant CAD, Collin CAD,
                  and Denton CAD — covering the full DFW metroplex service area.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Reassurance */}
        <motion.p
          className="mt-8 text-center text-sm text-muted-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          Questions about the scope of your appraisal?{" "}
          <a
            href="#tax-assessment-cta"
            className="text-[hsl(218_60%_30%)] hover:text-[hsl(42_88%_40%)] underline underline-offset-2 transition-colors duration-200"
          >
            Contact our team →
          </a>
        </motion.p>
      </div>
    </section>
  );
});

TaxAssessmentWhatsIncluded.displayName = "TaxAssessmentWhatsIncluded";

export default TaxAssessmentWhatsIncluded;
