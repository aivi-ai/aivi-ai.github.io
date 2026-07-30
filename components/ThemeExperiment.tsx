'use client';

import { useEffect } from 'react';

// Reports which register the visitor saw (substance-light vs pitch-dark),
// so the A/B test is measurable when analytics is wired. The register is
// chosen before paint by the inline script in app/layout.tsx; this only
// reads the resulting attribute and forwards it. Fully guarded — a no-op
// until PostHog or another analytics tool is connected.

const DEFAULT_THEME = 'light';

export function ThemeExperiment() {
  useEffect(() => {
    const theme =
      document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;

    const w = window as unknown as {
      posthog?: { capture?: (e: string, p?: Record<string, unknown>) => void };
      dataLayer?: { push?: (o: Record<string, unknown>) => void };
    };

    try {
      w.posthog?.capture?.('theme_view', { theme });
    } catch {
      /* analytics not present — ignore */
    }
    try {
      w.dataLayer?.push?.({ event: 'theme_view', site_theme: theme });
    } catch {
      /* analytics not present — ignore */
    }
  }, []);

  return null;
}
