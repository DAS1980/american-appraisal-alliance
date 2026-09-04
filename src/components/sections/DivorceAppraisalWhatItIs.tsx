import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Scale, FileText, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CANONICAL_BASE = "https://americanappraisalalliance.com";

const keyPoints = [
  {
    icon: Shield,
    text: "USPAP-compliant, court-accepted format",
  },
  {
    icon: Scale,
    text: "Conducted by a licensed, neutral third-party appraiser",
  },
  {
    icon: FileText,
    text: "Establishes fair market value for equitable property division",
  },
  {
    icon: Clock,
    text: "Retroactive (date-of-separation) valuations available",
  },
  {
    icon: CheckCircle,
    text: "Accepted by family law attorneys, mediators, and courts",
  },
];

const DivorceAppraisalWhatItIs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="4b19ed33-4feb-43e2-9e4e-ed5acdff0a60"
      ref={ref}
      id="divorce-appraisal-what-it-is"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <Badge
            variant="secondary"
            className="mb-4 text-xs uppercase tracking-widest font-semibold px-3 py-1"
          >
            Service Overview
          </Badge>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Is a Divorce Appraisal?
          </h2>
        </motion.div>

        {/* Two-column layout: explanation + key points */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-5"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A{" "}
              <strong className="text-foreground font-semibold">divorce appraisal</strong>
              {" "}is a formal, USPAP-compliant real estate appraisal performed by a licensed,
              neutral appraiser to establish the fair market value of real property during
              divorce proceedings. The resulting report is produced without bias toward either
              party, making it fully defensible in court, mediation, and attorney-led
              negotiations.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              When divorcing parties need to divide real estate assets equitably, an
              independent appraisal provides a credible, objective foundation that both sides
              — and the court — can rely upon. American Appraisal Alliance delivers
              court-accepted valuations throughout the{" "}
              <strong className="text-foreground font-semibold">
                Dallas&ndash;Fort Worth metroplex
              </strong>
              , including Dallas, Fort Worth, Arlington, Plano, Irving, Frisco, McKinney,
              Denton, and all surrounding DFW communities.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              In many divorce cases, the marital home is not immediately listed or sold at
              the time of separation. To address this, our appraisers are equipped to
              perform{" "}
              <strong className="text-foreground font-semibold">
                retroactive (date-of-separation) valuations
              </strong>
              {" "}— establishing the property&apos;s fair market value as of a specific
              past date. These retrospective appraisals are fully USPAP-compliant and
              accepted by family law attorneys, mediators, and Texas courts.
            </p>

            {/* Gold accent callout */}
            <div
              className="flex items-start gap-4 rounded-lg p-5 mt-2 border-l-4"
              style={{
                borderLeftColor: "hsl(42 88% 48%)",
                backgroundColor: "hsl(42 88% 48% / 0.06)",
              }}
            >
              <Scale
                className="h-6 w-6 flex-shrink-0 mt-0.5"
                style={{ color: "hsl(42 88% 48%)" }}
              />
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                All divorce appraisal reports from American Appraisal Alliance are prepared
                in strict accordance with the{" "}
                <strong className="text-foreground">
                  Uniform Standards of Professional Appraisal Practice (USPAP)
                </strong>{" "}
                and are formatted to meet the requirements of family law courts across the
                DFW metroplex.
              </p>
            </div>
          </motion.div>

          {/* Right: Key Points */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="space-y-4"
          >
            <h3
              className="text-lg md:text-xl font-semibold text-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Key Characteristics of a Divorce Appraisal
            </h3>

            <ul
              className="space-y-3"
              aria-label="Key points of a divorce appraisal"
            >
              {keyPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.li
                    key={point.text}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.15 + index * 0.08,
                    }}
                    className="flex items-start gap-4 rounded-lg border bg-card p-4 shadow-sm"
                  >
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: "hsl(218 60% 20% / 0.07)" }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: "hsl(42 88% 48%)" }}
                      />
                    </span>
                    <span className="text-sm md:text-base text-foreground leading-snug pt-1">
                      {point.text}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            {/* Supplemental note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
              className="rounded-lg border bg-muted/40 p-5 mt-2"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Note on retroactive valuations:
                </strong>{" "}
                When a date-of-separation value is required, our appraisers research
                historical market data, comparable sales from the applicable period, and
                relevant records to produce a credible, defensible retrospective opinion
                of value — all within USPAP standards.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

DivorceAppraisalWhatItIs.displayName = "DivorceAppraisalWhatItIs";

export default DivorceAppraisalWhatItIs;
