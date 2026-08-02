import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, BarChart2, Ruler, Section, Square } from "lucide-react";

const services = [
  {
    title: "Core Appraisal Services",
    description:
      "Full URAR, divorce, estate, PMI removal, tax appeal, and more — USPAP-compliant reports for every need.",
    link: "/core-appraisal-services",
    icon: FileText,
    detail:
      "Our licensed appraisers deliver certified, court-accepted, and lender-approved reports for residential properties across the Dallas–Fort Worth metroplex. Every engagement meets USPAP standards.",
    highlights: [
      "Residential Appraisal (Full URAR)",
      "Divorce & Estate Appraisals",
      "PMI Removal & Tax Assessment Appeal",
    ],
  },
  {
    title: "Valuation Updates & Reports",
    description:
      "Market value updates, 1004D recertifications, and FHA/HUD compliance observation reports.",
    link: "/valuation-updates-reports",
    icon: BarChart2,
    detail:
      "When your prior appraisal has expired or your lender requires updated documentation, our valuation update services keep your transaction on track — fully compliant with Fannie Mae Form 1004D and FHA/HUD requirements.",
    highlights: [
      "Market Value Update (1004D / Recertification)",
      "FHA/HUD Compliance Observation Report",
      "Fannie Mae Form 1004D Compliant",
    ],
  },
  {
    title: "Measurement & Analysis Services",
    description:
      "ANSI Z765-2021 property measurement, GLA certification, floor plans, and square footage analysis.",
    link: "/measurement-analysis-services",
    icon: Ruler,
    detail:
      "Precise, defensible property measurements following ANSI Z765-2021 standards. From Gross Living Area certification to detailed floor plan sketches, our measurement services protect buyers, sellers, lenders, and agents in the DFW market.",
    highlights: [
      "Property Measurement (ANSI Z765)",
      "Gross Living Area (GLA) Certification",
      "Floor Plan / Sketch Report & Square Footage Verification",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const HomeServices = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="home-services"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="home-services-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14 md:mb-18"
        >
          <span
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Our Services
          </span>
          <h2
            id="home-services-heading"
            className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto"
            style={{ color: "hsl(218 60% 20%)", fontFamily: "'Playfair Display', serif" }}
          >
            Comprehensive Appraisal Services for the Dallas–Fort Worth Metroplex
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            American Appraisal Alliance delivers USPAP-compliant, certified real estate appraisals
            across all three service categories — serving homeowners, lenders, attorneys, and real
            estate professionals throughout DFW.
          </p>
        </motion.div>

        {/* Service Cards — exactly 3 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Card
                  className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border"
                  style={{ borderTopColor: "hsl(42 88% 48%)", borderTopWidth: "3px" }}
                >
                  {/* Icon strip */}
                  <div
                    className="px-6 pt-6 pb-2"
                  >
                    <div
                      className="inline-flex items-center justify-center h-12 w-12 rounded-lg mb-4"
                      style={{ backgroundColor: "hsl(218 60% 20% / 0.07)" }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: "hsl(218 60% 20%)" }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <CardHeader className="px-6 pt-0 pb-2">
                    <CardTitle
                      className="text-xl font-bold leading-snug"
                      style={{
                        color: "hsl(218 60% 20%)",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 flex flex-col flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {service.detail}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span
                            className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "hsl(42 88% 48%)" }}
                            aria-hidden="true"
                          />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group font-semibold border-2 transition-colors duration-200"
                      style={{
                        borderColor: "hsl(218 60% 20%)",
                        color: "hsl(218 60% 20%)",
                      }}
                    >
                      <Link to={service.link}>
                        Explore {service.title}
                        <ArrowRight
                          className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Not sure which service you need? Our licensed DFW appraisers are ready to assist.
          </p>
          <Button
            asChild
            size="lg"
            className="font-semibold text-sm px-8"
            style={{
              backgroundColor: "hsl(42 88% 48%)",
              color: "hsl(218 60% 20%)",
            }}
          >
            <Link to="/request">Request an Appraisal</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

HomeServices.displayName = "HomeServices";

export default HomeServices;
