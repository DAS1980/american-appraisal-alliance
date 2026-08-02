import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, MapPin, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const AboutHero = React.forwardRef<HTMLElement>((props, ref) => {
  const trustBadges = [
    { icon: Shield, label: "USPAP-Compliant" },
    { icon: Award, label: "Licensed & Certified" },
    { icon: MapPin, label: "Dallas–Fort Worth" },
    { icon: CheckCircle, label: "Court-Accepted Reports" },
  ];

  return (
    <section
      ref={ref}
      id="about-hero"
      aria-label="About American Appraisal Alliance"
      className="relative isolate py-24 md:py-36 overflow-hidden"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="Professional residential home in the Dallas–Fort Worth metroplex"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/62 pointer-events-none" />

      {/* Brand-tinted gradient at bottom for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-white/75 mb-4 font-sans">
              About Us
            </span>
          </motion.div>

          {/* Page heading — H1 for this page */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trusted DFW Real Estate Appraisers
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-sans"
          >
            Licensed, USPAP-compliant appraisers serving the Dallas–Fort Worth metroplex
            with accurate, defensible valuations.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {trustBadges.map((badge) => (
              <Badge
                key={badge.label}
                variant="outline"
                className="flex items-center gap-1.5 text-xs bg-white/10 border-white/30 text-white px-3 py-1.5 backdrop-blur-sm"
              >
                <badge.icon className="h-3 w-3 text-yellow-400" />
                {badge.label}
              </Badge>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-[hsl(42_88%_48%)] text-[hsl(218_65%_14%)] hover:bg-[hsl(42_88%_42%)] border-0 shadow-lg"
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutHero.displayName = "AboutHero";

export default AboutHero;
