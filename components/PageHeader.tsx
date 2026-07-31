import { type ReactNode } from 'react';
import { Container } from './Container';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Rendered above the eyebrow (e.g. breadcrumbs). */
  breadcrumbs?: ReactNode;
  /** Rendered below the lede, inside the text column (e.g. asides). */
  children?: ReactNode;
  maxWidth?: string;
}

// Interior-page opening - shares the role-open geometry with HomeHero
// but at reduced scale (text-h1, lighter padding). Register-adaptive:
// light register gets the warm glow orb; dark register gets glow-accent + grid.
export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  children,
  maxWidth = '60ch',
}: Props) {
  return (
    <section
      className="role-open"
      style={{ borderBottom: '1px solid var(--color-line)' }}
    >
      <div aria-hidden="true" className="glow-warm" />
      <div aria-hidden="true" className="glow-accent" />
      <div aria-hidden="true" className="grid-texture" />
      <Container className="relative z-10">
        {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}
        <div style={{ maxWidth }}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1
            className="text-h1"
            style={{ color: 'var(--color-ink)', marginBottom: lede ? '1rem' : 0 }}
          >
            {title}
          </h1>
          {lede && <p className="text-lede">{lede}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
