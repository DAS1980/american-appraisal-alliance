import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Lock, Clock, Phone, Mail } from "lucide-react";
import { siteConfig, businessStatements } from "@/config/site";
import {
  HIGHLEVEL_REQUEST_FORM_ID,
  HIGHLEVEL_REQUEST_FORM_NAME,
  HIGHLEVEL_REQUEST_FORM_SRC,
  HIGHLEVEL_REQUEST_FORM_HEIGHT,
  HIGHLEVEL_EMBED_SCRIPT_SRC,
} from "@/config/highlevel";

/**
 * Loads HighLevel's form_embed.js once per page load, no matter how many
 * times this section mounts (StrictMode double-invoke, client-side navigation
 * back to /request/, etc.). The script registers a single global message
 * handler that also initializes iframes mounted after it has loaded, so it
 * never needs to be re-injected.
 */
function useHighLevelEmbedScript(): void {
  useEffect(() => {
    if (document.querySelector(`script[src="${HIGHLEVEL_EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = HIGHLEVEL_EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

const RequestIntakeForm = React.forwardRef<HTMLElement>((props, ref) => {
  useHighLevelEmbedScript();

  return (
    <section data-section-id="9a567bcf-3261-45d7-8f8e-9a51aa36fe53"
      ref={ref}
      id="request-intake-form"
      className="relative py-20 md:py-32 bg-background"
      aria-labelledby="intake-form-heading"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── Left column ── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[hsl(42_88%_48%)] mb-3">
              Request an Appraisal
            </span>

            <h2
              id="intake-form-heading"
              className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold text-[hsl(218_60%_20%)] leading-tight mb-4"
            >
              Submit Your Appraisal Inquiry
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Tell us a little about the property and how we can help. This short form starts the
              conversation — we will follow up to discuss the assignment details, scope, fee, and
              scheduling with you directly.
            </p>

            {/* Response & scheduling panel */}
            <div className="bg-[hsl(218_60%_20%)] rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <Lock className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm font-medium leading-snug">
                  All inquiries are confidential. {businessStatements.response}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm leading-snug">
                  {businessStatements.scheduling}
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 text-[hsl(218_60%_20%)] hover:text-[hsl(42_88%_48%)] transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(218_60%_20%)]/10 group-hover:bg-[hsl(42_88%_48%)]/15 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.ordersEmail}`}
                className="flex items-center gap-3 text-[hsl(218_60%_20%)] hover:text-[hsl(42_88%_48%)] transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(218_60%_20%)]/10 group-hover:bg-[hsl(42_88%_48%)]/15 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium break-all">{siteConfig.ordersEmail}</span>
              </a>
            </div>

            {/* Service area confirmation */}
            <div className="border border-border rounded-lg p-4 mb-6">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                Service Area
              </p>
              <p className="text-sm text-foreground font-medium mb-1">
                Dallas–Fort Worth Metropolitan Area
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Frisco, McKinney,
                Denton, Mansfield, Grand Prairie, Lewisville, Allen, Carrollton, Richardson,
                and surrounding DFW communities.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="space-y-2">
              {[
                "USPAP-compliant reports",
                businessStatements.license,
                businessStatements.experienceShort,
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column — HighLevel-hosted form ── */}
          <motion.div
            className="lg:col-span-3 min-w-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-[0_8px_40px_hsl(218_65%_14%/0.12)] border border-border/60 p-3 sm:p-6 md:p-8">
              {/* HighLevel owns fields, validation, SMS consent language, legal
                  links, confirmation message, and notifications. Attributes
                  below are HighLevel's supplied inline embed, unchanged. */}
              <iframe
                src={HIGHLEVEL_REQUEST_FORM_SRC}
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
                id={`inline-${HIGHLEVEL_REQUEST_FORM_ID}`}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={HIGHLEVEL_REQUEST_FORM_NAME}
                data-height={String(HIGHLEVEL_REQUEST_FORM_HEIGHT)}
                data-layout-iframe-id={`inline-${HIGHLEVEL_REQUEST_FORM_ID}`}
                data-form-id={HIGHLEVEL_REQUEST_FORM_ID}
                data-cookie-consent="true"
                data-cookie-consent-provider="auto"
                title={HIGHLEVEL_REQUEST_FORM_NAME}
              />
            </div>

            {/* Engagement disclaimer */}
            <p className="mt-5 text-xs text-muted-foreground text-center leading-relaxed">
              Submitting an inquiry does not constitute acceptance of an appraisal assignment or
              establish an appraisal engagement. We will contact you to confirm scope, fee, and
              scheduling. See our{" "}
              <Link to="/privacy-policy/" className="underline hover:text-foreground transition-colors">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms-of-service/" className="underline hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              .
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

RequestIntakeForm.displayName = "RequestIntakeForm";

export default RequestIntakeForm;
