import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Clock, MapPin, Scale, Award } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    label: "USPAP Compliant",
    sublabel: "Every Report",
  },
  {
    icon: BadgeCheck,
    label: "Licensed & Certified",
    sublabel: "Appraisers",
  },
  {
    icon: Scale,
    label: "Court-Accepted Reports",
    sublabel: "Lender-Approved",
  },
  {
    icon: Award,
    label: "35+ Years Experience",
    sublabel: "DFW Appraisal Expertise",
  },
  {
    icon: Clock,
    label: "3 Business Days",
    sublabel: "Call for Faster Turnaround",
  },
  {
    icon: MapPin,
    label: "Full DFW Metroplex",
    sublabel: "Coverage",
  },
];

const TrustBar = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="trust-bar"
      className="relative py-6 md:py-8 bg-primary border-b border-primary/20"
      aria-label="Trust indicators and credentials"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-xs md:text-sm uppercase tracking-widest text-white/60 font-medium mb-5 font-sans"
        >
          Trusted Real Estate Appraisal — Dallas–Fort Worth Metroplex
        </motion.p>

        {/* Trust items grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-0"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className={`flex flex-col items-center text-center px-3 py-2 ${
                  index < trustItems.length - 1
                    ? "lg:border-r lg:border-white/15"
                    : ""
                }`}
              >
                {/* Icon with gold accent */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full mb-2.5"
                  style={{ background: "hsl(42 88% 48% / 0.15)" }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: "hsl(42 92% 58%)" }}
                  />
                </div>

                {/* Label */}
                <span className="text-white text-xs md:text-sm font-semibold leading-tight font-sans">
                  {item.label}
                </span>

                {/* Sublabel */}
                <span className="text-white/55 text-xs mt-0.5 font-sans">
                  {item.sublabel}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* USPAP compliance note strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-white/55 font-sans">
            <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "hsl(42 92% 58%)" }} />
            USPAP-Compliant Reports Guaranteed
          </span>
          <span className="hidden sm:block text-white/20">|</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/55 font-sans">
            <BadgeCheck className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "hsl(42 92% 58%)" }} />
            Serving Dallas, Fort Worth, Plano, Frisco, McKinney & All DFW Communities
          </span>
          <span className="hidden sm:block text-white/20">|</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/55 font-sans">
            <Award className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "hsl(42 92% 58%)" }} />
            Lender-Approved &amp; Court-Accepted
          </span>
        </motion.div>
      </div>
    </section>
  );
});

TrustBar.displayName = "TrustBar";

export default TrustBar;
