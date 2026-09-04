import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, CheckCircle, Icon } from "lucide-react";
import { siteConfig } from "@/config/site";

const PMIRemovalCTA = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="f14b3326-bcfb-434f-8e95-b3c091300123"
      ref={ref}
      id="pmiremoval-cta"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)" }}
    >
      {/* Subtle background texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, hsl(218 65% 14% / 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(218 65% 14% / 0.2) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "hsl(218 65% 14% / 0.75)" }}
          >
            PMI Removal Appraisal · Dallas–Fort Worth
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "hsl(218 65% 14%)",
            }}
          >
            Ready to Remove Your PMI?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
            className="text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(218 65% 14% / 0.85)" }}
          >
            Request a USPAP-compliant appraisal today and take the first step toward
            eliminating your monthly PMI payment.
          </motion.p>

          {/* Trust badges row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
          >
            {[
              { icon: ShieldCheck, label: "USPAP-Compliant Reports" },
              { icon: CheckCircle, label: "Lender-Accepted Valuations" },
              { icon: Clock, label: "3–5 Business Day Turnaround" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "hsl(218 65% 14% / 0.12)",
                  color: "hsl(218 65% 14%)",
                }}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-10 h-12 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: "hsl(218 65% 14%)",
                color: "hsl(42 92% 58%)",
              }}
            >
              <Link to="/request/">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base font-medium px-8 h-12 border-2 transition-all duration-300 hover:bg-white/20"
              style={{
                borderColor: "hsl(218 65% 14% / 0.5)",
                color: "hsl(218 65% 14%)",
                background: "transparent",
              }}
            >
              <Link to="/contact/">Speak With an Appraiser</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-sm"
            style={{ color: "hsl(218 65% 14% / 0.70)" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

PMIRemovalCTA.displayName = "PMIRemovalCTA";

export default PMIRemovalCTA;
