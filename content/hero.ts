// Home hero copy - two A/B variants.
//
// A = control / default (celebrates the builder). Rendered in static HTML and
//     shown to no-JS visitors and crawlers.
// C = alternate (celebrates conviction / "your name on it").
//
// The active variant is chosen client-side, before paint, by the inline script
// in app/layout.tsx (50/50 bucket, persisted; ?hero=a|c forces one). CSS in
// globals.css shows the active slot. See DESIGN_OVERHAUL.md §"Voice & A/B".

export type HeroVariantId = 'a' | 'c';

/** Control shown to no-JS visitors, crawlers, and as the fallback bucket. */
export const DEFAULT_HERO_VARIANT: HeroVariantId = 'a';

export interface HeadlinePart {
  text: string;
  /** Render with the accent gradient treatment. */
  accent?: boolean;
}

export interface HeroContent {
  id: HeroVariantId;
  headline: HeadlinePart[];
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  trustLine?: string;
}

export const heroVariants: Record<HeroVariantId, HeroContent> = {
  a: {
    id: 'a',
    headline: [
      { text: 'For the ones already ' },
      { text: 'building', accent: true },
      { text: '.' },
    ],
    lede: "You didn't wait for permission to start. You don't need a three-month engagement either - just senior AI judgment, by the hour, so what you ship holds up.",
    primaryCta: { label: 'Book a free 30-min call', href: '/book' },
    secondaryCta: { label: 'See what we do and what it costs', href: '/pricing' },
    trustLine: 'Fixed scope · Price on the page · No sales script',
  },
  c: {
    id: 'c',
    headline: [
      { text: 'Ship like it’s your ' },
      { text: 'name on it', accent: true },
      { text: '.' },
    ],
    lede: "Because it usually is. Get a senior read on what you've built with AI - what's fine, what breaks first at 10x, and what to do about it - in days, not months.",
    primaryCta: { label: 'Book a free 30-min call', href: '/book' },
    secondaryCta: { label: 'See what we do and what it costs', href: '/pricing' },
    trustLine: 'Fixed scope · Price on the page · No sales script',
  },
};
