'use client';

import { useEffect } from 'react';
import { DEFAULT_HERO_VARIANT } from '@/content/hero';

// Reports which hero variant the visitor saw, so the A/B test is measurable.
// The variant itself is chosen before paint by the inline script in
// app/layout.tsx; this only reads the resulting attribute and forwards it to
// whatever analytics is present. Fully guarded - a harmless no-op until an
// analytics tool (e.g. PostHog) is wired up.

export function HeroExperiment() {
  useEffect(() => {
    const variant =
      document.documentElement.getAttribute('data-hero') ||
      DEFAULT_HERO_VARIANT;

    const w = window as unknown as {
      posthog?: { capture?: (e: string, p?: Record<string, unknown>) => void };
      dataLayer?: { push?: (o: Record<string, unknown>) => void };
    };

    try {
      w.posthog?.capture?.('hero_view', { variant });
    } catch {
      /* analytics not present - ignore */
    }
    try {
      w.dataLayer?.push?.({ event: 'hero_view', hero_variant: variant });
    } catch {
      /* analytics not present - ignore */
    }
  }, []);

  return null;
}
