import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShieldCheck, TrendingUp, DollarSign, CheckCircle, Home, Key } from "lucide-react";
import { siteConfig } from "@/config/site";

const PMIRemovalAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const keyPoints = [
    {
      icon: ShieldCheck,
      text: "Appraisal to support removal of Private Mortgage Insurance",
    },
    {
      icon: TrendingUp,
      text: "Demonstrates current market value exceeds 80% LTV threshold",
    },
    {
      icon: DollarSign,
      text: "Saves homeowners hundreds per year",
    },
  ];

  return (
    <section
      ref={ref}
      id="pmiremoval-appraisal-hero"
      aria-label="PMI Removal Appraisal Hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-32"
    >
      {/* Layer 1: Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house with a manicured lawn in the Dallas–Fort Worth area"
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4"
          >
            <Badge
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1"
              style={{
                backgroundColor: "hsl(42 88% 48% / 0.2)",
                color: "hsl(42 92% 62%)",
                border: "1px solid hsl(42 88% 48% / 0.45)",
              }}
            >
              <CheckCircle className="h-3 w-3 mr-1.5" />
              USPAP-Compliant Report
            </Badge>
          </motion.div>

          {/* Service label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="text-sm md:text-base uppercase tracking-[0.18em] text-white/70 font-medium mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            PMI Removal Appraisal
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Stop Paying PMI — Prove Your Home's Value
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Demonstrate your home's current value and eliminate Private Mortgage
            Insurance — saving hundreds each year.{" "}
            {siteConfig.name} delivers independent, lender-accepted appraisals
            across the {siteConfig.serviceArea}.
          </motion.p>

          {/* Key bullet points */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.33, ease: "easeOut" }}
            className="space-y-3 mb-10"
          >
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full mt-0.5"
                  style={{ backgroundColor: "hsl(42 88% 48% / 0.25)" }}
                >
                  <point.icon
                    className="h-3.5 w-3.5"
                    style={{ color: "hsl(42 92% 62%)" }}
                  />
                </div>
                <span
                  className="text-white/90 text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {point.text}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "hsl(42 88% 48%)",
                color: "hsl(218 65% 14%)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <p
              className="text-white/65 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

PMIRemovalAppraisalHero.displayName = "PMIRemovalAppraisalHero";

export default PMIRemovalAppraisalHero;
