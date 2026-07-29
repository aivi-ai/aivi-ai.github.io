import { type ReactNode } from 'react';

interface Props {
  tone?: 'paper' | 'alt' | 'surface' | 'dark';
  children: ReactNode;
  className?: string;
  id?: string;
}

const bgMap: Record<NonNullable<Props['tone']>, string | undefined> = {
  paper: 'var(--color-paper)',
  alt: 'var(--color-surface-alt)',
  surface: 'var(--color-surface)',
  dark: undefined, // handled via .section-dark class
};

export function Section({ tone = 'paper', children, className = '', id }: Props) {
  const isDark = tone === 'dark';
  const showAccentLine = tone !== 'paper' && !isDark;

  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${isDark ? 'section-dark' : ''} ${className}`}
      style={isDark ? undefined : { backgroundColor: bgMap[tone] }}
    >
      {showAccentLine && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent, var(--color-accent) 20%, var(--color-accent) 80%, transparent)',
            opacity: 0.25,
          }}
        />
      )}
      {children}
    </section>
  );
}
