import React from "react";
// Site base URL: https://americanappraisalalliance.com
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Clock, CheckCircle, FileText } from "lucide-react";

/** Primary production domain — americanappraisalalliance.com */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const reassuranceItems = [
  {
    icon: Shield,
    label: "USPAP-Compliant",
    description: "Every report meets Uniform Standards of Professional Appraisal Practice",
  },
  {
    icon: FileText,
    label: "IRS Form 706 Accepted",
    description: "Documentation formatted to satisfy IRS estate tax filing requirements",
  },
  {
    icon: CheckCircle,
    label: "Court-Accepted Reports",
    description: "Trusted by probate attorneys and CPAs throughout the DFW metroplex",
  },
  {
    icon: Clock,
    label: "Prompt Response",
    description: "We respond within 1 business day and deliver reports on schedule",
  },
];

const EstateAppraisalCTA = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="estate-appraisal-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)" }}
    >
      {/* Subtle decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(42 88% 48%) 0%, transparent 40%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header content */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-4"
              style={{ color: "hsl(42 92% 58%)" }}>
              Estate &amp; Date of Death Appraisals
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Request Your Estate Appraisal Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-5 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "hsl(218 30% 80%)" }}
          >
            Our licensed appraisers are ready to help. All inquiries are confidential. We respond within 1 business day.
          </motion.p>

          {/* Reassurance badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {["USPAP-Compliant", "IRS Form 706 Accepted", "Serving all of DFW"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{
                  borderColor: "hsl(42 88% 48% / 0.5)",
                  color: "hsl(42 92% 68%)",
                  backgroundColor: "hsl(42 88% 48% / 0.08)",
                }}
              >
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Reassurance grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
        >
          {reassuranceItems.map((item) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="flex flex-col items-center text-center p-5 rounded-lg border"
              style={{
                backgroundColor: "hsl(218 65% 14% / 0.5)",
                borderColor: "hsl(218 40% 35% / 0.5)",
              }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full mb-3 flex-shrink-0"
                style={{ backgroundColor: "hsl(42 88% 48% / 0.15)" }}
              >
                <item.icon className="h-5 w-5" style={{ color: "hsl(42 92% 58%)" }} />
              </div>
              <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(218 25% 68%)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-center"
        >
          <div
            className="inline-block rounded-xl px-8 py-8 md:px-14 md:py-10 border"
            style={{
              backgroundColor: "hsl(218 65% 14% / 0.6)",
              borderColor: "hsl(218 40% 35% / 0.6)",
            }}
          >
            <p
              className="text-sm uppercase tracking-widest font-medium mb-2"
              style={{ color: "hsl(42 92% 58%)" }}
            >
              Serving Dallas–Fort Worth
            </p>
            <h3
              className="text-xl md:text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ready to get started?
            </h3>
            <p className="text-sm md:text-base mb-6 max-w-md mx-auto" style={{ color: "hsl(218 25% 72%)" }}>
              Submit your request online and a licensed DFW appraiser will be in touch within one business day. All communications are strictly confidential.
            </p>

            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-10 py-4 h-auto shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 10%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <p className="mt-4 text-xs" style={{ color: "hsl(218 25% 58%)" }}>
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

EstateAppraisalCTA.displayName = "EstateAppraisalCTA";

export default EstateAppraisalCTA;
