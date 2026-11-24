import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

/**
 * Privacy Policy — created 11/24/2026 alongside the HighLevel appraisal
 * request form ("AAA Appraisal Request Form 11242026"), which links here.
 *
 * Owner-reviewed revisions applied 11/24/2026 (legal entity, service
 * providers, USPAP confidentiality, qualified analytics language). Reflects
 * the site's actual practices: HighLevel-hosted inquiry form, Google Tag
 * Manager / Google Analytics, the Search Atlas website visitor tracker, and
 * Cloudflare hosting. No physical address is published (service-area
 * business). Legal provisions have not been reviewed by counsel.
 */

const EFFECTIVE_DATE = "November 24, 2026";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2
      className="text-2xl font-bold text-[hsl(218_60%_20%)]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {title}
    </h2>
    <div className="space-y-3 text-muted-foreground text-base leading-relaxed">{children}</div>
  </section>
);

const linkClass = "text-[hsl(218_60%_20%)] font-medium underline hover:no-underline";

const PrivacyPolicy: React.FC = () => {
  return (
    <PageLayout currentPage="privacy-policy">
      <Header />

      <section className="relative py-16 md:py-20 overflow-hidden bg-[hsl(218_60%_20%)]">
        <div className="container relative z-10 max-w-3xl mx-auto text-center px-4">
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-white/80 text-base">Effective Date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl mx-auto px-4 space-y-12">
          <p className="text-muted-foreground text-base leading-relaxed">
            {siteConfig.legalName}, doing business as American Appraisal Alliance ("American
            Appraisal Alliance," "we," "us," or "our"), provides real estate appraisal services in
            the {siteConfig.serviceArea}. This Privacy
            Policy explains how we collect, use, share, and protect information when you visit{" "}
            {siteConfig.domain}, submit an appraisal inquiry, contact us, or communicate with us by
            phone, email, or text message (SMS).
          </p>

          <Section title="Information We Collect">
            <p>
              <strong className="text-foreground">Information you provide.</strong> When you submit
              an inquiry through our website, email us, or call us, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your first and last name</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>The address or description of the property to be appraised</li>
              <li>Information you share about how we can help, such as the purpose of the appraisal</li>
              <li>Your choices regarding informational and marketing text messages</li>
            </ul>
            <p>
              <strong className="text-foreground">Information collected automatically.</strong>{" "}
              When you visit our website, our analytics tools and service providers may
              automatically collect information such as your browser and device type, pages viewed,
              links clicked, the referring website, and approximate location derived from your IP
              address. See "Cookies and Analytics" below.
            </p>
            <p>
              Our website and services are intended for adults and are not directed to children
              under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section title="How We Use Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to your appraisal inquiries and questions</li>
              <li>
                Communicate with you about appraisal requests, scope, fees, appointment
                scheduling, and assignment updates
              </li>
              <li>Provide customer support</li>
              <li>
                Send text messages you have consented to receive, as described in "SMS
                Communications" below
              </li>
              <li>Maintain records of our communications and professional services</li>
              <li>Understand how visitors use our website and improve it</li>
              <li>Comply with legal, regulatory, and professional obligations</li>
            </ul>
          </Section>

          <Section title="How We Share Information">
            <p>
              We share information with service providers that help us operate our business and
              website, only as needed for them to perform those services for us. Depending on the
              service involved, these may include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-foreground">HighLevel (GoHighLevel)</strong>, our customer
                relationship management (CRM) platform, which hosts our website inquiry form and
                stores contact and inquiry information
              </li>
              <li>Email, telephone, and text messaging (SMS) service providers</li>
              <li>Website hosting and infrastructure providers</li>
              <li>
                Analytics providers, including Google (Google Tag Manager and Google Analytics) and
                Search Atlas
              </li>
              <li>Appraisal management and appraisal ordering platforms</li>
              <li>Payment processors</li>
              <li>Accounting and bookkeeping service providers</li>
            </ul>
            <p>
              Sharing with service providers is always subject to the professional confidentiality
              obligations described in "Confidential Appraisal Information" below.
            </p>
            <p>
              We may also disclose information when required by law, subpoena, or court order, or
              when we believe disclosure is necessary to protect our rights or the safety of others.
            </p>
            <p>We do not sell your personal information.</p>
            <p>
              <strong className="text-foreground">
                No mobile information will be shared with third parties or affiliates for marketing
                or promotional purposes. Text messaging originator opt-in data and consent will not
                be shared with any third parties.
              </strong>{" "}
              This does not prevent us from using service providers, such as our messaging
              platform, solely to deliver messages on our behalf.
            </p>
          </Section>

          <Section title="Confidential Appraisal Information">
            <p>
              Confidential information you provide in connection with an appraisal assignment, and
              the results of that assignment, are handled in accordance with the confidentiality
              requirements of the Uniform Standards of Professional Appraisal Practice (USPAP),
              professional record-keeping obligations, and applicable law. Nothing in this Privacy
              Policy authorizes us to disclose confidential appraisal information in a manner
              inconsistent with those obligations.
            </p>
          </Section>

          <Section title="SMS Communications">
            <p>
              Our website inquiry form offers two separate, optional checkboxes for text messages.
              Neither box is checked by default, and you may submit an inquiry without checking
              either one.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-foreground">Informational (non-marketing) messages</strong>{" "}
                regarding appraisal inquiries, appointment scheduling, assignment updates, and
                customer support.
              </li>
              <li>
                <strong className="text-foreground">Marketing and promotional messages</strong>{" "}
                regarding appraisal services, special offers, and company updates. Consent to
                marketing messages is not a condition of purchase.
              </li>
            </ul>
            <p>
              Message frequency varies. Message and data rates may apply. Reply{" "}
              <strong className="text-foreground">STOP</strong> to any message to opt out, or reply{" "}
              <strong className="text-foreground">HELP</strong> for assistance. After you reply
              STOP, you may receive one final message confirming your opt-out. You may also contact
              us at{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className={linkClass}>
                {siteConfig.supportEmail}
              </a>{" "}
              or{" "}
              <a href={siteConfig.phoneHref} className={linkClass}>
                {siteConfig.phone}
              </a>{" "}
              for help. Wireless carriers are not liable for delayed or undelivered messages. See
              our{" "}
              <Link to="/terms-of-service/" className={linkClass}>
                Terms of Service
              </Link>{" "}
              for full text messaging terms.
            </p>
          </Section>

          <Section title="Cookies and Analytics">
            <p>
              Our website uses Google Tag Manager and Google Analytics to understand how visitors
              use the site, and a Search Atlas website analytics tool that records page visits and
              clicks on links and buttons. These tools may use cookies, browser storage, or similar
              technologies. Our appraisal inquiry form is provided by HighLevel and may use cookies
              or similar technologies to operate the form.
            </p>
            <p>
              Our policy is not to intentionally send personally identifiable information — such as
              your name, email address, telephone number, property address, or inquiry details — to
              Google Analytics. Our website inquiry form is hosted by HighLevel in a separate frame,
              and the information you enter in it is submitted to HighLevel, not to our website
              analytics.
            </p>
            <p>
              You can control cookies through your browser settings. Google provides a browser
              add-on to opt out of Google Analytics at{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              . Blocking cookies may affect how some parts of the website function.
            </p>
          </Section>

          <Section title="Information Security">
            <p>
              We use reasonable administrative, technical, and organizational measures designed to
              protect the information we collect. However, no method of transmission over the
              internet or method of electronic storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </Section>

          <Section title="Information Retention">
            <p>
              We keep information for as long as reasonably necessary to respond to your inquiry,
              provide our services, maintain business records, and meet legal, regulatory, and
              professional record-keeping requirements, including those that apply to real estate
              appraisers.
            </p>
          </Section>

          <Section title="Your Choices and Privacy Rights">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                You may request access to, correction of, or deletion of your personal information
                by contacting us. Some information may need to be retained to meet legal or
                professional record-keeping obligations.
              </li>
              <li>You may opt out of text messages at any time by replying STOP.</li>
              <li>You may ask us to stop sending you marketing emails at any time.</li>
            </ul>
            <p>
              Depending on where you live, you may have additional rights under applicable privacy
              laws. To make a request, contact us using the information below. We may need to verify
              your identity before responding.
            </p>
          </Section>

          <Section title="Third-Party Websites">
            <p>
              Our website may link to websites operated by others. We are not responsible for the
              privacy practices of those websites, and we encourage you to review their privacy
              policies.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with a revised effective date.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>For privacy questions or requests, contact American Appraisal Alliance:</p>
            <ul className="list-none space-y-1">
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className={linkClass}>
                  {siteConfig.supportEmail}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href={siteConfig.phoneHref} className={linkClass}>
                  {siteConfig.phone}
                </a>
              </li>
              <li>Hours: {siteConfig.hours}</li>
            </ul>
          </Section>

          <p className="text-sm text-muted-foreground pt-4 border-t border-border">
            See also our{" "}
            <Link to="/terms-of-service/" className={linkClass}>
              Terms of Service
            </Link>
            , including our Text Messaging (SMS) Terms.
          </p>
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
};

export default PrivacyPolicy;
