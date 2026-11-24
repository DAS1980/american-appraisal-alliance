import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Award, Clock, MapPin, Lock, Phone, Mail } from "lucide-react";
import { siteConfig, businessStatements } from "@/config/site";
import {
  HIGHLEVEL_REQUEST_FORM_ID,
  HIGHLEVEL_REQUEST_FORM_NAME,
  HIGHLEVEL_REQUEST_FORM_SRC,
  HIGHLEVEL_REQUEST_FORM_HEIGHT,
  HIGHLEVEL_EMBED_SCRIPT_SRC,
} from "@/config/highlevel";

/** Stable direct-to-form anchor: /request/#appraisal-form */
export const APPRAISAL_FORM_ANCHOR = "appraisal-form";

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

/**
 * The page renders client-side, so on a direct visit to /request/#appraisal-form
 * the browser's own hash jump can happen before the form exists. Re-apply it
 * once mounted (scroll-margin on the target keeps it clear of the sticky header).
 */
function useScrollToFormAnchor(): void {
  useEffect(() => {
    if (window.location.hash !== `#${APPRAISAL_FORM_ANCHOR}`) return;
    const id = window.requestAnimationFrame(() => {
      document.getElementById(APPRAISAL_FORM_ANCHOR)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(id);
  }, []);
}

const trustItems = [
  { icon: Shield, label: "USPAP-compliant reports" },
  { icon: Award, label: businessStatements.licenseTitle },
  { icon: Clock, label: businessStatements.experience },
  { icon: MapPin, label: "Dallas–Fort Worth Metroplex coverage" },
];

/**
 * Request page conversion section (11/24/2026): page hero + HighLevel inquiry
 * form combined so the form is visible on arrival. Desktop: intro left, form
 * card right, tops aligned. Mobile/tablet: compact intro, then form, then the
 * trust details.
 */
const RequestIntakeForm = React.forwardRef<HTMLElement>((props, ref) => {
  useHighLevelEmbedScript();
  useScrollToFormAnchor();

  return (
    <section data-section-id="9a567bcf-3261-45d7-8f8e-9a51aa36fe53"
      ref={ref}
      id="request-intake-form"
      aria-label="Request an Appraisal"
      className="relative isolate overflow-hidden bg-[hsl(218_65%_14%)] pt-8 pb-14 md:pt-12 md:pb-20"
    >
      {/* Background image with dark navy overlay (kept from the previous hero) */}
      <img
        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        className="absolute inset-x-0 top-0 -z-10 h-[720px] w-full object-cover"
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[720px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(218 65% 14% / 0.78) 0%, hsl(218 65% 14% / 0.88) 55%, hsl(218 65% 14%) 100%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-5 lg:grid-rows-[auto_1fr] lg:gap-x-12 items-start">

          {/* ── Intro (top-left on desktop; first on mobile) ── */}
          <div className="lg:col-span-2 lg:row-start-1 min-w-0">
            <span className="inline-block mb-3 md:mb-4 rounded-full border border-amber-400/60 bg-amber-400/10 px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-widest text-amber-300">
              American Appraisal Alliance
            </span>

            <h1
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3 md:mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Request an Appraisal
            </h1>

            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-3 md:mb-4">
              {businessStatements.professionalServices} Send a short inquiry and we&apos;ll
              follow up to discuss your assignment, scope, fee, and scheduling.
            </p>

            <p className="flex items-start gap-2 text-sm md:text-base text-amber-300 font-medium mb-4 md:mb-6">
              <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>All inquiries are confidential. {businessStatements.response}</span>
            </p>

            {/* Contact links — compact row on mobile, stacked on desktop */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 lg:flex-col lg:gap-y-2">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-[44px] items-center gap-2 text-white font-semibold hover:text-amber-300 transition-colors"
              >
                <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.ordersEmail}`}
                className="inline-flex min-h-[44px] items-center gap-2 text-white font-semibold hover:text-amber-300 transition-colors break-all"
              >
                <Mail className="h-4 w-4 text-amber-400 flex-shrink-0" aria-hidden="true" />
                {siteConfig.ordersEmail}
              </a>
            </div>
          </div>

          {/* ── Form card (right column spanning both rows; second on mobile) ── */}
          <div className="lg:col-span-3 lg:col-start-3 lg:row-start-1 lg:row-span-2 min-w-0">
            <div
              id={APPRAISAL_FORM_ANCHOR}
              className="scroll-mt-20 md:scroll-mt-24 bg-white rounded-xl shadow-[0_12px_48px_hsl(218_65%_8%/0.35)] p-3 sm:p-5 md:p-6"
            >
              <h2
                id="intake-form-heading"
                className="px-2 pt-2 sm:px-0 sm:pt-0 mb-2 md:mb-3 text-xl md:text-2xl font-bold text-[hsl(218_60%_20%)] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Submit Your Appraisal Inquiry
              </h2>
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
            <p className="mt-4 text-xs text-white/70 text-center leading-relaxed">
              Submitting an inquiry does not constitute acceptance of an appraisal assignment or
              establish an appraisal engagement. We will contact you to confirm scope, fee, and
              scheduling. See our{" "}
              <Link to="/privacy-policy/" className="underline text-white/90 hover:text-white transition-colors">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms-of-service/" className="underline text-white/90 hover:text-white transition-colors">
                Terms of Service
              </Link>
              .
            </p>
          </div>

          {/* ── Trust details (below intro on desktop; after the form on mobile) ── */}
          <div className="lg:col-span-2 lg:row-start-2 min-w-0">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 border-t border-white/15 pt-5 lg:pt-6">
              {trustItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-sm text-white/85">
                  <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-400" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              {businessStatements.scheduling}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
});

RequestIntakeForm.displayName = "RequestIntakeForm";

export default RequestIntakeForm;
