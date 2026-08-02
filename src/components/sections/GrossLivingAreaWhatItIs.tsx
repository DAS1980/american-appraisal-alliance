import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Ruler, FileText, ClipboardList, Clock, Shield, Key, Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const GrossLivingAreaWhatItIs = React.forwardRef<HTMLElement>((props, ref) => {
  const whatIsIncluded = [
    {
      icon: Ruler,
      title: "On-Site Property Measurement",
      description:
        "A licensed appraiser physically measures the property using ANSI Z765-2021 standards, ensuring every above-grade living space is accurately documented.",
    },
    {
      icon: ClipboardList,
      title: "Detailed Floor Plan Sketch",
      description:
        "A professionally rendered floor plan sketch with room-by-room dimensions is produced and included with every GLA Certification report.",
    },
    {
      icon: FileText,
      title: "Certified GLA Report",
      description:
        "A USPAP-compliant Gross Living Area certification report accepted by lenders, Fannie Mae guidelines, courts, and government agencies across the DFW metroplex.",
    },
    {
      icon: Shield,
      title: "ANSI Z765-2021 Compliance",
      description:
        "All measurements adhere strictly to ANSI Z765-2021 calculation methodology, providing the industry-recognized standard required by lenders and MLS systems.",
    },
  ];

  const whoNeedsIt = [
    "Homeowners disputing square footage discrepancies with tax records",
    "Lenders requiring independent GLA verification before loan approval",
    "Buyers and sellers seeking accurate above-grade living area confirmation",
    "Attorneys and CPAs involved in estate, divorce, or legal proceedings",
    "Appraisers seeking a second measurement opinion",
    "Property tax appeal filers requiring certified GLA documentation",
  ];

  const glanceItems = [
    { label: "Standard", value: "ANSI Z765-2021 & USPAP" },
    { label: "Report Type", value: "Certified GLA Certification Report" },
    { label: "Includes", value: "Floor plan sketch + room-by-room breakdown" },
    { label: "Turnaround", value: "Typically 2-3 business days after inspection" },
    { label: "Service Area", value: "Dallas-Fort Worth Metroplex" },
    { label: "Accepted By", value: "Lenders, Fannie Mae, courts, and agencies" },
  ];

  return (
    <section
      ref={ref}
      id="gross-living-area-what-it-is"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* What It Is */}
        <motion.div
          className="mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-xs md:text-sm uppercase tracking-widest font-semibold mb-4"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Service Overview
          </motion.span>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-5 max-w-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What Is a GLA Certification?
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5"
              >
                A Gross Living Area (GLA) Certification is a certified measurement and documentation
                of a property's above-grade living area, conducted by a licensed appraiser following
                ANSI Z765-2021 standards and producing a USPAP-compliant report accepted by lenders,
                courts, and government agencies across the Dallas-Fort Worth metroplex.
              </motion.p>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-base text-muted-foreground leading-relaxed mb-6"
              >
                GLA discrepancies are more common than many homeowners realize — tax records often
                reflect outdated or inaccurate square footage measurements. Our certification resolves
                these discrepancies definitively, providing a defensible, independently verified figure
                that satisfies lenders, the MLS, and legal proceedings alike throughout Dallas,
                Fort Worth, Arlington, Plano, Frisco, and surrounding DFW communities.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex flex-wrap gap-2"
              >
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 border"
                  style={{ borderColor: "hsl(42 88% 48% / 0.4)", color: "hsl(218 60% 20%)" }}
                >
                  USPAP-Compliant
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 border"
                  style={{ borderColor: "hsl(42 88% 48% / 0.4)", color: "hsl(218 60% 20%)" }}
                >
                  ANSI Z765-2021
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 border"
                  style={{ borderColor: "hsl(42 88% 48% / 0.4)", color: "hsl(218 60% 20%)" }}
                >
                  Lender-Approved
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1 border"
                  style={{ borderColor: "hsl(42 88% 48% / 0.4)", color: "hsl(218 60% 20%)" }}
                >
                  Court-Accepted
                </Badge>
              </motion.div>
            </div>

            {/* Key facts panel */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="rounded-xl p-6 md:p-8 border"
                style={{
                  background: "hsl(218 60% 20%)",
                  borderColor: "hsl(42 88% 48% / 0.25)",
                }}
              >
                <h3
                  className="text-lg font-semibold text-white mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Service at a Glance
                </h3>

                <ul className="space-y-4">
                  {glanceItems.map((item) => (
                    <li key={item.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                        style={{ color: "hsl(42 88% 48%)", minWidth: "90px" }}
                      >
                        {item.label}
                      </span>
                      <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Turnaround highlight */}
                <div
                  className="mt-6 flex items-center gap-3 rounded-lg px-4 py-3"
                  style={{ background: "hsl(42 88% 48% / 0.12)", borderLeft: "3px solid hsl(42 88% 48%)" }}
                >
                  <Clock className="h-5 w-5 flex-shrink-0" style={{ color: "hsl(42 88% 48%)" }} />
                  <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.9)" }}>
                    Fast Turnaround: Typically delivered within 2-3 business days of inspection.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          className="mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <span
              className="inline-block text-xs md:text-sm uppercase tracking-widest font-semibold mb-3"
              style={{ color: "hsl(42 88% 48%)" }}
            >
              Deliverables
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground max-w-2xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What's Included in Every GLA Certification
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
              Each report is prepared by a licensed appraiser serving the Dallas-Fort Worth metroplex
              and adheres to the highest professional and regulatory standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whatIsIncluded.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border rounded-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ background: "hsl(218 60% 20% / 0.08)" }}
                      >
                        <item.icon className="h-5 w-5" style={{ color: "hsl(218 60% 20%)" }} />
                      </div>
                      <CardTitle
                        className="text-base font-semibold text-foreground leading-snug pt-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* USPAP compliance note */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 rounded-lg px-5 py-4 flex items-start gap-3 border"
            style={{
              background: "hsl(42 88% 48% / 0.06)",
              borderColor: "hsl(42 88% 48% / 0.3)",
            }}
          >
            <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 88% 48%)" }} />
            <p className="text-sm text-foreground leading-relaxed">
              Compliance Note: All reports are USPAP-compliant and adhere to Fannie Mae and
              lender guidelines. Prepared by licensed and certified appraisers with deep knowledge of the
              Dallas-Fort Worth real estate market.
            </p>
          </motion.div>
        </motion.div>

        {/* Who Needs It */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: "easeOut" }}>
              <span
                className="inline-block text-xs md:text-sm uppercase tracking-widest font-semibold mb-4"
                style={{ color: "hsl(42 88% 48%)" }}
              >
                Who Needs This Service
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold text-foreground mb-5 max-w-md"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                GLA Certification Serves a Wide Range of Clients
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                From lenders and homeowners to legal professionals and real estate agents across
                Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton,
                and the greater DFW metroplex — our GLA Certifications provide independently verified,
                defensible documentation that resolves square footage discrepancies with authority.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
              <ul className="space-y-3">
                {whoNeedsIt.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="h-5 w-5 flex-shrink-0 mt-0.5"
                      style={{ color: "hsl(42 88% 48%)" }}
                    />
                    <span className="text-sm md:text-base text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-8 rounded-xl p-5 border"
                style={{
                  background: "hsl(218 60% 20% / 0.04)",
                  borderColor: "hsl(218 60% 20% / 0.12)",
                }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Resolves Discrepancies: When a property's tax records, MLS listing, and lender
                  appraisal all report different square footage figures, a certified GLA report from
                  American Appraisal Alliance provides the authoritative, USPAP-compliant measurement
                  that all parties can rely on.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
});

GrossLivingAreaWhatItIs.displayName = "GrossLivingAreaWhatItIs";

export default GrossLivingAreaWhatItIs;
