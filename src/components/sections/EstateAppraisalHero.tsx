import React from "react";
// Site base URL: https://americanappraisalalliance.com
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, FileText, Scale, Key } from "lucide-react";

/** Primary production domain registered for this site. */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const EstateAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    {
      icon: FileText,
      label: "Retrospective appraisal for estate settlement, probate, and IRS Form 706",
    },
    {
      icon: Scale,
      label: "Establishes fair market value as of a specific historical date",
    },
    {
      icon: CheckCircle,
      label: "Accepted by attorneys, CPAs, and courts",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Estate / Date of Death Appraisal",
    description:
      "Retrospective, USPAP-compliant residential appraisals for estate settlement, probate, and IRS Form 706 — serving the Dallas–Fort Worth metroplex.",
    url: `${SITE_BASE_URL}/estate-date-of-death-appraisal`,
    provider: {
      "@type": "LocalBusiness",
      name: "American Appraisal Alliance",
      url: SITE_BASE_URL,
      areaServed: "Dallas–Fort Worth Metroplex, TX",
    },
  };

  return (
    <section
      ref={ref}
      id="estate-appraisal-hero"
      aria-label="Estate / Date of Death Appraisal Hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Structured data — domain: americanappraisalalliance.com */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Layer 1: Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house representing estate property appraisal in the DFW metroplex"
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
          {/* Service badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <Badge
              className="text-xs uppercase tracking-widest font-semibold px-3 py-1"
              style={{
                backgroundColor: "hsl(42 88% 48% / 0.2)",
                color: "hsl(42 92% 58%)",
                border: "1px solid hsl(42 88% 48% / 0.4)",
              }}
            >
              Estate / Date of Death Appraisal
            </Badge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Estate &amp; Date of Death Appraisals
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
          >
            Retrospective, USPAP-compliant valuations for estate settlement, probate, and IRS Form 706 — accepted by attorneys, CPAs, and courts across the DFW metroplex.
          </motion.p>

          {/* Key highlights */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-7 space-y-3"
            aria-label="Service highlights"
          >
            {highlights.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <item.icon
                  className="h-5 w-5 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(42 92% 58%)" }}
                  aria-hidden="true"
                />
                <span className="text-white/90 text-sm md:text-base">
                  {item.label}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 h-12"
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
              className="text-base font-medium px-8 h-12 bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white"
            >
              <Link to="/about">About Our Appraisers</Link>
            </Button>
          </motion.div>

          {/* Reassurance copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-5 text-white/60 text-sm"
          >
            All inquiries are confidential. We respond within 1 business day.
          </motion.p>
        </div>

        {/* Trust indicators strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="mt-12 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "USPAP Compliant", sub: "All reports" },
            { label: "IRS Form 706", sub: "Ready documentation" },
            { label: "Court Accepted", sub: "Probate & legal" },
            { label: "DFW Metroplex", sub: "Local expertise" },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left">
              <p
                className="text-sm font-semibold"
                style={{ color: "hsl(42 92% 58%)" }}
              >
                {item.label}
              </p>
              <p className="text-xs text-white/60 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

EstateAppraisalHero.displayName = "EstateAppraisalHero";

export default EstateAppraisalHero;
