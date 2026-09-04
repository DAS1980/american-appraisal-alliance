import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardList, CheckCircle, Shield, MapPin } from "lucide-react";

const ContactAppraisalLink = React.forwardRef<HTMLElement>((props, ref) => {
  const highlights = [
    {
      icon: ClipboardList,
      text: "All 15 appraisal service types available",
    },
    {
      icon: Shield,
      text: "USPAP-compliant reports, court-accepted",
    },
    {
      icon: CheckCircle,
      text: "All inquiries are confidential. We respond within 1 business day.",
    },
    {
      icon: MapPin,
      text: "Serving the entire Dallas–Fort Worth metroplex",
    },
  ];

  return (
    <section data-section-id="039d4dfd-ff6b-43c2-a34f-9142760b6382"
      ref={ref}
      id="contact-appraisal-link"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)",
      }}
    >
      {/* Subtle background texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, hsl(42 88% 48% / 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(42 88% 48% / 0.15) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            Secure Online Intake
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Request an Appraisal?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
            className="text-base md:text-lg text-white/85 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Use our secure intake form to submit your property details. We handle all 15
            appraisal service types across the DFW metroplex.
          </motion.p>

          {/* Highlight list */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.09 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left max-w-2xl mx-auto"
          >
            {highlights.map((item) => (
              <motion.li
                key={item.text}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                className="flex items-start gap-3 bg-white/10 rounded-lg px-4 py-3 border border-white/10"
              >
                <item.icon
                  className="flex-shrink-0 mt-0.5"
                  style={{ width: 18, height: 18, color: "hsl(42 92% 58%)" }}
                />
                <span className="text-sm text-white/90 leading-snug">{item.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.38 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-10 h-13 shadow-lg transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                color: "hsl(218 65% 10%)",
                boxShadow: "0 4px 20px -4px hsl(42 88% 48% / 0.5)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>

            <p className="text-sm text-white/65 italic">
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactAppraisalLink.displayName = "ContactAppraisalLink";

export default ContactAppraisalLink;
