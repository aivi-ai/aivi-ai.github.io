import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { company } from '@/content/company';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';

export const metadata: Metadata = buildMetadata({
  title: 'Contact - AIVI',
  description:
    'Get in touch with AIVI AI Services. Email us or book a free 30-minute call.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact">
        <div className="mt-2">
            {/* Email */}
            <div style={{ marginBottom: '2rem' }}>
              {company.email !== 'TODO_EMAIL' ? (
                <p className="text-lede">
                  Email us at{' '}
                  <a
                    href={`mailto:${company.email}`}
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {company.email}
                  </a>
                  .
                </p>
              ) : (
                <p
                  className="text-lede"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  [Email address - required before launch]
                </p>
              )}
              <p
                className="mt-3"
                style={{ color: 'var(--color-ink-soft)', lineHeight: '1.65' }}
              >
                We aim to respond within one working day.
              </p>
            </div>

            {/* Steering line */}
            <div
              className="p-5 rounded-[var(--radius-lg)]"
              style={{
                backgroundColor: 'var(--color-accent-soft)',
                border: '1px solid var(--color-accent)',
                marginBottom: '2rem',
              }}
            >
              <p
                className="text-sm"
                style={{ color: 'var(--color-ink)', lineHeight: '1.65', marginBottom: '0.75rem' }}
              >
                If it&rsquo;s about working together, the free 30-minute call is faster and
                more useful. You describe the situation, we ask questions and tell you what
                we think - all in one conversation.
              </p>
              <Button href="/book" variant="primary" size="md">
                Book a free 30-min call
              </Button>
            </div>

            {/* Company legal block */}
            <div
              style={{
                borderTop: '1px solid var(--color-line)',
                paddingTop: '1.5rem',
              }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--color-ink)', marginBottom: '0.5rem' }}
              >
                {company.legalName}
              </p>
              <address
                className="not-italic text-sm flex flex-col gap-1"
                style={{ color: 'var(--color-ink-muted)', lineHeight: '1.6' }}
              >
                <span>{company.street}</span>
                <span>
                  {company.postalCode} {company.city}, {company.country}
                </span>
                <span>
                  KvK:{' '}
                  {company.kvk !== 'TODO_KVK' ? (
                    company.kvk
                  ) : (
                    <span style={{ color: 'var(--color-warn)' }}>
                      [FOUNDER INPUT - required before launch]
                    </span>
                  )}
                </span>
                <span>VAT: {company.vat}</span>
                {company.email !== 'TODO_EMAIL' && (
                  <a
                    href={`mailto:${company.email}`}
                    style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                  >
                    {company.email}
                  </a>
                )}
              </address>
            </div>
        </div>
      </PageHeader>
    </>
  );
}
