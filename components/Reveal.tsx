'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: 0 | 100 | 200 | 300;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Skip animation — element stays fully visible
      el.classList.remove('reveal-hidden');
      return;
    }

    el.classList.add('reveal-hidden');

    let timeoutId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay) {
              timeoutId = window.setTimeout(() => {
                el.classList.remove('reveal-hidden');
                el.classList.add('reveal-visible');
              }, delay);
            } else {
              el.classList.remove('reveal-hidden');
              el.classList.add('reveal-visible');
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
