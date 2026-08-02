import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, Clock, Users, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const FhaHudWhatItIs = React.forwardRef<HTMLElement>((props, ref) => {
  const keyPoints = [
    "Identifies property conditions that may affect FHA loan eligibility",
    "Documents health, safety, and structural observations",
    "Supports FHA/HUD underwriting requirements",
    "USPAP-compliant reporting",
  ];

  const whoNeedsIt = [
    {
      icon: Users,
      title: "FHA Borrowers",
      description:
        "Homebuyers in the Dallas–Fort Worth metroplex seeking FHA financing who need property eligibility documentation before loan approval.",
    },
    {
      icon: FileText,
      title: "Mortgage Brokers & Lenders",
      description:
        "Lenders and brokers processing FHA-backed loans who require a signed, USPAP-compliant observation report to satisfy underwriting requirements.",
    },
    {
      icon: Shield,
      title: "Real Estate Agents",
      description:
        "Agents representing buyers or sellers in transactions involving FHA financing who need to confirm property condition compliance early in the process.",
    },
  ];

  const whatsIncluded = [
    {
      icon: ClipboardList,
      title: "On-Site Property Observation",
      description:
        "A licensed appraiser visits the subject property and conducts a thorough on-site inspection, noting all observable conditions relevant to FHA/HUD guidelines.",
    },
    {
      icon: FileText,
      title: "Written Compliance Report",
      description:
        "A detailed written report documenting all health, safety, and structural observations identified during the inspection, formatted to meet FHA/HUD underwriting requirements.",
    },
    {
      icon: CheckCircle,
      title: "FHA Observation Checklist",
      description:
        "A standardized checklist addressing the specific property condition categories required by FHA/HUD, ensuring nothing is overlooked during the review.",
    },
    {
      icon: Shield,
      title: "Appraiser-Signed Documentation",
      description:
        "All compliance documentation is reviewed and signed by a licensed, USPAP-compliant appraiser — accepted by lenders and underwriters across the DFW metroplex.",
    },
  ];

  return (
    <section
      ref={ref}
      id="fha-hud-what-it-is"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">

        {/* ── What It Is ─────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-20"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
            <Badge
              variant="secondary"
              className="mb-4 text-xs uppercase tracking-widest font-semibold px-3 py-1"
            >
              About This Service
            </Badge>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 leading-snug">
                What Is an FHA/HUD Compliance Observation Report?
              </h2>
              <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
                <p>
                  An{" "}
                  <span className="text-foreground font-semibold">
                    FHA/HUD Compliance Observation Report
                  </span>{" "}
                  is a specialized property condition assessment prepared by a licensed appraiser
                  to identify physical conditions that may affect a property's eligibility for
                  FHA-backed financing. It is an essential component of the FHA/HUD underwriting
                  process, ensuring that the subject property meets minimum property standards
                  before loan approval.
                </p>
                <p>
                  Unlike a full appraisal, this report is narrowly focused on observable health,
                  safety, and structural conditions as defined by FHA/HUD guidelines. It is
                  commonly ordered in conjunction with a full appraisal or as a standalone
                  compliance document when a lender requires specific condition verification.
                </p>
                <p>
                  At American Appraisal Alliance, all FHA/HUD Compliance Observation Reports are
                  prepared in strict conformance with USPAP and FHA/HUD underwriting requirements,
                  ensuring your report is accepted by lenders and underwriters throughout the
                  Dallas–Fort Worth metroplex.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="bg-primary px-6 py-4">
                  <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                    Key Service Points
                  </h3>
                </div>
                <ul className="divide-y divide-border">
                  {keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 px-6 py-4">
                      <CheckCircle className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="px-6 py-4 bg-muted/40 border-t">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[hsl(42_88%_48%)]" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Typical Turnaround:</span>{" "}
                      3–5 business days
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Who Needs It ────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-20"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10"
          >
            <Badge
              variant="secondary"
              className="mb-4 text-xs uppercase tracking-widest font-semibold px-3 py-1"
            >
              Who Needs This Report
            </Badge>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Who Needs an FHA/HUD Compliance Observation Report?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
              This report is typically required by lenders and underwriters when a property is
              involved in an FHA-financed transaction anywhere in the Dallas–Fort Worth metroplex,
              including Dallas, Fort Worth, Plano, Frisco, McKinney, and surrounding communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whoNeedsIt.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="font-serif text-lg text-foreground">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── What's Included ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-20"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10"
          >
            <Badge
              variant="secondary"
              className="mb-4 text-xs uppercase tracking-widest font-semibold px-3 py-1"
            >
              Report Deliverables
            </Badge>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              What Is Included in Your Report
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
              Every FHA/HUD Compliance Observation Report from American Appraisal Alliance is
              prepared by a licensed, USPAP-compliant appraiser and includes the following
              deliverables.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whatsIncluded.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(42_88%_48%/0.12)]">
                        <item.icon className="h-5 w-5 text-[hsl(42_88%_48%)]" />
                      </div>
                      <CardTitle className="font-serif text-base text-foreground">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Turnaround & Compliance ──────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">

                {/* Turnaround panel */}
                <div className="px-8 py-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Turnaround Time
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    We understand that FHA transactions operate on tight timelines. American
                    Appraisal Alliance delivers FHA/HUD Compliance Observation Reports promptly to
                    keep your deal on schedule.
                  </p>
                  <div className="inline-flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/15 px-5 py-3">
                    <Clock className="h-5 w-5 text-[hsl(42_88%_48%)]" />
                    <span className="font-semibold text-foreground text-base">
                      Typical turnaround within 3–5 business days
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Rush turnaround options may be available depending on scheduling. Contact us
                    for availability across Dallas, Fort Worth, Arlington, Plano, and all DFW
                    service areas.
                  </p>
                </div>

                {/* Compliance panel */}
                <div className="px-8 py-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(42_88%_48%/0.12)]">
                      <Shield className="h-5 w-5 text-[hsl(42_88%_48%)]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Compliance Standards
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    All reports are prepared in strict adherence to the following standards and
                    requirements:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "USPAP (Uniform Standards of Professional Appraisal Practice)",
                      "Supports FHA/HUD underwriting requirements",
                      "HUD Handbook 4000.1 minimum property standards",
                      "Accepted by FHA-approved lenders throughout the DFW metroplex",
                    ].map((standard, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{standard}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});

FhaHudWhatItIs.displayName = "FhaHudWhatItIs";

export default FhaHudWhatItIs;
