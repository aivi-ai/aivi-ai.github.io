import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Resources — AIVI',
  description:
    'Free guides for founders, professionals, and students on AI tools, code review, and career planning.',
  path: '/resources',
});

interface ResourceMeta {
  slug: string;
  title: string;
  description?: string;
  date: string;
  readingTime?: string;
  audience?: string;
}

function getResources(): ResourceMeta[] {
  const dir = path.join(process.cwd(), 'content/resources');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title ?? filename.replace('.mdx', ''),
        description: data.description,
        date: data.date ?? '2024-01-01',
        readingTime: data.readingTime,
        audience: data.audience,
      } satisfies ResourceMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function ResourceCard({ resource }: { resource: ResourceMeta }) {
  const displayDate = new Date(resource.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="card card-lift p-6 flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 text-small items-center">
        <time dateTime={resource.date} style={{ color: 'var(--color-ink-muted)' }}>
          {displayDate}
        </time>
        {resource.readingTime && (
          <>
            <span aria-hidden="true" style={{ color: 'var(--color-line)' }}>
              ·
            </span>
            <span style={{ color: 'var(--color-ink-muted)' }}>{resource.readingTime}</span>
          </>
        )}
        {resource.audience && (
          <>
            <span aria-hidden="true" style={{ color: 'var(--color-line)' }}>
              ·
            </span>
            <span
              className="rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: 'var(--color-accent-soft)',
                color: 'var(--color-accent)',
              }}
            >
              {resource.audience}
            </span>
          </>
        )}
      </div>

      <h2 className="text-h3">
        <Link
          href={`/resources/${resource.slug}`}
          style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
          className="hover:underline"
        >
          {resource.title}
        </Link>
      </h2>

      {resource.description && (
        <p style={{ color: 'var(--color-ink-soft)' }}>{resource.description}</p>
      )}

      <Link
        href={`/resources/${resource.slug}`}
        className="text-sm font-medium mt-auto"
        style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
      >
        Read guide &rarr;
      </Link>
    </article>
  );
}

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Resources"
        lede="Free, ungated, useful guides for founders, professionals, and students."
      />

      <Section role="body">
        <Container>
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard key={resource.slug} resource={resource} />
              ))}
            </div>
          ) : (
            <p
              className="text-lede"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              More resources coming soon.
            </p>
          )}
        </Container>
      </Section>

      <CtaBand
        heading="Have a question a guide didn't answer?"
        sub="Book a free 30-minute call. No obligation, no sales script — we'll tell you honestly what we think."
        cta="Book a free call"
        href="/book"
      />
    </>
  );
}
