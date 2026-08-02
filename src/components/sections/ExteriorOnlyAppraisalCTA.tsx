import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, DollarSign, MapPin, Shield } from "lucide-react";

const ExteriorOnlyAppraisalCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    {
      icon: Clock,
      text: "Faster turnaround, lower cost",
    },
    {
      icon: Shield,
      text: "USPAP-compliant reports",
    },
    {
      icon: MapPin,
      text: "Full Dallas–Fort Worth Metroplex coverage",
    },
    {
      icon: DollarSign,
      text: "Common for HELOCs and certain loan types",
    },
  ];

  return (
    <section
      ref={ref}
      id="exterior-only-appraisal-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)" }}
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(42 88% 48%) 0%, transparent 40%)",
        }}
      />

      {/* Decorative gold accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
        aria-hidden="true"
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow label */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            Exterior-Only (Drive-By) Appraisal
          </motion.span>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Request Your Drive-By Appraisal Today
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Serving all of the Dallas–Fort Worth Metroplex. Fast turnaround. USPAP-compliant reports.
          </motion.p>

          {/* Feature highlights grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left max-w-2xl mx-auto"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 + index * 0.07 }}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <item.icon
                  className="h-5 w-5 flex-shrink-0"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
                <span className="text-sm text-white/90 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Button
              asChild
              size="lg"
              className="h-13 px-10 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.45)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 px-10 text-base font-semibold w-full sm:w-auto bg-transparent text-white border-white/40 hover:bg-white/10 transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Link to="/contact">Speak With an Appraiser</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <CheckCircle
              className="h-4 w-4 flex-shrink-0"
              style={{ color: "hsl(42 92% 58%)" }}
            />
            <p
              className="text-sm text-white/75"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>
        </div>

        {/* Divider with compliance note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          className="mt-14 pt-10 border-t border-white/10 text-center"
        >
          <p
            className="text-xs text-white/50 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            American Appraisal Alliance — Licensed &amp; Certified Real Estate Appraisers serving Dallas, Fort Worth,
            Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and the greater DFW Metroplex.
            All appraisals are prepared in accordance with the Uniform Standards of Professional Appraisal Practice (USPAP).
          </p>
        </motion.div>
      </div>
    </section>
  );
});

ExteriorOnlyAppraisalCTA.displayName = "ExteriorOnlyAppraisalCTA";

export default ExteriorOnlyAppraisalCTA;
