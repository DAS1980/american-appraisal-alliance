import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, FileCheck, Clock, MapPin, Award, Lock, CheckCircle } from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Licensed & Certified Appraisers",
    description:
      "Our appraisers hold state-issued certifications and maintain active licensure, delivering FHA/HUD compliance reports that meet the highest professional standards.",
  },
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Reporting",
    description:
      "Every FHA/HUD Compliance Observation Report is prepared in strict accordance with USPAP guidelines, ensuring lender and underwriter acceptance across the DFW metroplex.",
  },
  {
    icon: FileCheck,
    title: "Deep FHA/HUD Underwriting Knowledge",
    description:
      "We have extensive experience with FHA/HUD underwriting requirements, ensuring property conditions are accurately documented to support smooth loan approval.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "We understand that loan timelines are tight. Our efficient process delivers compliance reports quickly — keeping your FHA transaction on schedule without delays.",
  },
  {
    icon: MapPin,
    title: "Full DFW Metroplex Coverage",
    description:
      "Serving Dallas, Fort Worth, Plano, Frisco, Arlington, Irving, McKinney, Denton, Garland, and all communities throughout the Dallas–Fort Worth metroplex.",
  },
  {
    icon: Lock,
    title: "Confidential &amp; Responsive",
    description:
      "All inquiries are handled with strict confidentiality. We respond within 1 business day — because your time and privacy matter.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const FhaHudWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="fha-hud-why-choose-us"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          {/* Eyebrow */}
          <span
            className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Why American Appraisal Alliance
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-3xl mx-auto leading-snug">
            The Trusted Choice for FHA/HUD Compliance Reports in the DFW Metroplex
          </h2>

          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            When your transaction depends on a defensible, lender-accepted
            FHA/HUD Compliance Observation Report, you need appraisers who
            combine certified credentials with deep local market expertise.
            American Appraisal Alliance delivers{" "}
            <span className="font-medium text-foreground">
              accurate, unbiased, defensible valuations
            </span>{" "}
            — every time.
          </p>
        </motion.div>

        {/* Differentiator Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-border rounded-lg">
                  <CardContent className="p-6 flex flex-col gap-4">
                    {/* Icon Badge */}
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(218 60% 20%) 0%, hsl(218 50% 28%) 100%)",
                      }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p
                        className="text-sm text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-14 rounded-xl px-6 py-8 md:py-10 md:px-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
          style={{
            background:
              "linear-gradient(135deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 60%, hsl(220 45% 28%) 100%)",
          }}
        >
          {/* Mission Statement */}
          <div className="flex-1">
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-2"
              style={{ color: "hsl(42 92% 58%)" }}
            >
              Our Mission
            </p>
            <p className="text-white text-lg md:text-xl font-semibold leading-snug">
              Accurate, unbiased, defensible valuations.
            </p>
            <p className="text-white/80 text-sm mt-2 leading-relaxed">
              Every FHA/HUD Compliance Observation Report we produce reflects
              our commitment to USPAP compliance, professional integrity, and
              precise documentation — trusted by lenders and underwriters
              throughout Dallas–Fort Worth.
            </p>
          </div>

          {/* Assurance Checklist */}
          <ul className="flex flex-col gap-3 min-w-[240px]">
            {[
              "USPAP-compliant reports",
              "Lender and underwriter approved",
              "FHA/HUD underwriting requirements met",
              "All inquiries are confidential",
              "Response within 1 business day",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle
                  className="h-4 w-4 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(42 88% 48%)" }}
                />
                <span className="text-white/90 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Reassurance Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          <span className="font-medium text-foreground">
            All inquiries are confidential. We respond within 1 business day.
          </span>{" "}
          American Appraisal Alliance serves the full Dallas–Fort Worth
          metroplex, including Dallas, Fort Worth, Plano, Frisco, Arlington,
          Irving, McKinney, Denton, Garland, and surrounding DFW communities.
        </motion.p>
      </div>
    </section>
  );
});

FhaHudWhyChooseUs.displayName = "FhaHudWhyChooseUs";

export default FhaHudWhyChooseUs;
