import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Monitor, CheckCircle, Clock, FileText, View } from "lucide-react";

/** Primary production domain — canonical authority for americanappraisalalliance.com */
const SITE_BASE_URL = "https://americanappraisalalliance.com";

const DesktopAppraisalHero = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    { icon: Monitor, label: "No Interior Inspection Required" },
    { icon: Clock, label: "Faster Turnaround" },
    { icon: FileText, label: "USPAP-Compliant Reports" },
    { icon: CheckCircle, label: "Lender & Court Accepted" },
  ];

  return (
    <section data-section-id="9571fc7a-d290-43fd-8b95-355b742c9920"
      ref={ref}
      id="desktop-appraisal-hero"
      aria-label="Desktop Appraisal Hero"
      className="relative isolate min-h-[85vh] md:min-h-[80vh] flex items-center py-20 md:py-32"
    >
      {/* Layer 1 — Background image */}
      <img
        src="https://images.unsplash.com/photo-1773427617774-d9ce7493b3d8?w=1920&h=1080&fit=crop"
        alt="A large brick house with a manicured lawn in the Dallas–Fort Worth area"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Layer 2 — Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Layer 3 — Content */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <Badge
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1"
              style={{
                backgroundColor: "hsl(42 88% 48% / 0.15)",
                color: "hsl(42 92% 58%)",
                border: "1px solid hsl(42 88% 48% / 0.4)",
              }}
            >
              USPAP-Compliant Reports
            </Badge>
          </motion.div>

          {/* Pre-header label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="text-sm uppercase tracking-[0.2em] text-white/70 mb-3 font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            American Appraisal Alliance · Dallas–Fort Worth
          </motion.p>

          {/* H1 — Desktop Appraisal Service headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Desktop Appraisal Services
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Fast, cost-effective USPAP-compliant appraisals completed without a
            physical interior inspection — ideal for low-risk lending, estate,
            and legal purposes across the Dallas–Fort Worth Metroplex.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold h-12 px-8"
              style={{
                background:
                  "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 14%)",
                border: "none",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base font-medium h-12 px-8 bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white/70"
            >
              <Link to="/core-appraisal-services">View All Services</Link>
            </Button>
          </motion.div>

          {/* Highlights row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/15"
                style={{ animationDelay: `${0.45 + index * 0.07}s` }}
              >
                <item.icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
                <span
                  className="text-xs font-medium text-white/90 leading-tight"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

DesktopAppraisalHero.displayName = "DesktopAppraisalHero";

export default DesktopAppraisalHero;
