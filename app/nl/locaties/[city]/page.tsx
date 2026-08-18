import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { faqJsonLd } from '@/lib/jsonld';
import { locaties, getLocatie } from '@/content/locaties';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';

export function generateStaticParams() {
  return locaties.map(l => ({ city: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocatie(city);
  if (!loc) return {};
  const meta = buildMetadata({
    title: `AI-consultancy in ${loc.name}`,
    description: `Senior AI-consultancy in ${loc.name}: vaste prijzen, gescoopte engagements, oplevering in dagen. ${loc.provincie}-breed actief, remote-first vanuit Amsterdam.`,
    path: `/nl/locaties/${loc.slug}`,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      locale: 'nl_NL',
    },
  };
}

export default async function LocatiePage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const loc = getLocatie(city);
  if (!loc) return notFound();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Locaties', href: '/nl/locaties' },
    { name: loc.name, href: `/nl/locaties/${loc.slug}` },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(loc.faq)} />

      <PageHeader
        eyebrow={`AI-consultancy · ${loc.provincie}`}
        title={`AI-consultancy in ${loc.name}`}
        lede={loc.intro}
      />

      <Container>
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <Section>
        <Container>
          <div className="prose max-w-3xl mx-auto space-y-5 text-[var(--color-ink-soft)] leading-relaxed">
            {loc.over.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <p className="eyebrow justify-center mb-3">Waar we mee werken in {loc.name}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-8">
            {loc.sectoren.map(s => (
              <div
                key={s.label}
                className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
              >
                <h3 className="text-h4 mb-2">{s.label}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{s.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Faq items={loc.faq} />
        </Container>
      </Section>

      <CtaBand
        heading="Plan het gratis kennismakingsgesprek."
        sub="Het gesprek van 30 minuten is echt gratis. Als wij niet de juiste hulp zijn, zeggen we dat tijdens het gesprek."
        cta="Plan een gratis gesprek"
        href="/book"
      />

      <div className="text-center py-10">
        <Link href="/nl/locaties" className="link-arrow text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
          Alle locaties <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </>
  );
}
