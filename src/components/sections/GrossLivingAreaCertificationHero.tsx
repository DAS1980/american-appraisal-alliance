import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Ruler, FileCheck, Shield, View } from "lucide-react";

const GrossLivingAreaCertificationHero = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    {
      icon: Ruler,
      label: "ANSI Z765-2021 Standards",
    },
    {
      icon: FileCheck,
      label: "USPAP-Compliant Reports",
    },
    {
      icon: Shield,
      label: "Lender & Court Accepted",
    },
    {
      icon: CheckCircle,
      label: "DFW Metroplex Coverage",
    },
  ];

  return (
    <section
      ref={ref}
      id="gross-living-area-certification-hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-28"
    >
      {/* Layer 1 — Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="Large brick house representing a Dallas–Fort Worth residential property for GLA certification"
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
          {/* Compliance badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <Badge
              className="text-xs font-semibold tracking-wide uppercase px-3 py-1.5"
              style={{ backgroundColor: "hsl(42 88% 48%)", color: "#1a1a1a" }}
            >
              USPAP Compliant · ANSI Z765-2021 Certified
            </Badge>
          </motion.div>

          {/* Service label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="text-white/75 text-sm md:text-base uppercase tracking-widest font-medium mb-3"
          >
            Measurement &amp; Analysis Services
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            GLA Certification for DFW Properties
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            USPAP-compliant Gross Living Area certification with ANSI Z765-2021 precision — trusted by lenders, attorneys, and homeowners across the Dallas–Fort Worth metroplex.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 h-12"
              style={{ backgroundColor: "hsl(42 88% 48%)", color: "#1a1a1a" }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base font-semibold px-8 h-12 bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link to="/measurement-analysis-services">View All Measurement Services</Link>
            </Button>
          </motion.div>

          {/* Highlight strips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2.5"
              >
                <item.icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "hsl(42 88% 48%)" }}
                />
                <span className="text-white text-xs font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

GrossLivingAreaCertificationHero.displayName = "GrossLivingAreaCertificationHero";

export default GrossLivingAreaCertificationHero;
