import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { siteConfig, businessStatements } from "@/config/site";

/**
 * Terms of Service — created 11/24/2026 alongside the HighLevel appraisal
 * request form ("AAA Appraisal Request Form 11242026"), which links here.
 *
 * Owner-reviewed revisions applied 11/24/2026 (legal entity, experience
 * statement, engagement & acceptance wording, non-contingent compensation).
 * SMS terms mirror the consent wording configured on the HighLevel form.
 * No physical address is published (service-area business). Legal
 * provisions have not been reviewed by counsel.
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

const TermsOfService: React.FC = () => {
  return (
    <PageLayout currentPage="terms-of-service">
      <Header />

      <section className="relative py-16 md:py-20 overflow-hidden bg-[hsl(218_60%_20%)]">
        <div className="container relative z-10 max-w-3xl mx-auto text-center px-4">
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-white/80 text-base">Effective Date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl mx-auto px-4 space-y-12">
          <p className="text-muted-foreground text-base leading-relaxed">
            These Terms of Service ("Terms") govern your use of {siteConfig.domain} (the
            "Website"), operated by {siteConfig.legalName}, doing business as American Appraisal
            Alliance ("American Appraisal Alliance," "we," "us," or "our"), and any inquiries or text message communications you initiate
            through the Website. By using the Website, you agree to these Terms. If you do not
            agree, please do not use the Website.
          </p>

          <Section title="Use of the Website">
            <p>
              You may use the Website for lawful purposes only. You agree not to submit false or
              misleading information, interfere with the Website's operation or security, attempt
              to gain unauthorized access to any system, or use the Website to send unsolicited or
              unlawful communications.
            </p>
          </Section>

          <Section title="Website Information">
            <p>
              Content on the Website is provided for general informational purposes only. It is not
              an appraisal, an opinion of value, or legal, tax, lending, or financial advice, and it
              should not be relied upon as such. Descriptions of services, report types, and
              typical timeframes are general in nature and may not apply to your situation. We may
              update or change Website content at any time without notice.
            </p>
          </Section>

          <Section title="Appraisal Inquiries">
            <p>
              The inquiry form on the Website is a way to request information and begin a
              conversation about a potential appraisal.{" "}
              <strong className="text-foreground">
                Submitting an inquiry through the Website does not constitute acceptance of an
                appraisal assignment and does not establish a formal appraisal engagement or
                appraiser–client relationship.
              </strong>
            </p>
            <p>
              After receiving your inquiry, we will contact you to discuss the assignment.{" "}
              {businessStatements.response}
            </p>
          </Section>

          <Section title="Professional Appraisal Services">
            <p>
              {businessStatements.professionalServices} {businessStatements.experience}{" "}
              {businessStatements.licenseTitle} — License No. {businessStatements.licenseNumber}.
              Appraisals are performed in accordance with the Uniform Standards of Professional
              Appraisal Practice (USPAP) and applicable Texas law.
            </p>
            <p>
              <strong className="text-foreground">Assignment acceptance.</strong> We accept an
              appraisal assignment only after we have reviewed its requirements and both parties
              have agreed to its terms. We may decline any assignment, including for reasons of
              availability, property location, competency, conflicts of interest, or other
              professional considerations.
            </p>
            <p>
              Our appraisal fees are not contingent upon reporting a predetermined result, a
              direction in assignment results that favors the cause of the client, the amount of a
              value opinion, the attainment of a stipulated result, or the occurrence of a
              subsequent event directly related to the appraiser&apos;s opinions and specific to the
              assignment&apos;s purpose.
            </p>
          </Section>

          <Section title="Appraisal Engagement and Acceptance">
            <p>
              Appraisal assignments are accepted after the assignment requirements and engagement
              terms have been communicated and agreed upon by both parties. Acceptance may be
              documented through a written engagement agreement, an appraisal order, or electronic
              correspondence, including email.
            </p>
            <p>
              When the engagement terms expressly provide for electronic acceptance, an affirmative
              email response may constitute acceptance of those terms in lieu of a handwritten
              signature.
            </p>
            <p>
              The agreed-upon engagement terms govern the specific appraisal assignment and take
              precedence over these Website Terms of Service in the event of a conflict.
            </p>
          </Section>

          <Section title="Scheduling and Availability">
            <p>
              {businessStatements.scheduling} Any timeframe discussed before an engagement is an
              estimate unless it is stated in the agreed-upon engagement terms.
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              The Website and its content, including text, graphics, logos, and design, are owned
              by or licensed to {siteConfig.legalName} and are protected by applicable
              intellectual property laws. You may view and print Website content for your personal,
              non-commercial use. You may not copy, reproduce, modify, distribute, or create
              derivative works from Website content without our prior written permission.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>
              Our inquiry form is provided by HighLevel, a third-party customer relationship
              management platform, and the Website may link to other third-party websites. We are
              not responsible for the content, policies, or practices of third-party services.
            </p>
          </Section>

          <Section title="Text Messaging (SMS) Terms">
            <p>
              Our website inquiry form offers two separate, optional checkboxes for text messages
              from American Appraisal Alliance. Neither box is checked by default, and consent is
              not required to submit an inquiry or to purchase services.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Informational messages.</strong> If you consent,
                we may send non-marketing text messages regarding appraisal inquiries, appointment
                scheduling, assignment updates, and customer support.
              </li>
              <li>
                <strong className="text-foreground">Marketing messages.</strong> If you consent, we
                may send marketing and promotional text messages regarding appraisal services,
                special offers, and company updates. Consent is not a condition of purchase.
              </li>
            </ul>
            <p>
              <strong className="text-foreground">Message frequency</strong> varies.{" "}
              <strong className="text-foreground">Message and data rates may apply.</strong>
            </p>
            <p>
              <strong className="text-foreground">To opt out</strong>, reply{" "}
              <strong className="text-foreground">STOP</strong> to any message. You may receive one
              final message confirming that you have been unsubscribed.{" "}
              <strong className="text-foreground">For help</strong>, reply{" "}
              <strong className="text-foreground">HELP</strong>, email{" "}
              <a href={`mailto:${siteConfig.supportEmail}`} className={linkClass}>
                {siteConfig.supportEmail}
              </a>
              , or call{" "}
              <a href={siteConfig.phoneHref} className={linkClass}>
                {siteConfig.phone}
              </a>
              .
            </p>
            <p>
              Wireless carriers are not liable for delayed or undelivered messages. Your
              information, including your mobile number and SMS consent, is handled as described in
              our{" "}
              <Link to="/privacy-policy/" className={linkClass}>
                Privacy Policy
              </Link>
              . No mobile information will be shared with third parties or affiliates for marketing
              or promotional purposes.
            </p>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>
              The Website is provided on an "as is" and "as available" basis. To the fullest extent
              permitted by law, we make no warranties, express or implied, regarding the Website,
              including its availability, accuracy, or fitness for a particular purpose.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, American Appraisal Alliance will not be liable
              for any indirect, incidental, special, or consequential damages arising from your use
              of, or inability to use, the Website or its content. This section applies to the
              Website only; liability relating to an appraisal assignment is governed by the
              agreed-upon engagement terms for that assignment and applicable law.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms are governed by the laws of the State of Texas, without regard to its
              conflict-of-law principles.
            </p>
          </Section>

          <Section title="Changes to These Terms">
            <p>
              We may update these Terms from time to time. Changes will be posted on this page with
              a revised effective date. Your continued use of the Website after changes are posted
              constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>Questions about these Terms may be directed to American Appraisal Alliance:</p>
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
            <Link to="/privacy-policy/" className={linkClass}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
};

export default TermsOfService;
