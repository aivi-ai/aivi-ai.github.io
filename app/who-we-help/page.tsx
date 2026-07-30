import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { segments } from '@/content/segments';
import { SegmentCard } from '@/components/SegmentCard';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Who We Help — AIVI',
  description:
    'AIVI works with students and early-career professionals, solo founders, knowledge workers, and small teams. Find out which engagements are right for where you are.',
  path: '/who-we-help',
});

export default function WhoWeHelpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where you're building from"
        title="Start where you are."
        lede="A degree, a product, a workflow, a team — whatever you're building toward, one of these is the closest fit. Pick it and see what we'd do next."
      />

      <Section role="body">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {segments.map((segment) => (
              <SegmentCard key={segment.slug} segment={segment} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Not sure which fits you?"
        sub="Book the free 30-minute call. We will figure it out together — and if we are not the right help, we will say so on the call."
        cta="Book a free call"
        href="/book"
      />
    </>
  );
}
