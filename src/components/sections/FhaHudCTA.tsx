import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Shield } from "lucide-react";

const FhaHudCTA = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="fha-hud-cta"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "hsl(218 65% 14%)" }}
    >
      {/* Subtle decorative gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, hsl(42 88% 48% / 0.08) 0%, transparent 65%), radial-gradient(ellipse at 20% 50%, hsl(218 55% 22% / 0.6) 0%, transparent 65%)",
        }}
      />

      {/* Subtle top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: "hsl(42 88% 48%)" }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Icon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ background: "hsl(42 88% 48% / 0.15)", border: "1px solid hsl(42 88% 48% / 0.3)" }}
          >
            <Shield className="w-7 h-7" style={{ color: "hsl(42 92% 58%)" }} />
          </motion.div>

          {/* Eyebrow label */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            FHA/HUD Compliance Observation Report
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to Order Your FHA/HUD Compliance Report?
          </motion.h2>

          {/* Subheadline / reassurance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            className="text-lg md:text-xl max-w-2xl"
            style={{ color: "hsl(210 40% 82%)" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>

          {/* Service area note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
            className="flex items-center gap-2 text-sm"
            style={{ color: "hsl(210 30% 72%)" }}
          >
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(42 88% 48%)" }} />
            <span>
              Serving Dallas, Fort Worth, Arlington, Plano, Frisco, and the entire DFW metroplex.
            </span>
          </motion.div>

          {/* Trust badges row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs"
            style={{ color: "hsl(210 30% 68%)" }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(42 88% 48%)" }}
              />
              USPAP-Compliant Reports
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(42 88% 48%)" }}
              />
              Lender &amp; Underwriter Accepted
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(42 88% 48%)" }}
              />
              Licensed Certified Appraisers
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(42 88% 48%)" }}
              />
              FHA/HUD Underwriting Requirements
            </span>
          </motion.div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.36, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-10 py-6 h-auto shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "hsl(42 88% 48%)",
                color: "hsl(218 65% 10%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.45)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <a
              href="tel:+14699364240"
              className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-90"
              style={{ color: "hsl(210 40% 82%)" }}
            >
              <Phone className="w-4 h-4" style={{ color: "hsl(42 88% 48%)" }} />
              (469) 936-4240
            </a>
          </motion.div>

          {/* Bottom confidentiality note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.44, ease: "easeOut" }}
            className="text-xs"
            style={{ color: "hsl(210 20% 55%)" }}
          >
            American Appraisal Alliance — Accurate, unbiased, defensible valuations serving the Dallas–Fort Worth Metroplex.
          </motion.p>
        </div>
      </div>

      {/* Subtle bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "hsl(218 50% 24%)" }}
      />
    </section>
  );
});

FhaHudCTA.displayName = "FhaHudCTA";

export default FhaHudCTA;
