export const company = {
  legalName: 'AIVI AI Services',
  brandName: 'AIVI',
  street: 'Science Park 608',
  postalCode: '1098 XH',
  city: 'Amsterdam',
  country: 'The Netherlands',
  countryCode: 'NL',
  vat: 'NL005436672B26',
  kvk: '42024018',
  email: 'hello@weareaivi.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://weareaivi.com',
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/dev-weareaivi/30min',
  tagline: 'AI expertise, by the hour.',
  socials: [] as string[], // [FOUNDER INPUT] — LinkedIn etc.
};

export type Company = typeof company;
