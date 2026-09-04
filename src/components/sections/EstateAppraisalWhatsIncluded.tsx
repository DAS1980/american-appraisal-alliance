import React from "react";
// Site base URL: https://americanappraisalalliance.com
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin, FileText, Shield, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/** Primary production domain — americanappraisalalliance.com */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const includedItems = [
  {
    icon: FileText,
    text: "Full USPAP-compliant written appraisal report",
  },
  {
    icon: Calendar,
    text: "Retrospective market analysis as of the specified historical date",
  },
  {
    icon: FileText,
    text: "Comparable sales research from the relevant time period",
  },
  {
    icon: Shield,
    text: "Property inspection (interior or exterior as appropriate)",
  },
  {
    icon: FileText,
    text: "IRS Form 706-ready documentation",
  },
  {
    icon: Shield,
    text: "Signed certification by a licensed DFW appraiser",
  },
  {
    icon: CheckCircle,
    text: "Report accepted by probate courts, CPAs, and estate attorneys",
  },
];

const serviceAreas = [
  "Dallas",
  "Fort Worth",
  "Arlington",
  "Plano",
  "Irving",
  "Garland",
  "Frisco",
  "McKinney",
  "Denton",
  "Mansfield",
  "Grand Prairie",
  "Lewisville",
  "Allen",
  "Carrollton",
  "Richardson",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const EstateAppraisalWhatsIncluded = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="926be3ac-a75e-4512-9a0e-3c30cb1db36f"
      ref={ref}
      id="estate-appraisal-whats-included"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <Badge
            variant="outline"
            className="mb-4 text-xs uppercase tracking-widest border-amber-500/40 text-amber-700 bg-amber-50 font-semibold px-3 py-1"
          >
            Deliverables &amp; Process
          </Badge>
          <h2
            className="font-bold text-foreground mb-4 text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {"What's Included in Your Estate Appraisal"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Every estate and date-of-death appraisal from American Appraisal Alliance is
            delivered as a comprehensive, court-ready package — fully USPAP-compliant and
            accepted by attorneys, CPAs, and probate courts throughout the Dallas–Fort Worth
            metroplex.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left Column: Included Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-semibold text-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your Report Includes:
            </h3>
            <ul className="space-y-4">
              {includedItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 bg-card border border-border rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <span
                    className="flex-shrink-0 mt-0.5 flex items-center justify-center w-9 h-9 rounded-full"
                    style={{ background: "hsl(42 92% 52% / 0.12)" }}
                  >
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: "hsl(42 88% 48%)" }}
                    />
                  </span>
                  <span className="text-foreground leading-snug text-sm md:text-base">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: Turnaround + Compliance + Service Area */}
          <div className="flex flex-col gap-8">

            {/* Turnaround Panel */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="rounded-xl border border-border overflow-hidden shadow-md"
              style={{ background: "hsl(218 60% 20%)" }}
            >
              <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                  style={{ background: "hsl(42 88% 48% / 0.20)" }}
                >
                  <Clock className="w-5 h-5" style={{ color: "hsl(42 92% 58%)" }} />
                </span>
                <h3
                  className="text-white font-semibold text-lg"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Estimated Turnaround
                </h3>
              </div>
              <div className="px-6 py-5">
                <p
                  className="font-bold text-2xl mb-2"
                  style={{ color: "hsl(42 92% 58%)", fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  5–7 Business Days
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  From the date of property inspection. Expedited service options are
                  available upon request for time-sensitive estate and probate proceedings.
                </p>
                <div
                  className="flex items-start gap-2 mt-3 p-3 rounded-lg"
                  style={{ background: "hsl(42 88% 48% / 0.12)" }}
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 92% 58%)" }} />
                  <p className="text-white/90 text-xs leading-relaxed">
                    We acknowledge all inquiries within{" "}
                    <span className="font-semibold text-white">1 business day</span>{" "}
                    and coordinate inspection scheduling promptly to meet your estate timeline.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Compliance Callout */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
              className="rounded-xl border overflow-hidden shadow-sm"
              style={{
                borderColor: "hsl(42 88% 48% / 0.35)",
                background: "hsl(42 88% 48% / 0.06)",
              }}
            >
              <div
                className="px-6 py-5 border-b"
                style={{ borderColor: "hsl(42 88% 48% / 0.20)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                    style={{ background: "hsl(218 60% 20% / 0.10)" }}
                  >
                    <Shield className="w-5 h-5" style={{ color: "hsl(218 60% 20%)" }} />
                  </span>
                  <h3
                    className="font-semibold text-foreground text-base"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Compliance &amp; Acceptance Standards
                  </h3>
                </div>
              </div>
              <div className="px-6 py-5">
                <ul className="space-y-3">
                  {[
                    "USPAP-compliant (Uniform Standards of Professional Appraisal Practice)",
                    "IRS Form 706 estate tax filing documentation",
                    "Accepted by probate courts throughout DFW",
                    "Trusted by estate attorneys and CPAs",
                    "Signed and certified by a licensed Texas appraiser",
                  ].map((standard, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: "hsl(218 60% 20%)" }}
                      />
                      <span>{standard}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Service Area */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              className="rounded-xl border border-border bg-card shadow-sm px-6 py-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                  style={{ background: "hsl(218 60% 20% / 0.08)" }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "hsl(218 60% 20%)" }} />
                </span>
                <h3
                  className="font-semibold text-foreground text-base"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Dallas–Fort Worth Service Area
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                We provide estate appraisal services throughout the DFW metroplex, including:
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((city) => (
                  <span
                    key={city}
                    className="text-xs font-medium px-2.5 py-1 rounded-full border"
                    style={{
                      background: "hsl(218 60% 20% / 0.06)",
                      borderColor: "hsl(218 60% 20% / 0.20)",
                      color: "hsl(218 60% 20%)",
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Delivery Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-14 rounded-xl border border-border bg-muted/40 px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-4"
        >
          <div
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: "hsl(42 88% 48% / 0.15)" }}
          >
            <FileText className="w-5 h-5" style={{ color: "hsl(42 88% 48%)" }} />
          </div>
          <div>
            <p className="text-foreground text-sm leading-relaxed">
              <span className="font-semibold">Report Delivery:</span>{" "}
              All estate appraisal reports are delivered in a professionally formatted written
              document suitable for submission to the IRS, probate courts, and legal counsel.
              Digital delivery is standard; physical copies are available upon request. Each
              report includes a signed certification by a licensed DFW appraiser affirming
              USPAP compliance and the validity of the retrospective valuation date.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

EstateAppraisalWhatsIncluded.displayName = "EstateAppraisalWhatsIncluded";

export default EstateAppraisalWhatsIncluded;
