# DESIGN_OVERHAUL.md

A self-contained brief for a cold agent to transform the AIVI website from a
generic, near-white template into a **premium consulting site** that visibly
justifies €75–€3,000 engagements. You have no prior context; everything you
need is here. Read the whole file before editing.

---

## 0. TL;DR of the problem

The site currently reads as a default Next.js starter: flat off-white
background everywhere, one blue accent, bordered-box cards, no depth, no brand
presence, no trust signals. A visitor deciding whether to pay €1,200 for a code
review lands on something that looks free. **Your job is to make it look like
senior expertise - calm, dense, confident, and expensive - without gimmicks.**

Success = a stakeholder who said "I still see a simple white background, would
people pay for this?" now says "yes, this looks like a real firm."

---

## 0.5 Voice & messaging (partly implemented - extend to the rest of the site)

The copy must **celebrate the customer, not describe the service** (the Nike
principle: don't sell the shoe's features, celebrate the athlete). Avoid flat
category/label lines like "AI consulting, from Amsterdam" or "Senior AI help" as
headlines. The shared identity across all four segments is: **they're already
building** - they didn't wait for permission, and they want to be taken
seriously and know it will hold. The "by the hour / fixed price / Amsterdam"
facts drop to a quiet trust line, not the headline.

**The home hero runs an A/B test** between two voice directions:
- **Variant A (control / default)** - *"For the ones already building."* Celebrates
  the builder; spans every segment.
- **Variant C (alternate)** - *"Ship like it's your name on it."* Celebrates
  conviction / caring that what you build holds up.

Both share the trust line **"Fixed scope · Price on the page · No sales script."**

### How the A/B test works (static-export safe, no flash)

- Copy lives in `content/hero.ts` (`heroVariants.a` / `.c`, `DEFAULT_HERO_VARIANT`).
- `components/HomeHero.tsx` renders **both** variants into the static HTML as
  slots (`data-hero-slot="a" | "c"`). It's a server component - the switch is
  pure CSS, no handlers.
- An inline pre-paint script in `app/layout.tsx` buckets the visitor 50/50,
  persists to `localStorage` (`aivi_hero`), and sets `html[data-hero]` before
  paint (no flash). `?hero=a` / `?hero=c` in the URL forces + persists a variant
  (use this for QA and to show stakeholders either version).
- CSS in `app/globals.css` (§"Hero A/B experiment") shows the active slot.
  With **no JS and for crawlers, variant A (control) is what shows** - C is
  `display:none` until the script promotes it.
- `<html suppressHydrationWarning>` is required because the script mutates
  `data-hero` before hydration (standard theme-flash pattern). Do not remove it.
- `components/HeroExperiment.tsx` reports the shown variant to analytics
  (`window.posthog?.capture('hero_view', {variant})` / `dataLayer`). It's a
  safe no-op until analytics is wired - **wire PostHog (or similar) to actually
  measure the test.** Until then it's a random display, not a real experiment.
- **SEO note:** both variants ship two `<h1>`s (one hidden). Accepted trade-off
  for the no-flash pattern; keep only these two, don't proliferate hidden H1s.

When you extend the redesign to interior pages, keep this voice. If you add more
experiments, follow the same slot + pre-paint-attribute + CSS pattern.

### Students spotlight (implemented on home)

Students are the easy "yes" and the most relatable face, so they get their own
warmer, light accent-tinted band (`components/StudentsBand.tsx`, copy in
`content/home.ts`), placed right after the segment chooser. It celebrates the
ambitious student - *"Graduate already knowing what the work wants."* - then
gives the concrete detail (90-day plan, portfolio projects, how to present the
work, €75 student rate) and links to `/who-we-help/students`. Give the other
segments similarly concrete, aspirational treatment where it fits; **do not
invent** outcomes or numbers beyond what `content/*.ts` supports.

---

## 1. Ground rules (read before touching code)

This is **Next.js 16 + React 19 + Tailwind v4**, statically exported. The stack
has sharp edges that already broke a previous attempt. Do not skip these.

