import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { company } from '@/content/company';

// Emitted to a static /feed.xml at build time (no server under `output: export`).
export const dynamic = 'force-static';

/** Minimal XML text escaping for values placed inside elements (CDATA-free). */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface ResourceMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  audience?: string;
}

function getResources(): ResourceMeta[] {
  const dir = path.join(process.cwd(), 'content/resources');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title ?? filename.replace(/\.md$/, ''),
        description: data.description ?? '',
        date: data.date ?? '2024-01-01',
        audience: data.audience,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function GET(): Response {
  const resources = getResources();
  const base = company.siteUrl;
  const self = `${base}/feed.xml`;

  const items = resources
    .map((r) => {
      const url = `${base}/resources/${r.slug}`;
      // Noon UTC keeps the date stable regardless of the build machine's zone.
      const pubDate = new Date(`${r.date}T12:00:00Z`).toUTCString();
      return [
        '    <item>',
        `      <title>${escapeXml(r.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(r.description)}</description>`,
        ...(r.audience ? [`      <category>${escapeXml(r.audience)}</category>`] : []),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(company.brandName)} — Resources</title>
    <link>${base}/resources</link>
    <description>${escapeXml(company.tagline)}</description>
    <language>en</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
