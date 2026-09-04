import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Clock, FileCheck, Lock } from "lucide-react";

const CANONICAL_BASE = "https://americanappraisalalliance.com";

const DivorceAppraisalCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: Shield,
      label: "USPAP-Compliant",
      description: "All reports meet Uniform Standards of Professional Appraisal Practice",
    },
    {
      icon: FileCheck,
      label: "Court-Accepted",
      description: "Defensible valuations accepted by family law attorneys and courts",
    },
    {
      icon: Lock,
      label: "Strictly Confidential",
      description: "Your inquiry and appraisal details are handled with complete discretion",
    },
    {
      icon: Clock,
      label: "Prompt Response",
      description: "We respond within 1 business day — every inquiry, without exception",
    },
  ];

  return (
    <section data-section-id="1e1aab61-f939-412a-8b72-6ed79c8f3739"
      ref={ref}
      id="divorce-appraisal-cta"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(218_65%_14%_/_0.25)]"
          style={{
            background:
              "linear-gradient(150deg, hsl(218, 65%, 14%) 0%, hsl(218, 55%, 22%) 55%, hsl(220, 45%, 28%) 100%)",
          }}
        >
          <div className="px-8 py-14 md:px-16 md:py-20 text-center">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-5"
              style={{ color: "hsl(42, 92%, 58%)" }}
            >
              Serving the Dallas–Fort Worth Metroplex
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Request Your Divorce Appraisal Today
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
              className="mt-5 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Neutral, court-accepted valuations delivered with discretion. All inquiries are confidential.
            </motion.p>

            {/* Reassurance */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="mt-3 text-sm text-white/60 italic"
            >
              All inquiries are confidential. We respond within 1 business day.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.38 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="text-base px-10 py-6 font-semibold rounded-lg shadow-[0_4px_20px_-4px_hsl(42_88%_48%_/_0.35)] hover:shadow-[0_6px_28px_-4px_hsl(42_88%_48%_/_0.5)] transition-all duration-300 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(42, 92%, 52%) 0%, hsl(36, 88%, 44%) 100%)",
                  color: "hsl(218, 65%, 14%)",
                }}
              >
                <Link to="/request/">Request an Appraisal</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-10 py-6 bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white/70 transition-all duration-300"
              >
                <Link to="/contact/">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Points Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                style={{ background: "hsl(218, 65%, 14%)" }}
              >
                <point.icon className="w-6 h-6" style={{ color: "hsl(42, 92%, 58%)" }} />
              </div>
              <h3
                className="text-sm font-semibold text-foreground mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {point.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          American Appraisal Alliance provides USPAP-compliant divorce appraisals across Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and all surrounding DFW communities.
        </motion.p>
      </div>
    </section>
  );
});

DivorceAppraisalCTA.displayName = "DivorceAppraisalCTA";

export default DivorceAppraisalCTA;