1. **Server Components by default. No event handlers on them.**
   Passing `onMouseEnter` / `onMouseLeave` / `onClick` to a component that is
   not marked `'use client'` - including `next/link`'s `<Link>` - **fails the
   production build** with `Error: Event handlers cannot be passed to Client
   Component props`. This is the #1 way this task gets broken.
   - **All hover/animation must be CSS**, via classes in `app/globals.css` or
     Tailwind `hover:`/`group-hover:` utilities. Never JS-driven inline-style
     hover.
   - Components currently marked `'use client'` (they may keep handlers):
     `SiteHeader`, `MobileCtaBar`, `PriceTable`, `Reveal`, `ServicesGrid`,
     `Button`. Everything else is a server component - keep it that way unless
     there is a real interactivity reason, and if you add `'use client'`,
     justify it in the PR notes.

2. **Design tokens are the single source of truth.**
   All color/spacing/shadow lives as CSS custom properties in
   `app/globals.css` (`:root`) and is mirrored into Tailwind via
   `@theme inline`. **Never hardcode a raw hex in a component.** Use
   `var(--color-*)`. If you need a new color, add a token first.

3. **Content is data, never hardcoded in JSX.**
   Prices, service names, FAQ, segments, testimonials, company details all come
   from `content/*.ts`. Do not type a price or service name into a component.
   If a design needs a new field (e.g. an icon name per service), add it to the
   content type and populate it - don't inline it.

4. **Static export.** `next.config.ts` uses `output: 'export'`. No server-only
   APIs, no runtime env, no `next/image` loader that needs a server. Images
   must be static assets in `public/` or inline SVG. Everything must survive
   `npm run build` producing `out/`.

5. **Banned marketing words** (hard rule from the content style guide). Do not
   introduce any of these in copy you write:
   revolutionize, unlock, supercharge, game-changing, cutting-edge, seamless,
   synergy, empower, transformative, journey, elevate, harness, unleash,
   next-level, robust. Keep copy plain and concrete.

6. **Accessibility is not optional.** Maintain: visible focus rings
   (`:focus-visible` is already styled), `prefers-reduced-motion` guards on
   every transform/animation, ≥44px tap targets on interactive elements,
   sufficient text contrast (WCAG AA: ≥4.5:1 for body text) - **especially on
   any new dark sections**, aria labels, and the existing skip link. Do not
   regress these for looks.

7. **Fonts are already wired**: Geist Sans (`--font-sans`) and Geist Mono
   (`--font-mono`) via `geist/font` in `app/layout.tsx`. Use them; do not add
   webfonts (would break static/offline and add latency).

---

## 2. Design direction: "Editorial calm, but premium"

Not a flashy SaaS gradient-fest. Think a top-tier boutique consultancy or a
design studio's own site: **confident restraint, real depth, one strong idea.**

The single strong idea: **a dark, authoritative anchor** (hero and CTA) that
bookends calm, content-dense light sections. Right now everything is the same
value; introducing deliberate light/dark contrast is what will make it read as
designed rather than defaulted.

### 2.1 Palette evolution

Keep the existing ink/paper/accent identity, but add a **dark surface family**
and warm up the neutrals so white stops looking like unstyled default.

Add/adjust these tokens in `app/globals.css` `:root` (and mirror new color
tokens into the `@theme inline` block):

```css
/* Dark surface family - for hero, CTA band, footer anchor */
--color-ink-deep:     #0B0D12;   /* near-black, slightly blue */
--color-surface-dark: #12151C;   /* dark card / section */
--color-surface-dark-2: #1A1E27; /* raised dark card */
--color-line-dark:    rgba(255,255,255,0.10);
--color-ink-on-dark:  #F5F6F8;   /* primary text on dark */
--color-ink-on-dark-soft: rgba(245,246,248,0.68);

/* Accent range for gradients / glows (accent already = #1F4FFF) */
--color-accent-2:     #5B7BFF;   /* lighter accent for gradient ends */
--color-accent-3:     #8AA0FF;   /* highlight on dark */

/* Warmer paper so light sections have life, not "unstyled" */
/* (tune, don't just copy - verify contrast after) */
--color-paper:        #F7F5F1;   /* was #FBFAF8 - slightly warmer/deeper */
--color-surface-alt:  #EEEBE4;   /* was #F2F0EC - more separation */
```

