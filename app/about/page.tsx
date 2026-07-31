import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { faqJsonLd } from '@/lib/jsonld';
import { people } from '@/content/people';
import { testimonials } from '@/content/testimonials';
import { company } from '@/content/company';
import { generalFaq } from '@/content/faq';
import { PersonCard } from '@/components/PersonCard';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'About AIVI - AI Consulting from Amsterdam',
  description:
    'AIVI AI Services is a boutique AI consulting firm in Amsterdam. Senior AI expertise by the hour. Registered in the Netherlands.',
  path: '/about',
});

const aboutFaqItems = generalFaq.filter((item) =>
  [
    'How much does it cost to work with AIVI?',
    'Is the 30-minute call really free?',
    'Do you work remotely?',
    'Do I need to be technical to work with you?',
  ].includes(item.q)
);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(aboutFaqItems)} />

      {/* Hero */}
      <PageHeader
        eyebrow="About the firm"
        title="The senior second opinion you can actually book."
        lede="AIVI is senior AI help, scoped and priced on the page, delivered in days. We're the front door to real expertise - not a six-month engagement, not a discovery phase. When you need the whole building, we'll tell you."
      />

      {/* Firm statement - raised emphasis panel (replaces mid-page dark island) */}
      <Section role="raised">
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-3">The firm</p>
            <h2
              className="text-h2"
              style={{ marginBottom: '1.5rem' }}
            >
              What AIVI is
            </h2>
            <div className="flex flex-col gap-5" style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7' }}>
              <p>
                Most of what people need from an AI consultancy takes hours, not months. A code
                review. A workflow audit. A 90-day roadmap. An honest answer to a specific question.
                AIVI is built for exactly that: fixed-scope engagements with prices on the page,
                bookable this week, delivered in days.
              </p>
              <p>
                We are the low-barrier alternative to the large AI consultancy - the front door,
                not the whole building. When an engagement genuinely needs months of build, we say
                so and refer or scope it up. That honesty is a deliberate part of how we work,
                not a weakness.
              </p>
              <p>
                We work remotely with clients worldwide. On-site workshops are available in the
                Netherlands. All prices are published on the site. All deliverables are described
                in plain English before you agree to anything.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* People */}
      <Section role="body">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-h2"
              style={{ color: 'var(--color-ink)', marginBottom: '1.5rem' }}
            >
              The team
            </h2>

            {people.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person) => (
                  <PersonCard key={person.name} person={person} />
                ))}
              </div>
            ) : (
              <div
                className="rounded-[var(--radius-lg)] p-6"
                style={{
                  backgroundColor: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-line)',
                }}
              >
                {/* TODO(founder): additional associate cards */}
                <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7', margin: 0 }}>
                  AIVI commissions specialist associates per engagement. We name who will do
                  the work before you agree to anything. The associate&rsquo;s credentials and
                  focus area are shared with you before the scope is confirmed.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Testimonials - renders nothing if empty */}
      {testimonials.length > 0 && (
        <Section role="body">
          <Container>
            <h2
              className="text-h2"
              style={{ color: 'var(--color-ink)', marginBottom: '1.5rem' }}
            >
              What clients say
            </h2>
            <Testimonials items={testimonials} />
          </Container>
        </Section>
      )}

      {/* Company info */}
      <Section role="body">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-h2"
              style={{ color: 'var(--color-ink)', marginBottom: '1.5rem' }}
            >
              Company information
            </h2>
            <div
              className="rounded-[var(--radius-lg)] p-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-line)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <address className="not-italic flex flex-col gap-2" style={{ color: 'var(--color-ink-soft)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
                <div>
                  <strong style={{ color: 'var(--color-ink)', fontSize: '1.0625rem' }}>{company.legalName}</strong>
                </div>
                <div>
                  {company.street}<br />
                  {company.postalCode} {company.city}<br />
                  {company.country}
                </div>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--color-line)', marginTop: '0.5rem' }}>
                  <span>VAT / BTW: {company.vat}</span>
                  <span>
                    KvK:{' '}
                    {company.kvk !== 'TODO_KVK' ? (
                      company.kvk
                    ) : (
                      <span style={{ color: 'var(--color-warn)' }}>
                        [FOUNDER INPUT - required before launch]
                      </span>
                    )}
                  </span>
                </div>
                {company.email !== 'TODO_EMAIL' && (
                  <div>
                    <a
                      href={`mailto:${company.email}`}
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {company.email}
                    </a>
                  </div>
                )}
              </address>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section role="body">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-h2"
                style={{ color: 'var(--color-ink)' }}
              >
                Questions about AIVI
              </h2>
            </div>
            <Faq items={aboutFaqItems} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaBand
        heading="Start with a free 30-minute call."
        sub="No obligation. No sales script. We will tell you honestly what we think."
        cta="Book a free call"
        href="/book"
      />
    </>
  );
}
