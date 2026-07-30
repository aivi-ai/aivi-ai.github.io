import { services } from '@/content/services';

const knownSlugs = new Set(services.map(s => s.slug));

export function buildCalendlyUrl(topic?: string | null): string {
  const base = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/dev-weareaivi/30min';
  const p = new URLSearchParams({
    hide_gdpr_banner: '1',
    primary_color: '1F4FFF',
    utm_source: 'website',
    utm_medium: 'book_page',
  });
  const safeTopic = topic && knownSlugs.has(topic) ? topic : undefined;
  if (safeTopic) {
    p.set('utm_campaign', safeTopic);
    p.set('utm_content', safeTopic);
  }
  return `${base}?${p.toString()}`;
}

export function isKnownSlug(slug: string | null | undefined): boolean {
  return !!slug && knownSlugs.has(slug);
}