Rules for using it:
- **Dark** = hero, the primary CTA band, footer. Used sparingly - it's the
  accent, not the theme. Two, maybe three dark zones per page max.
- **Light** = all content sections, alternating `paper` / `surface` /
  `surface-alt` for gentle rhythm.
- Accent blue: used **boldly** in the dark zones (gradient text, glow) and as a
  **precise** highlight in light zones (never large flat fills of pure accent).

### 2.2 Depth & texture (subtle, not noisy)

The flatness is the main complaint. Add depth with:
- **Layered shadows** (tokens `--shadow-sm/md/lg/xl` already exist - use the
  bigger ones on cards and floating elements; right now cards use only `sm`).
- **A faint background texture on dark zones**: a low-opacity radial glow behind
  the hero headline, and an optional 1px dot-grid or line-grid at ~3–5% opacity.
  Pure CSS (`radial-gradient` / `linear-gradient` backgrounds) - no image files.
- **Hairline separators with gradient fade** (the `Section` accent line already
  does this - extend the idea: section-to-section transitions, card top borders).
- **Glassy raised cards** on dark: `--color-surface-dark-2` + `--color-line-dark`
  border + soft shadow. Avoid heavy blur (perf + legibility).

### 2.3 Typography

The type scale (`.text-display/.text-h1/.text-h2/.text-h3/.text-lede`) is fine.
What's missing is **contrast and rhythm**:
- Push display/h1 weight to 800 (already are) but tighten tracking on large
  sizes and give headings more breathing room above (`margin-top`).
- Introduce an **eyebrow** convention everywhere (small, uppercase, letter-
  spaced, accent-colored) - some pages have it, make it consistent on every
  section header.
- Use **Geist Mono** as a deliberate accent for numbers/labels (prices, step
  numbers, stats, the 404) - it signals "engineering firm" and adds texture.
- Add one or two **oversized stat / number moments** (e.g. "€75–€3,000",
  "delivered in days", counts) rendered large in mono - cheap credibility.

### 2.4 Motion

Keep it quiet and fast. Reuse the existing `Reveal` component
(`components/Reveal.tsx`, IntersectionObserver, already reduced-motion-safe) to
fade/slide sections in on scroll - it exists but is barely used. Card hover =
the existing `.card-lift` (translateY + shadow). Buttons already scale on hover.
**Everything transform-based must be inside a `prefers-reduced-motion` guard**
(there are already guards in `globals.css` - follow the pattern).

---

## 3. Trust & credibility (design + content)

