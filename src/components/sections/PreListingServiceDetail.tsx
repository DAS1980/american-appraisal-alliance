import React from "react";
import { motion } from "framer-motion";
import { Check, Clock, FileText, Users, Home, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SITE_BASE_URL = "https://americanappraisalalliance.com";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  }),
};

const whatIsIncluded = [
  "Full interior and exterior inspection",
  "Comparable sales analysis using local DFW market data",
  "USPAP-compliant written appraisal report",
  "Fair market value opinion as of inspection date",
  "Defensible documentation for negotiations and disclosures",
];

const keyBenefits = [
  {
    icon: Home,
    text: "Avoid overpricing and extended time on market",
  },
  {
    icon: FileText,
    text: "Avoid underpricing and leaving money on the table",
  },
  {
    icon: ShieldCheck,
    text: "Negotiate with confidence using an independent valuation",
  },
  {
    icon: Check,
    text: "Reduce the risk of a deal falling apart at the lender's appraisal stage",
  },
  {
    icon: Users,
    text: "Support your listing price with a credible, third-party document",
  },
];

const whoNeedsIt = [
  {
    title: "Home Sellers",
    description:
      "DFW homeowners preparing to list their property who want an objective, defensible market value before setting an asking price.",
  },
  {
    title: "Real Estate Agents",
    description:
      "Listing agents representing sellers throughout the Dallas–Fort Worth metroplex who want to support pricing decisions with an independent, licensed appraisal.",
  },
  {
    title: "Homeowners Preparing to List",
    description:
      "Any property owner in Dallas, Fort Worth, Arlington, Plano, Frisco, McKinney, or surrounding DFW communities who wants clarity on true market value before going to market.",
  },
];

const PreListingServiceDetail = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="1c8fa2f6-be97-4908-a373-af2d95214f85"
      ref={ref}
      id="pre-listing-service-detail"
      className="py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Section intro */}
        <motion.div
          className="mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <Badge
            variant="outline"
            className="mb-4 text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50"
          >
            Pre-Listing Appraisal
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground max-w-3xl mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Is a Pre-Listing Appraisal?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            A pre-listing appraisal is an independent, USPAP-compliant appraisal completed before
            a home is listed for sale. It provides an objective fair market value opinion from a
            licensed appraiser — not an automated estimate or algorithm-driven tool. Unlike a
            Comparative Market Analysis (CMA) prepared by a real estate agent, a pre-listing
            appraisal carries the full weight of a licensed, third-party professional valuation
            accepted by lenders, attorneys, and courts.
          </p>
        </motion.div>

        {/* Two-column layout: What It Is + Who Needs It | What's Included + Turnaround */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">

          {/* LEFT COLUMN: What It Is + Who Needs It */}
          <div className="space-y-10">

            {/* What It Is — detail */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.1}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  About This Appraisal
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Performed by a licensed and certified appraiser in full compliance with the
                Uniform Standards of Professional Appraisal Practice (USPAP), a pre-listing
                appraisal involves a thorough inspection of the property, analysis of recent
                comparable sales in the local DFW market, and delivery of a written report
                detailing the appraiser's supported value conclusion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The result is a credible, defensible document that sellers, agents, and buyers
                can rely on — especially in competitive markets across the Dallas–Fort Worth
                metroplex where pricing precision directly impacts days on market and final
                sale outcome.
              </p>
            </motion.div>

            {/* Who Needs It */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.2}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Who Needs a Pre-Listing Appraisal?
                </h3>
              </div>
              <div className="space-y-4">
                {whoNeedsIt.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 p-4 rounded-lg border border-border bg-card shadow-sm"
                  >
                    <Check className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm mb-1">{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: What's Included + Turnaround */}
          <div className="space-y-10">

            {/* What's Included */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.15}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  What's Included
                </h3>
              </div>
              <Card className="border border-border shadow-sm">
                <CardContent className="pt-6 pb-6">
                  <ul className="space-y-3">
                    {whatIsIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                          <Check className="h-3 w-3 text-amber-600" />
                        </span>
                        <span className="text-sm text-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Turnaround Time */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.25}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Turnaround Time
                </h3>
              </div>
              <Card className="border border-border shadow-sm bg-card">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-[image:var(--gradient-navy)] flex items-center justify-center shadow-sm">
                      <Clock className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-1">
                        3–5 Business Days
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Reports are typically delivered within 3–5 business days of the
                        inspection date, allowing you to finalize your listing timeline
                        without delays. Rush scheduling may be available upon request.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* USPAP Compliance Note */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.3}
            >
              <Card className="border border-amber-200 bg-amber-50 shadow-sm">
                <CardHeader className="pb-2 pt-5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <CardTitle
                      className="text-sm font-semibold text-amber-800"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      USPAP Compliance Guaranteed
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-5">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    All appraisals are performed in compliance with USPAP standards by
                    licensed and certified appraisers. Every report is defensible,
                    impartial, and suitable for use in negotiations, disclosures, and
                    legal proceedings.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Key Benefits strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          <div className="rounded-2xl bg-[image:var(--gradient-navy)] px-8 py-10 md:py-12 text-white shadow-[var(--shadow-navy)]">
            <h3
              className="text-xl md:text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Key Benefits of a Pre-Listing Appraisal
            </h3>
            <p className="text-white/75 text-sm mb-8 max-w-2xl">
              Pricing your home accurately from day one gives you a strategic advantage
              in the Dallas–Fort Worth real estate market.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
                  className="flex items-start gap-3 bg-white/10 rounded-lg px-4 py-4"
                >
                  <span className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                  <p className="text-sm text-white/90 leading-relaxed">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
});

PreListingServiceDetail.displayName = "PreListingServiceDetail";

export default PreListingServiceDetail;
