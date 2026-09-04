import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Ruler, CheckCircle, FileText } from "lucide-react";

const PropertyMeasurementAnsiHero = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    {
      icon: Ruler,
      text: "ANSI Z765-2021 Standards",
    },
    {
      icon: CheckCircle,
      text: "USPAP-Compliant Reports",
    },
    {
      icon: FileText,
      text: "Detailed Sketch & Breakdown",
    },
  ];

  return (
    <section data-section-id="6ec005b8-1ba8-4422-a524-a2d05b294cff"
      ref={ref}
      id="property-measurement-ansi-hero"
      aria-label="Property Measurement ANSI Z765 Hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-32"
    >
      {/* Layer 1 — Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house with a manicured lawn representing precision property measurement in DFW"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2 — Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Layer 3 — Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <Badge
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5"
              style={{
                backgroundColor: "hsl(42 88% 48% / 0.18)",
                color: "hsl(42 92% 58%)",
                border: "1px solid hsl(42 88% 48% / 0.45)",
              }}
            >
              ANSI Z765-2021 Compliant
            </Badge>
          </motion.div>

          {/* Service category label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="text-sm uppercase tracking-[0.2em] text-white/70 mb-3 font-medium"
          >
            Measurement &amp; Analysis Services — Dallas–Fort Worth Metroplex
          </motion.p>

          {/* H1 — service name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            ANSI Z765 Property Measurement
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl"
          >
            Precise home measurement following ANSI Z765-2021 standards — USPAP-compliant
            reports accepted by lenders, appraisers, and MLS systems throughout the
            Dallas–Fort Worth metroplex.
          </motion.p>

          {/* Highlight chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {highlights.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2"
              >
                <item.icon className="h-4 w-4 text-white/80 flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold h-12 px-8"
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
              className="text-base font-medium h-12 px-8 bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white"
            >
              <Link to="/measurement-analysis-services">View All Measurement Services</Link>
            </Button>
          </motion.div>

          {/* Reassurance line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52, ease: "easeOut" }}
            className="mt-5 text-sm text-white/60 italic"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

PropertyMeasurementAnsiHero.displayName = "PropertyMeasurementAnsiHero";

export default PropertyMeasurementAnsiHero;
