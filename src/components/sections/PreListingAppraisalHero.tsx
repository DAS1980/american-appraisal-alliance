import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, Home, TrendingUp, DollarSign } from "lucide-react";

const SITE_BASE_URL = "https://americanappraisalalliance.com";

const PreListingAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const keyPoints = [
    {
      icon: Home,
      text: "Independent valuation before listing a home for sale",
    },
    {
      icon: TrendingUp,
      text: "Helps sellers price accurately and negotiate confidently",
    },
    {
      icon: DollarSign,
      text: "Avoid overpricing or leaving money on the table",
    },
  ];

  return (
    <section data-section-id="54357c79-0ce3-41cf-8733-f5fedf44c326"
      ref={ref}
      id="pre-listing-appraisal-hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-28"
    >
      {/* Background Image — Layer 1 */}
      <img
        src="https://images.unsplash.com/photo-1777428762767-e3a797da389a?w=1920&h=1080&fit=crop"
        alt="A large house with manicured bushes and red flowers representing a pre-listing appraisal property"
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <Badge
              variant="outline"
              className="border-amber-400 text-amber-300 bg-amber-400/10 text-xs md:text-sm px-3 py-1 font-medium tracking-wide"
            >
              USPAP-Compliant | Licensed &amp; Certified Appraisers
            </Badge>
          </motion.div>

          {/* Service Name / Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-amber-400 text-sm md:text-base uppercase tracking-widest font-semibold mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Pre-Listing Appraisal
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Know Your Home's True Market Value Before You List
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Know your home's true market value before you list — price with confidence and negotiate from strength. American Appraisal Alliance delivers independent, USPAP-compliant pre-listing appraisals throughout the Dallas–Fort Worth metroplex.
          </motion.p>

          {/* Key Points */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 space-y-3"
          >
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90 text-sm md:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {point.text}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button
              asChild
              size="lg"
              className="text-base h-12 px-8 font-semibold"
              style={{
                background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-transparent text-white border-white/60 hover:bg-white/10 font-medium"
            >
              <Link to="/core-appraisal-services">View All Services</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-5 text-white/70 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>
      </div>
    </section>
  );
});

PreListingAppraisalHero.displayName = "PreListingAppraisalHero";

export default PreListingAppraisalHero;
