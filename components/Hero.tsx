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
}

export function Hero({ eyebrow, h1, lede, primaryCta, secondaryCta, trustLine }: Props) {
  return (
    <div className="role-open text-center">
      {/* Light-register: subtle warm orb top-right */}
      <div aria-hidden="true" className="glow-warm" />
      {/* Dark-register: warm accent glow + grid (toggled via CSS per register) */}
      <div aria-hidden="true" className="glow-accent" />
      <div aria-hidden="true" className="grid-texture" />

      <Container className="relative z-10">
        <div className="max-w-[760px] mx-auto flex flex-col items-center gap-6">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}

          <h1 className="text-display" style={{ color: 'var(--color-ink)' }}>
            {h1}
          </h1>

          <p className="text-lede max-w-[600px]">
            {lede}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Button href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="outline" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>

          {trustLine && (
            <p
              className="text-sm mt-1"
              style={{
                color: 'var(--color-ink-muted)',
                fontFamily: 'var(--font-mono)',
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
