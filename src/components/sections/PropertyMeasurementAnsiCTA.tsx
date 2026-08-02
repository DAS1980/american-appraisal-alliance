import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Lock, ArrowRight, Ruler } from "lucide-react";

const PropertyMeasurementAnsiCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: ShieldCheck,
      label: "USPAP-Compliant Reports",
      description: "Every measurement delivered under strict ANSI Z765-2021 and USPAP standards.",
    },
    {
      icon: Ruler,
      label: "Precision ANSI Z765-2021",
      description: "Accurate square footage breakdowns with professional-grade sketches accepted by lenders and MLS systems.",
    },
    {
      icon: Clock,
      label: "Fast Turnaround",
      description: "Prompt delivery so your transaction, listing, or appraisal stays on schedule.",
    },
    {
      icon: Lock,
      label: "Confidential & Secure",
      description: "All inquiries are handled with complete confidentiality by licensed professionals.",
    },
  ];

  return (
    <section
      ref={ref}
      id="property-measurement-ansi-cta"
      className="relative py-20 md:py-32 bg-primary overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48%) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(218 60% 35%) 0%, transparent 50%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-amber-400 font-medium mb-4">
            Dallas–Fort Worth Metroplex
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Request Your ANSI Z765 Measurement Report
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            All inquiries are confidential. We respond within 1 business day.
          </p>
        </motion.div>

        {/* Trust Points Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16"
        >
          {trustPoints.map((point) => (
            <motion.div
              key={point.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-white/8 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full mb-4"
                style={{ background: "hsl(42 88% 48% / 0.18)" }}
              >
                <point.icon className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {point.label}
              </h3>
              <p className="text-white/65 text-xs leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Reassurance badge */}
          <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/8">
            <Lock className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-amber-300 text-sm font-medium">
              All inquiries are confidential. We respond within 1 business day.
            </span>
          </div>

          {/* Primary CTA */}
          <Button
            asChild
            size="lg"
            className="h-14 px-10 text-base font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
              color: "hsl(218 65% 14%)",
              boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.50)",
            }}
          >
            <Link to="/request">
              Request an Appraisal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          {/* Secondary detail */}
          <p className="mt-5 text-white/55 text-sm max-w-lg">
            American Appraisal Alliance provides ANSI Z765-2021 compliant property measurements
            throughout the Dallas–Fort Worth metroplex — serving Dallas, Fort Worth, Plano, Frisco,
            McKinney, Arlington, and surrounding DFW communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

PropertyMeasurementAnsiCTA.displayName = "PropertyMeasurementAnsiCTA";

export default PropertyMeasurementAnsiCTA;
