import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Shield, Clock } from "lucide-react";

const MeasurementCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: Shield,
      text: "USPAP-compliant measurement reports",
    },
    {
      icon: CheckCircle,
      text: "ANSI Z765-2021 certified methodology",
    },
    {
      icon: Clock,
      text: "Fast turnaround for DFW properties",
    },
    {
      icon: ArrowRight,
      text: "Accepted by lenders, courts, and tax authorities",
    },
  ];

  return (
    <section data-section-id="4a62afe7-b110-451c-a709-82591e53b177"
      ref={ref}
      id="measurement-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "var(--gradient-navy, hsl(218 60% 20%))" }}
    >
      {/* Decorative gold accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
      />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(42 88% 48%) 0%, transparent 40%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            Measurement &amp; Analysis Services — Dallas–Fort Worth
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Get a Certified Measurement Report
          </motion.h2>

          {/* Mission note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Accurate, unbiased, defensible valuations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="text-base text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            American Appraisal Alliance delivers USPAP-compliant property measurement and
            square footage certification reports serving the Dallas–Fort Worth metroplex —
            trusted by lenders, real estate professionals, attorneys, and homeowners across
            Dallas, Fort Worth, Plano, Frisco, Irving, and surrounding DFW communities.
          </motion.p>

          {/* Trust points grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left max-w-2xl mx-auto"
          >
            {trustPoints.map((point) => (
              <motion.div
                key={point.text}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                className="flex items-start gap-3 rounded-lg px-4 py-3"
                style={{ background: "hsl(218 65% 14% / 0.5)" }}
              >
                <point.icon
                  className="h-5 w-5 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
                <span className="text-sm text-white/85 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {point.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold h-12 px-10 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base font-medium h-12 px-8 rounded-lg bg-transparent text-white border-white/40 hover:bg-white/10 transition-colors"
            >
              <Link to="/measurement-analysis-services">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Reassurance copy — exact verbatim text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
            className="text-sm text-white/60 italic"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>
      </div>

      {/* Decorative gold accent bar — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
      />
    </section>
  );
});

MeasurementCTA.displayName = "MeasurementCTA";

export default MeasurementCTA;
