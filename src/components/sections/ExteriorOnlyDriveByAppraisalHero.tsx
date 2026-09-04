import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, DollarSign, Home, Key, View } from "lucide-react";

const ExteriorOnlyDriveByAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    {
      icon: Home,
      text: "Appraiser inspects exterior only; no interior access needed",
    },
    {
      icon: Clock,
      text: "Faster turnaround, lower cost",
    },
    {
      icon: DollarSign,
      text: "Common for HELOCs and certain loan types",
    },
  ];

  return (
    <section data-section-id="0b727661-f55c-4e92-ab0c-02fcaf19da59"
      ref={ref}
      id="exterior-only-drive-by-appraisal-hero"
      aria-label="Exterior-Only Drive-By Appraisal Hero"
      className="relative isolate min-h-[85vh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1 — Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house with a manicured lawn in the Dallas–Fort Worth area"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2 — Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Layer 3 — Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Pre-header badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-amber-400/70 text-amber-300 bg-amber-400/10 text-xs uppercase tracking-widest px-3 py-1"
            >
              Core Appraisal Services · Dallas–Fort Worth
            </Badge>
          </motion.div>

          {/* H1 — verbatim */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Exterior-Only (Drive-By) Appraisal
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl leading-relaxed"
          >
            Fast, Affordable Appraisals Without Interior Access — USPAP-Compliant Reports for DFW Homeowners
          </motion.p>

          {/* Key highlights */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="space-y-3 mb-10"
            aria-label="Service highlights"
          >
            {highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90 text-sm md:text-base">{item.text}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 h-12 text-base shadow-lg transition-colors duration-200"
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white/60 hover:bg-white/10 h-12 text-base transition-colors duration-200"
            >
              <Link to="/core-appraisal-services">View All Services</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy — verbatim */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
            className="mt-5 text-sm text-white/65 flex items-center gap-2"
          >
            <span className="inline-block w-4 h-px bg-amber-400/60" aria-hidden="true" />
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>

        {/* USPAP compliance note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.65 }}
          className="mt-14 md:mt-16 inline-flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          {[
            "USPAP-Compliant",
            "Licensed & Certified Appraisers",
            "Serving the DFW Metroplex",
          ].map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 text-xs text-white/70 uppercase tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

ExteriorOnlyDriveByAppraisalHero.displayName = "ExteriorOnlyDriveByAppraisalHero";

export default ExteriorOnlyDriveByAppraisalHero;
