import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Clock, CheckCircle, Home } from "lucide-react";

const SITE_BASE_URL = "https://americanappraisalalliance.com";

const PreListingCTA = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="1821fb60-e182-42fb-bcd1-bc05868602e1"
      ref={ref}
      id="pre-listing-cta"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "hsl(218 65% 14%)" }}
    >
      {/* Subtle background texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48% / 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 50%, hsl(218 55% 30% / 0.4) 0%, transparent 60%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* USPAP note badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10"
          >
            <Shield className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-sm text-white/90 font-medium">
              USPAP-compliant appraisals by licensed and certified appraisers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to Price Your Home with Confidence?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed"
          >
            Get an independent pre-listing appraisal from a licensed DFW
            appraiser before you go to market.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-medium">
                Independent &amp; Unbiased
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-medium">
                Local DFW Market Expertise
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <span className="text-sm font-medium">
                Reports in 3–5 Business Days
              </span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base px-10 py-6 h-auto font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-6 text-sm text-white/60"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

PreListingCTA.displayName = "PreListingCTA";

export default PreListingCTA;
