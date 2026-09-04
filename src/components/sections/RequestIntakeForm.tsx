import React, { useState } from "react";
import { SITE_BASE_URL } from "@/pages/Request";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Lock, Clock, Phone, Mail } from "lucide-react";
const FORM_UUID = "cee74ed9-d450-46a9-b979-a5667e25a64a"; // Auto-injected — backend registration
const FORM_ACTION = `${import.meta.env.VITE_FORM_SUBMIT_URL || ''}/api/forms/${FORM_UUID}/submit/`;


const appraisalTypeOptions = [
  "Residential Appraisal (Full URAR)",
  "Desktop Appraisal",
  "Exterior-Only (Drive-By) Appraisal",
  "Pre-Listing Appraisal",
  "Pre-Purchase Appraisal",
  "Divorce Appraisal",
  "Estate / Date of Death Appraisal",
  "PMI Removal Appraisal",
  "Tax Assessment Appeal Appraisal",
  "Market Value Update (1004D / Recertification)",
  "FHA/HUD Compliance Observation Report",
  "Property Measurement (ANSI Z765)",
  "Gross Living Area (GLA) Certification",
  "Floor Plan Sketch",
  "Square Footage Dispute Resolution",
];

const preferredTimelineOptions = [
  "As soon as possible",
  "Within 3 to 5 business days",
  "Within 1 to 2 weeks",
  "Within 3 to 4 weeks",
  "Flexible / No rush",
];

