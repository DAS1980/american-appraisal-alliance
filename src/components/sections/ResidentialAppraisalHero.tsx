import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Award, MapPin, CheckCircle, View } from "lucide-react";

const ResidentialAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const trustIndicators = [
    { icon: Shield, label: "USPAP-Compliant Reports" },
    { icon: Award, label: "Licensed & Certified Appraisers" },
    { icon: CheckCircle, label: "Lender-Grade Quality" },
    { icon: MapPin, label: "Dallas–Fort Worth Metroplex" },
  ];

  return (
    <section
      ref={ref}
      id="residential-appraisal-hero"
      aria-label="Residential Appraisal Hero"
      className="relative isolate min-h-[85vh] md:min-h-[90vh] flex items-center"
    >
      {/* Layer 1: Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="Large brick house with manicured lawn representing residential appraisal services in DFW"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2: Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Layer 3: Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <Badge
              variant="outline"
              className="border-[hsl(42_88%_48%)] text-[hsl(42_92%_58%)] bg-[hsl(42_88%_48%/0.12)] text-xs md:text-sm uppercase tracking-widest px-4 py-1.5 font-medium"
            >
              American Appraisal Alliance
            </Badge>
          </motion.div>

          {/* H1 — verbatim headline for the page (this is a service sub-page hero, not the home page H1) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Residential Appraisal
            <span className="block text-[hsl(42_92%_58%)]">Full URAR</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Full URAR Residential Appraisal — USPAP-Compliant Reports for Lenders, Attorneys &amp; Private Clients
          </motion.p>

          {/* Mission */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-3 text-base text-white/75 italic"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Accurate, unbiased, defensible valuations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-[hsl(42_88%_48%)] hover:bg-[hsl(42_88%_42%)] text-[hsl(218_65%_14%)] font-semibold text-base px-8 py-3 h-auto shadow-lg transition-all duration-200"
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 text-base px-8 py-3 h-auto transition-all duration-200"
            >
              <Link to="/core-appraisal-services">View All Services</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy — verbatim */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-4 text-sm text-white/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>

        {/* Trust indicators strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {trustIndicators.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.08, ease: "easeOut" }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3"
            >
              <item.icon className="h-5 w-5 text-[hsl(42_92%_58%)] flex-shrink-0" />
              <span
                className="text-white text-sm font-medium leading-snug"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

ResidentialAppraisalHero.displayName = "ResidentialAppraisalHero";

export default ResidentialAppraisalHero;
