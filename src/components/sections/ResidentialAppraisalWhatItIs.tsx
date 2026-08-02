import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, FileText, Home, Scale, Shield, Contact, Key, Section, Table, Type } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const highlights = [
  {
    icon: FileText,
    title: "Fannie Mae Form 1004",
    body: "The Full URAR is completed on Fannie Mae Form 1004 — the standard form required by virtually all mortgage lenders for conforming residential loan transactions.",
  },
  {
    icon: Home,
    title: "Interior & Exterior Inspection",
    body: "A licensed appraiser physically inspects both the interior and exterior of the subject property, documenting condition, improvements, and site characteristics.",
  },
  {
    icon: Shield,
    title: "USPAP-Compliant Certification",
    body: "Every Full URAR appraisal is prepared in strict accordance with the Uniform Standards of Professional Appraisal Practice (USPAP), ensuring a credible, defensible opinion of value.",
  },
  {
    icon: Scale,
    title: "Court and Lender Accepted",
    body: "The Full URAR is accepted by all major lenders, Fannie Mae, Freddie Mac, FHA, VA, courts, and attorneys — making it the most universally recognized appraisal format.",
  },
];

const differentiators = [
  {
    label: "Full URAR (Form 1004)",
    description:
      "Complete interior and exterior inspection; comprehensive market analysis; accepted by all lenders and courts. This is the most thorough and broadly accepted residential appraisal format.",
    highlight: true,
  },
  {
    label: "Desktop Appraisal",
    description:
      "Remote review using MLS data and public records; no physical inspection; suitable for low-risk transactions only.",
    highlight: false,
  },
  {
    label: "Exterior-Only (Drive-By) Appraisal",
    description:
      "Appraiser inspects exterior only; no interior access needed. Faster turnaround, lower cost. Common for HELOCs and certain loan types.",
    highlight: false,
  },
];

const complianceItems = [
  "USPAP — Uniform Standards of Professional Appraisal Practice",
  "Fannie Mae Form 1004 — Full URAR",
  "Freddie Mac Form 70 (equivalent)",
  "FHA / HUD underwriting requirements",
  "ANSI Z765-2021 GLA measurement standard",
];

