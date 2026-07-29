import Link from 'next/link';
import type { Segment } from '@/content/segments';

interface Props {
  segment: Pick<Segment, 'slug' | 'label' | 'cardLine'>;
}

export function SegmentCard({ segment }: Props) {
  const { slug, label, cardLine } = segment;

  return (
    <Link
      href={`/who-we-help/${slug}`}
      className="card group block p-8 card-lift"
      style={{ textDecoration: 'none' }}
    >
      <h3
        className="text-h3 mb-3 group-hover:underline"
        style={{ color: 'var(--color-ink)' }}
      >
        {label}
      </h3>
      <p style={{ color: 'var(--color-ink-soft)' }}>{cardLine}</p>
      <span
        className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium"
        style={{ color: 'var(--color-accent)' }}
      >
        Learn more
        <span
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
