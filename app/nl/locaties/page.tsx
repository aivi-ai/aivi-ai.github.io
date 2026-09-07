import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { locaties } from '@/content/locaties';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { CtaBand } from '@/components/CtaBand';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Locaties - AI-consultancy in de Randstad',
  description:
    'AI-consultancy in Amsterdam, Utrecht, Rotterdam en Den Haag. Vaste prijzen, gescoopte engagements, senior AI-experts - actief in de hele Randstad.',
  path: '/nl/locaties',
});

export default function LocatiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Locaties"
        title="AI-consultancy in de Randstad"
        lede="Gevestigd in Amsterdam, actief in de hele Randstad. Senior AI-expertise met vaste prijzen en oplevering in dagen - voor Amsterdam, Utrecht, Rotterdam en Den Haag."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {locaties.map(l => (
              <Link
                key={l.slug}
                href={`/nl/locaties/${l.slug}`}
                className="group rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 transition-colors hover:border-[var(--color-accent)]"
              >
                <p className="eyebrow mb-2">{l.provincie}</p>
                <h2 className="text-h3 mb-3">{l.name}</h2>
                <p className="text-sm leading-relaxed text-[var(--color-ink-soft)] mb-4">{l.intro}</p>
                <span
                  className="link-arrow text-sm font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  AI-consultancy in {l.name} <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Start met een gratis gesprek."
        sub="Het kennismakingsgesprek van 30 minuten is echt gratis. We vertellen je eerlijk of we je kunnen helpen."
        cta="Plan een gratis gesprek"
        href="/book"
      />
    </>
  );
}
