# OPEN-QUESTIONS.md

Every `[FOUNDER INPUT]` item that was defaulted or stubbed. Change these before launch.

---

## Blocking launch (required before going live)

| # | Item | File:line | What to change |
|---|------|-----------|----------------|
| 1 | **KvK number** | `content/company.ts:9` | Replace `'TODO_KVK'` with your Chamber of Commerce number |
| 2 | **Contact email** | `content/company.ts:10` | Replace `'TODO_EMAIL'` with `hello@weareaivi.com` or your preferred address |
| 3 | **Domain** | `.env.local` → `NEXT_PUBLIC_SITE_URL` | Set to your production domain (`https://weareaivi.com`) |

## Required before the booking flow works

| # | Item | File:line | What to change |
|---|------|-----------|----------------|
| 4 | **Calendly URL** | `.env.local` → `NEXT_PUBLIC_CALENDLY_URL` | Set to your Calendly event URL, e.g. `https://calendly.com/yourhandle/30min` |

## Legal (confirm with your accountant/lawyer before publishing)

| # | Item | File:line | Default shipped | What to confirm |
|---|------|-----------|-----------------|-----------------|
| 5 | **VAT treatment wording** | `app/pricing/page.tsx`, `app/legal/privacy/page.tsx` | Generic "VAT applied per your location and status" | Have your accountant confirm the exact wording for NL clients, EU business clients (reverse charge), and non-EU clients |
| 6 | **Terms of Service** | `app/legal/terms/page.tsx` | Draft terms shipped | Dutch lawyer review before launch — especially the B2C/B2B split clause (§16.1 of the plan) |

## Defaults shipped (can be changed post-launch without a rebuild)

| # | Item | File:line | Default | Alternative |
|---|------|-----------|---------|-------------|
| 7 | Tagline | `content/company.ts` | "AI expertise, by the hour." | "Senior AI help, in hours not months." / "Start small. Get the real answer." |
| 8 | Accent colour | `app/globals.css` | `#1F4FFF` (Ink & Signal) | `#C2571A` (Ink & Ochre) — change all `--color-accent` vars |
| 9 | Working Session rate | `content/services.ts` | €140/hr, €375 for 3hr | Change `price` in the working-session entry |
| 10 | Code & Architecture Review price | `content/services.ts` | €1,200 | Change `price` in the code-architecture-review entry |
| 11 | AI Workflow Audit price | `content/services.ts` | €950 | Change `price` in the ai-workflow-audit entry |
| 12 | AI Career Roadmap price | `content/services.ts` | €75 (student rate) | Change `price` in the ai-career-roadmap entry |
| 13 | Build Sprint prices | `content/services.ts` | €2,200 / €3,000 | Change `price` and `priceNote` in the build-sprint entry |
| 14 | Advisory Retainer | `content/services.ts` | €500/month | Change `price` in the advisory-retainer entry |
| 15 | Team Workshop | `content/services.ts` | €1,400 remote / €1,900 on-site | Change `price` and `priceNote` in the team-workshop entry |
| 16 | Cancellation policy | `content/faq.ts` | 50% for late cancellation | Update the relevant FAQ answer |
| 17 | Deposit threshold | `app/pricing/page.tsx` | 50% deposit above €2,000 | Change the billing copy |
| 18 | Calendly video tool | `HANDOFF.md` | Google Meet | Change in Calendly event settings |
| 19 | Analytics | `app/layout.tsx` | Vercel Web Analytics (default) | Add Plausible or GA4 (GA4 needs cookie consent) |
| 20 | Contact form | `app/contact/page.tsx` | No form, email only | Add Formspree/Basin form if wanted |
| 21 | People on /about | `content/people.ts` | Empty (honest associate statement) | Add founder card and any consented associates |
| 22 | Social links | `content/company.ts:11` | `[]` (renders nothing) | Add LinkedIn/X URLs to the socials array |
| 23 | Logo | `components/SiteHeader.tsx` | AIVI wordmark in display font | Swap the `<span>AIVI</span>` with your logo SVG |
| 24 | US-reachable call slots | Calendly settings | Mon–Fri 09:00–17:00 CET | Add Tue+Thu 18:00–20:30 CET in Calendly availability |

## After launch (not blocking)

| # | Item | Notes |
|---|------|-------|
| 25 | Google Search Console | Add and verify your domain. Submit sitemap.xml. |
| 26 | Bing Webmaster Tools | Same process. |
| 27 | Email domain authentication | Set SPF, DKIM, and DMARC records on your sending domain before emailing prospects. |
| 28 | W-8BEN-E | Fill out before your first US invoice. See §16.1 of the plan. |
| 29 | Testimonials | Add to `content/testimonials.ts` when real, consented quotes are available. The section renders automatically once the array is non-empty. |
| 30 | Self-serve payments | When ready: set `paymentMode: 'self-serve'` and `paymentLink` in the relevant service entry in `content/services.ts`. No code changes needed. |
