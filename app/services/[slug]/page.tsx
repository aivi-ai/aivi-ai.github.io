import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { services, getService } from '@/content/services';
import type { Service } from '@/content/services';
import { buildMetadata } from '@/lib/seo';
import { serviceJsonLd, faqJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FactsBar } from '@/components/FactsBar';
import { BulletList } from '@/components/BulletList';
import { StepList } from '@/components/StepList';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { ServiceCard } from '@/components/ServiceCard';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = service.related
    .map((relSlug) => getService(relSlug))
    .filter((s): s is Service => s !== undefined);

  const eyebrow = service.audiences
    .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
    .join(' · ');

  const svcJsonLd = serviceJsonLd(service.slug);
  const faqData = faqJsonLd(service.faq);

  return (
    <>
      {svcJsonLd && <JsonLd data={svcJsonLd} />}
      <JsonLd data={faqData} />

      {/* ── Header block ──────────────────────────────── */}
      <PageHeader
          eyebrow={eyebrow}
          title={service.name}
          lede={service.outcome}
          maxWidth="56ch"
          breadcrumbs={
            <Breadcrumbs
              items={[
                { name: 'Home', href: '/' },
                { name: 'Engagements', href: '/services' },
                { name: service.name, href: `/services/${service.slug}` },
              ]}
            />
          }
        />

        {/* ── FactsBar + main content ───────────────────── */}
        <Section role="body">
          <Container>
            <div className="lg:grid lg:grid-cols-[1fr_minmax(0,320px)] lg:gap-16 lg:items-start">
              <div className="mb-12 lg:mb-0 lg:col-start-2 lg:row-start-1">
                <FactsBar
                  hours={service.hours}
                  price={service.price}
                  turnaround={service.turnaround}
                  format={service.format}
                  slug={service.slug}
                  paymentMode={service.paymentMode}
                  paymentLink={service.paymentLink}
                />
              </div>

              <div
                className="lg:col-start-1 lg:row-start-1"
                style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}
              >
                {/* ── Is this you? ──────────────────────── */}
                <section aria-labelledby="section-is-this-you">
                  <h2
                    id="section-is-this-you"
                    className="text-h2 mb-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    Is this you?
                  </h2>
                  <BulletList
                    variant="dash"
                    items={service.isThisYou}
                  />
                </section>

                {/* ── What we do ────────────────────────── */}
                <section aria-labelledby="section-what-we-do">
                  <h2
                    id="section-what-we-do"
                    className="text-h2 mb-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    What we do
                  </h2>
                  <BulletList
                    variant="check"
                    items={service.whatWeDo}
                  />
                </section>

                {/* ── What you get ──────────────────────── */}
                <section aria-labelledby="section-what-you-get">
                  <h2
                    id="section-what-you-get"
                    className="text-h2 mb-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    What you get
                  </h2>
                  <BulletList
                    variant="check"
                    items={service.whatYouGet}
                  />
                </section>

                {/* ── What this is not ──────────────────── */}
                <section aria-labelledby="section-what-this-is-not">
                  <h2
                    id="section-what-this-is-not"
                    className="text-h2 mb-6"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    What this is not
                  </h2>
                  <BulletList
                    variant="cross"
                    items={service.whatThisIsNot}
                  />
                </section>
              </div>
            </div>
          </Container>
        </Section>

        {/* ── How it runs — raised emphasis panel ──────── */}
        <Section role="raised">
          <Container className="relative z-10">
            <div className="text-center mb-12">
              <p className="eyebrow justify-center mb-3">Process</p>
              <h2
                id="section-how-it-runs"
                className="text-h2"
              >
                How it runs
              </h2>
            </div>
            <StepList steps={service.howItRuns} layout="vertical" />
          </Container>
        </Section>

        {/* ── Price + FAQ ───────────────────────────────── */}
        <Section role="body">
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '720px' }}>
              {/* ── Price ───────────────────────────────── */}
              <section aria-labelledby="section-price">
                <h2
                  id="section-price"
                  className="text-h2 mb-6"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Price
                </h2>
                <div className="card p-7">
                  <p
                    className="stat-mono"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                      color: 'var(--color-accent)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {service.price}
                  </p>
                  {service.priceNote && (
                    <p
                      className="text-small mb-4"
                      style={{ color: 'var(--color-ink-muted)' }}
                    >
                      {service.priceNote}
                    </p>
                  )}
                  <dl
                    className="flex flex-col gap-3 mt-5 pt-5"
                    style={{ color: 'var(--color-ink-soft)', borderTop: '1px solid var(--color-line)' }}
                  >
                    <div className="flex gap-3">
                      <dt
                        className="font-medium text-sm"
                        style={{ color: 'var(--color-ink)', minWidth: '6rem' }}
                      >
                        Hours
                      </dt>
                      <dd className="text-sm">{service.hours}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt
                        className="font-medium text-sm"
                        style={{ color: 'var(--color-ink)', minWidth: '6rem' }}
                      >
                        Turnaround
                      </dt>
                      <dd className="text-sm">{service.turnaround}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt
                        className="font-medium text-sm"
                        style={{ color: 'var(--color-ink)', minWidth: '6rem' }}
                      >
                        Format
                      </dt>
                      <dd className="text-sm">{service.format}</dd>
                    </div>
                  </dl>
                  <p
                    className="text-small mt-5"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    Prices exclude VAT.
                  </p>
                </div>
              </section>

              {/* ── FAQ ─────────────────────────────────── */}
              <section aria-labelledby="section-faq">
                <h2
                  id="section-faq"
                  className="text-h2 mb-6"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Questions about this engagement
                </h2>
                <Faq items={service.faq} />
              </section>
            </div>
          </Container>
        </Section>

        {/* ── Related engagements ───────────────────────── */}
        {relatedServices.length > 0 && (
          <Section role="body">
            <Container>
              <h2
                className="text-h2 mb-10"
                style={{ color: 'var(--color-ink)' }}
              >
                Related engagements
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <ServiceCard service={s} />
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        )}

        {/* ── CTA band ──────────────────────────────────── */}
        <CtaBand
          heading="Is this the right fit? Let's find out."
          sub="Book a free 30-minute call. If we're not the right help, we'll say so on the call."
          cta="Book a free 30-min call"
          href="/book"
          topic={service.slug}
        />
    </>
  );
}
