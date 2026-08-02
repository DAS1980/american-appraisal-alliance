import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ruler, Home, FileText, CheckSquare, ArrowRight, Grid, Section, Square } from "lucide-react";

interface ServiceCard {
  name: string;
  description: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  bullets: string[];
  badge: string;
}

const services: ServiceCard[] = [
  {
    name: "Property Measurement (ANSI Z765)",
    description:
      "Precise home measurement following ANSI Z765-2021 standards for lenders, appraisers, and listing accuracy.",
    link: "/property-measurement-ansi-z765",
    icon: Ruler,
    bullets: [
      "ANSI Z765-2021 compliant methodology",
      "Required by many lenders and MLS systems",
      "Includes detailed sketch and square footage breakdown",
    ],
    badge: "ANSI Z765-2021",
  },
  {
    name: "Gross Living Area (GLA) Certification",
    description:
      "Certified GLA calculation accepted by lenders, courts, and real estate professionals.",
    link: "/gross-living-area-gla-certification",
    icon: Home,
    bullets: [
      "Certifies the above-grade living area of a property",
      "Resolves discrepancies between tax records and actual GLA",
      "Used by lenders, agents, and homeowners",
    ],
    badge: "Lender-Accepted",
  },
  {
    name: "Floor Plan / Sketch Report",
    description:
      "Detailed floor plan sketch with labeled rooms, dimensions, and calculated square footage.",
    link: "/measurement-analysis-services",
    icon: FileText,
    bullets: [
      "Detailed floor plan sketch with room dimensions",
      "Useful for listings, renovations, insurance, and legal purposes",
      "Delivered in digital format",
    ],
    badge: "Digital Delivery",
  },
  {
    name: "Square Footage Verification",
    description:
      "Independent verification of a property's square footage to resolve discrepancies and protect buyers and sellers.",
    link: "/measurement-analysis-services",
    icon: CheckSquare,
    bullets: [
      "Verifies advertised square footage against actual measurements",
      "Protects buyers and sellers from square footage disputes",
      "Fast turnaround, affordable pricing",
    ],
    badge: "Fast Turnaround",
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

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const MeasurementServiceCards = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="measurement-service-cards"
      className="relative py-20 md:py-32 bg-background"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 font-sans">
            Measurement &amp; Analysis Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Our Measurement &amp; Analysis Services
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            USPAP-compliant property measurement and square footage
            certification — delivered with precision for DFW homeowners,
            lenders, and real estate professionals.
          </p>
        </motion.div>

        {/* Service Cards Grid — exactly 4 cards in a 2×2 grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-7"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.name}
                variants={cardVariants}
                className="group"
              >
                <Card className="h-full border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-card">
                  {/* Gold/amber top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[hsl(42_88%_48%)] to-[hsl(36_88%_44%)]" />

                  <CardHeader className="pb-3 pt-6 px-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      {/* Icon with navy background */}
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-sans whitespace-nowrap mt-1"
                      >
                        {service.badge}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-xl font-semibold text-foreground leading-snug">
                      {service.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-2 mb-6">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm text-foreground font-sans"
                        >
                          <span
                            className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg, hsl(42 92% 52%), hsl(36 88% 44%))",
                            }}
                          >
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              viewBox="0 0 10 10"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2 5.5l2 2 4-4"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Link */}
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-sans group/btn"
                    >
                      <Link to={service.link}>
                        <span>Learn More</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-muted-foreground font-sans mb-5">
            All measurement and analysis reports are USPAP-compliant and
            delivered by licensed Dallas–Fort Worth appraisers.
          </p>
          <Button
            asChild
            size="lg"
            className="font-sans px-8 h-12 text-base shadow-md"
            style={{
              background:
                "linear-gradient(135deg, hsl(42 92% 52%), hsl(36 88% 44%))",
              color: "hsl(218 65% 14%)",
            }}
          >
            <Link to="/request">Request an Appraisal</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

MeasurementServiceCards.displayName = "MeasurementServiceCards";

export default MeasurementServiceCards;
