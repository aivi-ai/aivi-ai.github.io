import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { faqJsonLd } from '@/lib/jsonld';
import { generalFaq } from '@/content/faq';
import { BulletList } from '@/components/BulletList';
import { Faq } from '@/components/Faq';
import { StepList } from '@/components/StepList';
import { CtaBand } from '@/components/CtaBand';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'How We Work - AIVI',
  description:
    'Fixed scope, honest advice, and deliverables in days. Here is the complete process from first call to delivery.',
  path: '/approach',
});

const steps = [
  {
    label: 'Book a free 30-minute call',
    detail:
      'You describe the situation. We ask questions and tell you what we think. If we are not the right help, we say so on the call.',
  },
  {
    label: 'We scope it in writing',
    detail:
      'Within one working day: a short written summary and a fixed-price proposal. Scope, hours, price, and turnaround. No surprises.',
  },
  {
    label: 'You accept, and we invoice',
    detail:
      'Reply to accept. We invoice by bank transfer or card payment link. Work starts.',
  },
  {
    label: 'We deliver',
    detail:
      'The deliverable lands in your inbox. For review-style work, no interruptions during the engagement.',
  },
  {
    label: 'Walkthrough call',
    detail:
      'We walk you through the findings or the code together.',
  },
];

const whatWeWontDo = [
  'No vendor commissions or referral fees - we recommend what works, not what pays us.',
  'No six-month discovery phases. If it takes that long to define the problem, the problem is the discovery phase.',
  'No billing for scoping. The free 30-minute call is genuinely free.',
  'No work we are not the right team for. We will tell you on the call if that is the case.',
];

const approachFaqItems = generalFaq.filter((item) =>
  ['Is the 30-minute call really free?', 'How fast can you start?', 'Do you work remotely?', 'Do I need to be technical to work with you?', 'How does billing work?'].includes(item.q)
);

export default function ApproachPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(approachFaqItems)} />

      {/* Hero */}
      <PageHeader
        eyebrow="Our approach"
        title="No surprises. Ever."
        lede="No discovery phases, no scope creep, no sales script. Here's exactly what happens from the first call to the work in your hands."
      />

      {/* 5-step timeline - raised emphasis panel (replaces mid-page dark island) */}
      <Section role="raised">
        <Container className="relative z-10">
          <div className="text-center mb-12">
            <p className="eyebrow justify-center mb-3">Process</p>
            <h2 className="text-h2">
              From first call to delivery
            </h2>
          </div>
          <StepList steps={steps} layout="vertical" />
        </Container>
      </Section>

      {/* What we won't do */}
      <Section role="body">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-h2"
              style={{ color: 'var(--color-ink)', marginBottom: '1.5rem' }}
            >
              What we won&rsquo;t do
            </h2>
            <BulletList items={whatWeWontDo} variant="cross" />
          </div>
        </Container>
      </Section>

      {/* Confidentiality & data */}
      <Section role="body">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-h2"
              style={{ color: 'var(--color-ink)', marginBottom: '1.5rem' }}
            >
              Confidentiality &amp; data
            </h2>
            <div className="flex flex-col gap-6">
              {[
                {
                  title: 'NDA by default',
                  text: 'We offer a mutual NDA on request, and we offer it by default before any code access. The NDA is a standard two-page document. We sign first if you prefer.',
                },
                {
                  title: 'What we do with your data',
                  text: 'We read client code and documents to do the work. We do not retain copies after the engagement ends. We do not train models on client materials. We do not share client work with third parties.',
                },
                {
                  title: 'What we never publish',
                  text: "Client code, client names, case study details, or any description of a client's system without explicit written permission. When we do publish with permission, we show the client what we plan to write before it appears anywhere.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[var(--radius-lg)] p-6"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-line)',
                  }}
                >
                  <h3 className="text-h3 mb-2" style={{ color: 'var(--color-ink)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7', margin: 0 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Who does the work */}
      <Section role="body">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-h2"
              style={{ color: 'var(--color-ink)', marginBottom: '1rem' }}
            >
              Who does the work
            </h2>
            <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.7' }}>
              AIVI commissions specialist associates per engagement. We name who will do the
              work before you agree to anything. The associate&rsquo;s credentials and focus area are
              shared with you before the scope is confirmed, and you can ask questions about
              them before you accept.{' '}
              <Link
                href="/about"
                style={{ color: 'var(--color-accent)' }}
              >
                Learn more about the team &rarr;
              </Link>
            </p>
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
                Questions about the process
              </h2>
            </div>
            <Faq items={approachFaqItems} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaBand
        heading="Start with the free call."
        sub="The free 30-minute call is genuinely free. If we are not the right help, we say so on the call."
        cta="Book a free call"
        href="/book"
      />
    </>
  );
}
