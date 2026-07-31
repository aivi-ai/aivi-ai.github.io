import Link from 'next/link';
import type { Service } from '@/content/services';

interface Props {
  service: Service;
}

export function ServiceCard({ service }: Props) {
  const {
    slug,
    name,
    outcome,
    hours,
    price,
    priceNote,
    turnaround,
    paymentMode,
    paymentLink,
  } = service;

  const ctaHref =
    paymentMode === 'self-serve' && paymentLink
      ? paymentLink
      : `/book?topic=${slug}`;

  const ctaLabel =
    paymentMode === 'self-serve'
      ? `Book and pay - ${price}`
      : 'Book a free 30-min call';

  return (
    <article
      className="card group flex flex-col gap-4 p-7 card-lift"
      style={{ borderTop: '3px solid var(--color-accent)' }}
    >
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-h3" style={{ color: 'var(--color-ink)' }}>
          {name}
        </h3>

        <p style={{ color: 'var(--color-ink-soft)' }}>{outcome}</p>

        <div className="flex flex-wrap gap-2">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-[var(--radius-pill)] text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-surface-alt)',
              color: 'var(--color-ink-soft)',
            }}
          >
            {hours}
          </span>
          <span
            className="stat-mono inline-flex items-center px-3 py-1 rounded-[var(--radius-pill)] text-sm"
            style={{
              backgroundColor: 'var(--color-accent-soft)',
              color: 'var(--color-accent)',
              boxShadow: 'inset 0 0 0 1px var(--color-accent-glow)',
            }}
          >
            {price}
            {priceNote && <span className="font-sans font-normal">{` · ${priceNote}`}</span>}
          </span>
        </div>

        <p className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
          {turnaround}
        </p>
      </div>

      <div className="flex flex-col gap-2 pt-2" style={{ borderTop: '1px solid var(--color-line)' }}>
        <Link
          href={`/services/${slug}`}
          className="link-arrow text-sm font-medium"
          style={{ color: 'var(--color-accent)' }}
        >
          Learn more <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          href={ctaHref}
          className="btn btn-primary btn-md"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
