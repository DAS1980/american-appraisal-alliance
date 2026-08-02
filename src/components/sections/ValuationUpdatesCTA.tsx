import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";

const ValuationUpdatesCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: Shield,
      text: "USPAP-Compliant Reports",
    },
    {
      icon: CheckCircle,
      text: "Lender & Court Accepted",
    },
    {
      icon: Clock,
      text: "Fast DFW Turnaround",
    },
  ];

  return (
    <section
      ref={ref}
      id="valuation-updates-cta"
      className="relative py-20 md:py-28 bg-primary overflow-hidden"
    >
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48% / 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(42 88% 48% / 0.2) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow label */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            Valuation Updates &amp; Reports
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Request a Valuation Update Today
          </motion.h2>

          {/* Subheadline / Mission + Reassurance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
          >
            Accurate, unbiased, defensible valuations. All inquiries are confidential. We respond within 1 business day.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            {trustPoints.map((point, index) => (
              <div
                key={point.text}
                className="flex items-center gap-2 text-white/80"
              >
                <point.icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "hsl(42 92% 58%)" }}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{point.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold h-12 px-8 border-0 hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request">
                Request an Appraisal
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base font-semibold h-12 px-8 bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white/60 transition-all"
            >
              <Link to="/valuation-updates-reports">
                View All Services
              </Link>
            </Button>
          </motion.div>

          {/* Reassurance note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="mt-5 text-sm text-white/60"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>

          {/* Service area note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-2 text-xs text-white/50 uppercase tracking-wider"
          >
            Serving Dallas, Fort Worth, Arlington, Plano, Irving &amp; the greater DFW metroplex
          </motion.p>
        </div>
      </div>
    </section>
  );
});

ValuationUpdatesCTA.displayName = "ValuationUpdatesCTA";

export default ValuationUpdatesCTA;
