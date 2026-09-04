import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, FileText, Eye, Tag, ShoppingCart, Gavel, Briefcase, Percent, Receipt, ArrowRight, Grid, Section } from "lucide-react";

interface ServiceCard {
  name: string;
  slug: string;
  description: string;
  useCases: string;
  exactBullets?: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const services: ServiceCard[] = [
  {
    name: "Residential Appraisal (Full URAR)",
    slug: "/residential-appraisal",
    description:
      "Full URAR appraisal for lenders, attorneys, and private clients. The most comprehensive residential valuation report.",
    useCases: "Mortgage lending, estate planning, legal proceedings",
    icon: Home,
  },
  {
    name: "Desktop Appraisal",
    slug: "/desktop-appraisal",
    description:
      "Remote appraisal using MLS data and public records — no on-site inspection required. Ideal for refinances and low-risk loan products.",
    useCases: "Refinancing, low-risk loan products",
    icon: FileText,
  },
  {
    name: "Exterior-Only (Drive-By) Appraisal",
    slug: "/exterior-only-drive-by-appraisal",
    description:
      "Appraiser inspects exterior only; no interior access needed. Faster turnaround, lower cost. Common for HELOCs and certain loan types.",
    useCases: "HELOCs and certain loan types",
    exactBullets: [
      "Appraiser inspects exterior only; no interior access needed",
      "Faster turnaround, lower cost",
      "Common for HELOCs and certain loan types",
    ],
    icon: Eye,
  },
  {
    name: "Pre-Listing Appraisal",
    slug: "/pre-listing-appraisal",
    description:
      "Independent valuation before listing a home for sale. Helps sellers price accurately and negotiate confidently.",
    useCases: "Home sellers, real estate agents",
    icon: Tag,
  },
  {
    name: "Pre-Purchase Appraisal",
    slug: "/pre-purchase-appraisal",
    description:
      "Independent appraisal for buyers before closing. Confirms fair market value independent of the lender's appraisal.",
    useCases: "Home buyers seeking unbiased valuation",
    icon: ShoppingCart,
  },
  {
    name: "Divorce Appraisal",
    slug: "/divorce-appraisal",
    description:
      "Court-accepted, USPAP-compliant appraisal for divorce proceedings. Neutral, unbiased valuation with retroactive date-of-separation valuations available.",
    useCases: "Divorce attorneys, family law courts",
    icon: Gavel,
  },
  {
    name: "Estate / Date of Death Appraisal",
    slug: "/estate-date-of-death-appraisal",
    description:
      "Retrospective appraisal for estate settlement, probate, and IRS Form 706. Accepted by attorneys, CPAs, and courts.",
    useCases: "Estate planners, probate attorneys, CPAs",
    icon: Briefcase,
  },
  {
    name: "PMI Removal Appraisal",
    slug: "/pmi-removal-appraisal",
    description:
      "Demonstrates current market value exceeds the 80% LTV threshold. Saves homeowners hundreds per year in mortgage insurance premiums.",
    useCases: "Homeowners seeking to cancel PMI",
    icon: Percent,
  },
  {
    name: "Tax Assessment Appeal Appraisal",
    slug: "/tax-assessment-appeal",
    description:
      "Independent appraisal to challenge inflated county tax assessments. Supports formal appeal with Dallas CAD, Tarrant CAD, Collin CAD, Denton CAD.",
    useCases: "Property tax appeal filers in DFW",
    exactBullets: [
      "Independent appraisal to challenge inflated county tax assessments",
      "Supports formal appeal with Dallas CAD, Tarrant CAD, Collin CAD, Denton CAD",
      "Can result in significant property tax savings",
    ],
    icon: Receipt,
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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const CoreAppraisalServiceCards = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="81502ca1-2c53-43e3-910d-74ac0c5ac481"
      ref={ref}
      id="core-appraisal-service-cards"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 text-xs uppercase tracking-widest border-primary/30 text-primary font-medium px-4 py-1.5"
          >
            USPAP-Compliant · Dallas–Fort Worth
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Core Appraisal Services
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            American Appraisal Alliance delivers accurate, unbiased, and defensible valuations
            across the full Dallas–Fort Worth metroplex. Select any service below to learn more.
          </p>
        </motion.div>

        {/* Service Cards Grid — exactly 9 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                className="group h-full"
              >
                <Link
                  to={service.slug}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                  aria-label={`Learn more about ${service.name}`}
                >
                  <Card className="h-full border-2 border-border hover:border-primary/40 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden group-hover:-translate-y-1">
                    <CardHeader className="pb-3 pt-6 px-6">
                      {/* Gold/amber icon background */}
                      <div className="flex items-start gap-4 mb-2">
                        <div
                          className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg"
                          style={{
                            background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                            boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.35)",
                          }}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle
                            className="text-base md:text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {service.name}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 pt-0 flex flex-col gap-4">
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      {/* Exact bullet points if specified */}
                      {service.exactBullets && (
                        <ul className="space-y-1.5">
                          {service.exactBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2 text-xs text-muted-foreground"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                                style={{
                                  background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                                }}
                                aria-hidden="true"
                              >
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M1.5 4L3 5.5L6.5 2"
                                    stroke="white"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Use cases badge */}
                      <div className="mt-auto pt-2 border-t border-border/60">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">Common use: </span>
                          {service.useCases}
                        </p>
                      </div>

                      {/* Learn more link */}
                      <div className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-200">
                        <span>Learn more</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-12 text-center text-sm text-muted-foreground max-w-xl mx-auto"
        >
          All appraisals are performed by licensed, certified appraisers in full compliance with{" "}
          <strong className="text-foreground font-medium">USPAP</strong> standards.
          Serving Dallas, Fort Worth, Arlington, Plano, Irving, Frisco, McKinney, Denton,
          and the surrounding DFW metroplex.
        </motion.p>
      </div>
    </section>
  );
});

CoreAppraisalServiceCards.displayName = "CoreAppraisalServiceCards";

export default CoreAppraisalServiceCards;
