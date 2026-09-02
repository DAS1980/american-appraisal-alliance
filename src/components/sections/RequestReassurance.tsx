import React from "react";
import { SITE_BASE_URL } from "@/pages/Request";
import { motion } from "framer-motion";
import { Shield, Clock, Phone, Mail, CheckCircle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RequestReassurance = React.forwardRef<HTMLElement>((props, ref) => {
  const trustPoints = [
    {
      icon: Lock,
      title: "All Inquiries Are Confidential",
      body:
        "Your information is handled with the utmost discretion. We never share client details with third parties.",
    },
    {
      icon: Clock,
      title: "1 Business Day Response",
      body:
        "We review every request promptly. Expect a response from our team within one business day of submission.",
    },
    {
      icon: Shield,
      title: "USPAP-Compliant Appraisers",
      body:
        "All appraisals are performed by licensed, USPAP-compliant appraisers with deep Dallas–Fort Worth market expertise.",
    },
    {
      icon: CheckCircle,
      title: "Serving the Entire DFW Metroplex",
      body:
        "We cover Dallas, Fort Worth, Arlington, Plano, Irving, Frisco, McKinney, Denton, and all surrounding DFW communities.",
    },
  ];

  return (
    <section data-section-id="3cc9a845-c3fc-42dc-97ae-25771196221e"
      ref={ref}
      id="request-reassurance"
      className="relative overflow-x-hidden py-20 md:py-32 bg-background"
      aria-labelledby="reassurance-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Verbatim reassurance banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <Badge
            variant="outline"
            className="mb-4 text-xs uppercase tracking-widest border-[hsl(42_88%_48%)] text-[hsl(42_88%_48%)] bg-[hsl(42_88%_48%/0.08)] px-4 py-1.5"
          >
            Your Privacy &amp; Our Commitment
          </Badge>

          <h2
            id="reassurance-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What to Expect After You Submit
          </h2>

          {/* VERBATIM reassurance text */}
          <p
            className="text-lg md:text-xl font-semibold text-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            All inquiries are confidential. We respond within 1 business day.
          </p>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Submitting an appraisal request carries no obligation. Our licensed
            team will review your property details and reach out to confirm scope,
            timeline, and fee — with no pressure and complete transparency.
          </p>
        </motion.div>

        {/* Trust points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="flex items-start gap-4 p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: "hsl(42 88% 48% / 0.12)" }}
              >
                <point.icon
                  className="h-6 w-6"
                  style={{ color: "hsl(42 88% 48%)" }}
                />
              </div>
              <div>
                <h3
                  className="text-base font-semibold text-foreground mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {point.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Direct contact block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="rounded-xl border p-8 md:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, hsl(218 60% 20%) 0%, hsl(218 50% 24%) 100%)",
          }}
        >
          <p
            className="text-sm uppercase tracking-widest font-semibold mb-2"
            style={{ color: "hsl(42 92% 58%)" }}
          >
            Prefer to reach us directly?
          </p>
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We're Ready to Help
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            Whether you have a question about appraisal scope, turnaround time, or
            which report type is right for your situation, our licensed DFW
            appraisers are available to assist you directly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Phone */}
            <a
              href="tel:+12145550198"
              className="flex items-center gap-3 group"
              aria-label="Call us at (214) 555-0198"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "hsl(42 88% 48% / 0.2)" }}
              >
                <Phone
                  className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 uppercase tracking-wide">
                  Phone
                </p>
                <p className="text-white font-semibold group-hover:text-[hsl(42_92%_58%)] transition-colors duration-200">
                  (214) 555-0198
                </p>
              </div>
            </a>

            {/* Divider */}
            <div className="hidden sm:block h-12 w-px bg-white/20" />

            {/* Email */}
            <a
              href="mailto:info@americanappraisalalliance.com"
              className="flex items-center gap-3 group"
              aria-label="Email us at info@americanappraisalalliance.com"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "hsl(42 88% 48% / 0.2)" }}
              >
                <Mail
                  className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                  style={{ color: "hsl(42 92% 58%)" }}
                />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-white font-semibold group-hover:text-[hsl(42_92%_58%)] transition-colors duration-200 break-all text-sm">
                  info@americanappraisalalliance.com
                </p>
              </div>
            </a>
          </div>

          {/* USPAP note */}
          <p
            className="mt-8 text-xs text-white/50 max-w-lg mx-auto leading-relaxed"
          >
            All appraisals are performed by licensed, USPAP-compliant appraisers.{" "}
            <a
              href={SITE_BASE_URL}
              className="text-white/60 underline hover:text-white/80 transition-colors"
            >
              americanappraisalalliance.com
            </a>{" "}
            proudly serves the Dallas–Fort Worth Metroplex, including Dallas,
            Fort Worth, Arlington, Plano, Irving, Frisco, McKinney, Denton, and
            surrounding communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

RequestReassurance.displayName = "RequestReassurance";

export default RequestReassurance;
