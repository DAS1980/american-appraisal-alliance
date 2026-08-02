import React from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Search, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CANONICAL_BASE = "https://americanappraisalalliance.com";

const turnaroundItems = [
  {
    icon: Clock,
    label: "Standard Delivery",
    detail: "Typical report delivery: 3–5 business days after inspection",
    accent: false,
  },
  {
    icon: Zap,
    label: "Expedited Option",
    detail: "Expedited turnaround available upon request",
    accent: true,
  },
  {
    icon: Search,
    label: "Retroactive Appraisals",
    detail: "Retroactive appraisals may require additional research time",
    accent: false,
  },
  {
    icon: MapPin,
    label: "DFW Scheduling",
    detail: "Prompt scheduling across the full DFW metroplex",
    accent: false,
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

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const DivorceAppraisalTurnaround = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="divorce-appraisal-turnaround"
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
          <Badge
            variant="outline"
            className="mb-4 border-[hsl(42_88%_48%)] text-[hsl(42_88%_40%)] bg-[hsl(42_92%_96%)] text-xs uppercase tracking-widest font-semibold px-4 py-1"
          >
            Report Delivery
          </Badge>

          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(218_60%_20%)] mb-4 max-w-3xl mx-auto">
            Fast, Reliable Turnaround
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We understand that divorce proceedings often operate under court-imposed deadlines.
            American Appraisal Alliance is committed to delivering accurate, defensible reports
            with the promptness your case requires — across every corner of the Dallas–Fort Worth
            metroplex.
          </p>
        </motion.div>

        {/* Turnaround Timeline Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {turnaroundItems.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <Card
                className={`h-full border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  item.accent
                    ? "border-[hsl(42_88%_48%)] bg-[hsl(42_92%_97%)]"
                    : "border-border bg-card"
                }`}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                      item.accent
                        ? "bg-[hsl(42_88%_48%)] text-white"
                        : "bg-[hsl(218_60%_20%)]/10 text-[hsl(218_60%_20%)]"
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p
                      className={`font-['Playfair_Display',serif] font-semibold text-base mb-1 ${
                        item.accent
                          ? "text-[hsl(42_88%_36%)]"
                          : "text-[hsl(218_60%_20%)]"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                  {item.accent && (
                    <Badge className="self-start text-xs bg-[hsl(42_88%_48%)] text-white hover:bg-[hsl(42_88%_44%)]">
                      Available
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Deadline Awareness Note */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="rounded-xl border border-[hsl(218_60%_20%)]/20 bg-[hsl(218_60%_20%)]/5 p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-5 mb-10"
        >
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(218_60%_20%)] text-white">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-['Playfair_Display',serif] text-lg font-semibold text-[hsl(218_60%_20%)] mb-2">
              Court Deadlines &amp; Date-of-Separation Valuations
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Divorce cases frequently involve court-ordered deadlines or require a valuation
              as of a specific historical date — often the date of separation. Our licensed
              appraisers are experienced with retroactive valuations and will communicate
              realistic timelines upfront. If your matter has an imminent hearing or filing
              deadline, please indicate this in your request so we can prioritize scheduling
              accordingly.
            </p>
          </div>
        </motion.div>

        {/* Reassurance Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
          className="rounded-xl bg-[hsl(218_60%_20%)] px-6 py-6 md:px-10 md:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold text-base md:text-lg font-['Playfair_Display',serif] mb-1">
                Your Privacy Is Protected
              </p>
              <p className="text-white/80 text-sm md:text-base">
                All inquiries are confidential. We respond within 1 business day.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 pl-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-white/20 pt-4 sm:pt-0 sm:pl-8">
            <p className="text-white/70 text-xs uppercase tracking-widest mb-1 font-semibold">
              Service Area
            </p>
            <p className="text-white text-sm font-medium">
              Full Dallas–Fort Worth Metroplex
            </p>
            <p className="text-white/60 text-xs mt-0.5">
              Including Dallas, Fort Worth, Plano, Arlington &amp; surrounding DFW communities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

DivorceAppraisalTurnaround.displayName = "DivorceAppraisalTurnaround";

export default DivorceAppraisalTurnaround;
