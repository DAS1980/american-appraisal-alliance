import React from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, Zap, CheckCircle, Calendar, PhoneCall, Contact, Icon, Section } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TaxAssessmentTurnaround = React.forwardRef<HTMLElement>((props, ref) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <section
      ref={ref}
      id="tax-assessment-turnaround"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <Badge
              variant="outline"
              className="mb-4 border-[hsl(42_88%_48%)] text-[hsl(42_88%_40%)] bg-[hsl(42_88%_48%/0.08)] text-xs uppercase tracking-widest font-semibold"
            >
              Timing Matters
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Turnaround Time &amp; Protest Deadlines
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Tax assessment protest deadlines in Texas are firm. American Appraisal Alliance
            prioritizes timely delivery of every CAD appeal appraisal so your documentation
            is ready well before your Appraisal Review Board hearing.
          </motion.p>
        </motion.div>

        {/* Main turnaround cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {/* Standard turnaround */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-xl border border-border bg-card shadow-sm p-8 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3
                className="text-xl font-semibold text-foreground"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Standard Turnaround
              </h3>
            </div>

            <p className="text-3xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              5–7 Business Days
            </p>

            <p className="text-muted-foreground text-sm leading-relaxed">
              From the date of property inspection through delivery of your completed,
              USPAP-compliant written appraisal report — formatted and accepted for formal
              ARB protest proceedings with Dallas CAD, Tarrant CAD, Collin CAD, and Denton CAD.
            </p>

            <ul className="space-y-2 mt-2">
              {[
                "Begins upon confirmed property inspection",
                "USPAP-compliant written report delivered digitally",
                "Formatted for CAD protest submission",
                "ARB hearing support documentation included",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-[hsl(42_88%_48%)] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Rush delivery */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-xl border-2 border-[hsl(42_88%_48%)] bg-card shadow-sm p-8 flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Gold accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(42_92%_52%)] to-[hsl(36_88%_44%)]" />

            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(42_88%_48%/0.12)]">
                <Zap className="h-5 w-5 text-[hsl(42_88%_40%)]" />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Rush Delivery
                </h3>
                <Badge
                  variant="secondary"
                  className="text-xs mt-0.5 bg-[hsl(42_88%_48%/0.15)] text-[hsl(42_88%_35%)] border-0"
                >
                  Subject to Availability
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Rush delivery may be available depending on current order volume and scheduling.
              If your protest deadline is approaching, contact us immediately — we will do
              everything possible to accommodate your timeline.
            </p>

            <div className="rounded-lg bg-muted/50 border border-border p-4 mt-auto">
              <p className="text-sm font-medium text-foreground mb-1">Rush Delivery Available</p>
              <p className="text-xs text-muted-foreground">
                Contact us to confirm availability and timeline before placing your order.
                Early engagement is strongly recommended during peak protest season.
              </p>
            </div>

            <Button asChild size="sm" className="bg-[hsl(42_88%_48%)] hover:bg-[hsl(36_88%_44%)] text-[hsl(218_65%_14%)] font-semibold mt-1 w-full sm:w-auto self-start">
              <Link to="/request">Inquire About Rush Delivery</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Deadline alert banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-xl border border-[hsl(42_88%_48%/0.4)] bg-[hsl(42_88%_48%/0.06)] p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(42_88%_48%/0.15)]">
              <AlertTriangle className="h-6 w-6 text-[hsl(42_88%_40%)]" />
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-semibold text-foreground mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Texas CAD Protest Deadline — Act Early
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Texas property tax protest deadlines are typically{" "}
                <strong className="text-foreground">May 15</strong> or{" "}
                <strong className="text-foreground">30 days from the date of your Notice of Appraised Value</strong> — whichever is later.
                Given our standard 5–7 business day turnaround, we strongly recommend contacting
                American Appraisal Alliance as soon as you receive your notice from Dallas CAD,
                Tarrant CAD, Collin CAD, or Denton CAD.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Note: Protest deadlines may vary. Always verify your specific deadline with
                your county appraisal district.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Process timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-10"
        >
          <motion.h3
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xl font-semibold text-foreground mb-6 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            From Inquiry to Delivered Report
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                icon: PhoneCall,
                label: "Contact Us",
                detail: "Submit your request online or call. We respond within 1 business day.",
              },
              {
                step: "2",
                icon: Calendar,
                label: "Schedule Inspection",
                detail: "We schedule a prompt exterior and/or interior property inspection.",
              },
              {
                step: "3",
                icon: Clock,
                label: "Report Preparation",
                detail: "USPAP-compliant report drafted with comparable sales and market analysis.",
              },
              {
                step: "4",
                icon: CheckCircle,
                label: "Report Delivered",
                detail: "Final report delivered digitally, formatted for CAD protest submission.",
              },
            ].map(({ step, icon: Icon, label, detail }) => (
              <motion.div
                key={step}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative rounded-lg border border-border bg-card p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">
                    {step}
                  </span>
                  <Icon className="h-4 w-4 text-[hsl(42_88%_48%)]" />
                </div>
                <p className="font-semibold text-foreground text-sm">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Response time reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-0.5">
              We respond to all inquiries within 1 business day.
            </p>
            <p className="text-xs text-muted-foreground">
              Don't wait until the last minute. Contact American Appraisal Alliance today
              to secure your appraisal ahead of your Texas CAD protest deadline.
            </p>
          </div>
          <Button asChild size="sm" variant="outline" className="flex-shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link to="/request">Get Started</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
});

TaxAssessmentTurnaround.displayName = "TaxAssessmentTurnaround";

export default TaxAssessmentTurnaround;
