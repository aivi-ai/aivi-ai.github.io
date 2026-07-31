import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

import { services } from '@/content/services';
import { segments } from '@/content/segments';
import { company } from '@/content/company';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const now = new Date();

  const staticRoutes = [
    '/',
    '/services',
    '/who-we-help',
    '/approach',
    '/pricing',
    '/about',
    '/resources',
    '/contact',
  ];

  const serviceRoutes = services.map((s) => `/services/${s.slug}`);
  const segmentRoutes = segments.map((s) => `/who-we-help/${s.slug}`);

  // Resource slugs from MDX files - read at build time
  const resourceDir = path.join(process.cwd(), 'content/resources');
  const resourceSlugs = fs.existsSync(resourceDir)
    ? fs
        .readdirSync(resourceDir)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => `/resources/${f.replace('.mdx', '')}`)
    : [];

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...segmentRoutes,
    ...resourceSlugs,
  ];

  return allRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority:
      route === '/'
        ? 1
        : route.startsWith('/services/')
          ? 0.8
          : route.startsWith('/resources/')
            ? 0.7
            : 0.6,
  }));
}
