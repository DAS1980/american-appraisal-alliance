import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Search, FileText, Users, Clock, Shield, CheckCircle, Home, BarChart, Key } from "lucide-react";
// Primary production domain: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";
// Site base URL: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const PrePurchaseAppraisalDetails = React.forwardRef<HTMLElement>(
  (props, ref) => {
    const whatIsIncluded = [
      {
        icon: Home,
        title: "Full Interior & Exterior Inspection",
        description:
          "A licensed appraiser physically inspects the property in its entirety — interior rooms, exterior conditions, site characteristics, and overall quality — to form an accurate, unbiased opinion of value.",
      },
      {
        icon: BarChart,
        title: "Comparable Sales Analysis",
        description:
          "Your appraiser researches and analyzes recent sales of comparable properties throughout the relevant DFW submarket, applying appropriate adjustments to arrive at a defensible market value conclusion.",
      },
      {
        icon: FileText,
        title: "USPAP-Compliant Written Report",
        description:
          "You receive a comprehensive written appraisal report prepared in strict accordance with USPAP standards — providing a legally defensible, lender-grade document suitable for attorneys, courts, or financial decision-making.",
      },
      {
        icon: Shield,
        title: "Independent Fair Market Value Conclusion",
        description:
          "Our valuation is entirely independent of any lender's appraisal or the seller's asking price. You receive an objective, impartial opinion of the property's true fair market value as of the effective date.",
      },
    ];

    const whoNeedsIt = [
      {
        icon: Users,
        title: "Buyers Seeking an Unbiased Second Opinion",
        description:
          "If your lender has ordered an appraisal, their appraiser's primary client is the lender — not you. A pre-purchase appraisal ordered independently puts an unbiased assessment in your hands before closing.",
      },
      {
        icon: Search,
        title: "Buyers in Competitive or Elevated Markets",
        description:
          "In the DFW metroplex, bidding wars and rapid price appreciation can drive contract prices well above market norms. An independent appraisal confirms whether the price you've agreed to reflects genuine market value.",
      },
      {
        icon: Home,
        title: "Buyers Concerned About Overpaying",
        description:
          "Whether it's a high-demand neighborhood in Frisco, a luxury property in Plano, or a value purchase in Garland, an independent appraisal ensures you enter closing with full confidence in the price you're paying.",
      },
      {
        icon: ClipboardCheck,
        title: "Real Estate Attorneys & Agents Advising Clients",
        description:
          "Legal professionals and buyer's agents who want to provide the most thorough due diligence advice to clients benefit from referencing an independent, USPAP-compliant appraisal in their counsel.",
      },
    ];

    return (
      <section
        ref={ref}
        id="pre-purchase-appraisal-details"
        className="relative py-20 md:py-32 bg-background"
      >
        <div className="container max-w-6xl mx-auto px-4">

          {/* ── What It Is ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-20 md:mb-28"
          >
            <motion.div variants={fadeUp} className="mb-3">
              <Badge
                variant="outline"
                className="text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50"
              >
                Service Overview
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6 max-w-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Is a Pre-Purchase Appraisal?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <motion.div variants={fadeUp} className="space-y-5">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  A pre-purchase appraisal is an independent, USPAP-compliant
                  appraisal ordered by the buyer — not the lender — to confirm
                  the property's true fair market value before closing. Unlike
                  the appraisal your mortgage lender commissions (which exists
                  to protect the lender's collateral), this appraisal is
                  prepared exclusively on your behalf.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  American Appraisal Alliance provides pre-purchase appraisals
                  throughout the Dallas–Fort Worth metroplex, serving buyers in
                  Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco,
                  McKinney, Denton, and surrounding DFW communities. Our
                  licensed, certified appraisers deliver objective valuations
                  rooted in rigorous market research and in-depth local
                  knowledge.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  All appraisals are conducted in accordance with USPAP
                  standards and are defensible for legal and financial purposes
                  — providing the documentation you need whether you're
                  negotiating with a seller, consulting an attorney, or simply
                  seeking peace of mind before one of the largest financial
                  decisions of your life.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1678837047193-23291e525599?w=800&h=600&fit=crop"
                    alt="Professional real estate appraisal in Dallas-Fort Worth"
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <p className="text-white text-sm font-medium">
                      Independent valuations serving the DFW metroplex
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Who Needs It ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-20 md:mb-28"
          >
            <motion.div variants={fadeUp} className="mb-3">
              <Badge
                variant="outline"
                className="text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50"
              >
                Who This Service Serves
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Who Needs a Pre-Purchase Appraisal?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl"
            >
              This service is designed for buyers, their representatives, and
              legal advisors who require an authoritative, unbiased property
              valuation prior to finalizing a purchase in the DFW market.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6">
              {whoNeedsIt.map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle
                          className="text-base md:text-lg text-foreground leading-snug"
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
            </div>
          </motion.div>

          {/* ── What's Included ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-20 md:mb-28"
          >
            <motion.div variants={fadeUp} className="mb-3">
              <Badge
                variant="outline"
                className="text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50"
              >
                Deliverables
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What's Included in Your Appraisal
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl"
            >
              Every pre-purchase appraisal from American Appraisal Alliance is
              conducted to the highest professional standards and includes the
              following components.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6">
              {whatIsIncluded.map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 flex-shrink-0">
                          <item.icon className="h-5 w-5 text-amber-700" />
                        </div>
                        <CardTitle
                          className="text-base md:text-lg text-foreground leading-snug"
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
            </div>
          </motion.div>

          {/* ── Key Benefits Checklist ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-20 md:mb-28"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div variants={fadeUp} className="order-2 md:order-1">
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1678837048746-600f8b0a1835?w=800&h=600&fit=crop"
                    alt="DFW real estate market analysis and appraisal report"
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <p className="text-white text-sm font-medium">
                      USPAP-compliant reports accepted by attorneys and courts
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="order-1 md:order-2 space-y-6"
              >
                <div className="mb-3">
                  <Badge
                    variant="outline"
                    className="text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50"
                  >
                    Key Benefits
                  </Badge>
                </div>

                <h2
                  className="text-3xl md:text-4xl font-bold text-foreground max-w-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Protects Your Investment Before You Close
                </h2>

                <p className="text-base text-muted-foreground leading-relaxed">
                  A pre-purchase appraisal from American Appraisal Alliance
                  delivers clarity and confidence at every step of the
                  transaction.
                </p>

                <ul className="space-y-4">
                  {[
                    "Independent appraisal for buyers before closing",
                    "Confirms fair market value independent of lender's appraisal",
                    "Protects buyers from overpaying in a competitive DFW market",
                    "USPAP-compliant and defensible for legal and financial purposes",
                    "Full interior and exterior inspection — no shortcuts",
                    "Covers all DFW communities: Dallas, Fort Worth, Plano, Frisco, and more",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-muted-foreground">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Turnaround Time ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-20 md:mb-28"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border bg-muted/40 px-8 py-10 md:px-12 md:py-14"
            >
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-4">
                  <div className="mb-3">
                    <Badge
                      variant="outline"
                      className="text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50"
                    >
                      Turnaround Time
                    </Badge>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Typically 3–5 Business Days After Inspection
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Following the on-site inspection of your property, your
                    completed USPAP-compliant appraisal report is delivered
                    within approximately 3–5 business days. Our appraisers
                    understand that real estate transactions operate on defined
                    timelines, and we work diligently to provide your report
                    well within your closing schedule.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    If your transaction requires expedited service, please
                    indicate your preferred timeline when you submit your
                    request and we will do our best to accommodate your
                    schedule.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border shadow-sm">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p
                        className="font-semibold text-foreground text-sm mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Report Delivery
                      </p>
                      <p className="text-xs text-muted-foreground">
                        3–5 business days after inspection
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border shadow-sm">
                    <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p
                        className="font-semibold text-foreground text-sm mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        USPAP Compliance
                      </p>
                      <p className="text-xs text-muted-foreground">
                        All appraisals conducted in accordance with USPAP
                        standards and are defensible for legal and financial
                        purposes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border shadow-sm">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p
                        className="font-semibold text-foreground text-sm mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Confidential Inquiry
                      </p>
                      <p className="text-xs text-muted-foreground">
                        All inquiries are confidential. We respond within 1
                        business day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Compliance & Standards ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border bg-primary/5 px-8 py-10 md:px-12 md:py-12"
            >
              <div className="max-w-3xl">
                <div className="mb-4">
                  <Badge
                    variant="outline"
                    className="text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50"
                  >
                    Compliance & Standards
                  </Badge>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Prepared to the Highest Professional Standards
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Every pre-purchase appraisal delivered by American Appraisal
                  Alliance is prepared by a licensed and certified Texas real
                  estate appraiser in strict accordance with the Uniform
                  Standards of Professional Appraisal Practice (USPAP). Our
                  reports are accurate, unbiased, and defensible — suitable for
                  lenders, attorneys, courts, and financial decision-making.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "USPAP-Compliant",
                    "Licensed & Certified Appraisers",
                    "Court-Accepted Reports",
                    "Lender-Grade Documentation",
                    "DFW Local Market Expertise",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Ready to protect your investment?{" "}
                  <Link
                    to="/request"
                    className="text-primary font-medium hover:underline underline-offset-2"
                  >
                    Request a pre-purchase appraisal →
                  </Link>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }
);

PrePurchaseAppraisalDetails.displayName = "PrePurchaseAppraisalDetails";

export default PrePurchaseAppraisalDetails;
