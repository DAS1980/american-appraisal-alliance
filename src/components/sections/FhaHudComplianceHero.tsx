import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck, Home, CheckCircle, Icon } from "lucide-react";

const FhaHudComplianceHero = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    {
      icon: ShieldCheck,
      label: "USPAP-Compliant Reports",
    },
    {
      icon: FileCheck,
      label: "FHA/HUD Underwriting Accepted",
    },
    {
      icon: Home,
      label: "Serving the Full DFW Metroplex",
    },
    {
      icon: CheckCircle,
      label: "Licensed & Certified Appraisers",
    },
  ];

  return (
    <section data-section-id="849d3662-0000-4ea9-bb19-efadbbc66851"
      ref={ref}
      id="fha-hud-compliance-hero"
      aria-label="FHA/HUD Compliance Observation Report Hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-28 overflow-hidden"
    >
      {/* Background Image — Layer 1 */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="Large brick house with manicured lawn representing DFW real estate"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay — Layer 2 */}
      <div className="absolute inset-0 bg-black/65 pointer-events-none" />

      {/* Brand-tinted bottom gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(218 65% 14% / 0.3) 0%, hsl(218 65% 14% / 0.55) 100%)",
        }}
      />

      {/* Content — Layer 3 */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Service Category Badge */}
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-amber-400/60 text-amber-300 bg-amber-400/10 text-xs uppercase tracking-widest font-medium px-3 py-1"
            >
              Valuation Updates &amp; Reports
            </Badge>
          </motion.div>

          {/* H1 — Service Name */}
          <motion.h1
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            FHA/HUD Compliance Observation Report
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl"
          >
            Accurate property condition documentation to support FHA loan
            eligibility and HUD underwriting requirements — delivered by
            licensed DFW appraisers.
          </motion.p>

          {/* Key Bullets */}
          <motion.ul
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="space-y-2 mb-8"
          >
            {[
              "Identifies property conditions that may affect FHA loan eligibility",
              "Documents health, safety, and structural observations",
              "Supports FHA/HUD underwriting requirements",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-white/90">
                <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base">{point}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                border: "none",
              }}
            >
              <Link to="/request/">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-medium bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white"
            >
              <Link to="/valuation-updates-reports/">View All Reports</Link>
            </Button>


          </motion.div>

          {/* Reassurance copy */}
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-5 text-sm text-white/60 italic"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>

        {/* Highlight Pills Row */}
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {highlights.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.08, ease: "easeOut" }}
              className="flex items-center gap-2.5 rounded-lg px-4 py-3 border border-white/15 bg-white/8"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <Icon className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <span className="text-xs md:text-sm text-white/85 font-medium leading-snug">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

FhaHudComplianceHero.displayName = "FhaHudComplianceHero";

export default FhaHudComplianceHero;