const ResidentialAppraisalWhatItIs = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        id="residential-appraisal-what-it-is"
        className="relative py-20 md:py-32 bg-background"
        aria-labelledby="what-it-is-heading"
      >
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section header */}
          <motion.div
            className="max-w-3xl mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-[hsl(42_88%_48%)] mb-3"
            >
              Service Overview
            </motion.span>

            <motion.h2
              id="what-it-is-heading"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Is a Full URAR Appraisal?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              The Uniform Residential Appraisal Report — commonly referred to as
              the URAR or{" "}
              <span className="font-semibold text-foreground">
                Fannie Mae Form 1004
              </span>{" "}
              — is the industry-standard appraisal form for single-family
              residential properties. It represents the most comprehensive and
              widely accepted appraisal product available, combining a full
              physical inspection with a rigorous market analysis to produce a
              credible, USPAP-compliant opinion of fair market value.
            </motion.p>
          </motion.div>

          {/* Explanatory prose block */}
          <motion.div
            className="grid md:grid-cols-2 gap-10 mb-16 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-5 text-muted-foreground leading-relaxed"
            >
              <p>
                At American Appraisal Alliance, our Full URAR appraisals are
                performed by licensed and certified appraisers with deep knowledge
                of the Dallas&ndash;Fort Worth real estate market. The report
                provides a well-documented, defensible opinion of value for a wide
                range of residential property types &mdash; including single-family
                homes, condominiums, and 2&ndash;4 unit residential properties
                throughout the DFW metroplex.
              </p>
              <p>
                The appraiser conducts a complete interior and exterior inspection
                of the subject property, analyzes comparable sales in the
                surrounding market, and prepares a detailed report that satisfies
                the requirements of Fannie Mae, Freddie Mac, FHA, VA, and
                virtually all private lenders. The final report includes a
                USPAP-compliant certification and a clearly supported opinion of
                value.
              </p>
              <p>
                Because the Full URAR involves a thorough on-site inspection and
                comprehensive documentation, it is the preferred &mdash; and often
                required &mdash; appraisal type for mortgage origination,
                refinancing, legal proceedings, estate planning, and any situation
                where a highly credible, court-accepted valuation is needed.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-xl overflow-hidden shadow-lg border border-border"
            >
              <img
                src="https://images.unsplash.com/photo-1678837048746-600f8b0a1835?w=800&h=600&fit=crop"
                alt="Professional real estate appraisal of a Dallas-Fort Worth area home"
                width="800"
                height="600"
                loading="lazy"
                className="w-full h-56 object-cover"
              />
              <div className="bg-[hsl(218_60%_20%)] p-6 space-y-3">
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-[hsl(42_92%_58%)] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Key Compliance Standards
                </p>
                {complianceItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[hsl(42_88%_48%)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Four highlight cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-16"
          >
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl font-semibold text-foreground mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Core Characteristics of a Full URAR
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6">
              {highlights.map((item, i) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                  className="flex gap-4 p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(218_60%_20%)]">
                    <item.icon className="h-5 w-5 text-[hsl(42_88%_48%)]" />
                  </div>
                  <div>
                    <h4
                      className="text-base font-semibold text-foreground mb-1.5"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl font-semibold text-foreground mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How the Full URAR Differs from Other Appraisal Types
            </motion.h3>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-muted-foreground mb-8 max-w-2xl"
            >
              Not every appraisal engagement requires a Full URAR. The
              comparison below can help you confirm that this is the appropriate
              product for your specific situation.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="overflow-hidden rounded-xl border border-border"
            >
              {/* Table header row */}
              <div className="grid grid-cols-[1fr_2fr] bg-[hsl(218_60%_20%)] px-6 py-4 gap-4">
                <span
                  className="text-xs font-semibold uppercase tracking-widest text-[hsl(42_92%_58%)]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Appraisal Type
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-widest text-[hsl(42_92%_58%)]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Key Characteristics
                </span>
              </div>

              {differentiators.map((row, i) => (
                <div
                  key={row.label}
                  className={[
                    "grid grid-cols-[1fr_2fr] px-6 py-5 gap-4 items-start border-t border-border",
                    i % 2 === 0 ? "bg-background" : "bg-muted/30",
                    row.highlight ? "bg-[hsl(218_60%_20%)]/5" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {row.highlight && (
                      <span className="inline-block w-2 h-2 rounded-full bg-[hsl(42_88%_48%)] flex-shrink-0" />
                    )}
                    <span
                      className={
                        row.highlight
                          ? "text-sm font-semibold text-[hsl(218_60%_20%)]"
                          : "text-sm font-medium text-muted-foreground"
                      }
                      style={
                        row.highlight
                          ? { fontFamily: "'Playfair Display', serif" }
                          : {}
                      }
                    >
                      {row.label}
                    </span>
                    {row.highlight && (
                      <span className="text-xs font-medium text-[hsl(42_88%_48%)] bg-[hsl(42_88%_48%)]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        This Service
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {row.description}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Bottom note */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 text-sm text-muted-foreground"
            >
              Not sure which appraisal type is right for your situation? Our
              licensed appraisers serving the Dallas&ndash;Fort Worth metroplex
              are available to help you determine the most appropriate product.{" "}
              <Link
                to="/contact"
                className="font-medium underline underline-offset-2 text-[hsl(218_60%_20%)] hover:text-[hsl(42_88%_48%)] transition-colors"
              >
                Contact us for a no-obligation consultation.
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }
);

ResidentialAppraisalWhatItIs.displayName = "ResidentialAppraisalWhatItIs";

export default ResidentialAppraisalWhatItIs;
