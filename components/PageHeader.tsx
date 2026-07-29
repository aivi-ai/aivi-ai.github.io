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

// Shared interior-page header. Light section with a subtle corner accent
// glow and a hairline separator, so every interior page shares one confident,
// consistent opening without needing the full dark hero. Server component.
export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  children,
  maxWidth = '60ch',
}: Props) {
  return (
    <section className="page-header relative overflow-hidden">
      <div aria-hidden="true" className="page-header-glow" />
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
