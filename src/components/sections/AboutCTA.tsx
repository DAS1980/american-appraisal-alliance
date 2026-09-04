import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

const AboutCTA = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    "USPAP-compliant reports accepted by lenders, courts, and attorneys",
    "Licensed and certified appraisers with deep DFW market expertise",
    "Serving Dallas, Fort Worth, Plano, Arlington, Frisco, and the full DFW metroplex",
  ];

  return (
    <section data-section-id="cce97ed8-e990-4189-bd3a-7a952ef49d38"
      ref={ref}
      id="about-cta"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)",
      }}
    >
      {/* Subtle decorative background element */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(42 88% 48%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(42 88% 48%) 0%, transparent 40%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Headline + Trust Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <span
              className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
              style={{ color: "hsl(42 92% 58%)" }}
            >
              American Appraisal Alliance
            </span>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-serif leading-tight">
              Ready to Request an Appraisal?
            </h2>

            {/* Subheadline / Reassurance */}
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              All inquiries are confidential. We respond within 1 business day.
            </p>

            {/* Trust Points */}
            <ul className="space-y-3 mb-8">
              {trustPoints.map((point) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3 text-white/85 text-sm md:text-base"
                >
                  <CheckCircle
                    className="h-5 w-5 flex-shrink-0 mt-0.5"
                    style={{ color: "hsl(42 92% 58%)" }}
                  />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <Button
                asChild
                size="lg"
                className="text-base font-semibold px-8 py-6 h-auto"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                  color: "hsl(218 65% 14%)",
                }}
              >
                <Link to="/request">Request an Appraisal</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <div
              className="rounded-xl p-8 md:p-10 border"
              style={{
                background: "hsl(218 60% 18% / 0.7)",
                borderColor: "hsl(42 88% 48% / 0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Card Heading */}
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 font-serif">
                Get in Touch
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Our licensed appraisers are ready to assist with your
                residential or specialized appraisal needs across the
                Dallas–Fort Worth metroplex.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(42 88% 48% / 0.15)" }}
                  >
                    <Phone
                      className="h-4 w-4"
                      style={{ color: "hsl(42 92% 58%)" }}
                    />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                      Phone
                    </p>
                    <a
                      href="tel:+12145550100"
                      className="text-white text-sm font-medium hover:underline transition-colors"
                      style={{ color: "white" }}
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(42 88% 48% / 0.15)" }}
                  >
                    <Mail
                      className="h-4 w-4"
                      style={{ color: "hsl(42 92% 58%)" }}
                    />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white text-sm font-medium hover:underline transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "hsl(42 88% 48% / 0.15)" }}
                  >
                    <MapPin
                      className="h-4 w-4"
                      style={{ color: "hsl(42 92% 58%)" }}
                    />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                      Service Area
                    </p>
                    <p className="text-white text-sm font-medium">
                      Dallas–Fort Worth Metroplex
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      Dallas · Fort Worth · Arlington · Plano · Irving ·
                      Garland · Frisco · McKinney · Denton &amp; surrounding
                      communities
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="border-t mb-6"
                style={{ borderColor: "hsl(218 50% 35%)" }}
              />

              {/* Reassurance */}
              <p
                className="text-xs text-center leading-relaxed"
                style={{ color: "hsl(42 92% 68%)" }}
              >
                All inquiries are confidential. We respond within 1 business
                day.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutCTA.displayName = "AboutCTA";

export default AboutCTA;
