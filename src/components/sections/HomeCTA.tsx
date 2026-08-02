import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Clock, MapPin, Lock, Contact, Icon } from "lucide-react";

const HomeCTA = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="home-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)" }}
    >
      {/* Subtle decorative background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(42 88% 48%) 0%, transparent 40%)",
        }}
      />

      {/* Gold accent bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">

          {/* Eyebrow label */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-5"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            Serving the Dallas–Fort Worth Metroplex
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="text-3xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to Request Your Appraisal?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Serving Dallas, Fort Worth, and the entire DFW metroplex. Licensed,
            USPAP-compliant appraisers ready to help.
          </motion.p>

          {/* Trust indicators row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10"
          >
            {[
              { icon: Shield, label: "USPAP-Compliant" },
              { icon: Clock, label: "Fast Turnaround" },
              { icon: MapPin, label: "Full DFW Coverage" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              asChild
              size="lg"
              className="h-13 px-10 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 hover:brightness-105 hover:shadow-xl"
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
              className="h-13 px-10 text-base font-medium rounded-lg transition-all duration-300"
              style={{
                backgroundColor: "transparent",
                borderColor: "rgba(255,255,255,0.35)",
                color: "white",
              }}
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.38 }}
            className="flex items-center justify-center gap-2"
          >
            <Lock className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "hsl(42 92% 58%)" }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Gold accent bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "hsl(42 88% 48% / 0.25)" }}
      />
    </section>
  );
});

HomeCTA.displayName = "HomeCTA";

export default HomeCTA;
