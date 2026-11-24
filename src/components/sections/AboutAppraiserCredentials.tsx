import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Award, ShieldCheck, GraduationCap, ClipboardCheck, Star } from "lucide-react";
import { businessStatements } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Credential = {
  title: string;
  license?: { label: string; value: string };
  icon: typeof BadgeCheck;
  description: string;
  certifications: string[];
  highlight: string;
};

// Owner-approved credentials and statements only (11/24/2026). The license
// belongs to the business owner — do not attribute it to anyone else.
const credentials: Credential[] = [
  {
    title: businessStatements.licenseTitle,
    license: { label: "License No.", value: businessStatements.licenseNumber },
    icon: BadgeCheck,
    description:
      "The owner of American Appraisal Alliance holds a Texas Certified Residential Real Estate Appraiser credential issued by the Texas Appraiser Licensing & Certification Board (TALCB).",
    certifications: ["Licensed by TALCB", "USPAP-Compliant Reports"],
    highlight: "Texas Certified",
  },
  {
    title: businessStatements.experienceShort,
    icon: Award,
    description: businessStatements.experience,
    certifications: ["Dallas–Fort Worth Metropolitan Area", "Residential Real Estate Appraisal"],
    highlight: "Since 1986",
  },
  {
    title: businessStatements.professionalServicesShort,
    icon: ShieldCheck,
    description: businessStatements.professionalServices,
    certifications: ["Lenders", "Attorneys", "Homeowners", "Real Estate Professionals"],
    highlight: "Independent",
  },
];

const trustIndicators = [
  {
    icon: GraduationCap,
    label: "Licensed by TALCB",
    description: "Texas Appraiser Licensing & Certification Board",
  },
  {
    icon: ClipboardCheck,
    label: "USPAP Compliant",
    description: "Every report meets Uniform Standards of Professional Appraisal Practice",
  },
  {
    icon: Star,
    label: businessStatements.experienceShort,
    description: businessStatements.experience,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const AboutAppraiserCredentials = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="d2506e14-a528-4d96-b733-c5634bf84f8d"
      ref={ref}
      id="about-appraiser-credentials"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-[hsl(42_88%_48%)] font-semibold mb-4">
            Our Credentials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 max-w-3xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            Professional Credentials
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {businessStatements.professionalServices}
          </p>
        </motion.div>

        {/* Credential Cards — exactly 3 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {credentials.map((cred) => {
            const Icon = cred.icon;
            return (
              <motion.div key={cred.title} variants={itemVariants}>
                <Card className="h-full border border-border shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
                  <CardHeader className="pb-3">
                    {/* Icon + Highlight Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[hsl(218_60%_20%)]">
                        <Icon className="h-7 w-7 text-[hsl(42_88%_48%)]" />
                      </div>
                      <Badge
                        className="text-xs font-semibold bg-[hsl(42_88%_48%)] text-[hsl(218_65%_14%)] border-0 whitespace-nowrap"
                      >
                        {cred.highlight}
                      </Badge>
                    </div>

                    <CardTitle
                      className="text-lg font-bold text-foreground leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {cred.title}
                    </CardTitle>

                    {/* License number (owner-approved) */}
                    {cred.license && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                          {cred.license.label}
                        </span>
                        <span className="text-xs font-semibold text-[hsl(218_60%_20%)] bg-muted px-2 py-0.5 rounded">
                          {cred.license.value}
                        </span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cred.description}
                    </p>

                    {/* Certification Tags */}
                    <ul className="space-y-1.5">
                      {cred.certifications.map((cert) => (
                        <li key={cert} className="flex items-center gap-2 text-sm text-foreground">
                          <BadgeCheck className="h-4 w-4 text-[hsl(42_88%_48%)] flex-shrink-0" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicator Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="rounded-2xl border border-border bg-[hsl(218_60%_20%)] px-6 py-8 md:px-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, idx) => {
              const Icon = indicator.icon;
              return (
                <motion.div
                  key={indicator.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(42_88%_48%/0.15)] border border-[hsl(42_88%_48%/0.3)]">
                    <Icon className="h-5 w-5 text-[hsl(42_88%_48%)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-0.5">{indicator.label}</p>
                    <p className="text-xs text-white/70 leading-relaxed">{indicator.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* TALCB Disclosure */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/50 leading-relaxed max-w-3xl mx-auto">
              {businessStatements.license}, issued by the Texas Appraiser Licensing &amp;
              Certification Board (TALCB). All appraisals are performed in compliance with the
              Uniform Standards of Professional Appraisal Practice (USPAP).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutAppraiserCredentials.displayName = "AboutAppraiserCredentials";

export default AboutAppraiserCredentials;
