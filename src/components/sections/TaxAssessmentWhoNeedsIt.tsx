import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Home, TrendingUp, Briefcase, Scale, FileText, Contact, Grid, Icon, Key, Section } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const audienceSegments = [
  {
    icon: Home,
    title: "Homeowners with Inflated Assessments",
    description:
      "If you recently received a Notice of Appraised Value showing a significant increase over prior years — or over what comparable homes are selling for — an independent appraisal gives you documented, defensible evidence to challenge that figure at your county appraisal district.",
    badge: "Most Common",
  },
  {
    icon: TrendingUp,
    title: "DFW Property Owners Facing High Tax Bills",
    description:
      "Property owners throughout Dallas, Fort Worth, Arlington, Plano, Irving, and across the DFW metroplex who believe their county assessment exceeds the property's actual fair market value may be paying more in property taxes than the law requires.",
    badge: null,
  },
  {
    icon: Briefcase,
    title: "Real Estate Investors",
    description:
      "Investors managing multiple assessed properties across Dallas CAD, Tarrant CAD, Collin CAD, or Denton CAD can significantly reduce their overall tax liability by identifying and formally protesting inflated valuations with a USPAP-compliant appraisal report.",
    badge: null,
  },
  {
    icon: Scale,
    title: "Attorneys & CPAs",
    description:
      "Legal and financial professionals assisting clients through formal tax protest proceedings require an independent, court-accepted appraisal that will withstand scrutiny before an Appraisal Review Board. Our reports are prepared to meet exactly those standards.",
    badge: null,
  },
  {
    icon: FileText,
    title: "Anyone Filing a Formal CAD Protest",
    description:
      "Whether you are filing your first protest or have navigated the process before, a certified appraisal from American Appraisal Alliance provides the credible market evidence needed to support your case with Dallas CAD, Tarrant CAD, Collin CAD, or Denton CAD.",
    badge: "All Clients",
  },
];

const keyIndicators = [
  "You received a Notice of Appraised Value reflecting a large year-over-year increase",
  "Your assessed value appears to exceed what similar homes in your neighborhood have sold for",
  "You believe the county's mass-appraisal methodology did not accurately reflect your property's condition",
  "You are preparing to file a formal protest before the May 15 Texas CAD deadline",
  "Your lender, attorney, or CPA has advised you to obtain an independent appraisal for the proceeding",
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
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const TaxAssessmentWhoNeedsIt = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="cacfb05f-7e8e-450f-9f78-6a76adfe0b53"
      ref={ref}
      id="tax-assessment-who-needs-it"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden"
      aria-labelledby="who-needs-it-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-xs md:text-sm font-medium uppercase tracking-widest text-amber-600 mb-3">
            Is This Service Right for You?
          </span>
          <h2
            id="who-needs-it-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who Needs a Tax Assessment Appeal Appraisal?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            If you believe your county's assessed property value does not reflect the actual
            fair market value of your home or investment property, you have the right to
            contest it — and a certified, USPAP-compliant appraisal is your strongest tool
            for doing so.
          </p>
        </motion.div>

        {/* Audience Segments Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {audienceSegments.map((segment) => (
            <motion.article
              key={segment.title}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-card">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Icon + Badge Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <segment.icon className="h-5 w-5 text-primary" />
                    </div>
                    {segment.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-amber-100 text-amber-800 border-amber-200"
                      >
                        {segment.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold text-foreground mb-3 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {segment.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {segment.description}
                  </p>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {/* Signs You Should Appeal Panel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-xl border border-border bg-muted/40 px-8 py-10 md:px-12 md:py-12"
        >
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: Intro copy */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">
                Key Indicators
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold text-primary mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Signs You May Have Grounds to Appeal
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                Texas property owners have the right to protest their county appraisal district's
                assessed value. The following circumstances commonly support a successful
                appeal when accompanied by a certified, independent appraisal report prepared
                in accordance with USPAP.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                American Appraisal Alliance serves homeowners and investors throughout the
                Dallas–Fort Worth metroplex — including Dallas, Fort Worth, Arlington, Plano,
                Irving, Garland, Frisco, McKinney, Denton, and surrounding DFW communities —
                with appraisals accepted by all four major county appraisal districts.
              </p>
            </div>

            {/* Right: Checklist */}
            <div>
              <ul className="space-y-4">
                {keyIndicators.map((indicator) => (
                  <li key={indicator} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-foreground leading-relaxed">
                      {indicator}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Not sure whether an appeal is warranted? Contact American Appraisal Alliance for a
            confidential consultation. Our licensed appraisers can help you assess whether an
            independent valuation supports a formal protest with your county's Appraisal Review Board.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

TaxAssessmentWhoNeedsIt.displayName = "TaxAssessmentWhoNeedsIt";

export default TaxAssessmentWhoNeedsIt;
