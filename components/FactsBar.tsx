import Link from 'next/link';

interface Props {
  hours: string;
  price: string;
  turnaround: string;
  format: string;
  slug: string;
  paymentMode: 'call-first' | 'self-serve';
  paymentLink?: string;
}

interface FactItemProps {
  label: string;
  value: string;
  accent?: boolean;
  divider?: boolean;
}

function FactItem({ label, value, accent, divider }: FactItemProps) {
  return (
    <div
      className="flex flex-col gap-1 pt-4 first:pt-0"
      style={divider ? { borderTop: '1px solid var(--color-line)' } : undefined}
    >
      <dt
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: 'var(--color-ink-muted)' }}
      >
        {label}
      </dt>
      <dd
        className={accent ? 'stat-mono text-3xl' : 'text-sm font-medium'}
        style={{ color: accent ? 'var(--color-accent)' : 'var(--color-ink)' }}
      >
        {value}
      </dd>
    </div>
  );
}

export function FactsBar({
  hours,
  price,
  turnaround,
  format,
  slug,
  paymentMode,
  paymentLink,
}: Props) {
  const ctaHref =
    paymentMode === 'self-serve' && paymentLink
      ? paymentLink
      : `/book?topic=${slug}`;

  const ctaLabel =
    paymentMode === 'self-serve' ? 'Book and pay' : 'Book a free 30-min call';

  return (
    <aside className="card p-6 flex flex-col gap-1 md:sticky md:top-24">
      <dl className="flex flex-col gap-0">
        <FactItem label="Price excl. VAT" value={price} accent />
        <FactItem label="Hours" value={hours} divider />
        <FactItem label="Turnaround" value={turnaround} divider />
        <FactItem label="Format" value={format} divider />
      </dl>

      <Link
        href={ctaHref}
        className="mt-5 flex items-center justify-center px-5 py-3 rounded-[var(--radius-pill)] text-sm font-semibold transition-all duration-200 text-center hover:-translate-y-0.5"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: '#ffffff',
          minHeight: '44px',
          textDecoration: 'none',
          boxShadow: '0 8px 20px -6px rgba(31, 79, 255, 0.45)',
        }}
      >
        {ctaLabel}
      </Link>
    </aside>
  );
}
