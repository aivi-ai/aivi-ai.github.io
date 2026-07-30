import Link from 'next/link';
import { company } from '@/content/company';
import { services } from '@/content/services';
import { segments } from '@/content/segments';

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs font-semibold uppercase tracking-wider mb-4"
      style={{ color: 'var(--color-ink-muted)' }}
    >
      {children}
    </h3>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http');
  return (
    <li>
      <Link
        href={href}
        className="footer-link text-sm leading-relaxed"
        style={{
          color: 'var(--color-ink-soft)',
          textDecoration: 'none',
        }}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  return (
    <footer className="section-dark relative overflow-hidden" aria-label="Site footer">
      <div aria-hidden="true" className="glow-accent" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-20">
        <div
          className="pb-12 mb-12 flex items-baseline justify-between flex-wrap gap-4"
          style={{ borderBottom: '1px solid var(--color-line)' }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: '2.25rem',
              letterSpacing: '-0.04em',
              color: 'var(--color-ink)',
            }}
          >
            AIVI
          </span>
          <p
            className="text-sm max-w-xs"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            {company.tagline}
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Services */}
          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {services.map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Who We Help */}
          <div>
            <FooterHeading>Who We Help</FooterHeading>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {segments.map((seg) => (
                <FooterLink key={seg.slug} href={`/who-we-help/${seg.slug}`}>
                  {seg.label}
                </FooterLink>
              ))}
              <FooterLink href="/approach">Approach</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/resources">Resources</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <FooterHeading>Legal</FooterHeading>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              <FooterLink href="/legal/privacy">Privacy</FooterLink>
              <FooterLink href="/legal/terms">Terms</FooterLink>
            </ul>
          </div>
        </div>

        {/* Company block */}
        <div
          className="pt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
          style={{ borderTop: '1px solid var(--color-line)' }}
        >
          <div className="flex flex-col gap-1">
            <p
              className="font-semibold text-sm"
              style={{ color: 'var(--color-ink)' }}
            >
              {company.legalName}
            </p>
            <address
              className="not-italic text-sm flex flex-col gap-0.5"
              style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
            >
              <span>{company.street}</span>
              <span>
                {company.postalCode} {company.city}, {company.country}
              </span>
              <span>KvK: {company.kvk}</span>
              <span>VAT: {company.vat}</span>
              {company.email !== 'TODO_EMAIL' && (
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1"
                  style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                >
                  {company.email}
                </a>
              )}
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
