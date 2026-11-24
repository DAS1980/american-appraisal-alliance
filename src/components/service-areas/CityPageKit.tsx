/**
 * Shared presentational building blocks for geographic service-area pages
 * (11/24/2026). Only layout, branding and conversion elements are shared —
 * every city page supplies its own headings, section order and copy, per the
 * DAS Geographic Content Originality Standard.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, ChevronRight, ExternalLink } from "lucide-react";
import { siteConfig, businessStatements } from "@/config/site";

/** Direct-to-form destination for every geographic CTA. */
export const REQUEST_FORM_HREF = "/request/#appraisal-form";

const NAVY = "hsl(218 65% 14%)";
const HEADING = "text-[hsl(218_60%_20%)]";
const serif: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };

export interface Crumb {
  label: string;
  to?: string;
}

/* ───────────────────────── CTA buttons ───────────────────────── */

export function CityCtaButtons({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const secondary =
    tone === "dark"
      ? "border-white/40 text-white hover:bg-white/10"
      : "border-[hsl(218_60%_20%)]/30 text-[hsl(218_60%_20%)] hover:bg-[hsl(218_60%_20%)]/5";
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
      <Link
        to={REQUEST_FORM_HREF}
        className="inline-flex min-h-[48px] items-center justify-center rounded-lg px-7 py-3 text-base font-semibold shadow-lg transition-opacity hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, hsl(42 92% 52%) 0%, hsl(36 88% 44%) 100%)",
          color: NAVY,
        }}
      >
        Request an Appraisal
      </Link>
      <a
        href={siteConfig.phoneHref}
        className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border px-6 py-3 text-base font-medium transition-colors ${secondary}`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call Us {siteConfig.phone}
      </a>
      <a
        href={`mailto:${siteConfig.ordersEmail}`}
        className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border px-6 py-3 text-base font-medium transition-colors ${secondary}`}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Email Us
      </a>
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

export function CityHero({
  id,
  crumbs,
  eyebrow,
  title,
  children,
}: {
  id: string;
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, hsl(218 55% 22%) 60%, hsl(220 45% 28%) 100%)` }}
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, hsl(42 88% 48%) 0%, transparent 45%), radial-gradient(circle at 10% 90%, hsl(42 88% 48%) 0%, transparent 40%)",
        }}
      />
      <div className="container max-w-6xl mx-auto px-4">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-white/70">
            {crumbs.map((c, i) => (
              <li key={c.label} className="inline-flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3 text-white/40" aria-hidden="true" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-white underline-offset-2 hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/90">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          <span className="inline-block mb-4 rounded-full border border-amber-400/60 bg-amber-400/10 px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-widest text-amber-300">
            {eyebrow}
          </span>
          <h1
            id={`${id}-title`}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5"
            style={serif}
          >
            {title}
          </h1>
          <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed">{children}</div>
          <div className="mt-8">
            <CityCtaButtons tone="dark" />
          </div>
          <p className="mt-4 text-sm text-white/70">
            {businessStatements.licenseTitle} · {businessStatements.experience}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Content section ───────────────────────── */

export function CitySection({
  id,
  heading,
  tone = "white",
  children,
}: {
  id: string;
  heading: string;
  tone?: "white" | "muted";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`py-12 md:py-16 ${tone === "muted" ? "bg-[hsl(218_30%_97%)]" : "bg-white"}`}
    >
      <div className="container max-w-4xl mx-auto px-4">
        <h2
          id={`${id}-heading`}
          className={`text-2xl md:text-3xl font-bold leading-tight mb-5 ${HEADING}`}
          style={serif}
        >
          {heading}
        </h2>
        <div className="space-y-4 text-base md:text-[17px] leading-relaxed text-slate-700 [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-[hsl(218_60%_20%)] [&_a]:text-[hsl(218_70%_35%)] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[hsl(218_70%_25%)] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2">
          {children}
        </div>
      </div>
    </section>
  );
}

/** Simple responsive two-column definition table (stacks on mobile). */
export function FactTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: [string, string];
  rows: [string, React.ReactNode][];
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm md:text-base">
        <caption className="sr-only">{caption}</caption>
        <thead className="hidden sm:table-header-group bg-[hsl(218_30%_95%)] text-[hsl(218_60%_20%)]">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold w-1/3">{head[0]}</th>
            <th scope="col" className="px-4 py-3 font-semibold">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="block sm:table-row border-t border-slate-200 first:border-t-0 sm:first:border-t">
              <th scope="row" className="block sm:table-cell px-4 pt-3 sm:py-3 font-semibold text-[hsl(218_60%_20%)] align-top">
                {k}
              </th>
              <td className="block sm:table-cell px-4 pb-3 pt-1 sm:py-3 text-slate-700 align-top">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

export interface Faq {
  q: string;
  a: string;
}

/** Visible FAQ. The same q/a strings feed the page's FAQPage JSON-LD in the manifest. */
export function CityFaq({ id, heading, faqs }: { id: string; heading: string; faqs: Faq[] }) {
  return (
    <CitySection id={id} heading={heading} tone="muted">
      <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {faqs.map((f) => (
          <div key={f.q} className="px-5 py-5">
            <h3 className="!mt-0 !mb-2">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </CitySection>
  );
}

/* ───────────────────────── Closing CTA ───────────────────────── */

export function CityClosingCta({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="py-14 md:py-20"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, hsl(218 55% 22%) 55%, hsl(220 45% 28%) 100%)` }}
    >
      <div className="container max-w-4xl mx-auto px-4">
        <h2 id={`${id}-heading`} className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4" style={serif}>
          {heading}
        </h2>
        <div className="space-y-3 text-base md:text-lg text-white/85 leading-relaxed mb-8">{children}</div>
        <CityCtaButtons tone="dark" />
        <p className="mt-6 text-xs md:text-sm text-white/60 leading-relaxed">
          All inquiries are confidential. {businessStatements.response} Submitting an inquiry does not
          constitute acceptance of an appraisal assignment; scope, fee and scheduling are confirmed before any
          engagement. {businessStatements.scheduling}
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── Related links & sources ───────────────────────── */

export function RelatedLinks({ id, heading, links }: { id: string; heading: string; links: { to: string; label: string; note: string }[] }) {
  return (
    <CitySection id={id} heading={heading}>
      <ul className="!list-none !pl-0 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.to} className="rounded-lg border border-slate-200 p-4 hover:border-[hsl(42_88%_48%)] transition-colors">
            <Link to={l.to} className="font-semibold !no-underline">
              {l.label}
            </Link>
            <p className="mt-1 text-sm text-slate-600">{l.note}</p>
          </li>
        ))}
      </ul>
    </CitySection>
  );
}

export function SourceList({ checked, sources }: { checked: string; sources: { label: string; href: string }[] }) {
  return (
    <section aria-label="Public sources" className="bg-white border-t border-slate-200 py-8">
      <div className="container max-w-4xl mx-auto px-4 text-xs md:text-sm text-slate-500">
        <p className="font-semibold text-slate-600 mb-2">Public sources referenced on this page (checked {checked})</p>
        <ul className="space-y-1">
          {sources.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 hover:text-slate-700 underline underline-offset-2 break-words">
                {s.label}
                <ExternalLink className="h-3 w-3 mt-1 flex-shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Municipal plans, programs and maps change. Facts on this page describe what the cited sources
          published when checked and are not a substitute for property-specific verification. American
          Appraisal Alliance is a service-area business and does not maintain a public office in this city.
        </p>
      </div>
    </section>
  );
}
