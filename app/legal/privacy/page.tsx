import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — AIVI',
  description:
    'AIVI AI Services privacy policy. How we collect, use, and protect your data under GDPR.',
  path: '/legal/privacy',
});

const LAST_UPDATED = '28 July 2025';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy">
        <p className="text-small mt-4" style={{ color: 'var(--color-ink-muted)' }}>
          Last updated: {LAST_UPDATED}
        </p>
      </PageHeader>

      <Section role="body">
        <Container>
          <div className="prose max-w-3xl">
          <p>
            This privacy policy explains how <strong>{company.legalName}</strong> (&ldquo;AIVI&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), registered in the Netherlands
            (VAT: {company.vat}), collects, uses, and protects personal data when you use our
            website at{' '}
            <a href={company.siteUrl}>{company.siteUrl}</a> or engage with our services.
          </p>

          <p>
            AIVI is the data controller for personal data processed in connection with this website
            and our consulting engagements. We are subject to the General Data Protection
            Regulation (GDPR) and the Dutch implementation thereof (UAVG).
          </p>

          {/* ── 1 ── */}
          <h2>1. What we collect and why</h2>

          <h3>1.1 Booking data (via Calendly)</h3>
          <p>
            When you book a call through our website, you interact with Calendly, Inc.&rsquo;s
            scheduling widget. Calendly collects your name, email address, any answers you provide
            to pre-booking questions, and creates a calendar entry. We receive this information
            so we can prepare for and conduct the call.
          </p>
          <p>
            <strong>Lawful basis:</strong> Legitimate interest (Article 6(1)(f) GDPR) — to
            manage and deliver our consulting services. Where the booking relates to a paid
            engagement, performance of a contract (Article 6(1)(b) GDPR) also applies.
          </p>

          <h3>1.2 Email correspondence</h3>
          <p>
            If you email us directly, we retain your email address and the content of your message
            in order to respond and, where relevant, to fulfil an engagement.
          </p>
          <p>
            <strong>Lawful basis:</strong> Legitimate interest (Article 6(1)(f) GDPR) to manage
            business communication; performance of a contract where an engagement results.
          </p>

          <h3>1.3 Website analytics</h3>
          <p>
            We may use privacy-preserving, cookieless analytics (aggregate page view counts, referral
            sources, and geographic region at country level). No personal identifiers are collected
            or stored. No cookies are set for analytics purposes.
          </p>
          <p>
            <strong>Lawful basis:</strong> Legitimate interest (Article 6(1)(f) GDPR) to understand
            how our website is used and improve it.
          </p>

          <h3>1.4 Cookies and local storage</h3>
          <p>
            Our website does not currently set any non-essential cookies. Calendly&rsquo;s embedded
            widget may set cookies; please refer to{' '}
            <a
              href="https://calendly.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Calendly&rsquo;s privacy policy
            </a>{' '}
            for details. If we introduce non-essential cookies in the future we will obtain your
            consent first.
          </p>

          {/* ── 2 ── */}
          <h2>2. Data processors and third parties</h2>
          <p>
            We use the following third-party processors. Each is bound by a data processing
            agreement and appropriate safeguards.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid var(--color-line)' }}>Processor</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid var(--color-line)' }}>Purpose</th>
                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid var(--color-line)' }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Calendly, Inc.', 'Booking and scheduling', 'United States'],
                ['Vercel, Inc.', 'Website hosting and delivery', 'United States'],
                ['Google LLC / Zoom Video Communications', 'Video calls (where applicable)', 'United States'],
                ['Email provider (e.g. Google Workspace)', 'Business email', 'United States / EEA'],
              ].map(([name, purpose, location], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-line)' }}>
                  <td style={{ padding: '8px', fontWeight: 500 }}>{name}</td>
                  <td style={{ padding: '8px', color: 'var(--color-ink-soft)' }}>{purpose}</td>
                  <td style={{ padding: '8px', color: 'var(--color-ink-muted)' }}>{location}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            We do not sell, rent, or share your personal data with third parties for their own
            marketing purposes.
          </p>

          {/* ── 3 ── */}
          <h2>3. International transfers</h2>
          <p>
            Some of our processors (Calendly, Vercel, Google) are based in the United States.
            Where data is transferred outside the European Economic Area, we rely on:
          </p>
          <ul>
            <li>
              <strong>Standard Contractual Clauses (SCCs)</strong> adopted by the European
              Commission; and/or
            </li>
            <li>
              The <strong>EU-U.S. Data Privacy Framework (DPF)</strong> where the processor is
              certified.
            </li>
          </ul>
          <p>
            You may request details of the safeguards in place for any specific transfer by
            contacting us at the address below.
          </p>

          {/* ── 4 ── */}
          <h2>4. Retention</h2>
          <p>We retain personal data only as long as necessary for the purposes described above:</p>
          <ul>
            <li>
              <strong>Booking data:</strong> Calendly retains data according to their own policy.
              We retain notes and call records for the duration of the client relationship and up
              to <strong>two years</strong> after the last engagement, to handle any disputes or
              follow-up.
            </li>
            <li>
              <strong>Email correspondence:</strong> Retained for the duration of the business
              relationship and up to <strong>two years</strong> thereafter, or as required by
              applicable law (e.g. financial record-keeping obligations under Dutch law).
            </li>
            <li>
              <strong>Analytics:</strong> Aggregate data only; no personal data retained.
            </li>
          </ul>
          <p>
            Where retention is required by Dutch or EU law (e.g. VAT records for seven years), we
            retain the minimum data required to fulfil that obligation.
          </p>

          {/* ── 5 ── */}
          <h2>5. Your rights</h2>
          <p>
            Under the GDPR you have the following rights in relation to your personal data:
          </p>
          <ul>
            <li>
              <strong>Right of access (Article 15):</strong> to obtain a copy of the personal data
              we hold about you.
            </li>
            <li>
              <strong>Right to rectification (Article 16):</strong> to have inaccurate data
              corrected.
            </li>
            <li>
              <strong>Right to erasure (Article 17):</strong> to request deletion of your data
              where we have no legal obligation to retain it.
            </li>
            <li>
              <strong>Right to restriction (Article 18):</strong> to limit how we use your data
              while a dispute is resolved.
            </li>
            <li>
              <strong>Right to data portability (Article 20):</strong> to receive your data in a
              structured, machine-readable format where processing is based on consent or contract.
            </li>
            <li>
              <strong>Right to object (Article 21):</strong> to object to processing based on
              legitimate interest at any time.
            </li>
            <li>
              <strong>Rights related to automated decision-making (Article 22):</strong> we do
              not use automated decision-making or profiling that produces legal or similarly
              significant effects.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please email us at{' '}
            <a href={`mailto:${company.email}`}>{company.email}</a>. We will respond within one
            calendar month. We may ask you to verify your identity before processing your request.
          </p>

          {/* ── 6 ── */}
          <h2>6. Right to complain</h2>
          <p>
            If you believe we have not handled your personal data correctly, you have the right to
            lodge a complaint with the Dutch data protection authority:
          </p>
          <address style={{ fontStyle: 'normal' }}>
            <strong>Autoriteit Persoonsgegevens</strong>
            <br />
            Bezuidenhoutseweg 30, 2594 AV Den Haag, The Netherlands
            <br />
            <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
              autoriteitpersoonsgegevens.nl
            </a>
          </address>
          <p>
            We ask that you contact us first so we have the opportunity to address your concern
            directly.
          </p>

          {/* ── 7 ── */}
          <h2>7. Security</h2>
          <p>
            We take appropriate technical and organisational measures to protect your personal data
            against loss, unauthorised access, disclosure, or alteration. Access to client data
            is restricted to people who need it to perform their role. We use industry-standard
            encryption in transit (HTTPS) for all website traffic.
          </p>

          {/* ── 8 ── */}
          <h2>8. Children</h2>
          <p>
            Our services are directed at business clients and adult individuals. We do not
            knowingly collect personal data from anyone under 16 years of age.
          </p>

          {/* ── 9 ── */}
          <h2>9. Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. The &ldquo;Last updated&rdquo;
            date at the top of this page reflects when the policy was last revised. Continued
            use of our website after a revision constitutes acceptance of the revised policy.
            For material changes, we will endeavour to notify affected parties by email.
          </p>

          {/* ── 10 ── */}
          <h2>10. Contact</h2>
          <p>
            For any questions about this privacy policy or to exercise your rights, contact us:
          </p>
          <address style={{ fontStyle: 'normal' }}>
            <strong>{company.legalName}</strong>
            <br />
            {company.street}
            <br />
            {company.postalCode} {company.city}
            <br />
            {company.country}
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
          </div>
        </Container>
      </Section>
    </>
  );
}
