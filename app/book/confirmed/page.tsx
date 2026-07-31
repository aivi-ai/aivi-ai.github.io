import type { Metadata } from 'next';
import { Suspense } from 'react';

import { buildMetadata } from '@/lib/seo';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { BookingTopicNote } from '@/components/BookingTopicNote';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';

export const metadata: Metadata = buildMetadata({
  title: 'Payment Received - AIVI',
  description: 'Your payment has been processed. Book your session time below.',
  path: '/book/confirmed',
  noindex: true,
});

export default function BookConfirmedPage() {
  return (
    <Section role="body">
      <Container>
        <h1 className="text-h1">Payment received. Now pick your time.</h1>
        <p className="text-lede mt-4 max-w-xl" style={{ color: 'var(--color-ink-soft)' }}>
          Your payment has been processed. Book your session time below.
        </p>

        <Suspense fallback={null}>
          <BookingTopicNote paramName="s" lead="You’re booking:" />
        </Suspense>

        <div className="mt-10">
          <Suspense
            fallback={
              <div
                className="calendly-skeleton min-h-[1000px] md:min-h-[700px]"
                role="status"
                aria-label="Loading booking calendar"
              />
            }
          >
            <CalendlyEmbed paramName="s" />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
