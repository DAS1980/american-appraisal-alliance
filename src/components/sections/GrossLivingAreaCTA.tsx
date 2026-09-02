import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Shield, Clock, Contact } from "lucide-react";

const GrossLivingAreaCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: CheckCircle,
      text: "USPAP-compliant GLA certifications accepted by lenders and courts",
    },
    {
      icon: Shield,
      text: "ANSI Z765-2021 precision measurement by licensed DFW appraisers",
    },
    {
      icon: Clock,
      text: "Reports delivered within 2–3 business days across the DFW metroplex",
    },
  ];

  return (
    <section data-section-id="b1f61631-f3ef-49fd-86ba-18eedf2705f8"
      ref={ref}
      id="gross-living-area-cta"
      className="relative isolate py-24 md:py-36 overflow-hidden"
    >
      {/* Layer 1 — Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house with a manicured lawn in the Dallas–Fort Worth area"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        width="1920"
        height="1080"
      />

      {/* Layer 2 — Deep navy brand overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(150deg, hsl(218 65% 14% / 0.92) 0%, hsl(218 55% 22% / 0.88) 55%, hsl(220 45% 28% / 0.85) 100%)",
        }}
      />

      {/* Layer 3 — Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow label */}
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 mb-4 font-body">
            Gross Living Area Certification — Dallas–Fort Worth
          </span>

          {/* Headline */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Get Your GLA Certification Today
          </h2>

          {/* Subheadline / reassurance */}
          <p className="text-white/85 text-lg md:text-xl mb-8 font-body leading-relaxed">
            All inquiries are confidential. We respond within 1 business day.
          </p>

          {/* Trust points */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-10"
          >
            {trustPoints.map((point) => (
              <motion.li
                key={point.text}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-start gap-2 text-left max-w-xs text-white/90 text-sm font-body"
              >
                <point.icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 92% 58%)" }} />
                <span>{point.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 py-6 h-auto"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request" className="flex items-center gap-2">
                Request an Appraisal
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base font-semibold px-8 py-6 h-auto bg-transparent text-white border-white/40 hover:bg-white/10"
            >
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </motion.div>

          {/* Reinforcing reassurance note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            className="mt-6 text-white/60 text-sm font-body"
          >
            Serving Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and all DFW communities.
            <br className="hidden sm:block" />
            All appraisals are performed by licensed, certified appraisers in full compliance with USPAP standards.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});

GrossLivingAreaCTA.displayName = "GrossLivingAreaCTA";

export default GrossLivingAreaCTA;
