import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Contact, Heading } from "lucide-react";

const ContactHero = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="contact-hero"
      aria-label="Contact Hero"
      className="relative py-20 md:py-32 bg-background overflow-hidden"
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-[image:var(--gradient-gold)]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-primary translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 bg-primary -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "hsl(var(--accent))" }}
          >
            American Appraisal Alliance
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact American Appraisal Alliance
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl leading-relaxed"
          >
            Serving the Dallas–Fort Worth Metroplex with USPAP-compliant appraisals.{" "}
            <span className="font-medium text-foreground">
              All inquiries are confidential. We respond within 1 business day.
            </span>
          </motion.p>

          {/* Reassurance strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex items-center gap-2 mb-8 px-4 py-3 rounded-lg border bg-muted/40"
            style={{ borderColor: "hsl(var(--accent) / 0.3)" }}
          >
            <Clock
              className="h-4 w-4 flex-shrink-0"
              style={{ color: "hsl(var(--accent))" }}
            />
            <p className="text-sm font-medium text-foreground">
              All inquiries are confidential. We respond within 1 business day.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 h-12"
              style={{
                background: "var(--gradient-gold)",
                color: "hsl(218 65% 14%)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
          </motion.div>
        </div>

        {/* Quick contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {/* Phone */}
          <div className="flex items-start gap-4 p-5 rounded-lg border bg-card shadow-sm">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
            >
              <Phone className="h-5 w-5" style={{ color: "hsl(var(--accent))" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                Phone
              </p>
              <a
                href="tel:+14699364240"
                className="text-sm font-medium text-foreground hover:underline"
              >
                (469) 936-4240
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 p-5 rounded-lg border bg-card shadow-sm">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
            >
              <Mail className="h-5 w-5" style={{ color: "hsl(var(--accent))" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                Email
              </p>
              <a
                href="mailto:info@americanappraisalalliance.com"
                className="text-sm font-medium text-foreground hover:underline break-all"
              >
                info@americanappraisalalliance.com
              </a>
            </div>
          </div>

          {/* Service Area */}
          <div className="flex items-start gap-4 p-5 rounded-lg border bg-card shadow-sm">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
            >
              <MapPin className="h-5 w-5" style={{ color: "hsl(var(--accent))" }} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                Service Area
              </p>
              <p className="text-sm font-medium text-foreground">
                Dallas–Fort Worth Metroplex
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ContactHero.displayName = "ContactHero";

export default ContactHero;
