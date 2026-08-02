import React from "react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { CheckCircle, Clock, FileText, BarChart2, ShieldCheck, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const whatsIncluded = [
  "Review of the original appraisal report",
  "Current market data analysis and comparison",
  "Determination of whether value has increased, decreased, or remained the same",
  "Fannie Mae Form 1004D completion",
  "USPAP-compliant certification",
];

const whoNeedsIt = [
  {
    icon: FileText,
    title: "Lenders & Mortgage Brokers",
    description:
      "When an original appraisal has expired and a refreshed valuation is required before loan closing or commitment extension.",
  },
  {
    icon: RefreshCw,
    title: "Homeowners Refinancing",
    description:
      "Borrowers extending a loan commitment or refinancing who need an updated certification of current market value.",
  },
  {
    icon: BarChart2,
    title: "Underwriters & Processors",
    description:
      "Underwriters who need confirmation that market conditions have not materially changed since the original effective date.",
  },
];

const complianceBadges = [
  "Fannie Mae Form 1004D Compliant",
  "USPAP-Compliant",
  "Lender-Accepted",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const MarketValueUpdateDetails = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="market-value-update-details"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Compliance Badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {complianceBadges.map((badge) => (
            <motion.div key={badge} variants={fadeUp}>
              <Badge
                variant="secondary"
                className="text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20 font-medium"
              >
                <ShieldCheck className="h-3 w-3 mr-1.5 inline-block" />
                {badge}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT COLUMN */}
          <div className="space-y-10">

            {/* What It Is */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                What Is a Market Value Update?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A{" "}
                <span className="font-semibold text-foreground">
                  Market Value Update (1004D / Recertification)
                </span>{" "}
                is a formal update to a prior appraisal that reflects current market conditions as of a
                new effective date. Completed on{" "}
                <span className="font-semibold text-foreground">Fannie Mae Form 1004D</span>, this report
                certifies whether the property&apos;s value has changed since the original appraisal was
                performed.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Lenders and underwriters require this report when an original appraisal has exceeded its
                validity period — typically 120 days — and the loan commitment must be extended or
                refreshed before closing. All reports are prepared in strict compliance with{" "}
                <span className="font-semibold text-foreground">USPAP</span> and Fannie Mae guidelines,
                ensuring they are accepted throughout the Dallas–Fort Worth metroplex and beyond.
              </p>
            </motion.div>

            <Separator />

            {/* Who Needs It */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6">
                Who Needs This Service?
              </h3>
              <div className="space-y-5">
                {whoNeedsIt.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">

            {/* What's Included */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <Card className="shadow-md border border-border rounded-lg overflow-hidden">
                <CardHeader className="bg-primary pb-4 pt-5 px-6">
                  <CardTitle className="text-white font-serif text-lg md:text-xl">
                    What&apos;s Included in the Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5 pb-6 px-6 space-y-3">
                  {whatsIncluded.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 * idx }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 88% 48%)" }} />
                      <span className="text-sm text-foreground leading-snug">{item}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Turnaround Time */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <Card className="shadow-md border border-border rounded-lg overflow-hidden">
                <CardHeader className="pb-3 pt-5 px-6">
                  <CardTitle className="font-serif text-lg text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5" style={{ color: "hsl(42 88% 48%)" }} />
                    Turnaround Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-2xl font-bold text-primary">
                    Typically 2–3 Business Days
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    We prioritize prompt delivery without compromising the accuracy or defensibility of
                    your USPAP-compliant 1004D report. Rush options may be available — contact us to
                    discuss your timeline.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Compliance Note */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            >
              <Card className="shadow-md rounded-lg" style={{ borderColor: "hsl(42 88% 48% / 0.3)", backgroundColor: "hsl(42 88% 48% / 0.05)" }}>
                <CardContent className="px-6 py-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(42 88% 48%)" }} />
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">
                        Compliance Standards
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        All Market Value Update reports prepared by American Appraisal Alliance are fully
                        compliant with{" "}
                        <span className="font-semibold text-foreground">USPAP</span>{" "}
                        (Uniform Standards of Professional Appraisal Practice) and{" "}
                        <span className="font-semibold text-foreground">Fannie Mae Form 1004D</span>{" "}
                        requirements, ensuring acceptance by lenders, underwriters, and mortgage servicers
                        throughout the Dallas–Fort Worth metroplex.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Bottom service area strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-14 rounded-lg bg-muted/50 border border-border px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <BarChart2 className="h-5 w-5 text-white" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">
              Serving the entire Dallas–Fort Worth metroplex
            </span>{" "}
            — including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton,
            Mansfield, Grand Prairie, Lewisville, Allen, Carrollton, and Richardson. Our licensed and
            certified appraisers deliver accurate, unbiased, and defensible valuations accepted by lenders
            across the DFW region.
          </p>
        </motion.div>

      </div>
    </section>
  );
});

MarketValueUpdateDetails.displayName = "MarketValueUpdateDetails";

export default MarketValueUpdateDetails;
