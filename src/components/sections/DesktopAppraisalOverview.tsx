import React from "react";
import { motion } from "framer-motion";
import { Monitor, FileText, FileSearch, Clock, CheckCircle, Shield, Users, Building2, Home, Database, List, Section, Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** Primary production domain — canonical authority for americanappraisalalliance.com */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const DesktopAppraisalOverview = React.forwardRef<HTMLElement>((props, ref) => {
  const whatIsIncluded = [
    {
      icon: FileSearch,
      title: "MLS Data & Comparable Sales Analysis",
      description:
        "A thorough review of active listings, recent sales, and market trends within the subject property's neighborhood and competing areas across the DFW metroplex.",
    },
    {
      icon: FileText,
      title: "Public Records Review",
      description:
        "Analysis of county tax records, deed history, legal descriptions, and prior appraisal data to verify property characteristics and ownership history.",
    },
    {
      icon: Database,
      title: "Digital Tools & Appraiser Judgment",
      description:
        "Use of approved data platforms, aerial imagery, and appraiser expertise to develop a credible, well-supported opinion of value — without a physical site visit.",
    },
    {
      icon: Shield,
      title: "USPAP-Compliant Report",
      description:
        "All desktop appraisals are completed in full compliance with USPAP standards by licensed and certified appraisers, delivered in a professionally formatted report accepted by lenders and courts.",
    },
  ];

  const whoNeedsIt = [
    {
      icon: Building2,
      label: "Lenders & Mortgage Professionals",
      description:
        "Low-risk refinance transactions where a physical inspection is waived by the lender or investor under applicable guidelines.",
    },
    {
      icon: Users,
      label: "Estate Planning & Attorneys",
      description:
        "Legal and estate planning matters requiring a credible value opinion where property access is unavailable, restricted, or deemed unnecessary.",
    },
    {
      icon: Home,
      label: "Homeowners & Private Clients",
      description:
        "Owners seeking a cost-effective, faster valuation for financial planning, portfolio assessment, or situations where interior access cannot be arranged.",
    },
  ];

  const useCases = [
    "Low-risk mortgage refinance transactions",
    "Estate planning and trust administration",
    "Date-of-death valuations with limited access",
    "Portfolio assessments requiring multiple valuations",
    "Legal proceedings where access is restricted",
    "Internal lender risk reviews and audits",
  ];

  const turnaroundSteps = [
    {
      step: "01",
      title: "Order Submitted",
      description:
        "Complete the Request an Appraisal form. We confirm receipt and review your order within 1 business day.",
    },
    {
      step: "02",
      title: "Data Gathering",
      description:
        "Our appraiser retrieves MLS records, public data, and applicable digital resources for the subject property.",
    },
    {
      step: "03",
      title: "Analysis & Report",
      description:
        "A USPAP-compliant desktop appraisal report is prepared, reviewed, and finalized by a licensed Texas-certified appraiser.",
    },
    {
      step: "04",
      title: "Delivery",
      description:
        "Completed report delivered electronically — typically within 2–4 business days from order receipt.",
    },
  ];

  const comparisonRows = [
    {
      feature: "Physical Inspection",
      desktop: "Not required",
      exterior: "Exterior only",
      full: "Full interior & exterior",
    },
    {
      feature: "Turnaround Time",
      desktop: "2–4 business days",
      exterior: "3–5 business days",
      full: "5–7 business days",
    },
    {
      feature: "Relative Cost",
      desktop: "Lower",
      exterior: "Moderate",
      full: "Standard",
    },
    {
      feature: "USPAP Compliant",
      desktop: "Yes",
      exterior: "Yes",
      full: "Yes",
    },
    {
      feature: "Common Use Cases",
      desktop: "Refinance, estate, legal",
      exterior: "HELOCs, certain loan types",
      full: "Purchase, lender-required",
    },
  ];

  return (
    <section data-section-id="180d5def-41b5-4aa5-bc92-6ddc678863b6"
      ref={ref}
      id="desktop-appraisal-overview"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <motion.div custom={0} variants={fadeUp}>
            <Badge
              variant="outline"
              className="mb-4 uppercase tracking-widest text-xs font-semibold"
              style={{ borderColor: "hsl(42 88% 48%)", color: "hsl(42 88% 48%)" }}
            >
              Desktop Appraisal — Service Overview
            </Badge>
          </motion.div>

          <motion.h2
            custom={0.1}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Is a Desktop Appraisal?
          </motion.h2>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed mb-4"
          >
            A desktop appraisal is a USPAP-compliant real estate appraisal completed without a physical
            interior inspection of the subject property. Instead of visiting the home in person, the
            licensed appraiser relies on MLS data, public property records, prior appraisal history,
            and professional analytical judgment to develop a credible, well-supported opinion of market value.
          </motion.p>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Desktop appraisals offer a faster turnaround and lower cost compared to a full Uniform
            Residential Appraisal Report (URAR) or an Exterior-Only (Drive-By) Appraisal, making them
            well-suited for low-risk lending transactions, estate planning, legal matters, and other
            situations where a physical visit is waived or unnecessary.
          </motion.p>
        </motion.div>

        {/* ── USPAP Compliance Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16 flex items-start gap-4 p-5 rounded-lg border"
          style={{
            borderColor: "hsl(42 88% 48% / 0.4)",
            backgroundColor: "hsl(42 88% 48% / 0.06)",
          }}
        >
          <Shield className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 88% 48%)" }} />
          <p className="text-foreground text-sm md:text-base leading-relaxed">
            <span className="font-semibold">USPAP Compliance Assurance: </span>
            All desktop appraisals are completed in full compliance with USPAP standards by licensed and
            certified appraisers. American Appraisal Alliance serves the entire Dallas–Fort Worth metroplex
            with reports accepted by lenders, courts, and financial institutions.
          </p>
        </motion.div>

        {/* ── What's Included ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            custom={0}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-foreground mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Is Included in a Desktop Appraisal
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {whatIsIncluded.map((item, index) => (
              <motion.article
                key={item.title}
                custom={0.1 + index * 0.1}
                variants={fadeUp}
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
                  <CardHeader className="pb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg mb-2"
                      style={{ backgroundColor: "hsl(218 60% 20% / 0.08)" }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: "hsl(218 60% 20%)" }} />
                    </div>
                    <CardTitle
                      className="text-base md:text-lg text-foreground"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* ── Who Needs It ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            custom={0}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Who Needs a Desktop Appraisal?
          </motion.h3>

          <motion.p
            custom={0.1}
            variants={fadeUp}
            className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl"
          >
            Desktop appraisals are appropriate when a lender, investor, court, or client has determined
            that a physical inspection is not required for the intended use. Common clients and use cases include:
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {whoNeedsIt.map((item, index) => (
              <motion.article
                key={item.label}
                custom={0.15 + index * 0.1}
                variants={fadeUp}
              >
                <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full mb-3"
                      style={{ backgroundColor: "hsl(42 88% 48% / 0.12)" }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: "hsl(42 88% 48%)" }} />
                    </div>
                    <CardTitle
                      className="text-base text-foreground"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {item.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>

          {/* Use Cases List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            className="mt-8 p-6 rounded-lg bg-muted/50 border border-border"
          >
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Appropriate Use Cases for Desktop Appraisals
            </p>
            <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-4">
              {useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 88% 48%)" }} />
                  <span className="text-sm text-muted-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Appraisal Type Comparison ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Comparing Appraisal Types
          </h3>

          <p className="text-muted-foreground text-base mb-8 max-w-2xl">
            Understanding the differences between desktop, exterior-only, and full interior appraisals
            ensures you select the appropriate product for your intended use.
          </p>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "hsl(218 60% 20%)" }}>
                  <th
                    className="text-left px-4 py-3 font-semibold text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Feature
                  </th>
                  <th
                    className="text-left px-4 py-3 font-semibold text-white"
                    style={{ backgroundColor: "hsl(218 60% 16%)" }}
                  >
                    Desktop Appraisal
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-white">
                    Exterior-Only
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-white">
                    Full URAR
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-background" : "bg-muted/40"}
                  >
                    <td className="px-4 py-3 font-medium text-foreground border-r border-border">{row.feature}</td>
                    <td
                      className="px-4 py-3 font-semibold border-r border-border"
                      style={{ color: "hsl(218 60% 20%)" }}
                    >
                      {row.desktop}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground border-r border-border">{row.exterior}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.full}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-3 italic">
            Turnaround estimates may vary based on order volume and property complexity. All appraisal
            types are USPAP-compliant and completed by licensed Texas-certified appraisers serving
            the Dallas–Fort Worth metroplex.
          </p>
        </motion.div>

        {/* ── Turnaround Process ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.h3
            custom={0}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Turnaround Time &amp; Process
          </motion.h3>

          <motion.p
            custom={0.1}
            variants={fadeUp}
            className="text-muted-foreground text-base mb-10 max-w-2xl"
          >
            Our desktop appraisal workflow is designed for efficiency without compromising accuracy or
            USPAP compliance. Most orders serving the DFW metroplex are completed within 2–4 business days.
          </motion.p>

          <div className="grid md:grid-cols-4 gap-6">
            {turnaroundSteps.map((step, index) => (
              <motion.div
                key={step.step}
                custom={0.1 + index * 0.1}
                variants={fadeUp}
                className="flex flex-col items-start md:items-center text-left md:text-center"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full font-bold text-white text-sm mb-4 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, hsl(218 60% 20%) 0%, hsl(218 50% 28%) 100%)" }}
                >
                  {step.step}
                </div>
                <h4
                  className="text-base font-semibold text-foreground mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── DFW Coverage Note ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex items-start gap-3 p-5 rounded-lg bg-muted/50 border border-border"
        >
          <Monitor className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(218 60% 20%)" }} />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Dallas–Fort Worth Service Area: </span>
            American Appraisal Alliance provides desktop appraisal services throughout the DFW metroplex,
            including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton,
            Mansfield, Grand Prairie, Lewisville, Allen, Carrollton, Richardson, and surrounding communities.
            All reports are completed by locally knowledgeable, licensed appraisers with deep familiarity
            with DFW market conditions and comparable sales data.
          </p>
        </motion.div>

      </div>
    </section>
  );
});

DesktopAppraisalOverview.displayName = "DesktopAppraisalOverview";

export default DesktopAppraisalOverview;
