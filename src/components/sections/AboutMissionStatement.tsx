import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, Target, Award, MapPin, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const pillars = [
  {
    icon: Target,
    title: "Accurate",
    description:
      "Every appraisal we deliver is grounded in rigorous market analysis, thorough property inspection, and meticulous data verification — producing valuations that withstand professional scrutiny.",
  },
  {
    icon: Scale,
    title: "Unbiased",
    description:
      "Our appraisers maintain complete independence from all parties. We have no financial interest in the outcome of any engagement, ensuring every opinion of value is objective and impartial.",
  },
  {
    icon: ShieldCheck,
    title: "Defensible",
    description:
      "Our reports are prepared in full compliance with the Uniform Standards of Professional Appraisal Practice (USPAP), making them suitable for lenders, courts, attorneys, CPAs, and federal agencies.",
  },
];

const commitments = [
  "USPAP-compliant appraisal methodology on every assignment",
  "Licensed and certified appraisers serving the entire DFW metroplex",
  "Objective, court-accepted valuations free from third-party influence",
  "Deep familiarity with Dallas, Fort Worth, Plano, Frisco, and surrounding DFW communities",
  "Transparent reporting with clear, well-supported conclusions",
  "Responsive service with timely communication and professional delivery",
];

const AboutMissionStatement = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="about-mission-statement"
      className="relative py-20 md:py-32 bg-background overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[hsl(42_88%_48%/0.05)] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Eyebrow */}
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground mb-4 font-[Inter,sans-serif]">
            Our Mission
          </span>

          {/* Verbatim headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-3xl mx-auto font-[Playfair_Display,serif] leading-tight">
            Accurate, unbiased, defensible valuations.
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[Inter,sans-serif] leading-relaxed">
            At American Appraisal Alliance, our mission is straightforward: to deliver real estate appraisals
            that clients, courts, lenders, and attorneys can rely upon with complete confidence — every time,
            across the entire Dallas–Fort Worth metroplex.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-lg p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Gold accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-lg bg-gradient-to-r from-[hsl(42_92%_52%)] to-[hsl(36_88%_44%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/8 mb-6">
                  <pillar.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 font-[Playfair_Display,serif]">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed font-[Inter,sans-serif]">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Body — Two Column */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Mission Statement Prose */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            {/* Gold accent line */}
            <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[hsl(42_92%_52%)] to-[hsl(36_88%_44%)] mb-6" />

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-5 font-[Playfair_Display,serif] leading-tight">
              Integrity at the Core of Every Engagement
            </h3>

            <div className="space-y-4 text-muted-foreground font-[Inter,sans-serif] leading-relaxed">
              <p>
                American Appraisal Alliance was established to serve homeowners, real estate professionals,
                lenders, attorneys, and courts across the Dallas–Fort Worth metroplex with appraisals that
                are not only accurate, but truly defensible in any professional context.
              </p>
              <p>
                We operate under the strict guidelines of the{" "}
                <strong className="text-foreground font-semibold">
                  Uniform Standards of Professional Appraisal Practice (USPAP)
                </strong>{" "}
                — the nationally recognized ethical and performance standards for the appraisal profession.
                Every report we issue reflects our commitment to independence, objectivity, and professional rigor.
              </p>
              <p>
                Whether supporting a mortgage transaction, a divorce proceeding, an estate settlement, or a
                property tax appeal, our appraisers bring the same level of thoroughness and impartiality to
                every assignment — providing valuations the DFW community can trust.
              </p>
            </div>

            {/* Service area callout */}
            <div className="mt-8 flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <MapPin className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground font-[Inter,sans-serif] mb-1">
                  Proudly Serving the Dallas–Fort Worth Metroplex
                </p>
                <p className="text-xs text-muted-foreground font-[Inter,sans-serif] leading-relaxed">
                  Dallas · Fort Worth · Arlington · Plano · Irving · Garland · Frisco · McKinney ·
                  Denton · Mansfield · Grand Prairie · Lewisville · Allen · Carrollton · Richardson
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Commitments List */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          >
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              {/* Award badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(42_92%_52%)] to-[hsl(36_88%_44%)]">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-[Inter,sans-serif] font-medium">
                    Our Professional Commitments
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {commitments.map((commitment, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 + index * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground font-[Inter,sans-serif] leading-relaxed">
                      {commitment}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* USPAP badge */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-xs text-muted-foreground font-[Inter,sans-serif] leading-snug">
                    All appraisals are prepared in accordance with{" "}
                    <strong className="text-foreground font-semibold">USPAP</strong> and applicable
                    federal and state regulations, including{" "}
                    <strong className="text-foreground font-semibold">Fannie Mae Form 1004D</strong>,{" "}
                    <strong className="text-foreground font-semibold">IRS Form 706</strong>, and{" "}
                    <strong className="text-foreground font-semibold">FHA/HUD underwriting requirements</strong>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

AboutMissionStatement.displayName = "AboutMissionStatement";

export default AboutMissionStatement;
