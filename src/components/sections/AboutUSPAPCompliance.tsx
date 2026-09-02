import React from "react";
import { motion } from "framer-motion";
import { Shield, FileCheck, Gavel, Building2, CheckCircle, BookOpen, Award, Users, Scale } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const complianceStandards = [
  {
    icon: Shield,
    title: "USPAP",
    label: "Uniform Standards of Professional Appraisal Practice",
    description:
      "Every appraisal report produced by American Appraisal Alliance adheres to the Uniform Standards of Professional Appraisal Practice — the ethical and performance standards governing all professional appraisers in the United States. USPAP compliance ensures your report is credible, defensible, and accepted by lenders, courts, and government agencies.",
  },
  {
    icon: FileCheck,
    title: "Fannie Mae Form 1004D",
    label: "Appraisal Update / Recertification",
    description:
      "Our Market Value Update reports are prepared in strict accordance with Fannie Mae Form 1004D requirements. This form is required by lenders when an original appraisal has expired, confirming whether the property's value has changed and that the original appraisal remains valid for underwriting purposes.",
  },
  {
    icon: Gavel,
    title: "IRS Form 706",
    label: "Estate Tax & Probate Compliance",
    description:
      "Estate and date-of-death appraisals from American Appraisal Alliance are prepared to satisfy IRS Form 706 requirements for federal estate tax filings. Our retrospective valuations establish fair market value as of a specific historical date and are accepted by attorneys, CPAs, and probate courts throughout the Dallas–Fort Worth metroplex.",
  },
  {
    icon: Building2,
    title: "FHA/HUD Underwriting",
    label: "Federal Housing Administration Requirements",
    description:
      "Our FHA/HUD Compliance Observation Reports document property conditions relevant to FHA loan eligibility, including health, safety, and structural observations. These reports support FHA/HUD underwriting requirements and help ensure transactions proceed smoothly when government-backed financing is involved.",
  },
];

const whyItMatters = [
  {
    icon: CheckCircle,
    title: "Accepted by Lenders & Mortgage Brokers",
    body: "USPAP-compliant reports meet the rigorous standards required by national lenders, mortgage servicers, and GSEs including Fannie Mae and Freddie Mac.",
  },
  {
    icon: Scale,
    title: "Admissible in Court & Legal Proceedings",
    body: "Courts, divorce attorneys, and probate judges require appraisals prepared under USPAP. Our reports are structured to withstand legal scrutiny and cross-examination.",
  },
  {
    icon: Gavel,
    title: "Recognized by the IRS & CPAs",
    body: "Estate appraisals and date-of-death valuations must meet USPAP and IRS standards. American Appraisal Alliance prepares retrospective appraisals trusted by tax professionals.",
  },
  {
    icon: Award,
    title: "Trusted by Real Estate Attorneys",
    body: "From divorce proceedings to estate settlements and tax assessment appeals, our USPAP-compliant reports provide the objective, unbiased evidence attorneys need to advocate for their clients.",
  },
  {
    icon: Users,
    title: "Relied Upon by Homeowners",
    body: "Whether you are challenging a tax assessment, removing PMI, or making an informed purchase decision, our independent appraisals give you accurate, defensible data you can act on.",
  },
  {
    icon: BookOpen,
    title: "Rigorous Professional Standards",
    body: "All appraisers at American Appraisal Alliance hold active state licenses and certifications, complete mandatory USPAP continuing education, and adhere to the highest ethical standards in the profession.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const AboutUSPAPCompliance = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="90e5bda1-3670-4107-9834-cd297e7ada68"
      ref={ref}
      id="about-uspapcompliance"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden"
      aria-labelledby="uspap-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge
              variant="outline"
              className="mb-4 text-xs uppercase tracking-widest border-amber-500 text-amber-700 bg-amber-50 px-3 py-1"
            >
              Compliance &amp; Standards
            </Badge>
          </motion.div>
          <motion.h2
            id="uspap-heading"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            USPAP-Compliant Appraisals You Can Rely On
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
          >
            The Uniform Standards of Professional Appraisal Practice (USPAP) is
            the authoritative set of ethical and performance standards governing
            every professional appraiser in the United States. At American
            Appraisal Alliance, every report we deliver for clients throughout
            the Dallas–Fort Worth metroplex is fully USPAP-compliant — meaning
            it is credible, objective, and defensible in any professional or
            legal context.
          </motion.p>
        </motion.div>

        {/* What USPAP Compliance Means — client-friendly explainer */}
        <motion.div
          className="bg-primary rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Decorative gold accent */}
          <div
            className="absolute top-0 right-0 w-48 h-48 max-w-full rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(42 92% 52%) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Does USPAP Compliance Mean for You?
            </h3>
            <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
              In plain terms, a USPAP-compliant appraisal means the appraiser
              followed a strict code of ethics, disclosed all relevant facts,
              performed an independent and unbiased analysis, and documented
              their methodology in a transparent, reproducible report. For
              lenders, attorneys, courts, and the IRS, a USPAP-compliant report
              is not simply preferred — it is the required standard.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Independent & Unbiased", desc: "No conflicts of interest; objective market analysis" },
                { label: "Fully Documented", desc: "Transparent methodology with verifiable data sources" },
                { label: "Legally Defensible", desc: "Accepted in courts, by lenders, and by the IRS" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 rounded-lg px-5 py-4 border border-white/15"
                >
                  <p
                    className="text-white font-semibold text-sm mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Compliance Standards Grid */}
        <motion.div
          className="mb-16"
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
              className="text-2xl md:text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Regulatory Standards We Uphold
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our reports are prepared in conformance with the regulatory
              frameworks most relevant to our clients — from residential lending
              to estate administration and federal compliance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, index) => (
              <motion.article
                key={standard.title}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-primary/8 border border-primary/15">
                        <standard.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle
                          className="text-lg font-bold text-foreground leading-tight"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {standard.title}
                        </CardTitle>
                        <p className="text-xs text-amber-700 font-medium mt-0.5 uppercase tracking-wide">
                          {standard.label}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {standard.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Why It Matters — 6-card grid */}
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
              className="text-2xl md:text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why USPAP Compliance Matters to Our Clients
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you are a homeowner in Plano, an attorney in Dallas, or a
              lender underwriting a loan in Fort Worth, USPAP compliance is the
              foundation of a report you can trust and act upon with confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItMatters.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex-shrink-0">
                  <item.icon className="h-5 w-5 text-amber-700" />
                </div>
                <h4
                  className="font-semibold text-foreground text-base leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Compliance statement strip */}
        <motion.div
          className="mt-14 rounded-xl border border-amber-200 bg-amber-50 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Shield className="h-7 w-7 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm text-amber-900 leading-relaxed">
            <span className="font-semibold">Our Compliance Commitment:</span>{" "}
            Every appraisal produced by American Appraisal Alliance is
            completed by a licensed and certified appraiser in conformance with
            the Uniform Standards of Professional Appraisal Practice (USPAP),
            applicable federal guidelines including Fannie Mae Form 1004D and
            FHA/HUD underwriting requirements, and IRS Form 706 standards where
            applicable. Our reports are designed to be credible, unbiased, and
            legally defensible across the entire Dallas–Fort Worth metroplex —
            from Dallas and Fort Worth to Frisco, McKinney, Denton, Arlington,
            and all surrounding DFW communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

AboutUSPAPCompliance.displayName = "AboutUSPAPCompliance";

export default AboutUSPAPCompliance;
