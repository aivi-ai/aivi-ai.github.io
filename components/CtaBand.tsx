import { Button } from './Button';
import { Container } from './Container';

interface Props {
  heading: string;
  sub?: string;
  cta: string;
  href: string;
  topic?: string;
}

export function CtaBand({ heading, sub, cta, href, topic }: Props) {
  const resolvedHref = topic ? `${href}?topic=${topic}` : href;

  return (
    <div className="role-closing relative py-20 md:py-28 text-center overflow-hidden">
      <div aria-hidden="true" className="glow-accent" />
      <div aria-hidden="true" className="grid-texture" />
      <Container className="relative z-10">
        <div className="relative flex flex-col items-center gap-6 max-w-[680px] mx-auto">
          <h2 className="text-display" style={{ color: 'var(--color-ink)' }}>
            {heading}
          </h2>
          {sub && (
            <p className="text-lede" style={{ color: 'var(--color-ink-soft)' }}>
              {sub}
            </p>
          )}
          <Button href={resolvedHref} variant="primary" size="lg">
            {cta}
          </Button>
        </div>
      </Container>
    </div>
  );
}
