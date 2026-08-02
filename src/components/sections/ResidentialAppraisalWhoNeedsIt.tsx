import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Scale, Users, Briefcase, Home, FileText, TrendingUp, ShieldCheck, Grid, Section, Tags } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Mortgage Lenders & Brokers",
    description:
      "Financial institutions and mortgage professionals requiring a conforming USPAP-compliant appraisal for loan origination, purchase transactions, or refinances. A Full URAR (Fannie Mae Form 1004) satisfies GSE, FHA, and conventional lending requirements.",
    tags: ["Loan Origination", "Refinance", "GSE Compliance"],
  },
  {
    icon: Home,
    title: "Homeowners Refinancing",
    description:
      "Homeowners seeking to refinance their mortgage benefit from an independent, lender-grade appraisal that establishes current fair market value — supporting favorable loan terms and confirming sufficient equity.",
    tags: ["Equity Confirmation", "Rate & Term Refinance", "Cash-Out Refinance"],
  },
  {
    icon: Users,
    title: "Buyers & Sellers",
    description:
      "Both parties in a real estate transaction may commission an independent Full URAR to verify value free of any lender's influence. Sellers use it to price accurately; buyers use it to confirm they are not overpaying in the competitive Dallas–Fort Worth market.",
    tags: ["Pre-Listing Pricing", "Pre-Purchase Verification", "DFW Market Analysis"],
  },
  {
    icon: Scale,
    title: "Attorneys & Legal Professionals",
    description:
      "Family law attorneys, estate planners, and litigation counsel rely on USPAP-compliant Full URAR appraisals as court-accepted evidence of fair market value. Common in divorce proceedings, equitable distribution cases, and property-related legal disputes.",
    tags: ["Divorce Proceedings", "Litigation Support", "Court-Accepted Reports"],
  },
  {
    icon: Briefcase,
    title: "CPAs & Estate Professionals",
    description:
      "Certified public accountants and estate administrators require defensible valuations for estate settlement, probate proceedings, and IRS Form 706 filings. A Full URAR provides the documented, certified opinion of value required by tax authorities and courts.",
    tags: ["Estate Settlement", "Probate", "IRS Form 706"],
  },
  {
    icon: FileText,
    title: "Private Clients",
    description:
      "Any individual or organization needing a credible, defensible opinion of fair market value for personal financial planning, asset documentation, insurance purposes, or partnership buyouts can commission a Full URAR from a licensed, certified appraiser.",
    tags: ["Financial Planning", "Asset Documentation", "Insurance"],
  },
  {
    icon: TrendingUp,
    title: "Real Estate Investors",
    description:
      "Investors acquiring, refinancing, or repositioning residential properties across the DFW metroplex use Full URAR appraisals to validate acquisition pricing, support lender financing, and document value for portfolio analysis.",
    tags: ["Acquisition Due Diligence", "Portfolio Valuation", "DFW Investment"],
  },
  {
    icon: ShieldCheck,
    title: "Government & Municipal Agencies",
    description:
      "Municipal authorities, housing agencies, and government programs requiring HUD or FHA-compliant residential valuations rely on Full URAR reports prepared by certified appraisers familiar with Dallas, Fort Worth, Plano, Irving, and surrounding DFW communities.",
    tags: ["FHA/HUD Compliance", "Government Programs", "Municipal Use"],
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

const ResidentialAppraisalWhoNeedsIt = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="residential-appraisal-who-needs-it"
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
          <span
            className="inline-block text-xs md:text-sm font-semibold uppercase tracking-[0.18em] mb-4"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Residential Appraisal — Full URAR
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 max-w-3xl mx-auto"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "hsl(218 60% 20%)",
            }}
          >
            Who Needs a Full URAR Appraisal?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A Full Uniform Residential Appraisal Report (URAR) is the industry's most
            comprehensive residential valuation tool — ordered by a broad range of clients
            across the Dallas–Fort Worth metroplex whenever a credible, USPAP-compliant
            opinion of fair market value is required.
          </p>
        </motion.div>

        {/* Audience Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <motion.div key={audience.title} variants={cardVariants}>
                <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden group">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    {/* Icon + Title Row */}
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg"
                        style={{ backgroundColor: "hsl(218 60% 20% / 0.07)" }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: "hsl(218 60% 20%)" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-lg font-semibold leading-snug"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            color: "hsl(218 60% 20%)",
                          }}
                        >
                          {audience.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                      {audience.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {audience.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block text-xs font-medium px-2.5 py-1 rounded-full border"
                          style={{
                            borderColor: "hsl(42 88% 48% / 0.45)",
                            color: "hsl(36 88% 36%)",
                            backgroundColor: "hsl(42 88% 48% / 0.08)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Callout Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-14 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border"
          style={{
            backgroundColor: "hsl(218 60% 20% / 0.04)",
            borderColor: "hsl(218 60% 20% / 0.12)",
          }}
        >
          <div className="flex-shrink-0">
            <ShieldCheck
              className="w-10 h-10"
              style={{ color: "hsl(42 88% 48%)" }}
            />
          </div>
          <div className="flex-1">
            <p
              className="text-base md:text-lg font-semibold mb-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "hsl(218 60% 20%)",
              }}
            >
              USPAP-Compliant Reports Accepted Throughout the DFW Metroplex
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Every Full URAR appraisal prepared by American Appraisal Alliance adheres
              strictly to the Uniform Standards of Professional Appraisal Practice (USPAP)
              and satisfies the requirements of major lenders, courts, and government
              agencies serving Dallas, Fort Worth, Arlington, Plano, Irving, Garland,
              Frisco, McKinney, Denton, and the broader DFW metroplex.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ResidentialAppraisalWhoNeedsIt.displayName = "ResidentialAppraisalWhoNeedsIt";

export default ResidentialAppraisalWhoNeedsIt;
