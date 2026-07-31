import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service - AIVI',
  description:
    'Terms of Service for AIVI AI Services. Engagement scope, payment terms, IP, confidentiality, and governing law.',
  path: '/legal/terms',
});

const LAST_UPDATED = '28 July 2025';

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service">
        <p className="text-small mt-4" style={{ color: 'var(--color-ink-muted)' }}>
          Last updated: {LAST_UPDATED}
        </p>
      </PageHeader>

      <Section role="body">
        <Container>
          <div className="prose max-w-3xl">
          {/* Founder review note - visible on the page */}
          <div
            className="rounded-[var(--radius-lg)] px-5 py-4 my-6"
            role="note"
            style={{
              backgroundColor: 'var(--color-warn)',
              color: '#ffffff',
              opacity: 0.9,
            }}
          >
            <p className="text-sm font-semibold m-0">
              [FOUNDER INPUT: Dutch lawyer review required before launch. These terms are a
              working draft and should not be treated as legally reviewed or final.]
            </p>
          </div>

          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern all consulting engagements
            between <strong>{company.legalName}</strong> (&ldquo;AIVI&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;), a sole-trader business registered in the Netherlands
            (VAT: {company.vat}), and the person or organisation (&ldquo;Client&rdquo;,
            &ldquo;you&rdquo;) purchasing a service.
          </p>

          <p>
            <strong>Business clients vs. consumers.</strong> These Terms are primarily written for
            business clients (natural persons acting in the course of a trade, business, or
            profession, or legal entities). If you are a consumer purchasing a service for
            personal use outside of any professional context, additional rights may apply under
            Dutch and EU consumer protection law (including the right of withdrawal under Article
            6:230o BW). Where these Terms conflict with mandatory consumer-protection rules,
            those rules prevail.
          </p>

          <p>
            By booking or accepting a written scope from AIVI, you agree to these Terms.
          </p>

          {/* ── 1 ── */}
          <h2>1. Scope and deliverables</h2>

          <p>
            Each engagement is defined by a written scope agreed between AIVI and the Client
            (&ldquo;Scope&rdquo;). The Scope sets out the service type, deliverables, price,
            turnaround, and any special conditions. In the event of a conflict between these
            Terms and the Scope, the Scope prevails.
          </p>
          <p>
            AIVI will perform the services described in the Scope with reasonable skill and care.
            We do not guarantee specific business outcomes - consulting advice is our considered
            professional opinion, not a warranty of results.
          </p>
          <p>
            Any work outside the agreed Scope requires a separate written agreement.
          </p>

          {/* ── 2 ── */}
          <h2>2. Payment terms</h2>

          <ul>
            <li>
              <strong>Invoicing.</strong> AIVI invoices in Euros (EUR). Prices are exclusive of
              Dutch VAT (BTW) unless stated otherwise. VAT is added at the applicable rate for
              clients subject to Dutch VAT rules.
            </li>
            <li>
              <strong>Payment period.</strong> Invoices are due within <strong>14 calendar days</strong>{' '}
              of the invoice date unless the Scope states otherwise.
            </li>
            <li>
              <strong>Prepayment (under €500).</strong> For engagements priced below €500, full
              payment is due before work begins.
            </li>
            <li>
              <strong>Deposit (€2,000 and above).</strong> For engagements priced at €2,000 or
              more, a <strong>50% deposit</strong> is due before work begins. The remaining 50%
              is invoiced on delivery.
            </li>
            <li>
              <strong>Late payment.</strong> Invoices not paid within the payment period accrue
              statutory commercial interest under Dutch law (Article 6:119a BW). AIVI reserves
              the right to suspend work on any active engagement if an invoice is more than 14
              days overdue.
            </li>
          </ul>

          {/* ── 3 ── */}
          <h2>3. Cancellation and rescheduling</h2>

          <ul>
            <li>
              <strong>Free cancellation or rescheduling</strong> is available up to{' '}
              <strong>24 hours</strong> before a scheduled call or session, with no charge.
            </li>
            <li>
              <strong>Late cancellation</strong> (less than 24 hours before a scheduled session)
              is charged at <strong>50% of the session price</strong>. The full price is charged
              for no-shows.
            </li>
            <li>
              <strong>Multi-day engagements.</strong> For Build Sprint or similar multi-day
              engagements, cancellation after a start date has been confirmed and the deposit
              paid forfeits the deposit. AIVI will invoice only for work completed up to the
              date of cancellation.
            </li>
            <li>
              <strong>Advisory Retainer.</strong> The retainer may be cancelled at any time by
              notifying us before the next billing date. No further charges are applied.
              Pre-paid months are non-refundable.
            </li>
            <li>
              <strong>AIVI cancellation.</strong> If AIVI must cancel a session for reasons within
              our control, we will reschedule at a time convenient to the Client or issue a full
              refund of any amount paid for that session.
            </li>
          </ul>

          {/* ── 4 ── */}
          <h2>4. Intellectual property</h2>

          <p>
            <strong>Client owns deliverables.</strong> Upon receipt of full payment for an
            engagement, all intellectual property rights in the specific deliverables created for
            the Client (e.g. written reviews, code committed to the Client&rsquo;s repository,
            roadmaps, and playbooks) are assigned to the Client.
          </p>
          <p>
            <strong>AIVI retains generic know-how.</strong> AIVI retains all rights to its
            pre-existing tools, templates, methodologies, general knowledge, and know-how.
            Nothing in these Terms restricts AIVI from providing similar services to other
            clients using general professional knowledge, provided no Client-specific confidential
            information is disclosed.
          </p>
          <p>
            <strong>Client materials.</strong> The Client warrants that any materials provided to
            AIVI (code, documents, data) do not infringe third-party rights and that the Client
            has the authority to share them.
          </p>

          {/* ── 5 ── */}
          <h2>5. Confidentiality</h2>

          <p>
            AIVI treats all Client materials, business information, technical details, and
            engagement outcomes as confidential. We will not disclose Client-specific information
            to any third party without the Client&rsquo;s written permission, except:
          </p>
          <ul>
            <li>as required by law or a court order; or</li>
            <li>to processors (e.g. hosting, scheduling) who have agreed to appropriate
              confidentiality obligations.</li>
          </ul>
          <p>
            Where the Client&rsquo;s repository or systems are accessed, AIVI offers a mutual
            Non-Disclosure Agreement (NDA) before any such access. Client code is not retained
            after delivery of the relevant engagement.
          </p>
          <p>
            The Client agrees to keep the specific terms of any Scope and pricing confidential,
            and not to use AIVI&rsquo;s deliverables as a reference or example publicly without
            AIVI&rsquo;s written consent.
          </p>

          {/* ── 6 ── */}
          <h2>6. Limitation of liability</h2>

          <p>
            To the maximum extent permitted by applicable law:
          </p>
          <ul>
            <li>
              AIVI&rsquo;s total liability to the Client for any claim arising from or related
              to an engagement is capped at the <strong>total fees paid for that engagement</strong>.
            </li>
            <li>
              AIVI is not liable for any indirect, consequential, incidental, or special
              damages, including loss of profit, loss of data, or loss of business, even if
              advised of the possibility of such damages.
            </li>
            <li>
              AIVI provides recommendations based on the information available at the time of
              the engagement. We are not liable for outcomes arising from information that was
              withheld, inaccurate, or unavailable.
            </li>
          </ul>
          <p>
            Nothing in these Terms limits liability for fraud, wilful misconduct, or any
            liability that cannot be excluded under applicable law.
          </p>

          {/* ── 7 ── */}
          <h2>7. Warranties</h2>

          <p>AIVI warrants that:</p>
          <ul>
            <li>it has the authority to enter into these Terms;</li>
            <li>the services will be performed with reasonable skill and care; and</li>
            <li>deliverables will not knowingly infringe third-party intellectual property rights.</li>
          </ul>
          <p>
            Except as stated above, AIVI provides services &ldquo;as is&rdquo; and to the extent
            permitted by law excludes all other representations, warranties, or conditions,
            whether express or implied.
          </p>

          {/* ── 8 ── */}
          <h2>8. Force majeure</h2>

          <p>
            Neither party is liable for delays or failures caused by circumstances beyond their
            reasonable control (including internet outages, illness, natural disasters, or
            government action). The affected party will notify the other promptly and both
            parties will use reasonable efforts to mitigate the impact.
          </p>

          {/* ── 9 ── */}
          <h2>9. Governing law and disputes</h2>

          <p>
            These Terms are governed by the laws of <strong>the Netherlands</strong>. Any
            dispute that cannot be resolved amicably shall be submitted exclusively to the
            competent court in <strong>Amsterdam (Rechtbank Amsterdam)</strong>, subject to
            mandatory consumer-protection rules that may grant a consumer the right to bring
            proceedings in their local jurisdiction.
          </p>

          {/* ── 10 ── */}
          <h2>10. General</h2>

          <ul>
            <li>
              <strong>Entire agreement.</strong> These Terms and the applicable Scope constitute
              the entire agreement between the parties regarding the subject matter and supersede
              all prior discussions.
            </li>
            <li>
              <strong>Amendments.</strong> AIVI may update these Terms from time to time. The
              Terms in force at the time a Scope is agreed govern that engagement.
            </li>
            <li>
              <strong>Severability.</strong> If any provision is found unenforceable, it is
              severed and the remaining provisions continue in full force.
            </li>
            <li>
              <strong>No waiver.</strong> Failure to enforce a right does not constitute a
              waiver of that right.
            </li>
          </ul>

          {/* ── 11 ── */}
          <h2>11. Contact</h2>

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
