import React from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const RequestServiceArea = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="e3ba9b6c-83fe-499c-8a8c-4c61b74b6862"
      ref={ref}
      id="request-service-area"
      className="relative py-20 md:py-32 bg-background"
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Tagline badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{
              background: "hsl(var(--accent) / 0.12)",
              color: "hsl(var(--accent))",
              border: "1px solid hsl(var(--accent) / 0.3)",
            }}
          >
            <MapPin className="h-3.5 w-3.5" />
            Full DFW Metroplex Coverage
          </span>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Serving the Dallas–Fort Worth Metroplex
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            American Appraisal Alliance provides USPAP-compliant residential and
            specialized appraisal services throughout the entire DFW metroplex.
            If your property is located in Dallas–Fort Worth or the surrounding
            communities, we are ready to serve you.
          </p>
        </motion.div>

        {/* Main content: map visual + city badges */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: map illustration using a pool image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
            style={{ boxShadow: "0 8px 40px hsl(218 65% 14% / 0.18)" }}
          >
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
              alt="Dallas–Fort Worth skyline representing the DFW metroplex service area"
              width="800"
              height="600"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ minHeight: "320px" }}
            />
            {/* Navy overlay */}
            <div className="absolute inset-0 bg-black/45 pointer-events-none" />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
              <div
                className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest w-fit"
                style={{
                  background: "hsl(var(--accent))",
                  color: "hsl(218 65% 14%)",
                }}
              >
                <MapPin className="h-3.5 w-3.5" />
                DFW Service Area
              </div>
              <p className="text-white text-lg font-semibold leading-snug">
                Dallas–Fort Worth
                <br />
                <span className="text-white/80 text-sm font-normal">
                  & Surrounding Communities
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right: city badge grid + trust items */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Communities We Serve
            </p>

            {/* City badges — exactly 15 cities */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {cities.map((city) => (
                <motion.div
                  key={city}
                  variants={{
                    hidden: { opacity: 0, scale: 0.88 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium cursor-default select-none"
                    style={{
                      background: "hsl(218 65% 14% / 0.06)",
                      color: "hsl(218 65% 14%)",
                      border: "1px solid hsl(218 65% 14% / 0.18)",
                    }}
                  >
                    <MapPin className="h-3 w-3 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    {city}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust items */}
            <ul className="space-y-3 mb-8">
              {[
                "USPAP-compliant appraisals across the entire DFW metroplex",
                "Licensed and certified appraisers with deep local market knowledge",
                "Serving residential and specialized appraisal needs throughout North Texas",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "hsl(var(--accent))" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* "Not sure?" note */}
            <div
              className="rounded-xl px-5 py-4 mb-6"
              style={{
                background: "hsl(42 88% 48% / 0.08)",
                border: "1px solid hsl(42 88% 48% / 0.25)",
              }}
            >
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold" style={{ color: "hsl(218 65% 14%)" }}>
                  Not sure if your area is covered?
                </span>{" "}
                Contact us — we serve the full DFW metro and surrounding
                communities.
              </p>
              <a
                href="tel:+12145550100"
                className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold hover:underline"
                style={{ color: "hsl(var(--accent))" }}
              >
                <Phone className="h-3.5 w-3.5" />
                (214) 555-0100
              </a>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="font-semibold text-sm px-8"
              style={{
                background: "hsl(var(--accent))",
                color: "hsl(218 65% 14%)",
              }}
            >
              <Link to="/request">Request an Appraisal</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

RequestServiceArea.displayName = "RequestServiceArea";

export default RequestServiceArea;
