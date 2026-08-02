import React from "react";
import { motion } from "framer-motion";
import { Check, FileText, Home, BarChart2, MapPin, Camera, ShieldCheck, ClipboardList, Ruler, Award, Grid, Section } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const deliverables = [
  {
    icon: Home,
    title: "Full Interior & Exterior Inspection",
    description:
      "A licensed and certified appraiser conducts a thorough on-site inspection of all interior rooms, exterior features, improvements, and the overall condition of the property — consistent with USPAP Standards Rule 1-2.",
  },
  {
    icon: MapPin,
    title: "Neighborhood & Market Condition Analysis",
    description:
      "A comprehensive review of local market trends, supply and demand dynamics, and neighborhood characteristics affecting value within the Dallas–Fort Worth market area.",
  },
  {
    icon: BarChart2,
    title: "Comparable Sales Analysis (Sales Grid)",
    description:
      "A carefully researched grid of three or more recently sold comparable properties, with line-by-line adjustments for differences in size, condition, location, and amenities — the foundation of the appraiser's opinion of value.",
  },
  {
    icon: ClipboardList,
    title: "Site & Improvement Descriptions",
    description:
      "Detailed descriptions of the subject site (lot size, zoning, utilities, topography) and all improvements (construction quality, room count, condition ratings, functional utility) per Fannie Mae Form 1004 requirements.",
  },
  {
    icon: Ruler,
    title: "ANSI Z765-2021 GLA Measurement",
    description:
      "Gross Living Area is measured and calculated following the ANSI Z765-2021 standard, ensuring accuracy and compliance with Fannie Mae and lender requirements for above-grade living area.",
  },
  {
    icon: Camera,
    title: "Property Photographs",
    description:
      "A complete photographic record of the subject property — front and rear exterior, street scene, all interior rooms, kitchen, bathrooms, and any notable features or conditions — included in the report.",
  },
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Certification",
    description:
      "The report includes the appraiser's signed certification and limiting conditions in full compliance with the Uniform Standards of Professional Appraisal Practice (USPAP), accepted by all major lenders and courts.",
  },
  {
    icon: Award,
    title: "Final Opinion of Value",
    description:
      "A well-supported, defensible opinion of the subject property's fair market value as of the effective date of appraisal, delivered in a complete Fannie Mae Form 1004 (URAR) report in PDF format.",
  },
  {
    icon: FileText,
    title: "Addenda & Supporting Documentation",
    description:
      "Flood map reference, location map, plat or tax map, appraiser license and E&O information, and any supplemental addenda required for complex properties or specific intended use.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ResidentialAppraisalWhatsIncluded = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="residential-appraisal-whats-included"
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
          <Badge
            variant="outline"
            className="mb-4 text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50 font-semibold px-3 py-1"
          >
            Fannie Mae Form 1004 · USPAP-Compliant
          </Badge>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl mx-auto leading-tight">
            What's Included in Your Appraisal Report
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every Full URAR appraisal completed by American Appraisal Alliance
            adheres to the Uniform Standards of Professional Appraisal Practice
            (USPAP) and meets Fannie Mae Form 1004 guidelines. Below is a
            detailed breakdown of all deliverables included in your report.
          </p>
        </motion.div>

        {/* Deliverables Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={cardVariants}>
                <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-card group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-amber-50 transition-colors duration-300">
                        <Icon className="h-5 w-5 text-primary group-hover:text-amber-700 transition-colors duration-300" />
                      </div>
                      <CardTitle className="font-serif text-base md:text-lg font-semibold text-foreground leading-snug">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Compliance Callout Banner */}
        <motion.div
          className="mt-14 rounded-xl border border-amber-200 bg-amber-50 px-6 py-7 md:px-10 md:py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-amber-100 border border-amber-300">
              <ShieldCheck className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-1">
                USPAP-Compliant · Fannie Mae Form 1004 · Court-Accepted
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                All Full URAR appraisals are prepared by licensed and certified
                appraisers in full compliance with USPAP and Fannie Mae Form 1004
                standards. Reports are accepted by lenders, courts, attorneys, and
                CPAs across the Dallas–Fort Worth metroplex.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Checklist Summary */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6 text-center">
            Report Delivery Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {[
              "Full interior and exterior property inspection",
              "Neighborhood and market condition analysis",
              "Comparable sales grid with appraiser adjustments",
              "Site description and improvement analysis",
              "ANSI Z765-2021 Gross Living Area measurement",
              "Complete photographic documentation",
              "USPAP-compliant appraiser certification",
              "Final opinion of fair market value",
              "Fannie Mae Form 1004 (URAR) format",
              "Digital PDF delivery",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/40"
              >
                <Check className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ResidentialAppraisalWhatsIncluded.displayName = "ResidentialAppraisalWhatsIncluded";

export default ResidentialAppraisalWhatsIncluded;
