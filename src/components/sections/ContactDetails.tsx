import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, Contact, Grid, Icon, Section, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactDetails = React.forwardRef<HTMLElement>((props, ref) => {
  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      primary: "(469) 936-4240",
      secondary: "Monday – Friday, 8:00 AM – 5:00 PM CST",
      href: "tel:+14699364240",
      hrefLabel: "Call Now",
    },
    {
      icon: Mail,
      label: "Email",
      primary: "info@americanappraisalalliance.com",
      secondary: "We respond within 1 business day.",
      href: "mailto:info@americanappraisalalliance.com",
      hrefLabel: "Send Email",
    },
    {
      icon: MapPin,
      label: "Office Address",
      primary: "5001 Spring Valley Road, Suite 400",
      secondary: "Dallas, TX 75244",
      href: "https://maps.google.com/?q=5001+Spring+Valley+Road+Suite+400+Dallas+TX+75244",
      hrefLabel: "Get Directions",
    },
    {
      icon: Clock,
      label: "Office Hours",
      primary: "Mon – Fri: 8:00 AM – 5:00 PM CST",
      secondary: "Closed weekends and federal holidays",
      href: null,
      hrefLabel: null,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section
      ref={ref}
      id="contact-details"
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
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 font-sans">
            Dallas–Fort Worth Metroplex
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4 max-w-2xl mx-auto">
            Reach Our Appraisal Team
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-sans">
            American Appraisal Alliance serves the entire Dallas–Fort Worth
            metroplex. Contact us to discuss your appraisal needs — all
            inquiries are handled with strict confidentiality.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {contactItems.map((item) => (
            <motion.article
              key={item.label}
              variants={itemVariants}
              className="group bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon container */}
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1">
                    {item.label}
                  </p>
                  <p className="text-base font-semibold text-foreground font-serif leading-snug break-words">
                    {item.primary}
                  </p>
                  <p className="text-sm text-muted-foreground font-sans mt-0.5">
                    {item.secondary}
                  </p>

                  {item.href && item.hrefLabel && (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-block mt-3 text-sm font-medium text-primary hover:underline font-sans transition-colors duration-200"
                    >
                      {item.hrefLabel} →
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Confidentiality & Response Time Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
          className="rounded-lg border border-border bg-muted/40 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
        >
          <div className="flex items-center gap-3 flex-1">
            <Shield className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground font-sans">
              <span className="font-semibold">All inquiries are confidential.</span>{" "}
              We respond within 1 business day. Your personal information and
              property details are handled with complete discretion in accordance
              with professional appraisal standards.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-sans">
              USPAP Compliant
            </span>
          </div>
        </motion.div>

        {/* Service Area Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
          className="rounded-lg border border-border bg-background p-6 mb-10"
        >
          <h3 className="text-base font-semibold text-foreground font-serif mb-2">
            Serving the Dallas–Fort Worth Metroplex
          </h3>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            American Appraisal Alliance provides USPAP-compliant residential
            appraisal services throughout the DFW area, including Dallas, Fort
            Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney, Denton,
            and surrounding communities. If you are located in the DFW
            metroplex, we can assist with your appraisal needs.
          </p>
        </motion.div>

        {/* CTA to Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.35 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground font-sans mb-4">
            Prefer to submit your details online?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[hsl(42,88%,48%)] text-[hsl(218,65%,14%)] hover:bg-[hsl(42,88%,42%)] font-semibold px-8 font-sans"
          >
            <Link to="/request">Request an Appraisal</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

ContactDetails.displayName = "ContactDetails";

export default ContactDetails;
