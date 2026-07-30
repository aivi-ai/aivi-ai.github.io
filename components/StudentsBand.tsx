import Link from 'next/link';
import { Container } from './Container';
import { studentsBand } from '@/content/home';

// A distinct, warmer spotlight for students — the easy "yes" and the most
// relatable segment. Light accent-tinted band (not the dark anchor), so it
// reads as its own energetic moment in the page rhythm. Server component;
// hover is CSS only.

export function StudentsBand() {
  const { eyebrow, heading, body, price, priceNote, points, cta } = studentsBand;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 students-band role-raised">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          {/* Left — the anthem + offer */}
          <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="text-h2 mb-4" style={{ color: 'var(--color-ink)' }}>
              {heading}
            </h2>
            <p className="text-lede mb-6" style={{ maxWidth: '46ch' }}>
              {body}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={cta.href} className="btn btn-primary btn-lg">
                {cta.label} <span aria-hidden="true">&nbsp;&rarr;</span>
              </Link>
              <span
                className="inline-flex items-baseline gap-2"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                <span
                  className="stat-mono"
                  style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}
                >
                  {price}
                </span>
                <span className="text-sm">{priceNote}</span>
              </span>
            </div>
          </div>

          {/* Right — the concrete detail */}
          <div className="card p-7 md:p-8">
            <p
              className="text-small font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--color-ink-muted)', letterSpacing: '0.1em' }}
            >
              What you walk away with
            </p>
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center"
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'var(--color-accent-soft)',
                      color: 'var(--color-accent)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    &#10003;
                  </span>
                  <span style={{ color: 'var(--color-ink-soft)' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
