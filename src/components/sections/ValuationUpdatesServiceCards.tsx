import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileCheck, Shield, CheckCircle } from "lucide-react";

const services = [
  {
    title: "Market Value Update (1004D / Recertification)",
    description:
      "Updates a prior appraisal to reflect current market conditions. Required by lenders when the original appraisal has expired. Fannie Mae Form 1004D compliant.",
    link: "/market-value-update-1004d-recertification",
    compliance: "Fannie Mae Form 1004D",
    bullets: [
      "Updates a prior appraisal to current market conditions",
      "Required by lenders when original appraisal has expired",
      "Fannie Mae Form 1004D compliant",
    ],
    icon: FileCheck,
    imageUrl:
      "https://images.unsplash.com/photo-1678837047193-23291e525599?w=800&h=600&fit=crop",
    imageAlt: "Professional commercial building in the Dallas–Fort Worth metroplex",
  },
  {
    title: "FHA/HUD Compliance Observation Report",
    description:
      "Identifies property conditions that may affect FHA loan eligibility. Documents health, safety, and structural observations. Supports FHA/HUD underwriting requirements.",
    link: "/fhahud-compliance-observation-report",
    compliance: "FHA/HUD Compliant",
    bullets: [
      "Identifies property conditions that may affect FHA loan eligibility",
      "Documents health, safety, and structural observations",
      "Supports FHA/HUD underwriting requirements",
    ],
    icon: Shield,
    imageUrl:
      "https://images.unsplash.com/photo-1678837046901-5719fe11c1e2?w=800&h=600&fit=crop",
    imageAlt: "Residential building exterior for appraisal inspection in DFW",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ValuationUpdatesServiceCards = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        id="valuation-updates-service-cards"
        className="relative py-20 md:py-32 bg-background"
        aria-labelledby="valuation-services-heading"
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
            <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 font-sans">
              Valuation Updates &amp; Reports
            </span>
            <h2
              id="valuation-services-heading"
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto"
            >
              Certified Valuation Update Services
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              When market conditions shift or lender requirements demand a
              current report, American Appraisal Alliance delivers accurate,
              USPAP-compliant valuation updates and compliance reports across
              the Dallas–Fort Worth metroplex.
            </p>
          </motion.div>

          {/* Service Cards — exactly 2 */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  variants={cardVariants}
                  className="group flex flex-col rounded-lg overflow-hidden border border-border shadow-md hover:shadow-xl transition-shadow duration-300 bg-card"
                >
                  {/* Card Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      loading="lazy"
                      width="800"
                      height="600"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Navy gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_65%_14%/0.75)] via-[hsl(218_65%_14%/0.25)] to-transparent pointer-events-none" />

                    {/* Compliance badge on image */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="text-xs font-sans bg-[hsl(42_88%_48%)] text-[hsl(218_65%_14%)] border-0 font-semibold"
                      >
                        {service.compliance}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-lg bg-[hsl(218_65%_14%)]">
                        <Icon className="h-5 w-5 text-[hsl(42_88%_48%)]" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-sm font-sans text-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-[hsl(42_88%_48%)] mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Button
                        asChild
                        className="w-full bg-[hsl(218_65%_14%)] text-white hover:bg-[hsl(218_60%_20%)] transition-colors duration-200 font-sans"
                        size="lg"
                      >
                        <Link to={service.link}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* USPAP compliance note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground font-sans">
              <span className="font-semibold text-foreground">
                All reports are USPAP-compliant and lender-accepted.
              </span>{" "}
              Serving Dallas, Fort Worth, Arlington, Plano, Irving, Garland,
              Frisco, McKinney, Denton, and the greater DFW metroplex.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }
);

ValuationUpdatesServiceCards.displayName = "ValuationUpdatesServiceCards";

export default ValuationUpdatesServiceCards;
