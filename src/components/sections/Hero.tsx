import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, MapPin, Clock, Phone } from "lucide-react";

const trustIndicators = [
  { icon: ShieldCheck, label: "USPAP Compliant" },
  { icon: Award, label: "Licensed & Certified" },
  { icon: MapPin, label: "Full DFW Coverage" },
  { icon: Clock, label: "Fast Turnaround" },
];

const Hero = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Hero section"
      className="relative isolate min-h-[85vh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1 — Background image */}
      <img
        src="https://images.unsplash.com/photo-1777428762767-e3a797da389a?w=1920&h=1080&fit=crop"
        alt="A large house with manicured bushes and red flowers representing DFW residential real estate"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2 — Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Additional brand-tinted gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(150deg, hsl(218 65% 14% / 0.55) 0%, hsl(218 55% 22% / 0.35) 55%, hsl(220 45% 28% / 0.20) 100%)",
        }}
      />

      {/* Layer 3 — Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Pre-header badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <Badge
              variant="outline"
              className="text-xs uppercase tracking-widest border-white/40 text-white/85 bg-white/10 backdrop-blur-sm px-3 py-1"
            >
              American Appraisal Alliance
            </Badge>
          </motion.div>

          {/* H1 — VERBATIM */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Certified Real Estate Appraisals for the Dallas–Fort Worth Metroplex
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            USPAP-compliant, court-accepted, lender-approved appraisals from
            licensed DFW experts.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {/* Primary CTA — gold/amber */}
            <Button
              asChild
              size="lg"
              className="text-base h-12 px-8 font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 10%)",
                border: "none",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.50)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            {/* Secondary CTA */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-transparent text-white border-white/60 hover:bg-white/10 hover:border-white font-medium"
            >
              <Link to="/core-appraisal-services">Explore Services</Link>
            </Button>
          </motion.div>

          {/* Phone number + reassurance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <a
              href="tel:+14699364240"
              className="flex items-center gap-2 text-white font-semibold text-base hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Inter', sans-serif" }}
              aria-label="Call American Appraisal Alliance at (469) 936-4240"
            >
              <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "hsl(42 92% 58%)" }} />
              <span>(469) 936-4240</span>
            </a>
            <span className="text-white/40 hidden sm:inline">|</span>
            <p
              className="text-sm text-white/70"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>

          {/* Trust indicator pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {trustIndicators.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + index * 0.08,
                  ease: "easeOut",
                }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
              >
                <item.icon
                  className="h-4 w-4"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
                <span
                  className="text-xs font-medium text-white/90 whitespace-nowrap"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
