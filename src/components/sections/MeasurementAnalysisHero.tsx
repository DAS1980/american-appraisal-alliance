import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Ruler, CheckCircle, Award, MapPin } from "lucide-react";

const MeasurementAnalysisHero = React.forwardRef<HTMLElement>((props, ref) => {
  const trustBadges = [
    { icon: CheckCircle, label: "USPAP Compliant" },
    { icon: Ruler, label: "ANSI Z765-2021 Certified" },
    { icon: Award, label: "Licensed & Certified Appraisers" },
    { icon: MapPin, label: "Dallas–Fort Worth Metroplex" },
  ];

  return (
    <section data-section-id="7cb1fa0b-53a9-4c26-88be-07dd5fc9ad5d"
      ref={ref}
      id="measurement-analysis-hero"
      aria-label="Measurement & Analysis Services Hero"
      className="relative isolate w-full max-w-full overflow-hidden min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-32"
    >
      {/* Layer 1: Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="Professional residential property in the Dallas–Fort Worth area"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2: Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Layer 3: Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Category label */}
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold mb-4">
              Measurement &amp; Analysis Services
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Precision Measurement &amp; Analysis Services
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            USPAP-compliant property measurement and square footage certification
            for DFW homeowners, lenders, and real estate professionals.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            {trustBadges.map((badge) => (
              <Badge
                key={badge.label}
                variant="outline"
                className="flex items-center gap-1.5 border-white/30 bg-white/10 text-white/90 text-xs px-3 py-1.5 backdrop-blur-sm"
              >
                <badge.icon className="h-3 w-3 text-amber-400 flex-shrink-0" />
                <span>{badge.label}</span>
              </Badge>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Button
              asChild
              size="lg"
              className="text-base h-12 px-8 font-semibold"
              style={{
                backgroundColor: "hsl(42 88% 48%)",
                color: "#1a1a2e",
              }}
            >
              <Link to="/request/">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-auto min-h-12 px-6 md:px-8 py-3 whitespace-normal text-center leading-snug bg-transparent text-white border-white hover:bg-white/10 font-medium w-full sm:w-auto"
            >
              <Link to="/measurement-analysis-services/">Measurement &amp; Analysis Services</Link>
            </Button>
          </motion.div>

          {/* Service area note */}
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
            className="mt-6 text-sm text-white/70 flex items-center gap-1.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <MapPin className="h-4 w-4 text-amber-400 flex-shrink-0" />
            Serving Dallas, Fort Worth, Arlington, Plano, Frisco, McKinney,
            Denton, and the greater DFW metroplex.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

MeasurementAnalysisHero.displayName = "MeasurementAnalysisHero";

export default MeasurementAnalysisHero;
