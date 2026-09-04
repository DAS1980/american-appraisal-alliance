import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Home, Car, TrendingUp, Search, Gavel, Briefcase, Percent, Receipt, ArrowRight, ChevronRight, Icon, Save, Section, View } from "lucide-react";

interface ServiceCard {
  name: string;
  slug: string;
  description: string;
  useCases: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  exactBullets?: string[];
}

const services: ServiceCard[] = [
  {
    name: "Residential Appraisal (Full URAR)",
    slug: "/residential-appraisal",
    description:
      "Full Uniform Residential Appraisal Report for lenders, attorneys, and private clients. The most comprehensive residential valuation report available, prepared in full USPAP compliance.",
    useCases: "Mortgage lending, estate planning, legal proceedings",
    icon: Home,
    badge: "Most Comprehensive",
    exactBullets: [
      "USPAP-compliant, lender-grade reports",
      "Covers single-family homes, condos, and 2–4 unit properties",
      "Accepted by lenders, courts, and attorneys",
    ],
  },
  {
    name: "Desktop Appraisal",
    slug: "/desktop-appraisal",
    description:
      "Remote appraisal using MLS data, public records, and digital tools — no on-site inspection required. A USPAP-compliant solution for refinances and low-risk transactions.",
    useCases: "Refinancing, low-risk loan products",
    icon: FileText,
    exactBullets: [
      "No interior inspection required",
      "Leverages MLS and public record data",
      "Ideal for refinances and low-risk transactions",
    ],
  },
  {
    name: "Exterior-Only (Drive-By) Appraisal",
    slug: "/exterior-only-drive-by-appraisal",
    description:
      "Appraiser inspects exterior only; no interior access needed. Balances professional accuracy with efficiency for eligible transaction types.",
    useCases: "HELOCs and certain loan types",
    icon: Car,
    exactBullets: [
      "Appraiser inspects exterior only; no interior access needed",
      "Faster turnaround, lower cost",
      "Common for HELOCs and certain loan types",
    ],
  },
  {
    name: "Pre-Listing Appraisal",
    slug: "/pre-listing-appraisal",
    description:
      "Independent valuation before listing a home for sale. Helps sellers price accurately and negotiate confidently in the competitive DFW real estate market.",
    useCases: "Home sellers, real estate agents",
    icon: TrendingUp,
    badge: "Sellers",
    exactBullets: [
      "Avoid overpricing or leaving money on the table",
      "Strengthens seller negotiating position",
      "Independent of real estate agent's CMA",
    ],
  },
  {
    name: "Pre-Purchase Appraisal",
    slug: "/pre-purchase-appraisal",
    description:
      "Independent appraisal for buyers before closing. Confirms fair market value independent of lender's appraisal to protect buyers from overpaying.",
    useCases: "Home buyers seeking unbiased valuation",
    icon: Search,
    badge: "Buyers",
    exactBullets: [
      "Protects buyers from overpaying",
      "Independent of the lender's appraisal",
      "Confirms fair market value before closing",
    ],
  },
  {
    name: "Divorce Appraisal",
    slug: "/divorce-appraisal",
    description:
      "Court-accepted, USPAP-compliant appraisal for divorce proceedings. Neutral, unbiased valuations for equitable asset division, including retroactive date-of-separation valuations.",
    useCases: "Divorce attorneys, family law courts",
    icon: Gavel,
    badge: "Court-Accepted",
    exactBullets: [
      "USPAP-compliant, court-accepted reports",
      "Retroactive/date-of-separation valuations available",
      "Neutral and unbiased for equitable division",
    ],
  },
  {
    name: "Estate / Date of Death Appraisal",
    slug: "/estate-date-of-death-appraisal",
    description:
      "Retrospective appraisal for estate settlement, probate, and IRS Form 706. Establishes fair market value as of a specific historical date — accepted by attorneys, CPAs, and courts.",
    useCases: "Estate planners, probate attorneys, CPAs",
    icon: Briefcase,
    badge: "IRS Form 706",
    exactBullets: [
      "Accepted by attorneys, CPAs, and courts",
      "Compliant with IRS Form 706 requirements",
      "Establishes value as of a specific historical date",
    ],
  },
  {
    name: "PMI Removal Appraisal",
    slug: "/pmi-removal-appraisal",
    description:
      "Demonstrates current market value exceeds 80% LTV threshold. Saves DFW homeowners hundreds of dollars per year by supporting private mortgage insurance cancellation.",
    useCases: "Homeowners seeking to cancel PMI",
    icon: Percent,
    badge: "Save Money",
    exactBullets: [
      "Demonstrates current market value exceeds 80% LTV threshold",
      "Saves homeowners hundreds per year",
      "Supports lender PMI cancellation requests",
    ],
  },
  {
    name: "Tax Assessment Appeal Appraisal",
    slug: "/tax-assessment-appeal",
    description:
      "Independent appraisal to challenge inflated county tax assessments. Supports formal appeals with Dallas CAD, Tarrant CAD, Collin CAD, and Denton CAD.",
    useCases: "Property tax appeal filers in DFW",
    icon: Receipt,
    badge: "DFW CADs",
    exactBullets: [
      "Independent appraisal to challenge inflated county tax assessments",
      "Supports formal appeal with Dallas CAD, Tarrant CAD, Collin CAD, Denton CAD",
      "Can result in significant property tax savings",
    ],
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
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const ServiceCardsGrid9ServicesResidentialUrar = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <section data-section-id="bf08551d-b543-44ab-9704-670ea78c66af"
        ref={ref}
        id="service-cards-grid9services-residential-urar"
        className="relative py-20 md:py-32 bg-background"
        aria-labelledby="service-grid-heading"
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-14 md:mb-16"
          >
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground mb-3">
              USPAP-Compliant · Dallas–Fort Worth
            </span>
            <h2
              id="service-grid-heading"
              className="font-['Playfair_Display',_Georgia,_serif] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight"
            >
              Core Appraisal Services
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-['Inter',_sans-serif]">
              Comprehensive, USPAP-compliant residential appraisal reports
              delivered by licensed and certified appraisers serving the full
              DFW metroplex — from mortgage lending to legal proceedings.
            </p>
          </motion.div>

          {/* 9-service grid — 3 columns, 3 rows */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.article
                  key={service.slug}
                  variants={cardVariants}
                  className="group h-full"
                >
                  <Card className="h-full flex flex-col shadow-md hover:shadow-lg border border-border transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-card">
                    {/* Card top accent strip */}
                    <div
                      className="h-1 w-full"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(218 60% 20%) 0%, hsl(42 88% 48%) 100%)",
                      }}
                    />

                    <CardHeader className="pb-3 pt-5 px-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        {/* Icon container */}
                        <div
                          className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(218 60% 20% / 0.1) 0%, hsl(42 88% 48% / 0.12) 100%)",
                          }}
                        >
                          <IconComponent
                            className="h-5 w-5"
                            style={{ color: "hsl(218 60% 20%)" }}
                          />
                        </div>

                        {/* Optional badge */}
                        {service.badge && (
                          <Badge
                            variant="secondary"
                            className="text-xs flex-shrink-0 font-medium"
                            style={{
                              backgroundColor: "hsl(42 88% 48% / 0.12)",
                              color: "hsl(36 88% 36%)",
                              border: "1px solid hsl(42 88% 48% / 0.3)",
                            }}
                          >
                            {service.badge}
                          </Badge>
                        )}
                      </div>

                      <CardTitle className="font-['Playfair_Display',_Georgia,_serif] text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="font-['Inter',_sans-serif] text-sm text-muted-foreground leading-relaxed mt-1">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-between px-5 pb-5 pt-0">
                      {/* Exact bullet points */}
                      {service.exactBullets && (
                        <ul className="space-y-1.5 mb-4">
                          {service.exactBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2 text-sm text-muted-foreground font-['Inter',_sans-serif]"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{
                                  backgroundColor: "hsl(42 88% 48% / 0.15)",
                                  color: "hsl(36 88% 36%)",
                                }}
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Use cases tag */}
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground font-['Inter',_sans-serif]">
                          <span className="font-semibold text-foreground/70 uppercase tracking-wide text-[10px]">
                            Common Use:
                          </span>{" "}
                          {service.useCases}
                        </p>
                      </div>

                      {/* CTA link */}
                      <Link
                        to={service.slug}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold font-['Inter',_sans-serif] transition-all duration-200 group/link"
                        style={{ color: "hsl(218 60% 20%)" }}
                        aria-label={`Learn more about ${service.name}`}
                      >
                        <span className="group-hover/link:underline">
                          View Service Details
                        </span>
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
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
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-14 md:mt-16 rounded-xl px-6 py-8 md:py-10 text-center"
            style={{
              background:
                "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)",
            }}
          >
            <h3 className="font-['Playfair_Display',_Georgia,_serif] text-xl md:text-2xl font-semibold text-white mb-2">
              Ready to Request a USPAP-Compliant Appraisal?
            </h3>
            <p className="text-white/80 font-['Inter',_sans-serif] text-sm md:text-base mb-6 max-w-xl mx-auto">
              Our licensed DFW appraisers are ready to help — from URAR reports
              to tax appeal support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="font-['Inter',_sans-serif] font-semibold text-sm px-7 h-11 transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  color: "hsl(218 65% 10%)",
                  boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.45)",
                }}
              >
                <Link to="/request">Request an Appraisal</Link>
              </Button>
              <p className="text-white/60 text-xs font-['Inter',_sans-serif] flex items-center gap-1.5">
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: "hsl(42 88% 48% / 0.5)",
                  }}
                  aria-hidden="true"
                />
                All inquiries are confidential. We respond within 1 business day.
              </p>
            </div>
          </motion.div>

          {/* Compliance note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-xs text-muted-foreground font-['Inter',_sans-serif] mt-6"
          >
            All appraisal reports are prepared in full compliance with{" "}
            <strong className="text-foreground/70">USPAP</strong> (Uniform
            Standards of Professional Appraisal Practice) and applicable
            federal and state regulations. Serving Dallas, Fort Worth,
            Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and
            the greater DFW metroplex.
          </motion.p>
        </div>
      </section>
    );
  }
);

ServiceCardsGrid9ServicesResidentialUrar.displayName =
  "ServiceCardsGrid9ServicesResidentialUrar";

export default ServiceCardsGrid9ServicesResidentialUrar;
