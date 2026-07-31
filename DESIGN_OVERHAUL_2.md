# DESIGN_OVERHAUL_2.md

A self-contained brief for a cold agent. This is the **follow-up** to
`DESIGN_OVERHAUL.md` (which took the site from a near-white starter to a premium
dark-hero design). That pass polished the surface but left the **vertical
light/dark rhythm reading as random**. This document diagnoses that, then
specifies the agreed fix: rebuild the site on **semantic role tokens** and ship
**two switchable visual registers** - a light default and a dark alternate -
tuned to a **warm near-monochrome** palette. Read the whole file before editing.

---

## 0. The decision, up front

We are **not** patching the color of individual sections. We are re-expressing
the whole site so that **one root attribute reskins it**, and building two
registers on that foundation:

- **`substance-light`** - DEFAULT, and the no-JS / static-export default deploy.
  Light-dominant, "everything in the open": transparent pricing, real
  deliverables, calm reading surfaces.
- **`pitch-dark`** - the dark-dominant, brand-forward alternate (today's dark
  hero, extended to the whole page).

One config switch chooses the register (§5), shipped so a future **A/B test**
between the two needs no new machinery - it reuses the hero-experiment pattern
already in the repo. **Default deploy = `substance-light`.**

Palette across both: **warm near-monochrome** - warm light ground, *neutral*
dark pole, ink/mono CTAs, and a single restrained **warm clay/amber accent**.
The current electric blue `#1F4FFF` is **retired**.

Why this shape (the reasoning that produced it) is in §1–§2; skip to §3 if you
only need the how.

---

## 1. The diagnosis - contrast is used randomly

Two compounding problems in the current build.

### 1a. Dark appears as isolated mid-page "islands"

Measured background sequence, home (`app/page.tsx`), top → bottom:
`DARK hero · alt · students(light) · paper · DARK("How it works") · paper · alt · paper · DARK(CTA)`.
The mid-page "How it works" band is a **lone dark stripe** - dark shows up once,
mid-page, with nothing else dark near it. Interior pages are worse *and*
inconsistent with home: each opens on a flat **light** `PageHeader`, then several
(`about`, `approach`, `pricing`) slam into a **dark** band right after.
Home opens dark; interiors open light - **the site has no consistent front door.**

### 1b. The "light" tones are too close to be rhythm

`--color-paper #F7F5F1`, `--color-surface-alt #E9E3D8`, `--color-surface #FFFFFF`
plus the StudentsBand gradient are three-to-four near-identical off-whites (~4%
apart). Viewers don't read that as deliberate zoning - they read it as
*accidental beige*. So the light stretches have no felt structure, leaving the
abrupt dark islands as the only contrast events. Weak rhythm + hard flips.

---

## 2. The principle - contrast must be *earned*

Reference we studied: **standin.co**. It puts dark **in the middle of the page,
repeatedly, and still reads premium** - which disproves any "dark only at the
ends" rule. But note *why* it works, and don't cargo-cult it:

- **Its contrast is narrative, not decorative.** StandIn is a timezone/presence
  product - *"When you're off, your StandIn is on."* Off/on, night/day. The
  light↔dark flips *are* the product metaphor (the hero even has a sun). The
  visitor already holds that duality, so the flips never feel arbitrary.
- **Two tonal poles only** - warm cream light, *neutral* near-black dark - high
  contrast, zero mud. (Note: even StandIn's **dark is neutral**, not warm; the
  warmth lives in the light ground and the accent.)
- **Big committed chapters**, oversized type, lots of air.

**The lesson we take:** contrast must be earned - by *meaning* or by *strict,
predictable structure*. AIVI has no day/night metaphor, so we do **not** borrow
StandIn's alternation for its own sake (that would reintroduce the "why is this
dark?" problem with bigger blocks). Instead:

> Within a register, the site is **one world**. The **closing CTA** is the single
> earned contrast flip - the one place a pole change carries real weight ("this is
> the decision"). Everything else stays in-register.

We *do* borrow StandIn's **discipline**: two poles, warm near-monochrome, ink
CTAs, big air. And AIVI gets a duality it actually owns - **substance (light) vs.
pitch (dark)** - expressed as the two switchable registers, not as within-page
strobing.

---

## 3. Architecture - semantic role tokens, one root attribute

Today, dark is applied *per section* (`.section-dark`, `tone="dark"`) and light
is the default. To flip the **whole page** by register, invert that: sections
declare a **role**, and each **register** decides what that role looks like.

### 3a. Section roles (replace `tone`)

Retire `tone="paper" | "alt" | "surface" | "dark"`. Introduce **roles**:

| Role | Meaning | `substance-light` | `pitch-dark` |
|------|---------|-------------------|--------------|
| `open` | Page opening (hero / header) | warm paper ground, oversized ink headline, faint warm accent orb, ink CTA | near-black ground (today's hero), accent-lit |
| `body` | Default reading chapter | warm paper | near-black |
| `raised` | Framed emphasis chapter (process, billing) | deeper **warm panel** + hairline + elevated cards - **never a dark band** | slightly lifted dark panel + hairline |
| `closing` | The CTA - the page's climax | **dark** band, ink→paper CTA | **accent-lit dark** climax, warm-accent CTA |

**The `closing` + footer are one continuous anchor at the bottom of every page**
(the footer is a permanent dark block in *both* registers - the one place the two
registers agree, for brand constancy). This is why `closing` does **not** flip to
a bright band in `pitch-dark`: a light band sandwiched between the dark body and
the always-dark footer would look broken. Instead:

- **`substance-light`**: the body is light; `closing` is a **dark** band that
  merges straight into the dark footer. That bottom anchor is the **single dark
  moment** on the page - the "make the decision" climax. The lone mid-page dark
  island becomes *inexpressible* → 1b fixed by construction.
- **`pitch-dark`**: the whole page is one dark world; there is **no pole flip**.
  Its climax is *intensity* (a warm-accent-lit `closing`), not a color change -
  a committed single world doesn't need a flip to have a peak.
- **Home and interiors finally open the same way**: both use `open`, which the
  active register renders identically → 1a's "no front door" fixed.

### 3b. Token layers

Define **semantic tokens** and give each register one value set:

```css
:root[data-theme="light"], :root:not([data-theme]) {   /* default = light */
  --bg:        <warm paper>;
  --bg-raised: <deeper warm panel>;
  --surface:   <warm white card>;
  --ink:       <near-neutral near-black>;
  --ink-soft:  …; --ink-muted: …;
  --line:      <warm hairline>;
  --accent:    <warm clay, AA on --bg>;
  --cta-bg:    var(--ink);   --cta-ink: var(--bg);   /* ink pill */
}
:root[data-theme="dark"] {
  --bg:        <neutral near-black>;
  --bg-raised: <lifted near-black>;
  --surface:   <lifted near-black>;
  --ink:       <warm off-white>;
  --line:      rgba(255,255,255,.14);
  --accent:    <warm clay, lifted for AA on dark>;
  --cta-bg:    var(--ink);   --cta-ink: var(--bg);   /* paper pill */
}
```

Then **alias the existing `--color-*` names to the new semantic tokens** in
`@theme inline`, so every component that already reads `var(--color-ink)` etc.
reskins for free. `.section-dark` becomes a *role* renderer (`closing` in light,
default in dark), not a hardcoded palette. Keep the aliases during migration;
delete dead ones at the end.

### 3c. Proposed palette values (tune on-device to WCAG AA)

Starting points - adjust for contrast, don't ship blind:

- **Light:** `--bg #FAF6EF` · `--bg-raised #ECE3D2` (a *felt* step from bg) ·
  `--surface #FFFFFF` · `--ink #1A1917` · `--ink-soft #57534C` ·
  `--line #E2D9C8` · `--accent #B0552B` (clay; darken until link text hits
  4.5:1 on `--bg`).
- **Dark:** `--bg #16171A` (neutral, StandIn-like - **not** brown) ·
  `--bg-raised #1F2125` · `--ink #F5F0E7` (warm off-white) ·
  `--accent #E08A5C` (lifted clay for AA on dark).
- **Accent is for affordance only** - links, focus rings, maybe one hero word.
  Never a section background. One accent, both registers.

Warmth rule (the correction that matters): **warmth lives in the light ground
and the accent; the dark pole stays neutral.** A warm/brown dark reads
vintage-dim, not premium.

### 3d. Full token remap (no `--color-*` left unassigned)

Every existing token must land somewhere - there are ~28 accent-family and ~13
status-color usages across the codebase; none may be orphaned. Map as follows
(keep the old `--color-*` name as an **alias** to the new semantic token so the
29 files reading `var(--color-accent)` etc. keep working):

| Old token | Becomes | Light value | Dark value |
|-----------|---------|-------------|------------|
| `--color-accent` `#1F4FFF` | the one warm accent | `#B0552B` clay | `#E08A5C` lifted clay |
| `--color-accent-hover` | accent, one step | `#8F441F` | `#E8A074` |
| `--color-accent-soft` `#E8EDFF` | **warm ground tint** (chips/soft fills), not a color | `#F3E7D8` | `rgba(224,138,92,.14)` |
| `--color-accent-glow` | clay at low alpha (the warm orb) | `rgba(176,85,43,.14)` | `rgba(224,138,92,.20)` |
| `--color-accent-2`, `--color-accent-3` | **collapse to `--color-accent`** | = accent | = accent (dark links use the lifted clay) |
| `text-gradient-accent` | **retire the gradient**; accent word is solid `--color-accent` | - | - |
| `--color-positive` / `-soft` | **keep** (status, not brand) - muted to fit warm ground | `#1B7A55` / `#E7F1EA` | `#4FB68C` / `rgba(79,182,140,.14)` |
| `--color-warn` / `-soft` | **keep** (already warm) | `#9A6400` / `#FBF0D8` | `#E0A63A` / `rgba(224,166,58,.14)` |

Buttons (`.btn-*`, 8 non-primary usages):

| Class | New behavior |
|-------|--------------|
| `.btn-primary` | ink pill: `background: var(--cta-bg); color: var(--cta-ink)` |
| `.btn-secondary` + `.btn-outline` | **merge** → one ink outline: transparent bg, `--ink` border + text, subtle `--ink` tint on hover |
| `.btn-ghost` | text button in `--color-accent` (clay), underline on hover |

In `Hero.tsx:76` the secondary CTA's `variant={isDark ? 'outline' : 'secondary'}`
collapses to always `outline` (they're the same style now).

### 3e. Worked migration example (do this pattern for the whole token block)

Before - `app/globals.css`:

```css
:root { --color-accent: #1F4FFF; /* …raw values… */ }
@theme inline { --color-accent: var(--color-accent); }
.section-dark { background: var(--color-ink-deep); --color-ink: var(--color-ink-on-dark); /* …local remap… */ }
```

After:

```css
/* semantic tokens, one value set per register; default (no attr) = light */
:root, :root[data-theme="light"] { --bg:#FAF6EF; --ink:#1A1917; --accent:#B0552B; --cta-bg:var(--ink); --cta-ink:var(--bg); /* … */ }
:root[data-theme="dark"]        { --bg:#16171A; --ink:#F5F0E7; --accent:#E08A5C; --cta-bg:var(--ink); --cta-ink:var(--bg); /* … */ }

/* keep old names as aliases → the 29 files that read them reskin for free */
@theme inline { --color-accent: var(--accent); --color-ink: var(--ink); --color-paper: var(--bg); /* … */ }

/* .section-dark stops hardcoding a palette - it becomes a ROLE renderer */
.role-closing { background: var(--bg-closing); }   /* dark in light-register, dark-elevated in dark-register */
```

Net: a component with `style={{ color: 'var(--color-accent)' }}` now paints clay
in light and lifted clay in dark, with **zero component edits** - the reskin is
entirely at the root. Migrate the whole `:root`/`@theme`/`.section-dark` block
this way first (§4b, step 1) and the site keeps rendering throughout.

---

## 4. Component & page changes

- **`components/Section.tsx`** - replace `tone` with `role: 'open' | 'body' |
  'raised' | 'closing'`. Render `raised` as a warm panel (light) / lifted panel
  (dark) with a top hairline; add a light-mode variant of `grid-texture`
  (`rgba(15,17,21,.04)` lines) for `raised`/`open` when in light register.
- **`components/PageHeader.tsx`** - becomes the `open` role for interior pages:
  shares the hero's structure at reduced scale (`text-h1`, less padding). It must
  look identical in kind to `HomeHero` within a register. Delete the old flat
  `.page-header` light styling (`globals.css:394-406`).
- **`components/HomeHero.tsx` / `components/Hero.tsx`** - `Hero.tsx` **already
  has a `variant: 'light' | 'dark'` branch** (line 27–46): the light branch is
  paper bg + `pt-24`, the dark branch pulls up under the sticky header with the
  glow + grid texture. Don't invent a hero - do this:
  - **Remove the `variant` prop entirely.** Hero renders a single `.role-open`
    container that reads semantic tokens; the *register* decides the look.
  - **Light-register `open` spec** (the piece that was missing): warm paper
    ground (`--bg`); the headline sized `text-display` on home / `text-h1` on
    interior; the accent word is **solid `--color-accent` (clay), not the
    retired gradient**; ink `.btn-primary` + `.btn-outline` secondary; a single
    faint **warm accent orb** top-right - a new `.glow-warm` (radial
    `--color-accent-glow`, low opacity, ~620px) that echoes StandIn's sun but
    abstract and subtle; **no** grid texture in light.
  - **Dark-register `open`** = today's dark hero (glow + grid on near-black).
  - Both branches **pull up under the sticky header** (move the current
    dark-only `marginTop: calc(-1 * var(--header-h))` logic to apply in both) so
    home and interiors share one opening geometry.
  - Keep the hero **copy** A/B (variants a/c) untouched - orthogonal to register.
- **`components/CtaBand.tsx`** - becomes the `.role-closing`: in
  `substance-light` a dark band flowing into the dark footer (ink→paper CTA); in
  `pitch-dark` an accent-lit dark climax (warm-accent CTA). Not a bright band in
  dark register (see §3a - it would sandwich against the footer).
- **`components/SiteFooter.tsx`** - currently `.section-dark` with a
  `glow-accent` and an `--color-accent-3` email link. Keep it as the **permanent
  dark anchor in both registers**; just repoint it at semantic tokens (the glow
  becomes warm; the email link uses `--color-accent`). It is the bottom half of
  the `closing` anchor, not an independent role.
- **`components/MobileCtaBar.tsx`** - reads `--color-paper` (fade gradient) and
  `--color-accent` (button) directly (lines 17, 27). Once tokens are semantic it
  reskins for free; just swap the button to the ink pill (`--cta-bg`/`--cta-ink`)
  so it matches the new primary.
- **`components/SiteHeader.tsx`** - sits transparent over the `open` hero. Verify
  its text/logo use `--color-ink` (near-black in light, off-white in dark) so it
  reads over the register's opening ground in both. Check the mobile menu panel
  bg uses `--bg`/`--surface`, not a hardcoded color.
- **`app/layout.tsx`** - `viewport.themeColor` is hardcoded `'#1F4FFF'` (line 26).
  Replace with the register's `--bg` (or at minimum the ink), so the mobile
  browser chrome stops flashing the retired blue. Counts toward the "no `1F4FFF`"
  acceptance check.
- **Page files** - delete every `tone="dark"` mid-page band and re-declare roles:
  - `app/page.tsx:118` "How it works" → `role="raised"`.
  - `app/pricing/page.tsx:87` "How billing works" → `role="raised"`.
  - `app/about/page.tsx:46`, `app/approach/page.tsx:74` intro dark sections →
    `role="raised"` (or `body`).
  - Collapse `paper`/`alt`/`surface` usages to `body` (default) and `raised`
    (emphasis). No two `raised` adjacent; `body` is the default.
- **`components/StudentsBand.tsx`** - fold its bespoke gradient into the `raised`
  language so it stops being a fourth off-white.
- **`components/Button.tsx` + `.btn-*`** - retire blue-filled primary; primary
  becomes the ink/mono pill (`--cta-bg`/`--cta-ink`). Links/focus use `--accent`.
- **`app/globals.css`** - implement §3b token layers; convert `.section-dark`,
  `students-band`, `page-header`, `glow-accent` to reference semantic tokens;
  make `glow-accent` warm.

---

## 4b. Build order & page inventory

Build in this sequence so the site keeps rendering (and stays shippable as
light-default) at every step:

1. **Token layer** (§3b–§3e). Add semantic tokens + both `[data-theme]` value
   sets; alias every `--color-*`; remap the accent family, status colors, and
   `.btn-*`; retire `#1F4FFF`. Verify the site still renders in light - visually
   near-identical except warm palette + ink CTAs. **No role/page work yet.**
2. **Roles.** Refactor `Section` (`tone` → `role`), `Hero`/`PageHeader` →
   `.role-open`, `CtaBand` + `SiteFooter` → `.role-closing`/anchor. Re-declare
   every page's sections as roles (below). Verify light-register rhythm: dark
   only at the bottom anchor.
3. **Dark register.** Fill in `[data-theme="dark"]` values; add the pre-paint
   switch + `DEFAULT_THEME` (§5). Verify `?theme=dark` end-to-end, both AA.
4. **A/B wiring** (`theme_view` capture, §5).
5. **Cleanup.** Delete dead tokens and the unused `components/layout/*`
   duplicates of Header/Footer/MobileCtaBar (the live ones are `components/*`,
   per `app/layout.tsx`). Confirm the acceptance greps (§6).

**Full page inventory** - every route whose sections need role-auditing (15
`page.tsx` + `not-found`): `app/page`, `about`, `approach`, `pricing`,
`services`, `services/[slug]`, `who-we-help`, `who-we-help/[segment]`,
`resources`, `resources/[slug]`, `contact`, `book`, `book/confirmed`,
`legal/privacy`, `legal/terms`, `not-found`. Pages that today are "header +
light + CTA" (`services`, `who-we-help`, `resources`, `contact`, legal) just map
to `open` → `body`(×n) → `closing`; the MDX `.prose` pages read tokens already.

## 5. The register switch (config + future A/B)

Mirror the existing hero experiment exactly (see `DESIGN_OVERHAUL.md` §"How the
A/B test works" and the pre-paint script in `app/layout.tsx`):

- A single source-of-truth constant `DEFAULT_THEME = 'light'` (alongside
  `DEFAULT_HERO_VARIANT`).
- A pre-paint inline script in `app/layout.tsx` sets `html[data-theme]` before
  paint: reads `localStorage` (`aivi_theme`), else applies `DEFAULT_THEME`.
  `?theme=light|dark` in the URL **forces + persists** (use it to demo
  `pitch-dark` to stakeholders and for QA). `<html suppressHydrationWarning>` is
  already present - keep it.
- **No-JS / crawler / static export → `light`.** The default deploy is light with
  zero JS required; dark only appears when the script promotes it.
- **A/B-ready, not A/B-on.** Bucketing stays effectively 100% light until we flip
  it. Wire a `theme_view` capture (same shape as `HeroExperiment`'s `hero_view`)
  so that when PostHog is connected, the substance-light vs pitch-dark test is a
  config change, not a rebuild. Until then it's a switch, not an experiment.
- Register (`data-theme`) and hero copy (`data-hero`) are **independent axes** -
  don't couple them.

---

## 6. Acceptance criteria

- [ ] One root attribute (`html[data-theme]`) reskins the entire site; no page
      hardcodes a palette. `grep -rn 'tone="dark"\|section-dark' app components`
      returns only role renderers, not per-section palette choices.
- [ ] **`substance-light` (default):** dark appears **exactly once** per page -
      the `closing` CTA + footer forming one continuous bottom anchor. No mid-page
      dark band is expressible. Home and every interior page open the same way.
- [ ] **`pitch-dark`:** the whole page is dark-dominant; the `closing` is the one
      bright flip. Same silhouette logic, inverted.
- [ ] Light body reads as **two intentional tones** (`body` vs `raised`), a felt
      step apart - no "accidental beige," no third/fourth off-white.
- [ ] Palette is warm near-monochrome: warm light ground, **neutral** dark pole,
      **no `#1F4FFF`** anywhere (`grep -rn '1F4FFF\|1f4fff'` is empty), ink/mono
      CTAs, one warm accent used only for affordance.
- [ ] `?theme=dark` and `?theme=light` switch cleanly with no flash; no-JS loads
      light; `aivi_theme` persists; `theme_view` fires.
- [ ] Accent and text pass WCAG AA (≥4.5:1) in **both** registers.
- [ ] Reduced-motion and the hero copy A/B still work, untouched.
- [ ] Gut check per register: scroll top-to-bottom - calm and inevitable, not
      strobing. "Would I pay €1,200 looking at this?" → unhesitating yes.

---

## 7. Out of scope

- Copy / voice (owned by `DESIGN_OVERHAUL.md`; keep the "already building" voice).
- The hero **copy** A/B (variants a/c) and its pre-paint script - reuse the
  pattern for the register switch; don't rewrite the hero experiment itself.
- Typography scale, spacing system, card shadow tokens - working; this pass is
  about **palette + register architecture + where contrast is earned**, not type.
