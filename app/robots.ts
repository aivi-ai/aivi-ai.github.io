import type { MetadataRoute } from 'next';
import { company } from '@/content/company';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep confirmation page out of crawl - it's noindexed but belt-and-braces
      disallow: ['/book/confirmed'],
    },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  };
}