A pretty site still won't sell if it looks anonymous. Add credibility surfaces.
Content components already exist but may be unused - wire them in:
- `components/Testimonials.tsx` + `content/testimonials.ts` - surface on home
  and/or service pages. If testimonials are placeholders, render the component
  behind real data only (don't ship fake quotes - see §7).
- `components/PersonCard.tsx` + `content/people.ts` - a real "who you'll work
  with" moment on `/about` and home. Senior expertise sells on a face + a bio.
- A **trust strip**: a quiet row near the hero - what's included, guarantees
  ("we'll tell you if you don't need us"), turnaround, "fixed price on the
  page". These already exist as copy; give them a designed band.
- Consider a **logo/where-clients-come-from** or **"how it works in 4 steps"**
  band with real visual structure (the `StepList` exists).

Do **not** fabricate: no invented client logos, fake numbers, fake reviews, or
made-up credentials. Use real content or leave the surface out. See §7.

---

## 4. File-by-file work plan

Work in this order. After **each** file: `npm run build` must stay green.

### 4.1 Foundation (do first - everything else depends on it)

- **`app/globals.css`** - Add the dark-family + accent + warmer-paper tokens
  from §2.1 to `:root`; mirror new **color** tokens into `@theme inline`. Add
  reusable utility classes:
  - `.section-dark` (dark bg + on-dark text defaults)
  - `.glow-accent` (radial accent glow background layer, absolute, `aria-hidden`)
  - `.grid-texture` (faint dot/line grid background, very low opacity)
  - `.text-gradient-accent` already exists - extend/keep.
  - `.stat-mono` (large Geist Mono number treatment)
  - `.eyebrow` (uppercase, tracked, accent, small) - so every page uses one class
  - Card variants: `.card` (light, shadow-md, radius-lg), `.card-dark` (glassy).
  Keep all existing classes working; this is additive. Preserve the existing
  `prefers-reduced-motion` blocks and add guards for any new transforms.

### 4.2 Global chrome

- **`components/SiteHeader.tsx`** (`'use client'` - keep) - Refine, don't
  rebuild. Transparent-over-hero → solid-on-scroll is fine; ensure the scrolled
  state has a real but subtle shadow/blur and the nav reads crisp. Make sure it
  works over the new **dark hero** (logo + links must be legible on dark at the
  top of the page - likely light text over hero, dark text once scrolled onto
  light). Verify contrast in both states.
- **`components/SiteFooter.tsx`** (server component - **no handlers**) - Make it
  the dark anchor at the bottom (`--color-ink-deep`). Big wordmark, calm columns,
  hairline dividers, mono for legal/registration lines. Footer link hover must be
  CSS (`.footer-link` class already exists - reuse/adjust).
- **`components/MobileCtaBar.tsx`** (`'use client'` - keep) - Ensure it matches
  the new button styling and sits correctly above dark/light sections.

### 4.3 The hero (highest visual leverage)

- **`components/Hero.tsx`** (server component) and its usage on
  **`app/page.tsx`**. This is where "premium" is won or lost.
  - Dark hero on `--color-ink-deep` with a layered accent glow (`.glow-accent`)
    and faint `.grid-texture`.
  - Large display headline; keep the two-tone treatment (part of the line in
    `.text-gradient-accent`).
  - Light eyebrow, on-dark lede using `--color-ink-on-dark-soft`.
  - Primary CTA = solid accent pill with glow shadow; secondary = ghost/outline
    that is legible on dark (light border, light text).
  - A **trust line** row beneath (mono, on-dark-soft).
  - Keep the `Hero` props API (`eyebrow, h1, lede, primaryCta, secondaryCta,
    trustLine`) - do not break call sites. If you need a `variant?: 'light' |
    'dark'` prop to reuse Hero on interior pages, add it as optional with a
    'light' default so nothing else changes.

### 4.4 Home page sections - `app/page.tsx`

Give each section a designed identity and clear rhythm (dark hero → light
segments → light featured services → a mid-page contrast band → steps → FAQ →
dark CTA). Wrap sections in `Reveal` for scroll-in. Sections present today:
hero, "Where are you starting from?" (segments), "Popular engagements"
(featured services), "How it works" (steps), "What you actually walk away with"
(bullets), honesty note, FAQ, final CTA. Keep all of them; restyle, don't remove.

### 4.5 Cards & content components (server components - **no handlers**, CSS hover only)

- `components/ServiceCard.tsx` - premium card: `.card`, accent top border,
  prominent mono price, `hours`/`turnaround` as tidy meta, `.card-lift` hover,
  CSS arrow nudge on `group-hover`. (Already close - polish to the new system.)
- `components/SegmentCard.tsx` - same card system, CSS hover only.
- `components/CtaBand.tsx` - make this the **dark** CTA anchor (used on most
  pages). Gradient/glow, big heading, one clear button. Reused sitewide, so
  nail it once.
- `components/FactsBar.tsx` - the price/hours/turnaround sidebar on service
  pages. Make it a confident spec panel: large mono price, dividers, pill CTA.
- `components/PriceTable.tsx` (`'use client'` - keep) - richer rows, clear active
  filter pills, mono price column, hover highlight via CSS.
- `components/Faq.tsx` - refined accordion: hover bg, accent when expanded,
  smooth (reduced-motion-safe) expand. If it uses `<details>`/CSS it can stay a
  server component; if it needs JS state it must be `'use client'`.
- `components/StepList.tsx`, `components/BulletList.tsx`,
  `components/HonestyNote.tsx` - number circles, iconed bullets, quote treatment.
  Keep them light-section friendly.
- `components/Testimonials.tsx`, `components/PersonCard.tsx` - style + wire in
  per §3 (real data only).

### 4.6 Interior pages (apply the same system)

Each already has an eyebrow+heading pattern in places - make it consistent and
add the dark `CtaBand` at the bottom where it fits:
`app/services/page.tsx`, `app/services/[slug]/page.tsx`,
`app/pricing/page.tsx`, `app/about/page.tsx`, `app/approach/page.tsx`,
`app/who-we-help/page.tsx`, `app/who-we-help/[segment]/page.tsx`,
`app/contact/page.tsx`, `app/resources/page.tsx`,
`app/resources/[slug]/page.tsx` (MDX article - style `.prose` in globals),
`app/book/page.tsx` + `app/book/confirmed/page.tsx` (note: `/book` has a
Calendly embed - keep it working, just frame it), `app/not-found.tsx`,
`app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx`.

Interior pages don't need the full dark hero - a lighter header with a strong
eyebrow, big heading, and the shared dark `CtaBand` at the end is enough.

---

## 5. Constraints checklist (paste into your final self-review)

- [ ] No raw hex in components - only `var(--color-*)`.
- [ ] No event handlers on server components. Hover/animation is CSS only.
- [ ] New color tokens added to both `:root` and `@theme inline`.
- [ ] No hardcoded prices/copy in JSX - content comes from `content/*.ts`.
- [ ] No banned words introduced (§1.5).
- [ ] `prefers-reduced-motion` guards on every new transform/animation.
- [ ] Text contrast ≥ AA on all new dark sections (check the light-on-dark
      lede and any muted text - this is the easiest thing to get wrong).
- [ ] Focus rings still visible on all interactive elements, incl. on dark.
- [ ] Tap targets ≥ 44px.
- [ ] No fabricated testimonials/logos/stats (§7).
- [ ] `npm run build` is green (all routes prerender, TS passes).
- [ ] No new webfonts / external assets (static-export + CSP safe).

---

## 6. How to verify (do this, don't assume)

1. `npm run build` - must complete; all routes prerender; TypeScript passes.
   The failure mode to watch for is the event-handler-on-server-component error.
2. Dev server + browser check (a `.claude/launch.json` "dev" config exists on
   port 3000). Screenshot at **desktop (1280)** and **mobile (375)**:
   - Home (hero above the fold is the money shot), Services, a service detail,
     Pricing, About, 404.
   - Toggle a reduced-motion check and confirm nothing animates jarringly.
   - Confirm dark sections have legible text (zoom in on the lede + muted lines).
3. Sanity-grep for regressions:
   - `grep -rn "onMouse\|onClick" components/` → every hit must be in a file
     whose first line is `'use client'`.
   - `grep -rnE "#[0-9a-fA-F]{3,6}" components/ app/` → should be ~empty
     (tokens only; a couple of intentional SVG/glow stops are acceptable if
     documented).

**Known browser-preview quirk:** the in-app browser pane sometimes captures a
blank/white frame after programmatic scroll (the DOM is fine - it's a capture
timing issue). If a screenshot looks empty, re-navigate to the URL fresh and
screenshot the top of the page, or verify via `read_page` (opacity/colors)
rather than trusting the blank frame. Don't "fix" a phantom blank section.

---

## 7. Integrity guardrails

- **Do not invent social proof.** No fake client names, logos, testimonials,
  ratings, or metrics. If `content/testimonials.ts` / `people.ts` hold real
  data, style and show them; if they're placeholders, leave the surface out or
  clearly mark it as sample and flag it in your notes for the owner to fill.
- **Do not change prices, service scopes, or company/legal details** for visual
  convenience - those are business facts in `content/*.ts`.
- **Keep the honest, no-hype voice.** The brand's whole pitch is "we'll tell you
  when you don't need us." Slick copy that oversells actively hurts it.

---

## 8. Definition of done

- The home hero, on first paint, looks like a firm you'd pay senior rates to.
- There is deliberate light/dark rhythm; no section reads as "unstyled white."
- Cards, prices, and steps have depth and a consistent system.
- At least one real credibility surface (person and/or testimonials) is present
  (or explicitly deferred with a note, per §7).
- Mobile is first-class, not an afterthought.
- Build is green; constraints checklist (§5) fully passes.
- Copy stays plain and honest; no banned words; no fabricated proof.

Leave a short summary of what changed, any content fields you added, and any
credibility surface you deferred for the owner to populate.
