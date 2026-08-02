import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Scale, MapPin, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CANONICAL_BASE = "https://americanappraisalalliance.com";

const inclusions = [
  {
    icon: FileText,
    title: "Full USPAP-Compliant Written Appraisal Report",
    description:
      "A comprehensive written report produced in strict accordance with the Uniform Standards of Professional Appraisal Practice (USPAP), ensuring acceptance by family law courts and legal proceedings.",
  },
  {
    icon: Scale,
    title: "Licensed Appraiser's Opinion of Fair Market Value",
    description:
      "An objective, unbiased determination of fair market value rendered by a licensed and certified real estate appraiser — a neutral third party with no financial interest in the outcome.",
  },
  {
    icon: CheckCircle,
    title: "Interior and Exterior Property Inspection",
    description:
      "A thorough on-site inspection of the subject property, documenting condition, improvements, and relevant characteristics that influence value.",
  },
  {
    icon: CheckCircle,
    title: "Comparable Sales Analysis (Current or Retroactive)",
    description:
      "In-depth analysis of comparable residential sales in the Dallas–Fort Worth market, adjusted for differences in size, condition, location, and amenities — conducted as of the current date or a specific historical effective date.",
  },
  {
    icon: CheckCircle,
    title: "Retroactive Date-of-Separation Valuation Upon Request",
    description:
      "When the court or settlement agreement requires a historical value, we can establish fair market value as of any prior effective date — including the date of separation.",
  },
  {
    icon: FileText,
    title: "Court-Ready, Attorney-Ready Report Format",
    description:
      "Delivered in a professional format accepted by family law attorneys, mediators, arbitrators, and courts throughout the Dallas–Fort Worth metroplex and the state of Texas.",
  },
  {
    icon: MapPin,
    title: "Coverage Across the Full Dallas–Fort Worth Metroplex",
    description:
      "We provide divorce appraisal services throughout the entire DFW region, including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and surrounding communities.",
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

const DivorceAppraisalWhatsIncluded = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        id="divorce-appraisal-whats-included"
        className="relative py-20 md:py-32 bg-background"
      >
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <Badge
              variant="outline"
              className="mb-4 text-xs uppercase tracking-widest border-[hsl(42_88%_48%)] text-[hsl(42_88%_40%)] bg-[hsl(42_88%_48%/0.08)]"
            >
              Report Deliverables
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(218_60%_20%)] mb-4 max-w-3xl mx-auto">
              What's Included in Your Divorce Appraisal
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Every divorce appraisal we deliver is a complete, defensible
              valuation package — prepared to withstand legal scrutiny and
              accepted by courts and attorneys throughout the Dallas–Fort Worth
              metroplex.
            </p>
          </motion.div>

          {/* Inclusion Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {inclusions.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={itemVariants}>
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-border bg-card">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-[hsl(218_60%_20%/0.08)] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[hsl(218_60%_20%)]" />
                        </div>
                        <h3 className="font-serif text-base font-semibold text-[hsl(218_60%_20%)] leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Full-width DFW Coverage card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <Card className="shadow-sm border border-border bg-card">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-[hsl(218_60%_20%/0.08)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[hsl(218_60%_20%)]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[hsl(218_60%_20%)] leading-snug mb-2">
                    Coverage Across the Full Dallas–Fort Worth Metroplex
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We provide divorce appraisal services throughout the entire
                    DFW region, including Dallas, Fort Worth, Arlington, Plano,
                    Irving, Garland, Frisco, McKinney, Denton, and surrounding
                    communities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Retroactive Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mt-8 rounded-xl bg-[hsl(218_60%_20%)] px-6 py-6 md:py-8 md:px-10 flex flex-col md:flex-row items-start md:items-center gap-5"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(42_88%_48%/0.2)] flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[hsl(42_92%_58%)]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm md:text-base mb-1">
                Retroactive Date-of-Separation Valuations Available
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                Retroactive date-of-separation valuations available — we can
                appraise the property as of any historical effective date
                required by the court or settlement agreement.
              </p>
            </div>
          </motion.div>

          {/* USPAP Compliance Note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="mt-6 rounded-xl border border-[hsl(42_88%_48%/0.3)] bg-[hsl(42_88%_48%/0.05)] px-6 py-5 flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-[hsl(42_88%_48%/0.15)] flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-[hsl(42_88%_40%)]" />
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold text-[hsl(218_60%_20%)]">
                USPAP Compliance:{" "}
              </span>
              All reports are produced in compliance with USPAP standards and
              are accepted by family law courts, mediators, and attorneys. Our
              appraisals are prepared by licensed, certified real estate
              appraisers and meet the professional standards required for use in
              legal proceedings throughout the state of Texas.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }
);

DivorceAppraisalWhatsIncluded.displayName = "DivorceAppraisalWhatsIncluded";

export default DivorceAppraisalWhatsIncluded;
