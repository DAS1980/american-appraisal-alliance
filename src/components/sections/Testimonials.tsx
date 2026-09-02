import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Section } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Sandra Whitfield",
    role: "Homeowner — Plano, TX",
    quote:
      "American Appraisal Alliance provided an accurate, USPAP-compliant appraisal that was accepted by our lender without question. The turnaround was faster than expected, and the report was thoroughly documented. I couldn't have asked for a more professional experience.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1681500920181-0aff411f8cab?w=400&h=400&fit=crop&crop=face",
    context: "Pre-Purchase Appraisal",
  },
  {
    id: 2,
    name: "James R. Caldwell",
    role: "Real Estate Attorney — Dallas, TX",
    quote:
      "I've relied on American Appraisal Alliance for court-accepted valuations in several divorce and estate cases. Their reports are meticulous, defensible, and consistently hold up under legal scrutiny. For any attorney in the DFW area needing a credible, unbiased appraisal, this is the firm to call.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1605857840732-188f2f08cb31?w=400&h=400&fit=crop&crop=face",
    context: "Estate & Divorce Appraisals",
  },
  {
    id: 3,
    name: "Michelle Torres",
    role: "Mortgage Lender — Fort Worth, TX",
    quote:
      "As a lender, accuracy and compliance are non-negotiable. American Appraisal Alliance delivers lender-approved, USPAP-compliant reports every time — on schedule and with the detail our underwriting team requires. Their deep knowledge of the DFW market is evident in every report.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1645107914072-6f16b732f224?w=400&h=400&fit=crop&crop=face",
    context: "Residential & Market Value Appraisals",
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <Star
        key={i}
        className="h-4 w-4 fill-[hsl(42_88%_48%)] text-[hsl(42_88%_48%)]"
      />
    ))}
  </div>
);

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

const Testimonials = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section data-section-id="081a79b2-e733-4a94-8594-25f6cfcdc8d7"
      ref={ref}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-20 md:py-32 bg-muted/30 overflow-x-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[hsl(42_88%_48%/0.05)] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[hsl(218_60%_20%/0.06)] blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[hsl(42_88%_48%)] mb-3">
            Client Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trusted by DFW Homeowners, Attorneys &amp; Lenders
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Our USPAP-compliant appraisals are relied upon by clients across the
            Dallas–Fort Worth metroplex — from homeowners to legal professionals
            and mortgage lenders.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="h-full border border-border shadow-md hover:shadow-lg transition-shadow duration-300 bg-background flex flex-col">
                <CardContent className="flex flex-col h-full p-7">
                  {/* Quote icon + star rating */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(218_60%_20%)] flex-shrink-0">
                      <Quote className="h-4 w-4 text-[hsl(42_88%_48%)]" />
                    </div>
                    <StarRating count={testimonial.rating} />
                  </div>

                  {/* Quote text */}
                  <blockquote className="flex-1 mb-6">
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Divider */}
                  <div className="border-t border-border mb-5" />

                  {/* Author */}
                  <footer className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 flex-shrink-0 ring-2 ring-[hsl(42_88%_48%/0.3)]">
                      <AvatarImage
                        src={testimonial.image}
                        alt={`Portrait of ${testimonial.name}`}
                        loading="lazy"
                      />
                      <AvatarFallback className="bg-[hsl(218_60%_20%)] text-white text-sm font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.role}
                      </p>
                      <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-medium text-[hsl(42_88%_48%)] bg-[hsl(42_88%_48%/0.1)] px-2 py-0.5 rounded-full">
                        {testimonial.context}
                      </span>
                    </div>
                  </footer>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-center text-xs text-muted-foreground mt-10"
        >
          All appraisals performed by licensed, certified appraisers in
          accordance with USPAP standards — serving Dallas, Fort Worth,
          Arlington, Plano, Frisco, McKinney, Denton, and the entire DFW
          metroplex.
        </motion.p>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;
