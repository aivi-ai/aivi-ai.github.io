import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';
import { articleJsonLd, faqJsonLd } from '@/lib/jsonld';
import { company } from '@/content/company';
import { getResourceMeta, getResourceHtml, getResourceSlugs } from '@/lib/resources';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { JsonLd } from '@/components/JsonLd';
import { Faq } from '@/components/Faq';

// ── Static generation ───────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getResourceSlugs().map((slug) => ({ slug }));
}

// ── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getResourceMeta(slug);
  if (!meta) return {};

  return buildMetadata({
    title: meta.title,
    description: meta.description ?? '',
    path: `/resources/${slug}`,
  });
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Guard: file must exist
  const meta = getResourceMeta(slug);
  const html = getResourceHtml(slug);
  if (!meta || !html) notFound();

  const displayDate = meta.date
    ? new Date(meta.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const jsonLd = articleJsonLd({
    headline: meta.title,
    description: meta.description ?? '',
    datePublished: meta.date ?? new Date().toISOString(),
    url: `${company.siteUrl}/resources/${slug}`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      {(meta.faq ?? []).length > 0 && <JsonLd data={faqJsonLd(meta.faq!)} />}

      {/* Header */}
      <Section role="body">
        <Container>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0 text-sm">
              <li>
                <Link
                  href="/"
                  style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: 'var(--color-line)' }}>/</li>
              <li>
                <Link
                  href="/resources"
                  style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                >
                  Resources
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: 'var(--color-line)' }}>/</li>
              <li aria-current="page" style={{ color: 'var(--color-ink-muted)' }}>
                {meta.title ?? slug}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap gap-2 items-center mb-4 text-small">
            {displayDate && (
              <time dateTime={meta.date} style={{ color: 'var(--color-ink-muted)' }}>
                {displayDate}
              </time>
            )}
            {meta.readingTime && (
              <>
                <span aria-hidden="true" style={{ color: 'var(--color-line)' }}>·</span>
                <span style={{ color: 'var(--color-ink-muted)' }}>{meta.readingTime}</span>
              </>
            )}
            {meta.audience && (
              <>
                <span aria-hidden="true" style={{ color: 'var(--color-line)' }}>·</span>
                <span
                  className="rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {meta.audience}
                </span>
              </>
            )}
          </div>

          <h1 className="text-h1 max-w-3xl">{meta.title ?? slug}</h1>

          {meta.description && (
            <p className="text-lede mt-4 max-w-2xl" style={{ color: 'var(--color-ink-soft)' }}>
              {meta.description}
            </p>
          )}
        </Container>
      </Section>

      {/* Article body */}
      <Section role="body">
        <Container>
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
            {/* Main content */}
            <article
              className="prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Sidebar - soft CTA */}
            <aside className="hidden lg:block">
              <div
                className="sticky top-10 rounded-[var(--radius-lg)] p-6 space-y-4"
                style={{
                  backgroundColor: 'var(--color-accent-soft)',
                  border: '1px solid var(--color-line)',
                }}
              >
                <p className="text-h3">Want expert help?</p>
                <p className="text-sm" style={{ color: 'var(--color-ink-soft)' }}>
                  AIVI offers fixed-scope AI consulting - code reviews, workflow
                  audits, career roadmaps, and more. Book a free 30-minute call
                  to find out if we&rsquo;re useful to you.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-[var(--radius-sm)] text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    minHeight: '44px',
                  }}
                >
                  Book a free call &rarr;
                </Link>
                <Link
                  href="/services"
                  className="block text-sm text-center"
                  style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                >
                  See all services
                </Link>
              </div>
            </aside>
          </div>

          {/* FAQ — from the article's frontmatter */}
          {(meta.faq ?? []).length > 0 && (
            <Section role="body">
              <Container>
                <h2 className="text-h2 mb-6">Frequently asked questions</h2>
                <Faq
                  items={(meta.faq ?? []) as { q: string; a: string }[]}
                />
              </Container>
            </Section>
          )}

          {/* Mobile CTA - below article */}
          <div
            className="mt-16 lg:hidden rounded-[var(--radius-lg)] p-6 space-y-4"
            style={{
              backgroundColor: 'var(--color-accent-soft)',
              border: '1px solid var(--color-line)',
            }}
          >
            <p className="text-h3">Want expert help?</p>
            <p className="text-sm" style={{ color: 'var(--color-ink-soft)' }}>
              AIVI offers fixed-scope AI consulting - code reviews, workflow
              audits, career roadmaps, and more. Book a free 30-minute call.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-[var(--radius-sm)] text-sm font-medium"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#ffffff',
                textDecoration: 'none',
                minHeight: '44px',
              }}
            >
              Book a free call &rarr;
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
