import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, FileText, Eye, BarChart2, Shield, Home, Image, Key, Section } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const ExteriorOnlyServiceDetail = React.forwardRef<HTMLElement>((props, ref) => {
  const whatIsIncluded = [
    {
      icon: Eye,
      title: "Exterior Inspection",
      description:
        "A licensed appraiser physically drives by and observes the property's exterior condition, site characteristics, and neighborhood context — no interior access required.",
    },
    {
      icon: FileText,
      title: "Public Records & MLS Research",
      description:
        "Comprehensive review of county assessor records, deed history, and current MLS data to establish property characteristics and prior sale history.",
    },
    {
      icon: BarChart2,
      title: "Comparable Sales Analysis",
      description:
        "Selection and analysis of comparable sold properties in the Dallas–Fort Worth market to support a credible, market-driven opinion of value.",
    },
    {
      icon: Shield,
      title: "USPAP-Compliant Written Report",
      description:
        "A formally completed appraisal report prepared in strict compliance with the Uniform Standards of Professional Appraisal Practice (USPAP), suitable for lender submission.",
    },
  ];

  const whoNeedsIt = [
    "Homeowners applying for a Home Equity Line of Credit (HELOC)",
    "Lenders requiring a drive-by or exterior-only appraisal product",
    "Borrowers in refinance transactions eligible for a streamlined appraisal",
    "Clients in time-sensitive situations who need faster turnaround at lower cost",
    "Mortgage servicers and portfolio lenders reviewing collateral values",
  ];

  const keyHighlights = [
    "Appraiser inspects exterior only; no interior access needed",
    "Faster turnaround, lower cost",
    "Common for HELOCs and certain loan types",
    "USPAP-compliant reports by licensed, certified appraisers",
    "Lender-approved report format accepted across the DFW metroplex",
  ];

  return (
    <section
      ref={ref}
      id="exterior-only-service-detail"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-14 md:mb-20"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary text-xs uppercase tracking-widest font-medium"
            >
              Core Appraisal Services
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-foreground max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Exterior-Only (Drive-By) Appraisal
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            A credible, cost-effective appraisal solution for the Dallas–Fort Worth
            metroplex — completed without interior access and delivered with full
            USPAP compliance.
          </motion.p>
        </motion.div>

        {/* Two-column layout: What It Is + Key Highlights */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 md:mb-24 items-start">

          {/* What It Is */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-semibold text-foreground mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Is an Exterior-Only Appraisal?
            </motion.h3>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                An Exterior-Only (Drive-By) Appraisal is a limited-scope residential
                appraisal in which the appraiser observes and photographs the subject
                property's exterior from the street — <strong className="text-foreground">
                no interior access is required</strong>. This methodology is recognized
                by many lenders and mortgage products as a streamlined alternative to
                the full interior inspection.
              </p>
              <p>
                At American Appraisal Alliance, our licensed and certified appraisers
                combine the exterior observation with thorough research of MLS data,
                county public records, and a rigorous comparable sales analysis. The
                result is a credible, USPAP-compliant opinion of value tailored to the
                specific conditions of the Dallas–Fort Worth real estate market.
              </p>
              <p>
                Because the appraiser does not enter the property, turnaround times are
                typically shorter and fees are lower than a full interior appraisal —
                making this service well-suited for HELOC applications, certain
                refinance programs, and other loan types that permit exterior-only
                inspection.
              </p>
            </motion.div>

            {/* USPAP note */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 flex items-start gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5"
            >
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                All reports are USPAP-compliant and produced by licensed, certified
                appraisers serving the full Dallas–Fort Worth metroplex.
              </p>
            </motion.div>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-semibold text-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Service Highlights
            </motion.h3>
            <motion.ul
              variants={stagger}
              className="space-y-4"
            >
              {keyHighlights.map((highlight) => (
                <motion.li
                  key={highlight}
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-[hsl(42_88%_48%)] flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-foreground font-medium leading-snug">{highlight}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Turnaround card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 rounded-lg border border-[hsl(42_88%_48%)/30] bg-[hsl(42_88%_48%)/8] p-5 flex items-start gap-4"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[hsl(42_88%_48%)] flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p
                  className="font-semibold text-foreground text-base mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Typical Turnaround: 2–3 Business Days
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Faster turnaround and lower cost than a full interior appraisal,
                  delivered with the same USPAP compliance standards and professional
                  rigor our DFW clients rely on.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Who Needs It */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16 md:mb-24"
        >
          <motion.h3
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who Needs an Exterior-Only Appraisal?
          </motion.h3>
          <motion.div
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {whoNeedsIt.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border"
              >
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-snug">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16 md:mb-20"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h3
              className="text-2xl md:text-3xl font-semibold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What's Included in Your Report
            </h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Every exterior-only appraisal from American Appraisal Alliance follows a
              rigorous, USPAP-compliant process designed to deliver a reliable,
              defensible opinion of value.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {whatIsIncluded.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle
                        className="text-base font-semibold text-foreground"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
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
            ))}
          </motion.div>
        </motion.div>

        {/* Image + Summary block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-10 items-center mb-16 md:mb-20"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <h3
              className="text-2xl font-semibold text-foreground mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Cost-Effective Solution Accepted by DFW Lenders
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Exterior-Only (Drive-By) Appraisal is a recognized and accepted
              appraisal methodology used by banks, mortgage servicers, and credit unions
              throughout the Dallas–Fort Worth metroplex for qualifying HELOC
              applications, portfolio reviews, and select refinance products.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our reports are completed by licensed, certified appraisers with deep
              knowledge of local DFW markets — from Dallas and Fort Worth to Plano,
              Frisco, Arlington, McKinney, Irving, Garland, Denton, and beyond. Every
              report is USPAP-compliant and built on factual market data.
            </p>
            <ul className="space-y-2">
              {[
                "Accepted by major lenders and mortgage servicers",
                "Covers all DFW metroplex cities and surrounding communities",
                "Accurate, unbiased, defensible valuations",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 md:order-2 rounded-xl overflow-hidden shadow-md border border-border"
          >
            <div className="aspect-video relative">
              <img
                src="https://images.unsplash.com/photo-1678837049045-5d28336ecd1d?w=800&h=600&fit=crop"
                alt="Residential property exterior in the Dallas–Fort Worth area"
                width="800"
                height="600"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Turnaround Time callout banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-xl border border-primary/20 bg-primary/5 p-8 md:p-10 mb-16 md:mb-20"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p
                className="text-3xl font-bold text-primary mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                2–3 Days
              </p>
              <p className="text-sm text-muted-foreground">
                Typical turnaround time — faster than a full interior appraisal
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold text-primary mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                USPAP
              </p>
              <p className="text-sm text-muted-foreground">
                All reports are fully USPAP-compliant and lender-ready
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold text-primary mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                DFW-Wide
              </p>
              <p className="text-sm text-muted-foreground">
                Full Dallas–Fort Worth metroplex coverage — all major cities
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subtle inline link — CTA section handles the primary button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm">
            Ready to get started?{" "}
            <Link
              to="/request"
              className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
            >
              Request an Appraisal →
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
});

ExteriorOnlyServiceDetail.displayName = "ExteriorOnlyServiceDetail";

export default ExteriorOnlyServiceDetail;
