import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Scale, ShieldCheck, Clock, CheckCircle, Icon } from "lucide-react";

const CANONICAL_BASE = "https://americanappraisalalliance.com";

const DivorceAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const keyPoints = [
    {
      icon: ShieldCheck,
      label: "Court-Accepted Reports",
    },
    {
      icon: Scale,
      label: "Neutral & Unbiased",
    },
    {
      icon: Clock,
      label: "Retroactive Valuations Available",
    },
    {
      icon: CheckCircle,
      label: "USPAP-Compliant",
    },
  ];

  return (
    <section data-section-id="a7ef7cbc-4ed4-404c-88c5-725a1fb3de89"
      ref={ref}
      id="divorce-appraisal-hero"
      aria-label="Divorce Appraisal Hero"
      className="relative isolate min-h-[85vh] md:min-h-screen flex items-center overflow-hidden max-w-[100vw]"
    >
      {/* Layer 1 — Background Image */}
      <img
        src="https://images.unsplash.com/photo-1775686381778-dcab010bb976?w=1920&h=1080&fit=crop"
        alt="Suburban homes in the Dallas–Fort Worth metroplex"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2 — Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Layer 3 — Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow / Service label */}
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-[hsl(42_88%_48%)] text-[hsl(42_88%_48%)] bg-transparent text-xs uppercase tracking-widest px-3 py-1"
            >
              Core Appraisal Services
            </Badge>
          </motion.div>

          {/* Service Name */}
          <motion.p
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="text-[hsl(42_88%_48%)] text-lg md:text-xl font-semibold mb-3 tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Divorce Appraisal
          </motion.p>

          {/* H1 — Page-level heading */}
          <motion.h1
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Divorce Appraisal Services in Dallas–Fort Worth
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
          >
            Court-accepted, USPAP-compliant property valuations for equitable asset division — including retroactive date-of-separation appraisals.
          </motion.p>

          {/* Key bullet points */}
          <motion.ul
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.33, ease: "easeOut" }}
            className="space-y-2 mb-8"
            aria-label="Key service highlights"
          >
            <li className="flex items-center gap-2 text-white/90 text-sm md:text-base">
              <CheckCircle className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0" />
              <span>Court-accepted, USPAP-compliant appraisal for divorce proceedings</span>
            </li>
            <li className="flex items-center gap-2 text-white/90 text-sm md:text-base">
              <CheckCircle className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0" />
              <span>Neutral, unbiased valuation for equitable asset division</span>
            </li>
            <li className="flex items-center gap-2 text-white/90 text-sm md:text-base">
              <CheckCircle className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0" />
              <span>Retroactive/date-of-separation valuations available</span>
            </li>
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-[hsl(42_88%_48%)] hover:bg-[hsl(42_88%_42%)] text-[hsl(218_65%_14%)] border-0 shadow-lg"
            >
              <Link to="/request/">Request an Appraisal</Link>
            </Button>

            <p className="text-white/75 text-sm leading-snug">
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>

          {/* Trust indicators row */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52, ease: "easeOut" }}
            className="mt-10 pt-8 border-t border-white/20"
          >
            <p className="text-white/60 text-xs uppercase tracking-widest mb-4">
              Why attorneys and parties trust us
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyPoints.map(({ icon: Icon, label }, index) => (
                <div
                  key={label}
                  className="flex flex-col items-start gap-2"
                >
                  <div className="flex items-center justify-center h-9 w-9 rounded-md bg-[hsl(42_88%_48%/0.15)] border border-[hsl(42_88%_48%/0.3)]">
                    <Icon className="h-4 w-4 text-[hsl(42_88%_58%)]" />
                  </div>
                  <span className="text-white/85 text-xs md:text-sm leading-snug font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

DivorceAppraisalHero.displayName = "DivorceAppraisalHero";

export default DivorceAppraisalHero;
