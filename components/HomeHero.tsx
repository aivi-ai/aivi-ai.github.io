import { Fragment } from 'react';
import { Hero } from './Hero';
import { heroVariants, type HeroContent } from '@/content/hero';

// Renders BOTH A/B hero variants into the static HTML. Only one is visible:
// the pre-paint script in app/layout.tsx sets `html[data-hero]`, and CSS in
// globals.css shows the matching slot. Variant A is the control — it is the
// one visible with no JS and to crawlers. This is a server component; the
// variant switch is pure CSS, no event handlers.

function renderHeadline(content: HeroContent) {
  return (
    <>
      {content.headline.map((part, i) =>
        part.accent ? (
          <span key={i} className="text-gradient-accent">
            {part.text}
          </span>
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        )
      )}
    </>
  );
}

export function HomeHero() {
  return (
    <>
      {(['a', 'c'] as const).map((id) => {
        const content = heroVariants[id];
        return (
          <div key={id} data-hero-slot={id}>
            <Hero
              variant="dark"
              h1={renderHeadline(content)}
              lede={content.lede}
              primaryCta={content.primaryCta}
              secondaryCta={content.secondaryCta}
              trustLine={content.trustLine}
            />
          </div>
        );
      })}
    </>
  );
}
