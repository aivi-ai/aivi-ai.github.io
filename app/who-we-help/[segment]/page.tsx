import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { segments, getSegment } from '@/content/segments';
import { servicesFor } from '@/content/services';
import type { Audience } from '@/content/services';
import { faqJsonLd } from '@/lib/jsonld';
import { BulletList } from '@/components/BulletList';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';

interface Props {
  params: Promise<{ segment: string }>;
}

export function generateStaticParams() {
  return segments.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment: slug } = await params;
  const segment = getSegment(slug);
  if (!segment) return {};
  return buildMetadata({
    title: segment.seo.title,
    description: segment.seo.description,
    path: `/who-we-help/${slug}`,
  });
}

export default async function SegmentPage({ params }: Props) {
  const { segment: slug } = await params;
  const segment = getSegment(slug);
  if (!segment) notFound();

  const audienceServices = servicesFor(slug as Audience);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Who We Help', href: '/who-we-help' },
    { name: segment.label, href: `/who-we-help/${slug}` },
  ];

  const isStudents = slug === 'students';
  const isFounders = slug === 'founders';

  return (
    <>
      <JsonLd data={faqJsonLd(segment.faq)} />

      {/* Hero */}
      <PageHeader
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        eyebrow={segment.label}
        title={segment.headline}
        lede={segment.subhead}
      >
        {/* Segment-specific notes */}
        {isStudents && (
          <aside
            className="mt-6 p-4 rounded-[var(--radius-lg)]"
            style={{
              backgroundColor: 'var(--color-accent-soft)',
              border: '1px solid var(--color-accent)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-ink)' }}>
              <strong>Student rate:</strong> The student rate of €75 requires a valid student ID or recent graduation (within the last 12 months). State this openly — we confirm quickly, and it is all we need.
            </p>
          </aside>
        )}

        {isFounders && (
          <aside
            className="mt-6 p-4 rounded-[var(--radius-lg)]"
            style={{
              backgroundColor: 'var(--color-surface-alt)',
              border: '1px solid var(--color-line)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-ink-soft)' }}>
              <strong>Confidentiality:</strong> Mutual NDA before code access. No code retained after delivery. No client work used publicly without written permission.
            </p>
          </aside>
        )}
      </PageHeader>

      {/* Sound familiar? */}
      <Section role="body">
        <Container>
          <div style={{ maxWidth: '720px' }}>
            <h2 className="text-h2" style={{ color: 'var(--color-ink)', marginBottom: '1.5rem' }}>
              Sound familiar?
            </h2>
            <BulletList items={segment.pains} variant="dash" />
          </div>
        </Container>
      </Section>

      {/* Where to start */}
      <Section role="body">
        <Container>
          <h2 className="text-h2" style={{ color: 'var(--color-ink)', marginBottom: '0.5rem' }}>
            Where to start
          </h2>
          <p className="text-lede" style={{ marginBottom: '2rem', maxWidth: '60ch' }}>
            These are the engagements most relevant for you, ordered by fit.
          </p>

          <div className="flex flex-col gap-4" style={{ maxWidth: '720px' }}>
            {audienceServices.map((service) => (
              <div key={service.slug} className="card card-lift p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <h3
                      className="text-h3"
                      style={{ color: 'var(--color-ink)', marginBottom: '0.375rem' }}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                      >
                        {service.name}
                      </Link>
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-ink-soft)', marginBottom: '0.75rem' }}
                    >
                      {service.outcome}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
                      <span>{service.hours}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className="stat-mono"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {service.price}
                        {service.priceNote && (
                          <span className="font-sans" style={{ fontWeight: 400, color: 'var(--color-ink-muted)' }}>
                            {' '}({service.priceNote})
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      href={`/book?topic=${service.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        color: '#ffffff',
                        textDecoration: 'none',
                        minHeight: '44px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Book a free call
                    </Link>
                  </div>
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Learn more about this engagement →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What changes after — raised emphasis panel */}
      <Section role="raised">
        <Container className="relative z-10">
          <div style={{ maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p className="eyebrow mb-3">Outcomes</p>
            <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
              What changes after
            </h2>
            <p
              className="text-lede"
              style={{ marginBottom: '1.5rem' }}
            >
              {segment.outcome}
            </p>
            <BulletList items={segment.outcomeItems} variant="check" />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section role="body">
        <Container>
          <div style={{ maxWidth: '720px' }}>
            <h2 className="text-h2" style={{ color: 'var(--color-ink)', marginBottom: '1.5rem' }}>
              Frequently asked questions
            </h2>
            <Faq items={segment.faq} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaBand
        heading="Let's talk about where you are."
        sub="The free 30-minute call is the first step. No sales script, no obligation."
        cta="Book a free call"
        href="/book"
        topic={slug}
      />
    </>
  );
}
