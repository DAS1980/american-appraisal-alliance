import React from "react";
import { motion } from "framer-motion";
import { Building2, RefreshCw, FileCheck, Users, Scale, Briefcase, Home, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const audiences = [
  {
    icon: Building2,
    title: "Lenders & Mortgage Brokers",
    description:
      "When an original appraisal expires before closing, lenders require a certified Fannie Mae Form 1004D recertification to confirm the property's current market value. American Appraisal Alliance delivers lender-accepted, USPAP-compliant updates that keep your loan files moving.",
    badge: "Market Value Update",
  },
  {
    icon: Home,
    title: "Homeowners Refinancing After Appreciation",
    description:
      "If DFW home values have risen since your last appraisal, a market value update can reflect that appreciation — supporting a better loan-to-value ratio, potentially eliminating PMI, or unlocking equity for a cash-out refinance.",
    badge: "Recertification",
  },
  {
    icon: FileCheck,
    title: "FHA Borrowers Requiring Condition Documentation",
    description:
      "FHA and HUD underwriting standards require that properties meet specific health, safety, and structural thresholds. Our FHA/HUD Compliance Observation Report identifies any conditions that may affect FHA loan eligibility, giving your transaction the documentation it needs.",
    badge: "FHA/HUD Report",
  },
  {
    icon: Scale,
    title: "Real Estate Attorneys Managing Loan File Compliance",
    description:
      "Attorneys overseeing estate settlements, divorce proceedings, or complex closings often need updated valuations that are defensible and court-accepted. Our USPAP-compliant valuation updates provide the documentation required for legal proceedings across the Dallas–Fort Worth metroplex.",
    badge: "Legal Compliance",
  },
  {
    icon: Briefcase,
    title: "Buyers & Sellers Requiring Updated Valuations for Closing",
    description:
      "Transactions can stall when appraisals expire or market conditions shift. Whether you're a buyer seeking confirmation of fair market value or a seller managing a delayed closing, a certified valuation update from a licensed DFW appraiser ensures your transaction proceeds with confidence.",
    badge: "Transaction Support",
  },
  {
    icon: Users,
    title: "Real Estate Professionals Across the DFW Metroplex",
    description:
      "Agents, brokers, and title companies in Dallas, Fort Worth, Plano, Frisco, McKinney, Arlington, and surrounding communities rely on American Appraisal Alliance for fast, accurate, and lender-approved valuation updates to keep deals on track.",
    badge: "DFW Coverage",
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
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const ValuationUpdatesWhoNeeds = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="6538cd2b-d84d-4818-85bc-a0b985741a3c"
      ref={ref}
      id="valuation-updates-who-needs"
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
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 font-sans">
            Valuation Updates &amp; Reports
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 max-w-3xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            Who Needs a Valuation Update?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Lenders, borrowers, and real estate professionals across DFW rely on certified
            valuation updates to keep transactions on track. Understanding which report
            applies to your situation is the first step toward a successful outcome.
          </p>
        </motion.div>

        {/* Audience Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <motion.article
                key={audience.title}
                variants={itemVariants}
                className="group"
              >
                <Card className="h-full border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0"
                        style={{ background: "hsl(218 60% 20% / 0.08)" }}
                      >
                        <Icon className="h-6 w-6" style={{ color: "hsl(218 60% 20%)" }} />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs whitespace-nowrap"
                        style={{
                          background: "hsl(42 88% 48% / 0.12)",
                          color: "hsl(36 88% 32%)",
                          borderColor: "hsl(42 88% 48% / 0.25)",
                        }}
                      >
                        {audience.badge}
                      </Badge>
                    </div>
                    <CardTitle
                      className="text-base md:text-lg leading-snug text-foreground"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {audience.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {audience.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Informational Callout Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-xl border border-border p-8 md:p-10 mb-10"
          style={{ background: "hsl(218 60% 20% / 0.04)" }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-shrink-0">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-lg"
                style={{ background: "hsl(218 60% 20%)" }}
              >
                <RefreshCw className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h3
                className="text-xl md:text-2xl font-semibold text-foreground mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Understanding Valuation Update Reports
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A valuation update is not a new appraisal — it is a USPAP-compliant report
                that recertifies or updates findings from a prior appraisal assignment. The
                two primary report types we provide serve distinct needs:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                    style={{ background: "hsl(42 88% 48%)" }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-foreground font-medium">
                      Market Value Update (1004D / Recertification):
                    </strong>{" "}
                    Prepared on Fannie Mae Form 1004D, this report recertifies the value
                    from a prior appraisal or updates it to reflect current DFW market
                    conditions. Required by most lenders when the original appraisal has
                    expired prior to closing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0"
                    style={{ background: "hsl(42 88% 48%)" }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="text-foreground font-medium">
                      FHA/HUD Compliance Observation Report:
                    </strong>{" "}
                    This report documents observable property conditions relevant to FHA
                    and HUD underwriting requirements. It identifies health, safety, and
                    structural observations that may affect a borrower's FHA loan
                    eligibility — providing the documentation underwriters need.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* USPAP Compliance Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg border border-border bg-muted/40 px-6 py-5"
        >
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
            style={{ background: "hsl(42 88% 48% / 0.15)" }}
          >
            <FileCheck className="h-5 w-5" style={{ color: "hsl(36 88% 32%)" }} />
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            <strong className="text-foreground font-medium">
              All reports are USPAP-compliant and lender-accepted.
            </strong>{" "}
            American Appraisal Alliance's licensed and certified appraisers serve the
            entire Dallas–Fort Worth metroplex — including Dallas, Fort Worth, Arlington,
            Plano, Irving, Garland, Frisco, McKinney, Denton, and surrounding DFW
            communities — with defensible, court-accepted valuation reports.
          </p>
        </motion.div>

        {/* Subtle text link to service cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Button
            variant="ghost"
            asChild
            className="text-sm font-medium gap-1"
            style={{ color: "hsl(218 60% 20%)" }}
          >
            <Link to="/valuation-updates-reports">
              View our Valuation Update services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

ValuationUpdatesWhoNeeds.displayName = "ValuationUpdatesWhoNeeds";

export default ValuationUpdatesWhoNeeds;
