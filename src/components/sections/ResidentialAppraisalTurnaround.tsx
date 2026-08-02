import React from "react";
import { motion } from "framer-motion";
import { Clock, FileText, Zap, CheckCircle, AlertCircle, Send, Contact, Grid, Section, Volume } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ResidentialAppraisalTurnaround = React.forwardRef<HTMLElement>((props, ref) => {
  const timelineItems = [
    {
      icon: Clock,
      title: "Standard Turnaround",
      value: "3–5 Business Days",
      description:
        "Most Full URAR appraisals in the Dallas–Fort Worth metroplex are completed within 3 to 5 business days from the date of property inspection.",
      highlight: false,
    },
    {
      icon: Zap,
      title: "Rush Service",
      value: "Available Upon Request",
      description:
        "Expedited turnaround options are available for time-sensitive transactions. Contact our office to confirm rush availability and applicable fees.",
      highlight: true,
    },
    {
      icon: FileText,
      title: "Report Delivery",
      value: "Digital PDF Format",
      description:
        "Your completed USPAP-compliant appraisal report is delivered digitally in secure PDF format directly to your designated email address.",
      highlight: false,
    },
    {
      icon: Send,
      title: "Inquiry Response",
      value: "Within 1 Business Day",
      description:
        "All inquiries submitted to American Appraisal Alliance receive a response within 1 business day. We confirm order details, scheduling, and access requirements promptly.",
      highlight: false,
    },
  ];

  const factorsAffectingTimeline = [
    {
      icon: CheckCircle,
      label: "Property Access",
      detail:
        "Timely scheduling of the interior inspection is the most significant factor. Occupied properties, tenant-occupied homes, and properties requiring key coordination may affect timing.",
    },
    {
      icon: CheckCircle,
      label: "Order Volume",
      detail:
        "Current order volume in the DFW metroplex can affect scheduling windows. We maintain transparent communication throughout the process.",
    },
    {
      icon: CheckCircle,
      label: "Property Complexity",
      detail:
        "Unique or complex properties — including custom builds, multi-unit structures, or properties with limited comparable sales — may require additional research and analysis time.",
    },
    {
      icon: CheckCircle,
      label: "Lender Requirements",
      detail:
        "Lender-ordered appraisals may have specific formatting or addendum requirements that can affect report preparation time.",
    },
  ];

  return (
    <section
      ref={ref}
      id="residential-appraisal-turnaround"
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
            className="mb-4 border-[hsl(42_88%_48%)] text-[hsl(42_88%_48%)] bg-[hsl(42_88%_48%/0.08)] text-xs uppercase tracking-widest px-3 py-1"
          >
            Delivery &amp; Timeline
          </Badge>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-foreground mb-4">
            Turnaround Time &amp; Delivery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            American Appraisal Alliance is committed to timely, accurate report delivery for
            clients throughout the Dallas–Fort Worth metroplex. Below are our standard delivery
            expectations for a Full URAR appraisal.
          </p>
        </motion.div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.1 }}
            >
              <Card
                className={`h-full shadow-sm hover:shadow-md transition-shadow duration-300 border ${
                  item.highlight
                    ? "border-[hsl(42_88%_48%/0.5)] bg-[hsl(42_88%_48%/0.04)]"
                    : "border-border bg-card"
                }`}
              >
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 h-11 w-11 rounded-lg flex items-center justify-center ${
                        item.highlight
                          ? "bg-[hsl(42_88%_48%)]"
                          : "bg-[hsl(218_60%_20%/0.08)]"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          item.highlight
                            ? "text-white"
                            : "text-[hsl(218_60%_20%)]"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
                        {item.title}
                      </p>
                      <p
                        className={`font-['Playfair_Display',serif] text-xl font-bold ${
                          item.highlight
                            ? "text-[hsl(42_88%_48%)]"
                            : "text-[hsl(218_60%_20%)]"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-0">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Factors Affecting Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[hsl(218_60%_20%/0.04)] border border-[hsl(218_60%_20%/0.12)] rounded-xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="h-5 w-5 text-[hsl(218_60%_20%)] flex-shrink-0" />
            <h3 className="font-['Playfair_Display',serif] text-xl font-semibold text-foreground">
              Factors That May Affect Delivery Timelines
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            While we consistently strive to complete Full URAR appraisals within the standard
            3–5 business day window, certain circumstances unique to each assignment can influence
            the final delivery date. We provide proactive communication if any factor is expected
            to extend your timeline.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {factorsAffectingTimeline.map((factor, index) => (
              <motion.div
                key={factor.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
                className="flex items-start gap-3"
              >
                <factor.icon className="h-4 w-4 text-[hsl(42_88%_48%)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">{factor.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{factor.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reassurance Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, hsl(218 60% 20%) 0%, hsl(218 50% 24%) 100%)",
          }}
        >
          <div className="px-8 py-8 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-shrink-0 h-14 w-14 rounded-full bg-[hsl(42_88%_48%/0.2)] border border-[hsl(42_88%_48%/0.4)] flex items-center justify-center">
              <Clock className="h-7 w-7 text-[hsl(42_88%_58%)]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="font-['Playfair_Display',serif] text-xl font-semibold text-white mb-1">
                We Respond to All Inquiries Within 1 Business Day
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                Once you submit your appraisal request, our team will confirm receipt, review your
                property details, and reach out to coordinate scheduling — all within one business
                day. American Appraisal Alliance serves the entire Dallas–Fort Worth metroplex,
                including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney,
                and Denton.
              </p>
            </div>
            <div className="flex-shrink-0 hidden lg:flex flex-col items-center gap-1 text-center min-w-[140px]">
              <span className="font-['Playfair_Display',serif] text-3xl font-bold text-[hsl(42_88%_58%)]">
                &lt;1
              </span>
              <span className="text-white/70 text-xs uppercase tracking-wider leading-tight">
                Business Day
                <br />
                Response
              </span>
            </div>
          </div>
        </motion.div>

        {/* Digital Delivery Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-muted/40 border border-border rounded-lg"
        >
          <FileText className="h-5 w-5 text-[hsl(218_60%_20%)] flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Digital Report Delivery: </span>
            Your completed USPAP-compliant Full URAR appraisal report will be delivered in secure
            PDF format. Reports conform to Fannie Mae Form 1004 requirements and include all
            required certifications, comparable sales data, photographs, and the appraiser's
            signed opinion of value.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

ResidentialAppraisalTurnaround.displayName = "ResidentialAppraisalTurnaround";

export default ResidentialAppraisalTurnaround;
