import React from "react";
import { motion } from "framer-motion";
import { Check, Ruler, FileText, Home, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const whatIsIncluded = [
  "Full exterior measurement of the home",
  "Level-by-level floor area calculations",
  "Gross Living Area (GLA) determination per ANSI Z765-2021",
  "Exclusion of non-conforming spaces per standard",
  "Written measurement report with sketches and calculations",
];

const whoNeedsIt = [
  {
    icon: Home,
    title: "Homeowners",
    description:
      "Disputing square footage on record or verifying measurements before sale or refinance.",
  },
  {
    icon: Users,
    title: "Real Estate Agents",
    description:
      "Needing MLS-accurate measurements to ensure accurate listing data in the Dallas–Fort Worth market.",
  },
  {
    icon: FileText,
    title: "Lenders & Underwriters",
    description:
      "Requiring ANSI Z765-2021-compliant Gross Living Area calculations to satisfy underwriting guidelines.",
  },
  {
    icon: Ruler,
    title: "Buyers & Sellers",
    description:
      "Seeking verified square footage before listing or closing to avoid disputes and protect transaction integrity.",
  },
];

const PropertyMeasurementAnsiWhatItIs = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        id="property-measurement-ansi-what-it-is"
        className="relative py-20 md:py-32 bg-background"
      >
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-14 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Badge
                variant="outline"
                className="mb-4 text-xs uppercase tracking-widest border-amber-500/60 text-amber-700 bg-amber-50"
              >
                ANSI Z765-2021 Standard
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Is ANSI Z765 Property Measurement?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              ANSI Z765-2021 is the nationally recognized standard for measuring
              and calculating residential square footage. Established by the
              American National Standards Institute, it defines precisely which
              areas of a home qualify as Gross Living Area (GLA) and how each
              space must be measured — eliminating ambiguity and ensuring
              consistency across appraisals, listings, and lending transactions
              throughout the Dallas–Fort Worth metroplex.
            </motion.p>
          </motion.div>

          {/* Why It Matters */}
          <motion.div
            className="grid md:grid-cols-2 gap-10 mb-16 md:mb-24 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Left: Explanatory copy */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-5"
            >
              <h3
                className="text-xl md:text-2xl font-semibold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why the ANSI Z765 Standard Matters
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Square footage discrepancies are among the most common — and
                consequential — issues in real estate transactions. Tax records,
                MLS listings, and prior appraisals frequently disagree on a
                home's actual size. Without a standardized measurement
                methodology, buyers, sellers, lenders, and appraisers may be
                working from different numbers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ANSI Z765-2021 resolves this problem by establishing a single,
                authoritative framework. It specifies minimum ceiling heights,
                defines above-grade vs. below-grade areas, and mandates how
                stairways, finished areas, and attached structures are counted.
                Many lenders — including those following Fannie Mae guidelines —
                now require ANSI Z765-compliant measurements for new
                appraisals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At American Appraisal Alliance, every property measurement
                report is prepared by a licensed appraiser in strict accordance
                with ANSI Z765-2021 and USPAP guidelines, ensuring your report
                is defensible, accurate, and accepted by lenders, MLS systems,
                and courts throughout the DFW metroplex.
              </p>

              {/* USPAP Note */}
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 mt-2">
                <FileText className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 leading-snug">
                  All measurement reports are prepared in accordance with{" "}
                  <strong>USPAP guidelines</strong> and{" "}
                  <strong>ANSI Z765-2021 standards</strong>, ensuring full
                  compliance for lending, appraisal, and legal purposes.
                </p>
              </div>
            </motion.div>

            {/* Right: What's Included */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="shadow-md border border-border overflow-hidden">
                <CardHeader className="bg-[hsl(218_60%_20%)] px-6 py-5">
                  <CardTitle
                    className="text-white text-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    What's Included in Your Report
                  </CardTitle>
                  <p className="text-white/75 text-sm mt-1">
                    Delivered within{" "}
                    <span className="text-amber-300 font-medium">
                      3–5 business days
                    </span>
                  </p>
                </CardHeader>
                <CardContent className="px-6 py-6 space-y-3">
                  {whatIsIncluded.map((item, i) => (
                    <motion.div
                      key={item}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08,
                        ease: "easeOut",
                      }}
                    >
                      <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-amber-600" />
                      </span>
                      <span className="text-sm text-foreground leading-snug">
                        {item}
                      </span>
                    </motion.div>
                  ))}

                  {/* Turnaround callout */}
                  <div className="mt-5 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>
                      Typical turnaround:{" "}
                      <strong className="text-foreground">
                        3–5 business days
                      </strong>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Who Needs It */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Who Needs ANSI Z765 Measurement?
              </h3>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base">
                ANSI Z765-compliant measurement reports serve a broad range of
                real estate professionals and clients across Dallas, Fort Worth,
                Plano, Frisco, McKinney, and the greater DFW metroplex.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoNeedsIt.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.09, ease: "easeOut" }}
                >
                  <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
                    <CardContent className="p-6 flex flex-col gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(218_60%_20%)]/10">
                        <item.icon className="h-5 w-5 text-[hsl(218_60%_20%)]" />
                      </div>
                      <h4
                        className="font-semibold text-foreground text-base"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Standards Note */}
          <motion.div
            className="mt-14 md:mt-20 rounded-xl border border-border bg-muted/40 px-6 py-7 md:px-10 md:py-8 flex flex-col md:flex-row gap-5 md:gap-8 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(218_60%_20%)] mt-0.5">
              <Ruler className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-2">
              <h4
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ANSI Z765-2021 &amp; Appraiser-Grade Precision
              </h4>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                Unlike contractor measurements or agent estimates, American
                Appraisal Alliance's property measurement reports are performed
                by licensed appraisers applying ANSI Z765-2021 methodology
                rigorously. Each report includes a detailed sketch, level-by-level
                calculations, and a written summary — the same standard required
                by Fannie Mae and accepted by lenders, agents, MLS organizations,
                and courts throughout Collin, Dallas, Denton, and Tarrant
                counties.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
);

PropertyMeasurementAnsiWhatItIs.displayName = "PropertyMeasurementAnsiWhatItIs";

export default PropertyMeasurementAnsiWhatItIs;
