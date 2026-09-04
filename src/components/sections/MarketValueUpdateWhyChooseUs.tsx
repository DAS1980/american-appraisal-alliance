import React from "react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { CheckCircle, Award, Clock, FileText, MapPin, ShieldCheck } from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Licensed & Certified DFW Appraisers",
    description:
      "Our appraisers hold active Texas state certifications and carry deep local market knowledge across Dallas, Fort Worth, Plano, Frisco, and the broader DFW metroplex.",
  },
  {
    icon: ShieldCheck,
    title: "USPAP-Compliant Reports",
    description:
      "Every 1004D recertification we deliver is fully USPAP-compliant and accepted by lenders and Fannie Mae — giving you documentation that meets the highest professional standards.",
  },
  {
    icon: Clock,
    title: "Fast 2–3 Business Day Turnaround",
    description:
      "We understand that lender deadlines move quickly. Our streamlined workflow delivers accurate Market Value Update reports within 2–3 business days in most cases.",
  },
  {
    icon: FileText,
    title: "Court-Accepted & Lender-Approved",
    description:
      "Our 1004D reports are prepared to meet the documentation requirements of lenders, mortgage brokers, and legal proceedings — defensible and professionally presented.",
  },
  {
    icon: CheckCircle,
    title: "Accurate, Unbiased, Defensible Valuations",
    description:
      "American Appraisal Alliance is committed to one standard: accurate, unbiased, defensible valuations. Every recertification reflects the current DFW market without compromise.",
  },
  {
    icon: MapPin,
    title: "Full DFW Metroplex Coverage",
    description:
      "We serve the entire Dallas–Fort Worth metroplex including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton, and surrounding DFW communities.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const MarketValueUpdateWhyChooseUs = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="9988abbf-dab6-4aa8-85b4-bde0b8e67399"
      ref={ref}
      id="market-value-update-why-choose-us"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-20"
        >
          <span
            className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-4"
            style={{ color: "hsl(42 88% 48%)" }}
          >
            Why Choose American Appraisal Alliance
          </span>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            The Trusted Choice for 1004D Recertifications in DFW
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            When lenders require a Market Value Update for the Dallas–Fort Worth
            metroplex, appraisal professionals and mortgage brokers turn to American
            Appraisal Alliance for speed, accuracy, and USPAP-compliant documentation.
          </p>
        </motion.div>

        {/* Differentiator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((item, index) => (
            <motion.article
              key={item.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group relative bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gold accent top bar */}
              <div
                className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
                }}
              />

              {/* Icon */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg mb-5"
                style={{
                  background: "hsl(218 60% 20% / 0.08)",
                }}
              >
                <item.icon
                  className="h-6 w-6"
                  style={{ color: "hsl(42 88% 48%)" }}
                />
              </div>

              {/* Content */}
              <h3 className="font-['Playfair_Display',serif] text-lg md:text-xl font-semibold text-foreground mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Mission Statement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-14 md:mt-20 rounded-xl overflow-hidden"
          style={{
            background:
              "linear-gradient(150deg, hsl(218 65% 14%) 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)",
          }}
        >
          <div className="px-8 py-10 md:px-14 md:py-14 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            {/* Seal / Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-2"
              style={{ borderColor: "hsl(42 88% 48%)" }}
            >
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>

            {/* Text */}
            <div>
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-2"
                style={{ color: "hsl(42 92% 58%)" }}
              >
                Our Commitment
              </p>
              <p className="font-['Playfair_Display',serif] text-xl md:text-2xl font-semibold text-white leading-snug">
                Accurate, unbiased, defensible valuations.
              </p>
              <p className="mt-2 text-white/75 text-sm md:text-base max-w-xl">
                Every Market Value Update delivered by American Appraisal Alliance
                reflects the current Dallas–Fort Worth real estate market with
                precision — prepared under USPAP standards and accepted by Fannie Mae
                and leading lenders across the DFW metroplex.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reassurance Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span
              className="font-semibold"
              style={{ color: "hsl(42 88% 48%)" }}
            >
              Confidential &amp; Prompt:
            </span>{" "}
            All inquiries are confidential. We respond within 1 business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

MarketValueUpdateWhyChooseUs.displayName = "MarketValueUpdateWhyChooseUs";

export default MarketValueUpdateWhyChooseUs;
