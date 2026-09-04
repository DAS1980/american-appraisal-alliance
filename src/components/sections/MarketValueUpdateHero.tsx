import React from "react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, FileText, RefreshCw, Shield } from "lucide-react";

const MarketValueUpdateHero = React.forwardRef<HTMLElement>((props, ref) => {
  const keyPoints = [
    {
      icon: RefreshCw,
      text: "Updates a prior appraisal to reflect current market conditions",
    },
    {
      icon: FileText,
      text: "Required by lenders when original appraisal has expired",
    },
    {
      icon: CheckCircle,
      text: "Fannie Mae Form 1004D compliant",
    },
    {
      icon: Shield,
      text: "USPAP-certified appraisers serving the Dallas–Fort Worth Metroplex",
    },
  ];

  return (
    <section data-section-id="0e1ceee1-e5e3-4179-962e-38086cdce880"
      ref={ref}
      id="market-value-update-hero"
      aria-label="Market Value Update Hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-28 overflow-hidden"
    >
      {/* Background Image — Layer 1 */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house representing real estate appraisal services in the Dallas–Fort Worth Metroplex"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay — Layer 2 */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content — Layer 3 */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow / category label */}
          <motion.div
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4"
          >
            <Badge
              variant="outline"
              className="border-[hsl(42_88%_48%)] text-[hsl(42_92%_58%)] bg-transparent text-xs uppercase tracking-widest px-3 py-1"
            >
              Valuation Updates &amp; Reports
            </Badge>
          </motion.div>

          {/* Service Name / H1 */}
          <motion.h1
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="font-bold text-white leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Market Value Update{" "}
            <span className="sm:whitespace-nowrap">(1004D / Recertification)</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Lender-required appraisal updates compliant with Fannie Mae Form
            1004D — fast, accurate, and USPAP-certified. Serving lenders,
            homeowners, and mortgage brokers throughout the Dallas–Fort Worth
            Metroplex.
          </motion.p>

          {/* Key Points */}
          <motion.ul
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="space-y-3 mb-10"
            aria-label="Service highlights"
          >
            {keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-white/85 text-sm md:text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <point.icon
                  className="h-5 w-5 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(42 92% 58%)" }}
                  aria-hidden="true"
                />
                <span>{point.text}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 py-3 h-12"
              style={{
                backgroundColor: "hsl(42 88% 48%)",
                color: "hsl(218 65% 14%)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Link to="/request/">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base font-medium px-8 py-3 h-12 bg-transparent text-white border-white/60 hover:bg-white/10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Link to="/valuation-updates-reports/">View All Valuation Reports</Link>
            </Button>
          </motion.div>

          {/* Reassurance note */}
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
            className="mt-5 text-white/65 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

MarketValueUpdateHero.displayName = "MarketValueUpdateHero";

export default MarketValueUpdateHero;
