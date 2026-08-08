import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const dir = path.join(process.cwd(), 'content/resources');

export interface ResourceMeta {
  slug: string;
  title: string;
  description?: string;
  date: string;
  readingTime?: string;
  audience?: string;
  faq?: { q: string; a: string }[];
}

/** All resource slugs, derived from the .md files in content/resources/. */
export function getResourceSlugs(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.replace(/\.md$/, ''));
}

/** Frontmatter metadata for one resource, or null if the slug has no file. */
export function getResourceMeta(slug: string): ResourceMeta | null {
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
  return {
    slug,
    title: data.title ?? slug,
    description: data.description,
    date: data.date ?? '2024-01-01',
    readingTime: data.readingTime,
    audience: data.audience,
    faq: data.faq,
  };
}

/** All resources, newest first. */
export function getResources(): ResourceMeta[] {
  return getResourceSlugs()
    .map((slug) => getResourceMeta(slug))
    .filter((r): r is ResourceMeta => r !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Article body rendered to HTML at build time via `marked`.
 * Trusted, in-repo Markdown (same pattern as aijwerkingen.github.io).
 */
export function getResourceHtml(slug: string): string | null {
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { content } = matter(fs.readFileSync(filePath, 'utf-8'));
  return marked.parse(content) as string;
}
