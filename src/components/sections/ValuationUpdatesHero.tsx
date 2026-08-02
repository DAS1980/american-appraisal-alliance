import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { RefreshCw, FileCheck, ShieldCheck, ArrowRight } from "lucide-react";

const ValuationUpdatesHero = React.forwardRef<HTMLElement>((props, ref) => {
  const services = [
    {
      icon: RefreshCw,
      title: "Market Value Update",
      subtitle: "1004D / Recertification",
      description:
        "Updates a prior appraisal to reflect current market conditions. Fannie Mae Form 1004D compliant.",
      link: "/market-value-update-1004d-recertification",
    },
    {
      icon: FileCheck,
      title: "FHA/HUD Compliance",
      subtitle: "Observation Report",
      description:
        "Identifies property conditions that may affect FHA loan eligibility. Supports FHA/HUD underwriting requirements.",
      link: "/fhahud-compliance-observation-report",
    },
  ];

  return (
    <section
      ref={ref}
      id="valuation-updates-hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-32"
      aria-label="Valuation Updates & Reports Hero"
    >
      {/* Background image — Layer 1 */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house with a manicured lawn in the Dallas–Fort Worth area"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay — Layer 2 */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Gradient overlay for extra depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(150deg, hsl(218 65% 14% / 0.75) 0%, hsl(218 55% 22% / 0.55) 60%, hsl(220 45% 28% / 0.45) 100%)",
        }}
      />

      {/* Content — Layer 3 */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow / category label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <Badge
              variant="outline"
              className="border-amber-400/60 text-amber-300 bg-amber-400/10 text-xs uppercase tracking-widest px-3 py-1"
            >
              Valuation Updates &amp; Reports
            </Badge>
          </motion.div>

          {/* Main heading — H1 for this page */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Valuation Updates &amp; Reports
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/85 leading-relaxed mb-4 max-w-2xl"
          >
            Keep your appraisal current and FHA-compliant with certified updates
            from American Appraisal Alliance — serving the Dallas–Fort Worth
            metroplex.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <ShieldCheck className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>USPAP-Compliant Reports</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <ShieldCheck className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>Lender &amp; Court Accepted</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <ShieldCheck className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>DFW Metroplex Coverage</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="text-base h-12 px-8 font-semibold"
              style={{
                backgroundColor: "hsl(42 88% 48%)",
                color: "#1a1a1a",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white"
            >
              <Link to="/request">
                View Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-5 text-sm text-white/60 italic"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>

        {/* Service preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="mt-14 grid sm:grid-cols-2 gap-5 max-w-2xl"
        >
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.link}
              className="group block rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-5 hover:bg-white/15 hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                  style={{ backgroundColor: "hsl(42 88% 48% / 0.2)" }}
                >
                  <service.icon
                    className="h-5 w-5"
                    style={{ color: "hsl(42 88% 60%)" }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm leading-snug">
                    {service.title}
                  </p>
                  <p
                    className="text-xs mt-0.5 mb-2"
                    style={{ color: "hsl(42 88% 60%)" }}
                  >
                    {service.subtitle}
                  </p>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-amber-400/80 group-hover:text-amber-400 transition-colors">
                <span>Learn more</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

ValuationUpdatesHero.displayName = "ValuationUpdatesHero";

export default ValuationUpdatesHero;
