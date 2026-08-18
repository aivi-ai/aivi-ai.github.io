import type { Metadata } from 'next';
import { company } from '@/content/company';

const siteUrl = company.siteUrl;

export function buildMetadata({
  title,
  description,
  path = '',
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;
  // The root layout's title template ('%s - AIVI') appends the brand exactly
  // once. Strip any author-written suffix so it never doubles.
  const fullTitle = title.endsWith(' - AIVI') ? title.replace(/ - AIVI$/, '') : title;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'AIVI',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export { siteUrl };
