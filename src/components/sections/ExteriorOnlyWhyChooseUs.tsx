import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Award, MapPin, Clock, CheckCircle, Scale, Icon, Section } from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Licensed & Certified DFW Appraisers",
    description:
      "All appraisals are performed by state-licensed and certified real estate appraisers with deep knowledge of the Dallas–Fort Worth residential market.",
  },
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Reports",
    description:
      "Every exterior-only appraisal is completed in full compliance with the Uniform Standards of Professional Appraisal Practice (USPAP), ensuring defensible, professional-grade valuations.",
  },
  {
    icon: CheckCircle,
    title: "Lender-Approved & Court-Accepted",
    description:
      "Our drive-by appraisal reports meet lender requirements for HELOCs, refinances, and certain loan types, and are accepted by financial institutions across the DFW metroplex.",
  },
  {
    icon: MapPin,
    title: "Full Dallas–Fort Worth Coverage",
    description:
      "We serve all communities across the DFW metroplex — including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and surrounding areas.",
  },
  {
    icon: Clock,
    title: "Fast 2–3 Business Day Turnaround",
    description:
      "Exterior-only appraisals offer a faster turnaround than full interior reports. Most drive-by assignments are completed and delivered within 2–3 business days.",
  },
  {
    icon: Scale,
    title: "Accurate, Unbiased, Defensible Valuations",
    description:
      "Our mission is to deliver accurate, unbiased, defensible valuations. Every report reflects independent analysis — free from pressure from any party to the transaction.",
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

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const ExteriorOnlyWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="dea79df5-c3cf-4249-91e8-e06b4892ad28"
      ref={ref}
      id="exterior-only-why-choose-us"
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
          <Badge
            variant="outline"
            className="mb-4 border-[hsl(42_88%_48%)] text-[hsl(42_88%_36%)] bg-[hsl(42_88%_48%/0.08)] text-xs uppercase tracking-widest font-semibold px-4 py-1.5"
          >
            Why American Appraisal Alliance
          </Badge>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(218_60%_20%)] mt-3 mb-5 max-w-3xl mx-auto leading-tight">
            The Right Choice for Drive-By Appraisals in DFW
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            When you need a fast, credible exterior-only appraisal in the
            Dallas–Fort Worth metroplex, American Appraisal Alliance delivers
            USPAP-compliant reports with the accuracy, independence, and
            professionalism that lenders and clients expect.
          </p>
        </motion.div>

        {/* Differentiator Cards — 3-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {differentiators.map((item) => (
            <motion.div key={item.title} variants={cardVariants}>
              <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-card">
                <CardContent className="p-6 flex flex-col gap-4">
                  {/* Icon Badge */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[hsl(218_60%_20%)] shrink-0">
                    <item.icon className="h-6 w-6 text-[hsl(42_88%_58%)]" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-['Playfair_Display',serif] text-[hsl(218_60%_20%)] font-semibold text-lg leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-14 rounded-xl bg-[hsl(218_60%_20%)] px-8 py-8 md:py-10 text-center"
        >
          <p className="font-['Playfair_Display',serif] text-[hsl(42_88%_58%)] text-xs uppercase tracking-widest font-semibold mb-3">
            Our Mission
          </p>
          <blockquote className="text-white text-xl md:text-2xl font-semibold leading-snug max-w-2xl mx-auto">
            "Accurate, unbiased, defensible valuations."
          </blockquote>
          <p className="text-white/70 text-sm mt-4 max-w-xl mx-auto">
            Every drive-by appraisal we deliver reflects this commitment —
            independent analysis, strict USPAP compliance, and deep knowledge
            of the Dallas–Fort Worth real estate market.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

ExteriorOnlyWhyChooseUs.displayName = "ExteriorOnlyWhyChooseUs";

export default ExteriorOnlyWhyChooseUs;
