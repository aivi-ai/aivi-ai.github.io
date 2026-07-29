import type { Testimonial } from '@/content/testimonials';

interface Props {
  items: Testimonial[];
}

export function Testimonials({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article key={index} className="card flex flex-col gap-4 p-6">
          <blockquote
            className="flex-1 text-base leading-relaxed italic"
            style={{ color: 'var(--color-ink-soft)', margin: 0 }}
          >
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <footer className="flex flex-col gap-0.5">
            <cite
              className="text-sm font-semibold not-italic"
              style={{ color: 'var(--color-ink)' }}
            >
              {item.name}
            </cite>
            <span className="text-sm" style={{ color: 'var(--color-ink-muted)' }}>
              {item.role}
              {item.company && `, ${item.company}`}
            </span>
          </footer>
        </article>
      ))}
    </div>
  );
}
