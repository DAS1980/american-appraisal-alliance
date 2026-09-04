import React from "react";
import { motion } from "framer-motion";
import { MapPin, Award, CheckCircle, Building2, Users, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";

const highlights = [
  {
    icon: Award,
    title: "Licensed & Certified Appraisers",
    description:
      "Every appraisal is performed by licensed and certified professionals holding state-issued credentials and adhering to USPAP standards.",
  },
  {
    icon: Building2,
    title: "Full DFW Coverage",
    description:
      "We serve the entire Dallas–Fort Worth metroplex — including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and all surrounding communities.",
  },
  {
    icon: FileText,
    title: "Court-Accepted & Lender-Approved",
    description:
      "Our reports are drafted to satisfy the requirements of lenders, attorneys, courts, and government agencies — defensible and compliant at every level.",
  },
  {
    icon: CheckCircle,
    title: "USPAP Compliant",
    description:
      "Every engagement is conducted in strict accordance with the Uniform Standards of Professional Appraisal Practice (USPAP), the industry's governing ethical and performance framework.",
  },
  {
    icon: Users,
    title: "Serving Diverse Clients",
    description:
      "We serve homeowners, buyers, sellers, real estate attorneys, lenders, mortgage brokers, CPAs, and estate administrators throughout the DFW area.",
  },
  {
    icon: MapPin,
    title: "Deep Local Market Expertise",
    description:
      "With extensive knowledge of the Dallas–Fort Worth real estate market, our appraisers bring data-driven precision and local insight to every assignment.",
  },
];

const cities = [
  "Dallas",
  "Fort Worth",
  "Arlington",
  "Plano",
  "Irving",
  "Garland",
  "Frisco",
  "McKinney",
  "Denton",
  "Mansfield",
  "Grand Prairie",
  "Lewisville",
  "Allen",
  "Carrollton",
  "Richardson",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const AboutCompanyOverview = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="9b437f85-43f5-41ee-aac1-a5f9ca50e9fb"
      ref={ref}
      id="about-company-overview"
      className="relative py-20 md:py-32 bg-background overflow-x-hidden"
      aria-labelledby="about-overview-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[hsl(42_88%_48%)] mb-3">
            Our Story
          </span>
          <h2
            id="about-overview-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Serving the DFW Metroplex
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            American Appraisal Alliance is a locally rooted, licensed and certified real estate
            appraisal firm with deep roots in the Dallas–Fort Worth metroplex. Since our founding,
            we have delivered accurate, unbiased, and defensible valuations to homeowners, lenders,
            attorneys, and institutions across the full DFW market. Our practice is built on a
            singular commitment: every appraisal we produce meets the highest standards of
            professional practice — USPAP-compliant, methodologically sound, and legally defensible.
          </p>
        </motion.div>

        {/* Image + narrative row */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {/* Image */}
          <div className="relative rounded-lg overflow-hidden shadow-[0_8px_40px_hsl(218_65%_14%/0.18)]">
            <img
              src="https://images.unsplash.com/photo-1678837046678-3eeaf083e38e?w=800&h=600&fit=crop"
              alt="Dallas–Fort Worth skyline representing the American Appraisal Alliance service area"
              width="800"
              height="600"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Subtle gold accent bar */}
            <div
              className="absolute bottom-0 left-0 w-full h-1"
              style={{ background: "hsl(42 88% 48%)" }}
            />
          </div>

          {/* Narrative */}
          <div className="space-y-5">
            <h3
              className="text-2xl md:text-3xl font-semibold text-foreground"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              A Trusted Name in DFW Real Estate Appraisal
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              American Appraisal Alliance was established to meet the growing need for
              professional, independent real estate appraisal services across the Dallas–Fort
              Worth metroplex. From single-family residential properties to complex estate and
              legal assignments, our team brings certified expertise and disciplined methodology
              to every engagement.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We serve a broad range of clients — homeowners seeking clarity on market value,
              lenders requiring reliable collateral assessments, attorneys needing court-accepted
              valuations, and estate administrators working through probate and IRS requirements.
              In every case, our commitment remains the same: accurate, unbiased, defensible
              valuations delivered with professionalism and discretion.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              All appraisals are conducted in strict conformance with the{" "}
              <strong className="text-foreground font-semibold">
                Uniform Standards of Professional Appraisal Practice (USPAP)
              </strong>
              , and our reports are accepted by lenders, courts, the IRS, and government agencies
              throughout Texas and nationwide.
            </p>

            {/* Inline trust badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["USPAP Compliant", "Licensed Appraisers", "DFW Coverage", "Lender-Approved"].map(
                (badge) => (
                  <Badge
                    key={badge}
                    variant="outline"
                    className="text-xs border-[hsl(218_60%_20%)] text-[hsl(218_60%_20%)] bg-[hsl(218_60%_20%/0.05)]"
                  >
                    {badge}
                  </Badge>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Highlights grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlights.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="flex items-center justify-center w-11 h-11 rounded-lg mb-4"
                style={{ background: "hsl(218 60% 20% / 0.08)" }}
              >
                <item.icon
                  className="h-5 w-5"
                  style={{ color: "hsl(42 88% 48%)" }}
                />
              </div>
              <h3
                className="text-base font-semibold text-foreground mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* Service area strip */}
        <motion.div
          className="rounded-lg border border-border bg-muted/40 px-6 py-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-56 flex-shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <MapPin
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "hsl(42 88% 48%)" }}
                />
                <span
                  className="text-xs uppercase tracking-[0.18em] font-semibold"
                  style={{ color: "hsl(218 60% 20%)" }}
                >
                  Service Area
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-snug">
                We serve the entire Dallas–Fort Worth metroplex, including the following
                communities and all surrounding areas.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span
                  key={city}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium border"
                  style={{
                    borderColor: "hsl(218 60% 20% / 0.2)",
                    color: "hsl(218 60% 20%)",
                    background: "hsl(218 60% 20% / 0.05)",
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutCompanyOverview.displayName = "AboutCompanyOverview";

export default AboutCompanyOverview;