const intendedUseOptions = [
  "Mortgage / Refinance",
  "Home Purchase",
  "Pre-Listing / Home Sale",
  "Estate / Probate Settlement",
  "Divorce / Legal Proceedings",
  "Tax Assessment Appeal",
  "PMI Removal",
  "FHA Loan Compliance",
  "Property Measurement / GLA Verification",
  "Insurance Purposes",
  "Personal Knowledge",
  "Other",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const RequestIntakeForm = React.forwardRef<HTMLElement>((props, ref) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [appraisalType, setAppraisalType] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [preferredTimeline, setPreferredTimeline] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setFieldErrors({});

    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries()) as Record<string, string>;
    const { honeypot, ...data } = rawData;

    data["appraisalType"] = appraisalType;
    data["intendedUse"] = intendedUse;
    data["preferredTimeline"] = preferredTimeline;

    try {
        const response = await fetch(FORM_ACTION, {
          method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, honeypot }),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setAppraisalType("");
        setIntendedUse("");
        setPreferredTimeline("");
      } else if (response.status === 400) {
        const body = await response.json();
        if (body?.data && typeof body.data === "object") {
          setFieldErrors(body.data);
        }
        setStatus("error");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section data-section-id="9a567bcf-3261-45d7-8f8e-9a51aa36fe53"
      ref={ref}
      id="request-intake-form"
      className="relative overflow-x-hidden py-20 md:py-32 bg-background"
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
              Submit Your Appraisal Request
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Complete the form to request a USPAP-compliant appraisal from American Appraisal Alliance.
              We serve the entire Dallas–Fort Worth Metroplex and respond promptly to every inquiry.
            </p>

            {/* Confidentiality panel */}
            <div className="bg-[hsl(218_60%_20%)] rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <Lock className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                <p className="text-white text-sm font-medium leading-snug">
                  All inquiries are confidential. We respond within 1 business day.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[hsl(42_88%_48%)] flex-shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm leading-snug">
                  Appraisal assignments are typically scheduled within 2–3 business days of your request.
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a
                href="tel:+12145550192"
                className="flex items-center gap-3 text-[hsl(218_60%_20%)] hover:text-[hsl(42_88%_48%)] transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(218_60%_20%)]/10 group-hover:bg-[hsl(42_88%_48%)]/15 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">(214) 555-0192</span>
              </a>
              <a
                href="mailto:info@americanappraisalalliance.com"
                className="flex items-center gap-3 text-[hsl(218_60%_20%)] hover:text-[hsl(42_88%_48%)] transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(218_60%_20%)]/10 group-hover:bg-[hsl(42_88%_48%)]/15 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">info@americanappraisalalliance.com</span>
              </a>
            </div>

            {/* Service area confirmation */}
            <div className="border border-border rounded-lg p-4 mb-6">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                Service Area
              </p>
              <p className="text-sm text-foreground font-medium mb-1">
                Dallas–Fort Worth Metroplex
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
                "Licensed and certified appraisers",
                "Court-accepted and lender-approved",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[hsl(42_88%_48%)] flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column — form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {status === "success" ? (
              <div className="bg-[hsl(218_60%_20%)] rounded-xl p-10 text-center">
                <CheckCircle className="h-14 w-14 text-[hsl(42_88%_48%)] mx-auto mb-4" />
                <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-white mb-3">
                  Request Submitted
                </h3>
                <p className="text-white/80 mb-2">
                  Thank you for contacting American Appraisal Alliance.
                </p>
                <p className="text-white/70 text-sm">
                  All inquiries are confidential. We respond within 1 business day.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-[0_8px_40px_hsl(218_65%_14%/0.12)] border border-border/60 p-8 md:p-10">
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] opacity-0 h-0 w-0"
                  />

                  <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div variants={itemVariants} className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-[hsl(218_60%_20%)]"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Jane Smith"
                          required
                          className={fieldErrors.name ? "border-red-500" : ""}
                        />
                        {fieldErrors.name && (
                          <p className="text-red-500 text-xs">{fieldErrors.name}</p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-[hsl(218_60%_20%)]"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jane@example.com"
                          required
                          className={fieldErrors.email ? "border-red-500" : ""}
                        />
                        {fieldErrors.email && (
                          <p className="text-red-500 text-xs">{fieldErrors.email}</p>
                        )}
                      </motion.div>
                    </div>

                    {/* Phone */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-[hsl(218_60%_20%)]"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(214) 555-0100"
                        required
                        className={fieldErrors.phone ? "border-red-500" : ""}
                      />
                      {fieldErrors.phone && (
                        <p className="text-red-500 text-xs">{fieldErrors.phone}</p>
                      )}
                    </motion.div>

                    {/* Property Address + City */}
                    <div className="grid sm:grid-cols-5 gap-4">
                      <motion.div variants={itemVariants} className="sm:col-span-3 space-y-1.5">
                        <Label
                          htmlFor="propertyAddress"
                          className="text-sm font-medium text-[hsl(218_60%_20%)]"
                        >
                          Property Address
                        </Label>
                        <Input
                          id="propertyAddress"
                          name="propertyAddress"
                          type="text"
                          placeholder="1234 Main Street"
                          required
                          className={fieldErrors.propertyAddress ? "border-red-500" : ""}
                        />
                        {fieldErrors.propertyAddress && (
                          <p className="text-red-500 text-xs">{fieldErrors.propertyAddress}</p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants} className="sm:col-span-2 space-y-1.5">
                        <Label
                          htmlFor="city"
                          className="text-sm font-medium text-[hsl(218_60%_20%)]"
                        >
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="Dallas"
                          required
                          className={fieldErrors.city ? "border-red-500" : ""}
                        />
                        {fieldErrors.city && (
                          <p className="text-red-500 text-xs">{fieldErrors.city}</p>
                        )}
                      </motion.div>
                    </div>

                    {/* Appraisal Type dropdown — all 15 services */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <Label
                        htmlFor="appraisalType"
                        className="text-sm font-medium text-[hsl(218_60%_20%)]"
                      >
                        Appraisal Type
                      </Label>
                      <Select
                        value={appraisalType}
                        onValueChange={setAppraisalType}
                      >
                        <SelectTrigger id="appraisalType" className="text-left">
                          <SelectValue placeholder="Select an appraisal service…" />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {appraisalTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        All 15 services listed — residential, valuation updates, and measurement appraisals.
                      </p>
                    </motion.div>

                    {/* Intended Use */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <Label
                        htmlFor="intendedUse"
                        className="text-sm font-medium text-[hsl(218_60%_20%)]"
                      >
                        Intended Use
                      </Label>
                      <Select
                        value={intendedUse}
                        onValueChange={setIntendedUse}
                      >
                        <SelectTrigger id="intendedUse" className="text-left">
                          <SelectValue placeholder="Select intended use…" />
                        </SelectTrigger>
                        <SelectContent>
                          {intendedUseOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Preferred Timeline */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <Label
                        htmlFor="preferredTimeline"
                        className="text-sm font-medium text-[hsl(218_60%_20%)]"
                      >
                        Preferred Timeline
                      </Label>
                      <Select
                        value={preferredTimeline}
                        onValueChange={setPreferredTimeline}
                      >
                        <SelectTrigger id="preferredTimeline" className="text-left">
                          <SelectValue placeholder="Select your preferred timeline…" />
                        </SelectTrigger>
                        <SelectContent>
                          {preferredTimelineOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Additional Notes */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <Label
                        htmlFor="additionalNotes"
                        className="text-sm font-medium text-[hsl(218_60%_20%)]"
                      >
                        Additional Notes
                      </Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        placeholder="Please share any relevant details about the property, assignment conditions, legal proceedings, or specific requirements…"
                        className="min-h-[110px] resize-y"
                      />
                      <p className="text-xs text-muted-foreground">
                        Optional — include any special conditions, deadlines, or legal context relevant to the assignment.
                      </p>
                    </motion.div>

                    {/* Confidentiality note */}
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-2.5 bg-[hsl(218_60%_20%)]/6 rounded-lg px-4 py-3"
                    >
                      <Lock className="h-4 w-4 text-[hsl(42_88%_48%)] flex-shrink-0" />
                      <p className="text-sm text-[hsl(218_60%_20%)] font-medium">
                        All inquiries are confidential. We respond within 1 business day.
                      </p>
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full h-12 text-base font-semibold bg-[hsl(42_88%_48%)] hover:bg-[hsl(42_88%_42%)] text-[hsl(218_65%_14%)] border-0 shadow-[0_4px_20px_-4px_hsl(42_88%_48%/0.45)] transition-all duration-200"
                        size="lg"
                      >
                        {status === "loading" ? "Submitting Request…" : "Submit Appraisal Request"}
                      </Button>
                    </motion.div>

                    {/* General error */}
                    {status === "error" && !Object.keys(fieldErrors).length && (
                      <motion.p variants={itemVariants} className="text-red-600 text-sm text-center">
                        There was an error submitting your request. Please try again or call us at (214) 555-0192.
                      </motion.p>
                    )}

                    {/* Field errors summary */}
                    {Object.keys(fieldErrors).length > 0 && (
                      <motion.p variants={itemVariants} className="text-red-600 text-sm text-center">
                        Please correct the highlighted fields and resubmit.
                      </motion.p>
                    )}

                    {/* Legal disclaimer */}
                    <motion.p variants={itemVariants} className="text-xs text-muted-foreground text-center leading-relaxed">
                      American Appraisal Alliance provides USPAP-compliant appraisals throughout the Dallas–Fort Worth Metroplex.{" "}
                      <a
                        href={SITE_BASE_URL}
                        className="underline hover:text-foreground transition-colors"
                      >
                        americanappraisalalliance.com
                      </a>
                      {" "}— Submission of this form does not constitute an engagement agreement.
                      An appraiser will contact you to confirm scope, fees, and timeline.
                    </motion.p>

                  </motion.div>
                </form>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
});

RequestIntakeForm.displayName = "RequestIntakeForm";

export default RequestIntakeForm;
