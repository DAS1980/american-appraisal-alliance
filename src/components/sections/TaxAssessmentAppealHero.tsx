import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Scale, FileText, DollarSign, Contact, Copy, Image, Key } from "lucide-react";

const TaxAssessmentAppealHero = React.forwardRef<HTMLElement>((props, ref) => {
  const keyPoints = [
    "Independent appraisal to challenge inflated county tax assessments",
    "Supports formal appeal with Dallas CAD, Tarrant CAD, Collin CAD, Denton CAD",
    "Can result in significant property tax savings",
  ];

  const cadBadges = [
    "Dallas CAD",
    "Tarrant CAD",
    "Collin CAD",
    "Denton CAD",
  ];

  return (
    <section data-section-id="d1385ce0-1d15-4115-a1cf-1aad59f083a1"
      ref={ref}
      id="tax-assessment-appeal-hero"
      aria-label="Tax Assessment Appeal Appraisal Hero"
      className="relative isolate min-h-[85vh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1 — Background Image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="Large brick residential home representing property tax appeal appraisal services in DFW"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2 — Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Layer 3 — Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">

          {/* Service Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className="border-amber-400/70 text-amber-300 bg-amber-400/10 text-xs uppercase tracking-widest px-3 py-1"
            >
              Core Appraisal Services
            </Badge>
          </motion.div>

          {/* H1 — Verbatim */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Tax Assessment Appeal Appraisal
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Challenge your county's inflated property tax assessment with a certified, USPAP-compliant appraisal backed by local DFW market expertise.
          </motion.p>

          {/* Key Bullet Points */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="space-y-3 mb-8"
          >
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span
                  className="text-white/90 text-base"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {point}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CAD Coverage Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {cadBadges.map((cad) => (
              <span
                key={cad}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/85 border border-white/20 bg-white/10 backdrop-blur-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Scale className="h-3 w-3 text-amber-400" />
                {cad}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-amber-500 hover:bg-amber-400 text-white border-0 shadow-lg transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-semibold bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Reassurance Copy — Verbatim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <p
                className="text-white/75 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                All inquiries are confidential. We respond within 1 business day.
              </p>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <p
                className="text-white/75 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                USPAP-Compliant · Dallas–Fort Worth
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

TaxAssessmentAppealHero.displayName = "TaxAssessmentAppealHero";

export default TaxAssessmentAppealHero;
