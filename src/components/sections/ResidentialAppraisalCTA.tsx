import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, Clock, Lock, Contact } from "lucide-react";

const ResidentialAppraisalCTA = React.forwardRef<HTMLElement>((props, ref) => {
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
      text: "Response Within 1 Business Day",
    },
    {
      icon: Lock,
      text: "All Inquiries Strictly Confidential",
    },
  ];

  return (
    <section
      ref={ref}
      id="residential-appraisal-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)" }}
    >
      {/* Subtle decorative background elements */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
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
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] mb-4 font-medium"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            Dallas–Fort Worth Metroplex
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Order Your Residential Appraisal?
          </motion.h2>

          {/* Mission statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-white/80 mb-3 italic"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Accurate, unbiased, defensible valuations.
          </motion.p>

          {/* Confidentiality / response reassurance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-sm md:text-base text-white/70 mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>

          {/* Trust points grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {trustPoints.map((point) => (
              <motion.div
                key={point.text}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-white/10 bg-white/5"
              >
                <point.icon
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
                <span
                  className="text-xs md:text-sm text-white/85 text-center leading-snug"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {point.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-10 py-6 rounded-lg shadow-lg hover:opacity-90 transition-all duration-200"
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
              className="text-base font-medium px-8 py-6 rounded-lg border-white/40 bg-transparent text-white hover:bg-white/10 transition-all duration-200"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Supporting note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="mt-6 text-xs text-white/50"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Serving Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton &amp; the greater DFW metroplex.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

ResidentialAppraisalCTA.displayName = "ResidentialAppraisalCTA";

export default ResidentialAppraisalCTA;
