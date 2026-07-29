import type { ReactNode } from 'react';
import { Button } from './Button';
import { Container } from './Container';

interface Cta {
  label: string;
  href: string;
}

interface Props {
  eyebrow?: string;
  h1: ReactNode;
  lede: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  trustLine?: string;
  variant?: 'light' | 'dark';
}

export function Hero({
  eyebrow,
  h1,
  lede,
  primaryCta,
  secondaryCta,
  trustLine,
  variant = 'light',
}: Props) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 text-center ${isDark ? 'section-dark' : ''}`}
      style={isDark ? undefined : { backgroundColor: 'var(--color-paper)' }}
    >
      {isDark && (
        <>
          <div aria-hidden="true" className="glow-accent" />
          <div aria-hidden="true" className="grid-texture" />
        </>
      )}
      <Container className="relative z-10">
        <div className="max-w-[760px] mx-auto flex flex-col items-center gap-6">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}

          <h1 className="text-h1" style={{ color: 'var(--color-ink)' }}>
            {h1}
          </h1>

          <p
            className="text-lede max-w-[600px]"
            style={isDark ? { color: 'var(--color-ink-on-dark-soft)' } : undefined}
          >
            {lede}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Button href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant={isDark ? 'outline' : 'secondary'}
                size="lg"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>

          {trustLine && (
            <p
              className="text-sm mt-1"
              style={{
                color: isDark ? 'var(--color-ink-on-dark-soft)' : 'var(--color-ink-muted)',
                fontFamily: isDark ? 'var(--font-mono)' : undefined,
              }}
            >
              {trustLine}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
