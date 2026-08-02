import React from "react";
// Site base URL: https://americanappraisalalliance.com
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Scale, Users, Calendar, Key } from "lucide-react";

/** Primary production domain — americanappraisalalliance.com */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const whoNeedsIt = [
  {
    icon: Scale,
    label: "Estate Attorneys & Probate Courts",
    description:
      "Legally defensible retrospective valuations accepted in probate proceedings and estate litigation across the DFW metroplex.",
  },
  {
    icon: FileText,
    label: "CPAs & Tax Planners — IRS Form 706",
    description:
      "Date-of-death appraisals formatted and documented to satisfy IRS estate tax filing requirements under Form 706.",
  },
  {
    icon: Users,
    label: "Heirs & Executors Settling an Estate",
    description:
      "Objective, USPAP-compliant valuations that provide heirs and executors a defensible basis for equitable asset distribution.",
  },
  {
    icon: Calendar,
    label: "Trust Administrators",
    description:
      "Credible historical valuations required for trust accounting, stepped-up basis calculations, and fiduciary reporting.",
  },
];

const keyPoints = [
  "Establishes fair market value as of a specific historical date (date of death or date of transfer)",
  "Retrospective methodology following USPAP standards",
  "Accepted by IRS, probate courts, and estate attorneys",
  "Covers single-family homes, condos, multi-family, and other residential properties throughout DFW",
];

const comparisonRows = [
  {
    label: "Valuation Date",
    standard: "Current date — reflects today's market",
    estate:
      "A specific past date — date of death, date of transfer, or date specified by the IRS or court",
  },
  {
    label: "Market Data Used",
    standard: "Recent comparables within the past 6–12 months",
    estate:
      "Comparable sales from the period surrounding the historical valuation date",
  },
  {
    label: "Primary Purpose",
    standard: "Supports loan origination, listing price, or purchase decision",
    estate:
      "Supports estate settlement, probate proceedings, or IRS Form 706 estate tax filing",
  },
  {
    label: "Intended Users",
    standard: "Lenders, buyers, sellers, homeowners",
    estate:
      "Estate attorneys, CPAs, probate courts, heirs, executors, and trust administrators",
  },
];

const EstateAppraisalWhatItIs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="estate-appraisal-what-it-is"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <span
              className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
              style={{ color: "hsl(42 88% 48%)" }}
            >
              Estate &amp; Date of Death Appraisal
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Is an Estate Appraisal?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            An estate appraisal — also called a{" "}
            <span className="font-semibold text-foreground">date-of-death appraisal</span> or
            retrospective appraisal — establishes the fair market value of a property as of a specific
            historical date rather than the current date. This type of appraisal is required when
            settling an estate, filing federal estate taxes, or navigating probate proceedings.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-lg text-muted-foreground leading-relaxed mt-4"
          >
            Unlike a standard appraisal that reflects today's market conditions, a retrospective
            appraisal looks backward in time — analyzing comparable sales, market data, and property
            conditions that existed on the specific valuation date. American Appraisal Alliance
            performs these appraisals in strict accordance with{" "}
            <span className="font-semibold text-foreground">
              USPAP (Uniform Standards of Professional Appraisal Practice)
            </span>
            , ensuring every report is credible, defensible, and accepted by the IRS, probate courts,
            and estate counsel throughout the Dallas–Fort Worth metroplex.
          </motion.p>
        </motion.div>

        {/* Key Points + Comparison */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 md:mb-24">

          {/* Key Points */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              How a Retrospective Appraisal Works
            </motion.h3>

            <motion.ul className="space-y-4" variants={stagger}>
              {keyPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "hsl(42 88% 48%)" }}
                  />
                  <span className="text-muted-foreground leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Compliance Callout */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-8 rounded-lg border p-5"
              style={{
                background: "hsl(218 60% 20% / 0.05)",
                borderColor: "hsl(218 60% 20% / 0.15)",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.18em] font-semibold mb-3"
                style={{ color: "hsl(218 60% 20%)" }}
              >
                Compliance &amp; Acceptance
              </p>
              <div className="flex flex-wrap gap-2">
                {["USPAP-Compliant", "IRS Form 706 Accepted", "Court-Ready Reports"].map(
                  (badge) => (
                    <Badge
                      key={badge}
                      className="text-xs font-semibold px-3 py-1 rounded border-0"
                      style={{
                        background: "hsl(218 60% 20%)",
                        color: "hsl(42 92% 58%)",
                      }}
                    >
                      {badge}
                    </Badge>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl font-bold text-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              How It Differs from a Standard Appraisal
            </motion.h3>

            <motion.div className="space-y-4" variants={stagger}>
              {comparisonRows.map((row, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <p
                    className="text-xs uppercase tracking-wider font-semibold mb-2"
                    style={{ color: "hsl(42 88% 48%)" }}
                  >
                    {row.label}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="text-muted-foreground">
                      <span className="font-medium text-foreground block mb-0.5">
                        Standard Appraisal
                      </span>
                      {row.standard}
                    </div>
                    <div
                      className="rounded px-3 py-2"
                      style={{ background: "hsl(218 60% 20% / 0.06)" }}
                    >
                      <span
                        className="font-semibold block mb-0.5"
                        style={{ color: "hsl(218 60% 20%)" }}
                      >
                        Estate / Date of Death Appraisal
                      </span>
                      <span className="text-muted-foreground">{row.estate}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Who Needs It */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Who Needs an Estate Appraisal?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estate and date-of-death appraisals serve a distinct set of professional and personal
              needs — each requiring a credible, USPAP-compliant valuation tied to a precise
              historical date.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
          >
            {whoNeedsIt.map((item) => (
              <motion.article
                key={item.label}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="flex items-center justify-center h-11 w-11 rounded-lg mb-4"
                  style={{ background: "hsl(42 88% 48% / 0.12)" }}
                >
                  <item.icon
                    className="h-5 w-5"
                    style={{ color: "hsl(42 88% 48%)" }}
                  />
                </div>
                <h4
                  className="font-bold text-foreground mb-2 text-sm leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.label}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        {/* DFW Coverage Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4"
          style={{
            background: "hsl(218 60% 20% / 0.05)",
            border: "1px solid hsl(218 60% 20% / 0.12)",
          }}
        >
          <div className="flex-shrink-0">
            <div
              className="flex items-center justify-center h-12 w-12 rounded-lg"
              style={{ background: "hsl(218 60% 20%)" }}
            >
              <CheckCircle className="h-6 w-6" style={{ color: "hsl(42 92% 58%)" }} />
            </div>
          </div>
          <div>
            <p
              className="font-bold text-foreground mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Serving the Entire Dallas–Fort Worth Metroplex
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              American Appraisal Alliance performs estate and date-of-death appraisals for residential
              properties — including single-family homes, condominiums, and multi-family residences —
              throughout Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney,
              Denton, and all surrounding DFW communities. Every report is USPAP-compliant and
              accepted by IRS, probate courts, and estate counsel.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
});

EstateAppraisalWhatItIs.displayName = "EstateAppraisalWhatItIs";

export default EstateAppraisalWhatItIs;
