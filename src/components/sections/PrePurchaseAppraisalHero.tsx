import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShieldCheck, Home, CheckCircle, Key } from "lucide-react";
// Primary production domain: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";
// Site base URL: https://americanappraisalalliance.com
import { siteConfig } from "@/config/site";

const PrePurchaseAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const keyPoints = [
    "Independent appraisal for buyers before closing",
    "Confirms fair market value independent of lender's appraisal",
    "Protects buyers from overpaying",
  ];

  return (
    <section
      ref={ref}
      id="pre-purchase-appraisal-hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-32 bg-[image:var(--gradient-hero)]"
      aria-label="Pre-Purchase Appraisal hero"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house representing a pre-purchase appraisal property in the Dallas–Fort Worth area"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <Badge
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border border-[hsl(42_88%_48%)] text-[hsl(42_92%_58%)] bg-transparent"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              USPAP-Compliant | Licensed DFW Appraisers
            </Badge>
          </motion.div>

          {/* Service name / page heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="text-[hsl(42_92%_58%)] text-sm md:text-base font-semibold uppercase tracking-[0.18em] mb-3"
          >
            Pre-Purchase Appraisal
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Know the True Value Before You Close
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
          >
            Independent appraisal for buyers before closing — confirms fair market value and protects you from overpaying. Serving the Dallas–Fort Worth Metroplex.
          </motion.p>

          {/* Key bullets */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.30, ease: "easeOut" }}
            className="mt-7 space-y-3"
            aria-label="Pre-Purchase Appraisal key benefits"
          >
            {keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-white/90 text-sm md:text-base"
              >
                <CheckCircle className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.40, ease: "easeOut" }}
            className="mt-9 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-[hsl(42_88%_48%)] hover:bg-[hsl(42_88%_42%)] text-[hsl(218_65%_14%)] border-0 shadow-[0_4px_20px_-4px_hsl(42_88%_48%/0.45)] transition-all duration-300"
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-semibold bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              <Link to="/core-appraisal-services">
                <Home className="h-4 w-4 mr-2" />
                All Appraisal Services
              </Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52, ease: "easeOut" }}
            className="mt-5 text-sm text-white/60"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

PrePurchaseAppraisalHero.displayName = "PrePurchaseAppraisalHero";

export default PrePurchaseAppraisalHero;
