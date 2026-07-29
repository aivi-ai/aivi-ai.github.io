# AIVI Website — Build Status

> Last updated: 2026-07-28

---

## What is complete

### ✅ Project scaffold
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + ESLint initialised
- `geist`, `@next/mdx`, `gray-matter`, `reading-time`, `@mdx-js/loader`, `@mdx-js/react` installed
- `next.config.ts` wired with MDX support
- `app/globals.css` with full design token set (`--color-ink`, `--color-accent`, typography scale, prose styles, reveal animation classes)
- `.env.local` with placeholder env vars (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CALENDLY_URL`)
- Directory structure created for all routes

### ✅ Content data layer (`content/`)
- `content/services.ts` — all 8 offerings with full copy, FAQ, related slugs, `paymentMode`, SEO fields
- `content/segments.ts` — 4 audience segments with pains, outcomes, FAQ (rewritten after corruption)
- `content/faq.ts` — general and pricing FAQ banks
- `content/company.ts` — legal name, address, VAT (VIES-validated), placeholders for KvK + email
- `content/people.ts` — empty array with TODO comment
- `content/testimonials.ts` — empty array (renders nothing until populated)
- `content/resources/vibe-coded-app-health-check.mdx` — full 12-point health check article
- `content/resources/ai-skills-hired-2026.mdx` — full article on AI skills for students
- `content/resources/seven-things-professionals-get-wrong-with-llm-tools.mdx` — full article

### ✅ Library utilities (`lib/`)
- `lib/seo.ts` — `buildMetadata()` factory for consistent page metadata
- `lib/jsonld.ts` — builders for `ProfessionalService`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`
- `lib/calendly.ts` — `buildCalendlyUrl()` with safe topic validation; `isKnownSlug()`

### ✅ Components (`components/`) — all 23 written
**Server components:** `JsonLd`, `SkipLink`, `Container`, `Section`, `Hero`, `ServiceCard`, `SegmentCard`, `FactsBar`, `StepList`, `BulletList`, `HonestyNote`, `CtaBand`, `PersonCard`, `Testimonials`, `Breadcrumbs`, `SiteFooter`  
**Client components:** `Button`, `Reveal`, `Faq`, `PriceTable`, `SiteHeader` (with keyboard-accessible mega-menus), `MobileCtaBar` (hidden on `/book`), `CalendlyEmbed` (skeleton + fallback + noscript)

### ✅ Pages written
| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | Written — **build broken** (see below) |
| `/services` | `app/services/page.tsx` + `ServicesGrid.tsx` | Written |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | Written |
| `/who-we-help` | `app/who-we-help/page.tsx` | Written |
| `/who-we-help/[segment]` | `app/who-we-help/[segment]/page.tsx` | Written |
| `/approach` | `app/approach/page.tsx` | Written |
| `/pricing` | `app/pricing/page.tsx` | Written |
| `/about` | `app/about/page.tsx` | Written |
| `/contact` | `app/contact/page.tsx` | Written |
| `/book` | `app/book/page.tsx` | Written |
| `/book/confirmed` | `app/book/confirmed/page.tsx` | Written (noindex) |
| `/resources` | `app/resources/page.tsx` | Written |
| `/resources/[slug]` | `app/resources/[slug]/page.tsx` | Written |
| `/legal/privacy` | `app/legal/privacy/page.tsx` | Written |
| `/legal/terms` | `app/legal/terms/page.tsx` | Written |
| `/404` | `app/not-found.tsx` | Written |
| `sitemap.xml` | `app/sitemap.ts` | Written |
| `robots.txt` | `app/robots.ts` | Written |

### ✅ SEO / AEO
- `public/llms.txt` — plain-text summary of all 8 engagements with prices and booking URLs
- `lib/jsonld.ts` — all required JSON-LD types built

### ✅ Supporting files
- `OPEN-QUESTIONS.md` — all [FOUNDER INPUT] items catalogued with file:line references and defaults shipped
- `scripts/validate-content.ts` — validates slugs, FAQ answer length, banned words, payment mode consistency, TODO_ tokens

---

## Known build blockers (must fix before `npm run build` passes)

### 🔴 BLOCKER 1 — `app/page.tsx` file corrupted
**Cause:** A `sed` command intended to fix curly apostrophes in string literals accidentally replaced all ASCII single-quotes, corrupting every import statement.  
**File:** `app/page.tsx`  
**Fix:** Rewrite the file with correct ASCII quoting. The content and structure are known and correct — it is a mechanical re-write.

### 🔴 BLOCKER 2 — `@next/mdx` requires `@mdx-js/loader` peer
**Status:** `@mdx-js/loader` and `@mdx-js/react` have been installed. Needs a build run to confirm it resolves.

### 🟡 WARNING — `components/layout/` and `components/ui/` subdirectories
One agent created re-export shim files in `components/layout/` and `components/ui/` (e.g. `components/layout/SiteHeader.tsx` → re-exports `components/SiteHeader.tsx`). These exist to satisfy import paths that some pages may use. Verify consistency across all page imports before the final build.

---

## Pending tasks (not yet started)

### Pages not yet created
- `app/legal/cookies/page.tsx` — only needed if cookies are set; do a devtools audit first

### Verification needed after build is green
- [ ] Run `npm run build` — confirm 0 errors
- [ ] Start dev server and manually visit every route
- [ ] Verify CalendlyEmbed renders on `/book` (requires real `NEXT_PUBLIC_CALENDLY_URL`)
- [ ] Verify `?topic=` banner shows correct service name on `/book`
- [ ] Test filter on `/services` (All / Students / Founders / Professionals / Teams)
- [ ] Test FAQ accordion keyboard accessibility (Enter, Space, Escape)
- [ ] Test nav mega-menus keyboard (Escape closes, Tab navigation)
- [ ] Verify MobileCtaBar is hidden on `/book`
- [ ] Test at 320px, 375px, 768px, 1024px, 1280px widths
- [ ] Verify no Stripe/payment code anywhere in bundle (`grep -r stripe .next/`)
- [ ] Cookie audit: open each page in devtools and confirm no cookies set before interaction (except `/book`)

### Founder input required before launch
See `OPEN-QUESTIONS.md` for the full list. The hard blockers are:
1. **KvK number** — `content/company.ts:9`
2. **Contact email** — `content/company.ts:10`
3. **Calendly URL** — `.env.local` → `NEXT_PUBLIC_CALENDLY_URL`
4. **Production domain** — `.env.local` → `NEXT_PUBLIC_SITE_URL`

### Vercel deployment (not started)
- [ ] Push repo to GitHub
- [ ] Connect to Vercel project
- [ ] Set production env vars in Vercel dashboard
- [ ] Confirm PR preview deployments work
- [ ] Set `X-Robots-Tag: noindex` on non-production Vercel deployments

### Post-launch
- [ ] Google Search Console — add domain, submit sitemap
- [ ] Bing Webmaster Tools — same
- [ ] Email domain auth — SPF, DKIM, DMARC records on sending domain
- [ ] `content/people.ts` — add founder card with real, consented bio
- [ ] Validate JSON-LD on Google Rich Results Test for home, a service page, pricing, and a resource
- [ ] Run Lighthouse (mobile) on home, a service page, pricing, `/book` — target ≥95 performance
- [ ] Run VoiceOver pass and keyboard-only pass

---

## File tree (as built)

```
aivi-website/
├─ app/
│  ├─ layout.tsx               ✅
│  ├─ globals.css              ✅
│  ├─ page.tsx                 🔴 (corrupted — needs rewrite)
│  ├─ not-found.tsx            ✅
│  ├─ sitemap.ts               ✅
│  ├─ robots.ts                ✅
│  ├─ services/
│  │  ├─ page.tsx              ✅
│  │  ├─ ServicesGrid.tsx      ✅
│  │  └─ [slug]/page.tsx       ✅
│  ├─ who-we-help/
│  │  ├─ page.tsx              ✅
│  │  └─ [segment]/page.tsx    ✅
│  ├─ approach/page.tsx        ✅
│  ├─ pricing/page.tsx         ✅
│  ├─ about/page.tsx           ✅
│  ├─ contact/page.tsx         ✅
│  ├─ book/
│  │  ├─ page.tsx              ✅
│  │  └─ confirmed/page.tsx    ✅
│  ├─ resources/
│  │  ├─ page.tsx              ✅
│  │  └─ [slug]/page.tsx       ✅
│  └─ legal/
│     ├─ privacy/page.tsx      ✅
│     ├─ terms/page.tsx        ✅
│     └─ cookies/page.tsx      ⬜ (not created — audit first)
├─ components/                 ✅ (23 components)
├─ content/
│  ├─ services.ts              ✅
│  ├─ segments.ts              ✅ (rewritten)
│  ├─ faq.ts                   ✅
│  ├─ company.ts               ✅
│  ├─ people.ts                ✅ (empty — awaiting founder input)
│  ├─ testimonials.ts          ✅ (empty — awaiting real quotes)
│  └─ resources/
│     ├─ vibe-coded-app-health-check.mdx    ✅
│     ├─ ai-skills-hired-2026.mdx           ✅
│     └─ seven-things-professionals-get-wrong-with-llm-tools.mdx  ✅
├─ lib/
│  ├─ seo.ts                   ✅
│  ├─ jsonld.ts                ✅
│  └─ calendly.ts              ✅
├─ public/
│  └─ llms.txt                 ✅
├─ scripts/
│  └─ validate-content.ts      ✅
├─ OPEN-QUESTIONS.md           ✅
├─ CHANGELOG.md                ✅ (this file)
└─ .env.local                  ✅ (placeholder values)
```
