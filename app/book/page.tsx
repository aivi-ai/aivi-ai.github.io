import type { Metadata } from 'next';
import { Suspense } from 'react';

import { buildMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { BookingTopicNote } from '@/components/BookingTopicNote';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Free 30-Minute Call — AIVI',
  description:
    "Book a free 30-minute call with AIVI. No obligation, no sales script. Describe your situation and we'll tell you honestly what we think.",
  path: '/book',
});

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free 30-minute call"
        title="Book a free 30-minute call."
        maxWidth="52rem"
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                num: '1',
                text: "You describe your situation — what you're building, what you're worried about, or what you want to change.",
              },
              {
                num: '2',
                text: "We ask questions and tell you honestly what we think. If we're not the right help, we say so.",
              },
              {
                num: '3',
                text: "If there's a fit, you get a written scope and price within one working day. No surprises.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-[var(--radius-lg)] p-5"
                style={{
                  backgroundColor: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-line)',
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    color: '#ffffff',
                    marginBottom: '0.75rem',
                    fontSize: '0.8125rem',
                  }}
                >
                  {item.num}
                </span>
                <p className="text-sm" style={{ color: 'var(--color-ink-soft)', lineHeight: '1.6', margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <Suspense fallback={null}>
            <BookingTopicNote paramName="topic" lead="You’re booking about:" />
          </Suspense>
      </PageHeader>

      <section
        style={{
          backgroundColor: 'var(--color-paper)',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        }}
      >
        <Container>
          <div className="max-w-3xl mx-auto">
            <Suspense
            fallback={
              <div
                className="calendly-skeleton"
                style={{ minHeight: '700px' }}
                role="status"
                aria-label="Loading booking calendar"
              >
                Loading calendar&hellip;
              </div>
            }
          >
            <CalendlyEmbed paramName="topic" />
          </Suspense>
        </div>

        <div
          className="mt-10 pt-6 max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-line)' }}
        >
          <p className="text-small">
            Prefer email?{' '}
            <a
              href={`mailto:${company.email}`}
              style={{ color: 'var(--color-accent)' }}
              className="hover:underline"
            >
              {company.email}
            </a>
          </p>
          <p className="text-small">Times shown in your local time zone.</p>
        </div>
        </Container>
      </section>
    </>
  );
}
