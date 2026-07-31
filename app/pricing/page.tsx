import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { faqJsonLd } from '@/lib/jsonld';
import { services } from '@/content/services';
import { pricingFaq } from '@/content/faq';
import { PriceTable } from '@/components/PriceTable';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing - AIVI',
  description:
    'All prices listed. Most AIVI engagements are measured in hours and start under €1,500. Fixed-price proposals after the free 30-minute call.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaq)} />

      {/* Hero */}
      <PageHeader
        eyebrow="Transparent pricing"
        title="Our prices are on this page."
        lede="Most engagements are measured in hours and start under €1,500. All prices exclude VAT."
      />

      {/* Free call band */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-soft), var(--color-accent-glow))',
          borderTop: '2px solid var(--color-accent)',
        }}
      >
        <Container>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-8"
          >
            <div>
              <p
                className="font-bold text-lg"
                style={{ color: 'var(--color-ink)', marginBottom: '0.25rem' }}
              >
                The free 30-minute call - €0
              </p>
              <p className="text-sm" style={{ color: 'var(--color-ink-soft)' }}>
                No obligation. No sales script. Start here.
              </p>
            </div>
            <Button href="/book" variant="primary" size="lg">
              Book a free call
            </Button>
          </div>
        </Container>
      </div>

      {/* Price table */}
      <Section role="body" id="services">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <div>
              <h2
                className="text-h2"
                style={{ color: 'var(--color-ink)', marginBottom: '0.5rem' }}
              >
                All engagements
              </h2>
              <p
                className="text-sm"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                Prices exclude VAT. Use the filter to see what&rsquo;s most relevant to you.
              </p>
            </div>
          </div>
          <PriceTable services={services} />
        </Container>
      </Section>

      {/* How billing works - raised emphasis panel (replaces mid-page dark island) */}
      <Section role="raised" id="billing">
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="eyebrow justify-center mb-3">Billing</p>
              <h2 className="text-h2">
                How billing works
              </h2>
            </div>
            <div
              className="flex flex-col gap-6"
            >
              <div className="card p-6">
                <h3 className="text-h3 mb-3" style={{ color: 'var(--color-ink)' }}>Payment</h3>
                <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7', margin: 0 }}>
                  We invoice after the free call, once you have accepted the written scope.
                  Payment is due within 14 days of the invoice date by bank transfer (SEPA or
                  international) or a card payment link. Retainers are billed monthly in advance.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-h3 mb-3" style={{ color: 'var(--color-ink)' }}>Deposits</h3>
                <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7', margin: 0 }}>
                  Engagements under €500 are prepaid before work begins. Engagements above €2,000
                  require a 50% deposit, with the remainder due on delivery.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-h3 mb-3" style={{ color: 'var(--color-ink)' }}>VAT</h3>
                <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7', margin: 0 }}>
                  Prices on this page exclude VAT. Dutch BTW is added for Netherlands clients
                  and EU consumers. EU businesses with a valid VAT number are reverse-charged.
                  Clients outside the EU are generally invoiced without Dutch VAT. Your invoice
                  will state the applicable treatment.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cancellation & rescheduling + Student rate in a 2-col */}
      <Section role="body">
        <Container>
          <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
            <div
              className="rounded-[var(--radius-lg)] p-6"
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                border: '1px solid var(--color-line)',
              }}
            >
              <h2
                className="text-h3"
                style={{ color: 'var(--color-ink)', marginBottom: '0.75rem' }}
              >
                Cancellation &amp; rescheduling
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7', margin: 0 }}>
                Free reschedule up to 24 hours before a session - just reply to the calendar invite
                or email us. Late cancellation (under 24 hours before) is billed at 50% of the
                session cost. No-shows are billed in full.
              </p>
            </div>
            <div
              className="rounded-[var(--radius-lg)] p-6"
              style={{
                backgroundColor: 'var(--color-accent-soft)',
                border: '1px solid var(--color-accent-glow)',
              }}
            >
              <h2
                className="text-h3"
                style={{ color: 'var(--color-ink)', marginBottom: '0.75rem' }}
              >
                Student rate
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7', margin: 0 }}>
                The student rate of €75 applies to the AI Career Roadmap and is available if you
                are currently enrolled at a university or college, or graduated within the last
                12 months. A student email address or a graduation date is all we need to confirm.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section role="body" id="faq">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-h2"
                style={{ color: 'var(--color-ink)' }}
              >
                Pricing questions
              </h2>
            </div>
            <Faq items={pricingFaq} />
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <CtaBand
        heading="Every engagement starts with a free call."
        sub="No obligation. No sales script. If we are not the right help, we say so on the call."
        cta="Book a free call"
        href="/book"
      />
    </>
  );
}
