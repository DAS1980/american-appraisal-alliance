import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, MapPin, Clock, Contact } from "lucide-react";

const TaxAssessmentCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: CheckCircle,
      text: "Independent appraisal to challenge inflated county tax assessments",
    },
    {
      icon: Shield,
      text: "Supports formal appeal with Dallas CAD, Tarrant CAD, Collin CAD, Denton CAD",
    },
    {
      icon: CheckCircle,
      text: "Can result in significant property tax savings",
    },
    {
      icon: MapPin,
      text: "Serving Dallas CAD, Tarrant CAD, Collin CAD, and Denton CAD jurisdictions throughout the DFW Metroplex.",
    },
  ];

  return (
    <section
      ref={ref}
      id="tax-assessment-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "hsl(218 65% 14%)" }}
    >
      {/* Subtle decorative gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(218 65% 14%) 0%, hsl(218 55% 20%) 60%, hsl(220 45% 24%) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Gold accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column: Headline + trust points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <span
              className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] mb-4 font-medium"
              style={{ color: "hsl(42 92% 58%)" }}
            >
              Tax Assessment Appeal Appraisal
            </span>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Start Your Property Tax Appeal Today
            </h2>

            {/* Sub-headline */}
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "hsl(218 20% 80%)" }}>
              Don't pay more than your property is worth. A certified appraisal from American Appraisal Alliance gives you the documented evidence needed to challenge your county assessment and potentially save thousands in property taxes.
            </p>

            {/* Trust points */}
            <ul className="space-y-4 mb-8">
              {trustPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <point.icon
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "hsl(42 92% 52%)" }}
                  />
                  <span className="text-sm md:text-base" style={{ color: "hsl(218 20% 82%)" }}>
                    {point.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Mission echo */}
            <p
              className="text-sm italic font-medium"
              style={{ color: "hsl(42 88% 60%)" }}
            >
              Accurate, unbiased, defensible valuations.
            </p>
          </motion.div>

          {/* Right column: CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div
              className="rounded-xl p-8 md:p-10 shadow-2xl border"
              style={{
                background: "hsl(218 60% 18%)",
                borderColor: "hsl(218 45% 28%)",
              }}
            >
              {/* Card headline */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Ready to Challenge Your Assessment?
              </h3>
              <p className="text-sm md:text-base mb-8" style={{ color: "hsl(218 20% 75%)" }}>
                Our USPAP-compliant appraisal reports are accepted by Texas Appraisal Review Boards and all four major DFW county appraisal districts — Dallas CAD, Tarrant CAD, Collin CAD, and Denton CAD.
              </p>

              {/* Primary CTA */}
              <Button
                asChild
                size="lg"
                className="w-full text-base font-semibold h-12 mb-4 transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  color: "hsl(218 65% 14%)",
                }}
              >
                <Link to="/request">Request an Appraisal</Link>
              </Button>

              {/* Reassurance */}
              <div className="flex items-start gap-2 mb-6">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 92% 58%)" }} />
                <p className="text-xs md:text-sm" style={{ color: "hsl(218 20% 72%)" }}>
                  All inquiries are confidential. We respond within 1 business day.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t mb-6" style={{ borderColor: "hsl(218 45% 26%)" }} />

              {/* Deadline urgency note */}
              <div
                className="rounded-lg p-4 border"
                style={{
                  background: "hsl(218 65% 14% / 0.6)",
                  borderColor: "hsl(42 88% 48% / 0.3)",
                }}
              >
                <p className="text-xs md:text-sm font-semibold mb-1" style={{ color: "hsl(42 92% 64%)" }}>
                  ⚠ Texas Protest Deadline Reminder
                </p>
                <p className="text-xs" style={{ color: "hsl(218 20% 72%)" }}>
                  Texas CAD protest deadlines are typically May 15 or 30 days from your Notice of Appraised Value — whichever is later. Contact us early to ensure timely report delivery before your ARB hearing.
                </p>
              </div>

              {/* Service area note */}
              <p className="text-xs text-center mt-5" style={{ color: "hsl(218 20% 60%)" }}>
                Proudly serving the Dallas–Fort Worth Metroplex including Dallas, Fort Worth, Arlington, Plano, Irving, Frisco, McKinney, Denton, and surrounding DFW communities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

TaxAssessmentCTA.displayName = "TaxAssessmentCTA";

export default TaxAssessmentCTA;
