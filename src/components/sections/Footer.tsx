import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Shield, Award, Contact, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = React.forwardRef<HTMLElement>((props, ref) => {
  const currentYear = new Date().getFullYear();

  const serviceCategories = [
    {
      label: "Core Appraisal Services",
      to: "/core-appraisal-services",
    },
    {
      label: "Valuation Updates & Reports",
      to: "/valuation-updates-reports",
    },
    {
      label: "Measurement & Analysis Services",
      to: "/measurement-analysis-services",
    },
  
    { to: "/blog/", label: "Blog" },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Request an Appraisal", to: "/request" },
    { label: "Contact", to: "/contact" },
  
    { to: "/blog/", label: "Blog" },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <footer data-section-id="c8f97b84-9abf-4b1b-ab3c-df9c7211d7aa"
      ref={ref}
      id="footer"
      className="relative bg-primary text-primary-foreground"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-[image:var(--gradient-gold)]" />

      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand column */}
          <motion.div
            className="lg:col-span-1"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
          >
            {/* Brand name */}
            <div className="mb-4">
              <span className="font-['Playfair_Display',serif] text-xl font-bold text-white leading-tight block">
                American Appraisal Alliance
              </span>
              <p className="text-white/70 text-sm mt-2 leading-relaxed">
                Certified Real Estate Appraisals for the Dallas–Fort Worth Metroplex
              </p>
            </div>

            {/* USPAP Compliance Note */}
            <div className="flex items-start gap-2 bg-white/10 rounded-lg p-3 mb-4">
              <Shield className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/80 leading-relaxed">
                All appraisal services are performed in full compliance with the Uniform Standards of Professional Appraisal Practice (USPAP).
              </p>
            </div>

            {/* License placeholder */}
            <div className="flex items-start gap-2">
              <Award className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/70">
                License #: <span className="text-white/90 font-medium">[LICENSE NUMBER]</span>
              </p>
            </div>
          </motion.div>

          {/* Service Categories column */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <h4 className="font-['Playfair_Display',serif] text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Service Categories
            </h4>
            <ul className="space-y-2.5">
              {serviceCategories.map((cat) => (
                <li key={cat.to}>
                  <Link
                    to={cat.to}
                    className="text-sm text-white/75 hover:text-white transition-colors duration-200 leading-snug block"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links column */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h4 className="font-['Playfair_Display',serif] text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/75 hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Service Area column */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <h4 className="font-['Playfair_Display',serif] text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+14699364240"
                  className="flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors duration-200"
                >
                  <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>(469) 936-4240</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@americanappraisalalliance.com"
                  className="flex items-start gap-2 text-sm text-white/75 hover:text-white transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="break-all">info@americanappraisalalliance.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/75 leading-snug">
                      Serving the Dallas–Fort Worth Metroplex
                    </p>
                    <p className="text-xs text-white/55 mt-1 leading-relaxed">
                      Dallas · Fort Worth · Arlington · Plano · Irving · Garland · Frisco · McKinney · Denton &amp; surrounding DFW communities
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <Separator className="bg-white/15 mb-6" />

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <p>
            &copy; {currentYear} American Appraisal Alliance. All rights reserved.
          </p>
          <p className="text-center md:text-right">
            USPAP Compliant &nbsp;&bull;&nbsp; Licensed &amp; Certified Appraisers &nbsp;&bull;&nbsp; Dallas–Fort Worth, TX
          </p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
