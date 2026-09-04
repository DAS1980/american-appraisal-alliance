import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, MapPin, Award, Icon } from "lucide-react";

const RequestHero = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="33545a4d-3ba9-495a-941e-23c2a8e9875a"
      ref={ref}
      id="request-hero"
      aria-label="Request an Appraisal Hero"
      className="relative isolate min-h-[60vh] md:min-h-[70vh] flex items-center py-20 md:py-32"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop"
        alt="Large brick house with manicured lawn representing DFW residential real estate"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Navy gradient overlay for brand reinforcement */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(150deg, hsl(218 65% 14% / 0.55) 0%, hsl(218 55% 22% / 0.40) 60%, hsl(218 65% 14% / 0.60) 100%)",
        }}
      />

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-amber-400/60 text-amber-300 bg-amber-400/10 text-xs tracking-widest uppercase px-3 py-1"
            >
              American Appraisal Alliance
            </Badge>
          </motion.div>

          {/* Page heading — H1 role for this page */}
          <motion.h1
            initial={{ opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Request an Appraisal
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-2xl"
          >
            Accurate, unbiased, defensible valuations for the Dallas–Fort Worth
            Metroplex. Submit your request below and we'll respond within 1
            business day.
          </motion.p>

          {/* Verbatim reassurance copy */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-sm md:text-base text-amber-300 font-medium mb-8"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>

          {/* CTA button scrolls to the intake form */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.45)",
              }}
            >
              <a href="#intake-form">Request an Appraisal</a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-10 flex flex-wrap gap-5"
          >
            {[
              { icon: Shield, label: "USPAP-Compliant Reports" },
              { icon: Award, label: "Licensed & Certified Appraisers" },
              { icon: Clock, label: "Fast Turnaround" },
              { icon: MapPin, label: "Full DFW Metroplex Coverage" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-white/85 text-sm"
              >
                <Icon className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

RequestHero.displayName = "RequestHero";

export default RequestHero;
