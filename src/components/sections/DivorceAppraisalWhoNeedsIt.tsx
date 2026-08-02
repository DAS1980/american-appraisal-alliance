import React from "react";
import { motion } from "framer-motion";
import { Users, Scale, Handshake, Building2, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CANONICAL_BASE = "https://americanappraisalalliance.com";

const audienceSegments = [
  {
    icon: Users,
    title: "Divorcing Spouses Who Jointly Own Real Property",
    description:
      "When a marital home or investment property must be divided equitably, both parties benefit from a single, neutral appraisal conducted by a licensed professional. An independent valuation removes the potential for disagreement over estimated value and provides a credible, court-accepted basis for settlement discussions in the Dallas–Fort Worth area.",
  },
  {
    icon: Scale,
    title: "Family Law & Divorce Attorneys",
    description:
      "Attorneys representing clients in divorce proceedings frequently require USPAP-compliant appraisal reports to support property division agreements, litigation, or court filings. Our reports are prepared by a licensed, neutral appraiser — fully defensible in Collin, Dallas, Denton, and Tarrant county courts throughout the DFW metroplex.",
  },
  {
    icon: Handshake,
    title: "Mediators & Arbitrators",
    description:
      "Alternative dispute resolution professionals facilitating property settlements rely on objective, third-party valuations to move negotiations forward. A USPAP-compliant appraisal from American Appraisal Alliance provides the impartial fair market value evidence needed to reach equitable agreements without court intervention.",
  },
  {
    icon: Building2,
    title: "Courts Requiring Defensible Fair Market Value Evidence",
    description:
      "When a judge requires credible, defensible evidence of a property's fair market value, our court-accepted appraisal reports meet the evidentiary standard. Prepared in strict accordance with USPAP guidelines, each report withstands scrutiny from opposing counsel and judicial review across the Dallas–Fort Worth metropolitan area.",
  },
  {
    icon: Clock,
    title: "Parties Needing Retroactive Date-of-Separation Valuations",
    description:
      "In cases where the marital home was not immediately listed or sold, the date of separation may be months or years in the past. American Appraisal Alliance provides retroactive valuations — establishing fair market value as of a specific historical date — a critical service for resolving date-of-separation disputes in DFW divorce proceedings.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

const DivorceAppraisalWhoNeedsIt = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="divorce-appraisal-who-needs-it"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Who We Serve
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who Needs a Divorce Appraisal?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A divorce appraisal serves a broad range of clients navigating property division in the
            Dallas–Fort Worth metroplex. Whether you are an individual, a legal professional, or a
            court, American Appraisal Alliance delivers accurate, neutral, USPAP-compliant
            valuations that stand up to scrutiny.
          </p>
        </motion.div>

        {/* Audience Segment Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {audienceSegments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <motion.div
                key={segment.title}
                variants={cardVariants}
                className={
                  index === audienceSegments.length - 1 && audienceSegments.length % 2 !== 0
                    ? "md:col-span-2 md:max-w-2xl md:mx-auto w-full"
                    : ""
                }
              >
                <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg"
                        style={{ backgroundColor: "hsl(218 60% 20% / 0.08)" }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: "hsl(218 60% 20%)" }}
                        />
                      </div>
                      <CardTitle
                        className="text-lg font-semibold leading-snug text-foreground"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {segment.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {segment.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Reinforcement Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-12 md:mt-16 rounded-xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-start md:items-center gap-6"
          style={{ backgroundColor: "hsl(218 60% 20%)" }}
        >
          <div className="flex-shrink-0">
            <CheckCircle
              className="w-10 h-10"
              style={{ color: "hsl(42 88% 48%)" }}
            />
          </div>
          <div>
            <p
              className="text-white font-semibold text-lg mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trusted by Attorneys, Courts, and DFW Homeowners
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Every divorce appraisal from American Appraisal Alliance is conducted by a licensed,
              certified appraiser in strict compliance with USPAP standards — providing the
              defensible, neutral valuation that attorneys, mediators, and courts across the
              Dallas–Fort Worth metroplex require.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

DivorceAppraisalWhoNeedsIt.displayName = "DivorceAppraisalWhoNeedsIt";

export default DivorceAppraisalWhoNeedsIt;
