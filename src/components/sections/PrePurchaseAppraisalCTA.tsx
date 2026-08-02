import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, MapPin, ArrowRight } from "lucide-react";
// Primary production domain: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";
// Site base URL: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";

const PrePurchaseAppraisalCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      label: "USPAP-Compliant Reports",
      description: "Every appraisal meets the Uniform Standards of Professional Appraisal Practice.",
    },
    {
      icon: Clock,
      label: "Results in 3–5 Business Days",
      description: "Fast turnaround so you stay on schedule before closing.",
    },
    {
      icon: MapPin,
      label: "Full DFW Metroplex Coverage",
      description: "Dallas, Fort Worth, Plano, Frisco, Arlington, and all surrounding communities.",
    },
  ];

  return (
    <section
      ref={ref}
      id="pre-purchase-appraisal-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)" }}
    >
      {/* Subtle decorative background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 50%, hsl(42 88% 48% / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 50%, hsl(218 65% 14% / 0.4) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Headline + reassurance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <span
              className="inline-block text-xs md:text-sm uppercase tracking-widest font-semibold mb-4"
              style={{ color: "hsl(42 88% 58%)" }}
            >
              Pre-Purchase Appraisal — Dallas–Fort Worth
            </span>

            {/* Main headline */}
            <h2 className="font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Protect Your Investment Before You Close
            </h2>

            {/* Subheadline */}
            <p className="text-white/85 text-lg leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              Get an independent, USPAP-compliant appraisal from a licensed DFW appraiser before signing.
              Know the true fair market value — separate from your lender's appraisal, with no conflict of interest.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button
                asChild
                size="lg"
                className="font-semibold text-base px-8 py-3 h-auto transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  color: "hsl(218 65% 14%)",
                  boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.45)",
                  border: "none",
                }}
              >
                <Link to="/request">
                  Request an Appraisal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Reassurance copy */}
            <p className="mt-5 text-sm text-white/65 flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              <ShieldCheck className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(42 88% 58%)" }} />
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>

          {/* Right: Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 rounded-xl p-5"
                style={{
                  background: "hsl(218 55% 18% / 0.7)",
                  border: "1px solid hsl(42 88% 48% / 0.2)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg"
                  style={{ background: "hsl(42 88% 48% / 0.15)" }}
                >
                  <point.icon className="h-5 w-5" style={{ color: "hsl(42 92% 58%)" }} />
                </div>
                <div>
                  <p
                    className="font-semibold text-white text-base mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {point.label}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Mission statement accent */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="mt-2 rounded-xl p-5 text-center"
              style={{
                background: "hsl(42 88% 48% / 0.10)",
                border: "1px solid hsl(42 88% 48% / 0.3)",
              }}
            >
              <p
                className="text-sm font-medium italic"
                style={{ color: "hsl(42 92% 68%)", fontFamily: "'Playfair Display', serif" }}
              >
                "Accurate, unbiased, defensible valuations."
              </p>
              <p className="text-white/55 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                — American Appraisal Alliance, Dallas–Fort Worth
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

PrePurchaseAppraisalCTA.displayName = "PrePurchaseAppraisalCTA";

export default PrePurchaseAppraisalCTA;
