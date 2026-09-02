import React from "react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ShieldCheck, MapPin } from "lucide-react";

const MarketValueUpdateCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const reassurances = [
    { icon: ShieldCheck, text: "USPAP-compliant" },
    { icon: CheckCircle, text: "Fannie Mae Form 1004D" },
    { icon: MapPin, text: "Licensed DFW Appraisers" },
  ];

  return (
    <section data-section-id="19c18917-5695-45e6-be10-bf25926bad5c"
      ref={ref}
      id="market-value-update-cta"
      className="relative py-20 md:py-32 bg-primary overflow-hidden"
    >
      {/* Subtle decorative background element */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48% / 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 50%, hsl(42 88% 48% / 0.2) 0%, transparent 60%)",
        }}
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
            Market Value Update — 1004D / Recertification
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Update Your Appraisal?
          </motion.h2>

          {/* Subheadline / reassurance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mb-10"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-10 py-6 h-auto rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
          </motion.div>

          {/* Reassurance badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {reassurances.map((item, index) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <item.icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
                <span>{item.text}</span>
                {index < reassurances.length - 1 && (
                  <span className="hidden md:inline text-white/30 ml-2">•</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

MarketValueUpdateCTA.displayName = "MarketValueUpdateCTA";

export default MarketValueUpdateCTA;
