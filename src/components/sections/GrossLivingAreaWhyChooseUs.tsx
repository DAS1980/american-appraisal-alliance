import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, MapPin, Clock, Award, Scale, Grid, Icon, Section, Signal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const differentiators = [
  {
    icon: Award,
    title: "Licensed & Certified Appraisers",
    description:
      "Licensed and certified appraisers with deep DFW market knowledge — every GLA certification is prepared by a credentialed professional with firsthand familiarity with Dallas–Fort Worth residential properties.",
  },
  {
    icon: Scale,
    title: "ANSI Z765-2021 & USPAP Compliance",
    description:
      "Strict ANSI Z765-2021 and USPAP-compliant measurement methodology governs every engagement. Our certifications meet the standards required by Fannie Mae guidelines, lenders, and courts.",
  },
  {
    icon: Shield,
    title: "Court-Accepted & Lender-Approved",
    description:
      "Our GLA certifications are court-accepted and lender-approved, making them defensible in legal proceedings, real estate transactions, and formal financing scenarios.",
  },
  {
    icon: MapPin,
    title: "Full DFW Metroplex Coverage",
    description:
      "Serving all communities across the Dallas–Fort Worth metroplex — including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, Mansfield, Grand Prairie, Lewisville, Allen, Carrollton, and Richardson.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround — 2–3 Business Days",
    description:
      "Reports delivered within 2–3 business days of the measurement appointment, giving homeowners, agents, and lenders the documentation they need without unnecessary delays.",
  },
  {
    icon: CheckCircle,
    title: "Accurate, Unbiased Valuations",
    description:
      "Unbiased, defensible valuations — accurate, not inflated. Our mission is simple: Accurate, unbiased, defensible valuations that hold up under scrutiny from any stakeholder.",
  },
];

const trustSignals = [
  "USPAP Compliant",
  "Licensed Appraisers",
  "Fannie Mae Guidelines",
  "Court-Accepted",
  "ANSI Z765-2021",
  "Lender-Approved",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

const GrossLivingAreaWhyChooseUs = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        id="gross-living-area-why-choose-us"
        className="relative py-20 md:py-32 bg-background"
        aria-labelledby="gla-why-choose-heading"
      >
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-4"
              style={{ color: "hsl(42 88% 48%)" }}
            >
              Why American Appraisal Alliance
            </span>
            <h2
              id="gla-why-choose-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 max-w-3xl mx-auto"
              style={{ color: "hsl(218 60% 20%)", fontFamily: "'Playfair Display', serif" }}
            >
              The DFW Standard for GLA Certification
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              When accuracy, compliance, and local expertise matter, Dallas–Fort Worth
              homeowners, lenders, and legal professionals rely on American Appraisal
              Alliance for Gross Living Area certifications that are thorough, defensible,
              and delivered on time.
            </p>
          </motion.div>

          {/* Trust Signal Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            {trustSignals.map((signal) => (
              <Badge
                key={signal}
                variant="secondary"
                className="text-xs px-3 py-1 font-medium"
                style={{
                  backgroundColor: "hsl(218 60% 20% / 0.08)",
                  color: "hsl(218 60% 20%)",
                  borderColor: "hsl(218 60% 20% / 0.18)",
                  border: "1px solid",
                }}
              >
                {signal}
              </Badge>
            ))}
          </motion.div>

          {/* Differentiator Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {differentiators.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <Card
                  className="h-full border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{
                    borderColor: "hsl(218 60% 20% / 0.12)",
                    backgroundColor: "hsl(0 0% 100%)",
                  }}
                >
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center h-12 w-12 rounded-lg mb-4"
                      style={{ backgroundColor: "hsl(42 88% 48% / 0.12)" }}
                    >
                      <item.icon
                        className="h-6 w-6"
                        style={{ color: "hsl(42 88% 48%)" }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-semibold mb-2 leading-snug"
                      style={{
                        color: "hsl(218 60% 20%)",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Statement Banner */}
          <motion.div
            className="rounded-xl px-8 py-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, hsl(218 60% 18%) 0%, hsl(218 50% 24%) 100%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p
              className="text-xs uppercase tracking-[0.22em] font-medium mb-3"
              style={{ color: "hsl(42 88% 48%)" }}
            >
              Our Mission
            </p>
            <blockquote
              className="text-xl md:text-2xl font-bold text-white mb-3 max-w-2xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Accurate, unbiased, defensible valuations."
            </blockquote>
            <p className="text-white/75 text-sm max-w-xl mx-auto">
              Every GLA certification delivered by American Appraisal Alliance upholds
              this standard — USPAP-compliant, ANSI Z765-2021 precise, and trusted by
              lenders, attorneys, and homeowners across the Dallas–Fort Worth metroplex.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }
);

GrossLivingAreaWhyChooseUs.displayName = "GrossLivingAreaWhyChooseUs";

export default GrossLivingAreaWhyChooseUs;
