import { company } from '@/content/company';
import { services } from '@/content/services';

const siteUrl = company.siteUrl;
const orgId = `${siteUrl}/#organization`;

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': orgId,
    name: company.legalName,
    alternateName: company.brandName,
    url: siteUrl,
    description: 'Senior AI consulting in hours, not months. Fixed-scope engagements, published prices, delivered in days.',
    areaServed: 'Worldwide',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: company.countryCode,
    },
    email: company.email !== 'TODO_EMAIL' ? company.email : undefined,
    vatID: company.vat,
    priceRange: '€75 – €3,000',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Consulting Engagements',
      itemListElement: services.map(s => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.outcome,
          url: `${siteUrl}/services/${s.slug}`,
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          description: s.price,
          valueAddedTaxIncluded: false,
        },
      })),
    },
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: company.brandName,
    description: company.tagline,
  };
}

export function serviceJsonLd(slug: string) {
  const s = services.find(sv => sv.slug === slug);
  if (!s) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.outcome,
    url: `${siteUrl}/services/${s.slug}`,
    serviceType: 'AI Consulting',
    provider: { '@id': orgId },
    areaServed: 'Worldwide',
    audience: { '@type': 'Audience', audienceType: s.audiences.join(', ') },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      description: s.price,
      valueAddedTaxIncluded: false,
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd({
  headline,
  description,
  datePublished,
  url,
}: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    url,
    author: { '@id': orgId },
    publisher: { '@id': orgId },
  };
}
