import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { services } from '@/content/services';
import { ServicesGrid } from './ServicesGrid';
import { CtaBand } from '@/components/CtaBand';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: 'All Engagements — AIVI',
  description:
    'Fixed scope, fixed price, measured in hours. Eight AI consulting engagements from €75 to €3,000. Book a free 30-minute call.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <PageHeader
        eyebrow="What we offer"
        title="Pick what moves you forward."
        lede="Each engagement is a fixed scope, a price you can see, and something real in your hands in days. Take what you need — skip what you don't."
      />

      {/* Filtered services grid — all 8 cards always in SSR HTML */}
      <ServicesGrid services={services} />

      {/* CTA band */}
      <CtaBand
        heading="Not sure where to start?"
        sub="Book a free 30-minute call. We'll listen to your situation and tell you what would actually help."
        cta="Book a free 30-min call"
        href="/book"
      />
    </>
  );
}
