# AIVI AI — Website Implementation Plan

**Version:** 2.0 (supersedes v1.0 "premium boutique / Stripe checkout" plan)
**Audience:** A cold implementation agent (design + build + deploy). Assume no prior context.
**Status:** Ready to build. Read §0 → §5 before writing any code.

---

## 0. How to use this document

1. Read §1–§5 first. They define *what business we are running*. Every design and code
   decision downstream follows from them. If you build a beautiful site that misrepresents the
   offer, the build has failed.
2. §6–§11 are the buildable spec: sitemap, page-by-page copy, design tokens, component list,
   content model, file tree.
3. §12–§17 are integrations and compliance.
4. §18 is the phased task list. Work through it in order. Each phase is independently shippable.
5. **`[FOUNDER INPUT]`** marks a value only the founder can supply (legal numbers, real names,
   final rates). Where a `[FOUNDER INPUT]` item has a **proposed default**, *use the default and
   keep building* — do not block. Collect every one you touched into `OPEN-QUESTIONS.md` at the
   repo root and list them in the handoff.
6. **Never fabricate**: no invented team members, credentials, clients, testimonials, logos,
   metrics, or case studies. Placeholder slots must read as placeholders (see §7.9), not as
   fake proof. This is a legal and reputational constraint, not a style preference.

---

## 1. Executive summary

Build a fast, static, SEO/AEO-optimized marketing site for **AIVI AI**, a boutique AI consulting
firm registered in the Netherlands, operating remotely.

**The single conversion goal:** the visitor books a **free 30-minute call** on **one Calendly
event type**, backed by **one calendar**. That booking *is* the lead capture — Calendly collects
name, email, and intake answers, sends the invite, and handles reminders and reschedules.

Consequences of that single goal, which the whole build must respect:

- **No payments on the website.** No Stripe integration, no checkout, no serverless payment
  endpoints, no webhooks. Money is collected *after* the call, by invoice or a Stripe Payment
  Link the founder sends by email from the Stripe dashboard. Zero payment code ships. §12.5
  reserves a ~20-line seam so self-serve payment can be switched on later for the low-ticket
  engagements as a content edit rather than a rebuild.
- **No database, no login, no CMS backend.** Content lives in typed files in the repo.
- **Effectively zero backend.** The only *optional* server code is one form handler (§15), and
  even that can be a hosted form provider. Default build: fully static.
- Every CTA on every page resolves to the same place: **book the free 30-minute call.**

**Positioning shift from v1.0 (important).** v1.0 positioned AIVI as a premium boutique firm doing
months-long engagements with hidden pricing. v2.0 positions AIVI as the **low-barrier, published-price,
fast-turnaround** alternative. The reference partner site (krazimo.com) sells multi-month custom AI
builds and never shows a price. AIVI deliberately inverts that: **fixed-scope engagements measured in
hours, with prices printed on the page, bookable this week.** Large projects are still welcome, but
they are the *exit* of the funnel, not the entrance.

---

## 2. Positioning

### 2.1 One-sentence positioning

> AIVI gives you senior AI expertise in hours, not months — scoped, priced, and delivered in days.

### 2.2 The strategic wedge

| | Typical AI consultancy (e.g. our partner Krazimo) | **AIVI** |
|---|---|---|
| Entry point | "Book a scoping call" → proposal → contract | Pick a fixed-scope engagement, book a free 30-min call |
| Price visibility | Never published | **Published on the site** |
| Smallest unit | A project (months, five figures) | **One hour**, or an 8–10 hour package |
| Time to value | Weeks to start | Days |
| Who it's for | Funded companies with budget | Students, solo founders, professionals, small teams |
| Output | A built system | **A decision, a roadmap, a review, a working habit** |

We are not competing with partner firms — we are their front door. When an engagement genuinely
needs months of build, we say so and refer or scope it up. State this honestly on `/approach`; it
is a trust asset, not a weakness.

### 2.3 Who we help (four segments — these drive the whole IA)

1. **Students & early-career** — anxious about entering an AI-reshaped job market. Want to know
   what to learn, what to build, and how to signal it. Very price-sensitive → student rate.
2. **Non-technical / solo founders** — vibe-coded a product with AI tooling, it *works*, it has
   real users and revenue, and now they are quietly terrified about security, data, cost, and what
   happens at 10× the traffic. They cannot evaluate a CTO hire. They need an honest second opinion,
   fast, under NDA.
3. **Professionals & knowledge workers** — lawyers, marketers, analysts, researchers, clinicians,
   ops managers. Suspect they are using 10% of what LLM tools can do. Want their *actual* weekly
   workflow made faster, not a generic prompting webinar.
4. **Small teams & SMB leaders** — 5–50 people. Want to know where AI helps, where it is a trap,
   what it costs, and what to do in the next quarter — without hiring a consultancy for six months.

Everything on the site must let a visitor self-identify into one of these four within ~5 seconds.

### 2.4 Voice

Plain, direct, warm, unhyped. Short declarative sentences. Concrete nouns. We name the price and the
number of hours. We say what you will walk away holding.

- **Do:** "Eight hours. A written review of your codebase, ranked by what will break first. €1,200."
- **Don't:** "Leverage cutting-edge AI synergies to unlock transformational value."

Use the firm voice ("we", "AIVI"), never "I". Never imply headcount we don't have — the value
claim is *seniority and honesty*, not size. Second person ("you", "your app", "your workflow")
throughout body copy.

**Banned words in all copy:** revolutionize, unlock, supercharge, game-changing, cutting-edge,
seamless, synergy, empower, transformative, journey, elevate, harness, unleash, next-level, robust
(as a bare adjective). Add a repo lint script for these (§18, Phase 5).

### 2.5 Name & tagline

Brand is **AIVI** (one word, all caps in the logo, "AIVI" in running text). Legal name
**AIVI AI Services**.

Tagline — **proposed default: "AI expertise, by the hour."**
Alternates for the founder to consider: *"Senior AI help, in hours not months."* /
*"Start small. Get the real answer."* **[FOUNDER INPUT — confirm; default is usable at launch]**

---

## 3. The offering catalogue

This is the most important section. Each offering below becomes (a) a card on `/services`,
(b) a full page at `/services/<slug>`, (c) a row in the pricing table, and (d) an entry in
`content/services.ts` (§10).

**Design rules for every offering:**
- Fixed scope, stated in **hours**.
- Stated **price** (excl. VAT), or a stated per-hour rate.
- A **named, tangible deliverable** the client keeps.
- A **turnaround** commitment.
- Bookable through the *same* free 30-minute call.

### 3.1 Offering 1 — Code & Architecture Review
`slug: code-architecture-review` · **Primary revenue driver.**

- **For:** Non-technical or solo founders with a shipped, AI-assisted ("vibe-coded") product that
  has real users; also small teams without a senior engineer.
- **Scope:** 8–10 hours.
- **Turnaround:** written report within 5 working days of receiving repo access.
- **Price:** **€1,200** (excl. VAT). *[FOUNDER INPUT — proposed default]*
- **What we do:** read the codebase and infrastructure; check authentication and authorization,
  secrets handling, data storage and personal-data exposure, third-party API key usage, LLM cost
  and rate-limit exposure, prompt-injection surface, error handling, backups, dependency risk, and
  the two or three things that break first under 10× load.
- **Deliverable:** a written review (10–20 pages), findings ranked **by what breaks first**, each
  with severity, plain-English explanation of the consequence, and a concrete fix. Plus a 60-minute
  walkthrough call. Plus a one-page summary the founder can hand to an investor or a contractor.
- **Explicitly not:** we do not rewrite your app in this engagement. If you want the fixes
  implemented, that is a separate Build Sprint (§3.5).
- **Confidentiality:** mutual NDA offered by default, before repo access.

### 3.2 Offering 2 — AI Workflow Audit
`slug: ai-workflow-audit`

- **For:** Professionals, and teams of 5–50.
- **Scope:** 6–8 hours (a 90-minute observation session + analysis + written plan + 60-minute
  handover).
- **Turnaround:** 5 working days.
- **Price:** **€950** (excl. VAT) for an individual or a single team workflow.
  *[FOUNDER INPUT — proposed default]*
- **What we do:** watch how the work actually gets done this week — the documents, the tools, the
  handoffs, the repetitive parts. Map where an LLM genuinely saves hours, where it silently creates
  risk, and where it is simply the wrong tool.
- **Deliverable:** a workflow map, a ranked list of automation candidates with estimated hours
  saved per week, the specific tools and prompts to use, and a "do not automate this" list with
  reasons. Plus any prompt templates or setup we built during the audit.
- **Explicitly not:** a software purchase recommendation dressed up as advice. We take no vendor
  commissions and say so.

### 3.3 Offering 3 — AI Career Roadmap (students & early-career)
`slug: ai-career-roadmap`

- **For:** Students, recent graduates, career changers.
- **Scope:** 45-minute call + written roadmap.
- **Turnaround:** roadmap within 3 working days.
- **Price:** **€75** (excl. VAT), student rate, valid student ID or recent graduation required.
  *[FOUNDER INPUT — proposed default]*
- **What we do:** an honest read of where you are, what the market is actually hiring for in your
  target role and region, and what to do in the next 90 days.
- **Deliverable:** a one-page 90-day roadmap — what to learn in what order, two or three portfolio
  projects chosen to be *credible* rather than impressive, and how to present the work so a hiring
  manager believes you built it.
- **Optional add-on:** portfolio / project review, 1 hour, at the standard hourly rate.
- **Note:** this is priced near cost on purpose. It is goodwill, pipeline, and the best source of
  honest signal about what the market wants. Say the student rate exists, plainly, on the page.

### 3.4 Offering 4 — Working Session (hourly)
`slug: working-session`

- **For:** Anyone. The universal entry point.
- **Scope:** 60 minutes, one-to-one or small group, screen-share, recorded if you want.
- **Price:** **€140/hour** (excl. VAT). Blocks of 3 hours: **€375**.
  *[FOUNDER INPUT — proposed default]*
- **What we do:** you bring an actual problem — a decision, a stuck build, a tool choice, a
  proposal you need reviewed, a workflow you want faster. We work on it together, live.
- **Deliverable:** written notes and next steps within 24 hours. The recording, if requested.
- **Positioning line:** *"The cheapest way to find out whether we're useful to you."*

### 3.5 Offering 5 — Build Sprint
`slug: build-sprint`

- **For:** Clients who already know what needs building and want it done, not scoped forever.
- **Scope:** 2 or 3 days of focused implementation (16 or 24 hours).
- **Turnaround:** scheduled within 2 weeks of agreement.
- **Price:** **€2,200** (2 days) / **€3,000** (3 days), excl. VAT. *[FOUNDER INPUT — proposed default]*
- **Typical uses:** implement the top findings from a Code & Architecture Review; ship a working
  RAG prototype over your documents; set up evals for an LLM feature that keeps regressing; wire an
  internal automation end to end.
- **Deliverable:** working code in your repo, a short README of what changed and why, and a
  handover call.
- **Boundary:** a sprint is fixed-length, not fixed-outcome. We agree the target before we start
  and report honestly on what landed.

### 3.6 Offering 6 — Advisory Retainer
`slug: advisory-retainer`

- **For:** Founders and team leads who want a senior person reachable on an ongoing basis.
- **Scope:** 4 hours per month — a monthly call plus async questions (email/Slack), unused hours
  do not roll over.
- **Price:** **€500/month** (excl. VAT), monthly, cancel any time. *[FOUNDER INPUT — proposed default]*
- **Deliverable:** ongoing access, monthly written notes, and honest "don't do that" advice.

### 3.7 Offering 7 — Team Workshop
`slug: team-workshop`

- **For:** Teams of 5–25 who want everyone at a shared baseline.
- **Scope:** half day (3.5 hours), remote or on-site in NL.
- **Price:** **€1,400** remote / **€1,900** on-site in the Netherlands, excl. VAT, up to 25 people.
  *[FOUNDER INPUT — proposed default]*
- **What we do:** hands-on, using the team's *own* documents and tasks — not slideware. Covers
  what these tools are actually good at, where they fail, verification habits, and the data and
  confidentiality rules your team needs.
- **Deliverable:** the session, a written team playbook, and prompt templates for the team's real
  recurring tasks.

### 3.8 Offering 8 — Project (custom)
`slug: custom-project`

- **For:** Work that genuinely needs weeks or months.
- **Price:** custom quote after a paid discovery engagement.
- **Copy stance:** *"Sometimes the honest answer is that your problem needs a real project. We take
  on a small number of these, and we will tell you plainly if we are not the right team for it."*
- This page exists to catch high-value leads and to prove we are not hiding the option — but it is
  visually de-emphasized relative to 3.1–3.4.

### 3.9 Offering-to-audience matrix

| | Students | Founders | Professionals | Teams |
|---|:--:|:--:|:--:|:--:|
| Code & Architecture Review | | ●●● | | ●● |
| AI Workflow Audit | | ● | ●●● | ●●● |
| AI Career Roadmap | ●●● | | ● | |
| Working Session | ●● | ●●● | ●●● | ●● |
| Build Sprint | | ●● | | ●● |
| Advisory Retainer | | ●● | | ●● |
| Team Workshop | | | ● | ●●● |
| Custom Project | | ● | | ●● |

Use this matrix literally: each `/who-we-help/<segment>` page lists that column's offerings,
ordered by weight.

---

## 4. Pricing presentation

**Principle: prices are on the page.** This is the differentiator. Do not hide them behind a form.

`/pricing` layout, top to bottom:

1. **Statement of intent (h1 + lede):** *"Our prices are on this page. Most engagements are
   measured in hours and start under €1,500."*
2. **The free call band** — 30 minutes, free, no obligation, no sales script. Primary CTA.
3. **Price table** — every offering from §3 as a row: name · what you get · hours · price ·
   turnaround · "Book a call" link. Renders as stacked cards below `md`.
4. **How billing works** — invoice after the call, paid by bank transfer or a card payment link,
   standard terms 14 days; retainers billed monthly in advance. Anything under €500 is prepaid.
   50% deposit above €2,000 *[FOUNDER INPUT: confirm]*. Prices exclude VAT. Dutch BTW is added for
   Netherlands clients and for EU consumers; EU businesses with a valid VAT number are reverse
   charged; **clients outside the EU (including the US) are generally invoiced without Dutch VAT**
   — see §16.1. *[FOUNDER INPUT: confirm all three cases with your accountant before publishing
   any VAT wording.]*
5. **Cancellation & rescheduling** — free reschedule up to 24 hours before a session; late
   cancellation billed at 50% *[FOUNDER INPUT — proposed default]*.
6. **Student rate** — stated openly, with eligibility.
7. **FAQ** (`FAQPage` JSON-LD) — see §7.6.
8. Closing CTA band.

**Currency:** EUR, prices excl. VAT, stated once at the top of the table. Do not build a currency
switcher.

---

## 5. Conversion model — Calendly, and only Calendly

### 5.1 The rule

There is exactly **one** conversion action on this website: **book the free 30-minute call**.
Every primary CTA, on every page, leads to it. No newsletter modal, no gated PDF, no "request a
quote" form competing with it, no live chat widget, no exit-intent popup.

### 5.2 Why

- Calendly captures name + email + intake answers, so it *is* the lead form.
- It writes to the founder's single calendar, sends the invite, reminders, and handles reschedules.
- It removes the "someone will get back to you" dead zone that kills low-ticket consulting leads.
- It requires zero backend, zero database, and zero PII stored by us.

### 5.3 The three CTA surfaces

1. **Nav button** (`Book a free call`) — accent-filled, present in the header on every page and
   pinned in a bottom bar on mobile.
2. **Inline CTA blocks** — end of every page section group, and end of every service page.
3. **`/book`** — the destination page with the inline Calendly embed.

`/book` is the *only* page that embeds Calendly inline. Every other CTA is a normal
`<a href="/book?topic=...">` link. Rationale: one third-party script, loaded on one page,
keeps Core Web Vitals clean everywhere else. **Do not use the Calendly popup widget** — it loads
the script on every page for a worse experience.

### 5.4 Topic pre-selection (important for the founder's prep)

CTAs pass a `topic` query param naming the offering the visitor was reading:
`/book?topic=code-architecture-review`. `/book` reads it and (a) shows a one-line confirmation
banner ("You're booking about: Code & Architecture Review"), and (b) forwards it into the Calendly
embed as a UTM parameter so it appears on the booking notification. Details in §12.

### 5.5 What happens after the call (state this on `/approach`)

1. Free 30-minute call — we listen, ask, and say what we think. If we are not the right help, we
   say so on the call.
2. Within 1 working day: a short written summary and a fixed-price proposal for one of the
   engagements in §3 — scope, hours, price, turnaround.
3. You accept by replying. We invoice (bank transfer or a card payment link). Work starts.
4. Delivery, then a walkthrough call.

No contracts to negotiate for anything under €2,000; a one-page engagement letter and mutual NDA
are available and offered by default for code access.

---

## 6. Site map & routing

```
/                                   Home
/services                           All engagements (the catalogue)
/services/code-architecture-review
/services/ai-workflow-audit
/services/ai-career-roadmap
/services/working-session
/services/build-sprint
/services/advisory-retainer
/services/team-workshop
/services/custom-project
/who-we-help                        Segment hub
/who-we-help/students
/who-we-help/founders
/who-we-help/professionals
/who-we-help/teams
/approach                           How it works (5 steps) + what we won't do
/pricing                            Full price table + billing + FAQ
/about                              The firm, the people, how we work
/resources                          Free, ungated, useful (AEO engine)
/resources/<slug>                   Individual articles/checklists
/book                               Calendly embed — the only conversion page
/contact                            Email + optional form (secondary, de-emphasized)
/legal/privacy
/legal/terms
/legal/cookies                      (only if any non-essential cookies are used)
/404
```

**Primary nav (desktop):** Services · Who we help · Approach · Pricing · Resources ·
**[Book a free call]** (accent button).
Services and "Who we help" are dropdown/mega-menu panels listing children with one-line
descriptions. Everything is reachable in ≤2 clicks from home. No orphan pages.

**Mobile nav:** hamburger → full-screen panel with the same items, plus a fixed bottom CTA bar
containing `Book a free call` that is visible on all pages (respecting safe-area insets).

**Footer:** four columns (Services · Who we help · Company · Legal) + company block with legal
name, KvK number, VAT/BTW number, contact email, "Remote, from the Netherlands"
**[FOUNDER INPUT: numbers]**.

---

## 7. Page-by-page specification

Write real first-draft copy in the §2.4 voice — the founder edits rather than starts from blank.
Every price, hour count, and turnaround must come from `content/services.ts` (§10), never be
retyped inline, so a rate change is a one-line edit.

### 7.1 Home (`/`)

Sections in order:

1. **Hero.**
   - h1: **"Senior AI help, by the hour."**
   - Sub: *"Most of what people need from an AI consultancy takes hours, not months. We scope it,
     price it on this page, and deliver it in days. Start with a free 30-minute call."*
   - Primary CTA: `Book a free 30-min call` → `/book`. Secondary: `See what we do and what it
     costs` → `/pricing`.
   - Trust line directly under the CTAs, small: *"No sales script. If we're not useful to you,
     we'll say so on the call."*
   - Visually calm: type-led, generous whitespace, one restrained abstract graphic element. No
     stock photography of robots, brains, glowing circuit boards, or people pointing at monitors.

2. **"Where are you starting from?" — segment chooser.** Four large clickable cards (Students /
   Founders / Professionals / Teams), each one line of copy, each linking to
   `/who-we-help/<segment>`. This is the instant-value moment: the visitor sees themselves within
   five seconds. Keyboard accessible, real `<a>` elements.

3. **Three headline engagements.** Cards for Code & Architecture Review, AI Workflow Audit,
   Working Session — each showing **name · one-line outcome · hours · price · turnaround** and a
   link to the detail page. Showing the price here, above the fold on a second scroll, is the whole
   strategy. Below the cards: a quiet link, `See all engagements →`.

4. **"How it works" — four steps.** Book a free call → we scope it in writing → you accept and we
   invoice → you get the deliverable in days. Compact, horizontal on desktop, stacked on mobile.
   Link to `/approach`.

5. **"What you actually walk away with."** Three or four short items with concrete nouns — a
   written review ranked by what breaks first; a 90-day roadmap; a workflow map with hours saved;
   working code in your repo. Counter-programming against consultancies that deliver slide decks.

6. **Honesty band.** Short, plain-text block: *"We'll tell you when you don't need us. Some
   problems need a two-hour conversation, not a project. Some need a team we're not. You'll hear
   that on the free call, not after an invoice."* This is a differentiator — give it room.

7. **FAQ** (4–6 questions, `FAQPage` JSON-LD). See §7.6 for the bank.

8. **Closing CTA band** → `/book`.

**No** logo strips, fake testimonials, or invented metrics. If and when real, consented client
quotes exist, they slot in as section 6a (§7.9).

### 7.2 Services overview (`/services`)

- h1: "Engagements" · lede: *"Fixed scope. Fixed price. Measured in hours."*
- All eight offerings as cards, rendered from `content/services.ts`, ordered by the `order` field.
  Card shows: name, one-line outcome, hours, price, turnaround, "Learn more".
- A filter row (`All · Students · Founders · Professionals · Teams`) that filters client-side from
  the `audiences` field. Pure CSS/`useState`, no routing changes, and **all cards must be present
  in the server-rendered HTML** so crawlers see everything.
- Closing CTA band.

### 7.3 Service detail template (`/services/[slug]`)

One template, driven by data. Section order — identical on every service page:

1. **Header block** — eyebrow (audience), h1 (offering name), one-paragraph outcome statement.
2. **Facts bar** — sticky-ish row (or aside on `lg+`): **Hours · Price (excl. VAT) · Turnaround ·
   Format** + `Book a free call` button linking to `/book?topic=<slug>`.
3. **"Is this you?"** — 3–5 bullet symptoms in the client's own words. E.g. for the Code &
   Architecture Review: *"You shipped it with AI tooling and it works — but you can't tell anyone
   whether it's safe."* / *"You have paying users and no idea what happens at 10× traffic."* /
   *"A developer quoted you €40k and you can't tell if that's fair."*
4. **What we do** — 4–6 concrete items. Verbs, not adjectives.
5. **What you get** — the deliverable, described physically ("a 10–20 page written review", "a
   one-page 90-day roadmap"). Include the walkthrough call.
6. **What this is not** — explicit boundaries. Builds more trust than any testimonial.
7. **How it runs** — timeline from booking to delivery, in days.
8. **Price** — repeated, with what is and isn't included, and VAT note.
9. **FAQ** — 3–5 offering-specific questions, `FAQPage` JSON-LD.
10. **Related engagements** — 2–3 cards.
11. **CTA band** → `/book?topic=<slug>`.

Breadcrumbs (`Home / Engagements / <name>`) with `BreadcrumbList` JSON-LD.

### 7.4 Who-we-help pages (`/who-we-help/[segment]`)

One template, four data-driven instances. Section order:

1. h1 naming the segment in *their* language — e.g. *"You built it with AI. Now you need to know
   if it will hold."* (founders), *"You're entering a job market that changed while you were
   studying."* (students).
2. **"Sound familiar?"** — 4–6 pain bullets, specific and unflattering-but-kind.
3. **Where to start** — the offerings for that segment from the §3.9 matrix, in weight order,
   each with price and hours.
4. **What changes after** — the concrete outcome for that segment.
5. Segment-specific FAQ (`FAQPage`).
6. CTA band.

Students page additionally states the student rate and eligibility, prominently and without
apology.
Founders page additionally states confidentiality: mutual NDA before code access, no code retained
after delivery, no client work used as a public example without written permission.

### 7.5 Approach (`/approach`)

- The five steps from §5.5 as a numbered vertical timeline, with what *you* do and what *we* do
  at each step, plus elapsed time.
- **"What we won't do"** — no vendor commissions or referral fees; no six-month discovery phases;
  no billing for scoping; we don't take work we're not the right team for. Each with one sentence
  of why.
- **Confidentiality & data** — mutual NDA on request and offered by default for code access; what
  we do with client code and documents; what we never publish.
- **Who does the work** — link to `/about`; honest statement about the associate network (§7.9).
- FAQ + CTA band.

### 7.6 FAQ bank (write these; distribute across pages; each gets `FAQPage` JSON-LD)

Home / general:
- *How much does it cost to work with AIVI?* → "Engagements start at €75 for a student career
  roadmap and €140 for a one-hour working session. Most fixed-scope engagements are between €950
  and €1,400. Every price is listed on our pricing page."
- *Is the 30-minute call really free?* → yes, no obligation, no sales script; we may tell you that
  you don't need us.
- *How fast can you start?* → typically within a week of the call.
- *Do you work remotely?* → yes, globally; on-site workshops in the Netherlands.
- *Do I need to be technical to work with you?* → no; most founder clients are not.
- *What if I only need an hour?* → then buy an hour. That is a real product here.

Code & Architecture Review:
- *What do you need from me?* → read access to the repo, a short description of what the app does,
  and access to hosting/config if you can share it.
- *Will you sign an NDA?* → yes, before repo access, by default.
- *Will you fix the problems you find?* → not in this engagement; that's a Build Sprint.
- *My app was built mostly with AI tools. Is that a problem?* → no, that's most of what we review;
  the review is about what breaks, not about how it was written.

Workflow Audit / professionals:
- *Is this a training course?* → no; we work on your actual tasks.
- *Do you recommend specific tools?* → yes, and we take no commissions from any of them.
- *Will this tell me to replace my staff?* → no; we map where the tools save time and where they
  create risk.

Students:
- *Do I qualify for the student rate?* → currently enrolled or graduated within 12 months.
- *Can you get me a job?* → no. We can tell you honestly what the market is hiring for and what
  to build to be credible.

Write the answers so each is **self-contained and quotable in 2–4 sentences** — AI answer engines
lift short factual passages, and a passage that only makes sense in page context won't get lifted.

### 7.7 Resources (`/resources`)

The AEO engine. Ungated (no email wall — that would compete with the one conversion action) and
genuinely useful. Ship **three** pieces at launch, as MDX:

1. **"The 12-point health check for a vibe-coded app"** — a real checklist a founder can run in an
   afternoon, each item with what to look for and why it matters. Ends with: if items 4, 7, or 11
   worry you, that's what the Code & Architecture Review is for.
2. **"What AI skills are actually being hired for in 2026 — and what to build to prove you have
   them"** — for students.
3. **"Seven things professionals get wrong with LLM tools"** — concrete, with the fix for each.

Each resource: `Article` JSON-LD, question-led h2s, a table of contents on `lg+`, a soft
contextual CTA at the end (not a banner mid-article). Index page lists them with title, one-line
description, reading time, date.

Add new pieces by dropping an MDX file in `content/resources/` — document this in the README.

### 7.8 Book (`/book`)

- h1: "Book a free 30-minute call."
- Sub: what happens on the call, in three bullets: you describe the situation; we ask questions and
  tell you what we think; if there's a fit, you get a written scope and price within one working
  day.
- If `?topic=` is present and matches a known service slug, show a one-line banner: *"You're
  booking about: **Code & Architecture Review**"* — and pass it into the embed (§12).
- **Calendly inline embed**, min-height 700px, with a reserved-height skeleton so it causes no
  layout shift (CLS).
- Below the embed: *"Prefer email? <a href="mailto:...">hello@…</a>"* and the time-zone note
  ("times shown in your local time zone").
- No other links or CTAs on this page. Keep the header nav, drop the mobile bottom CTA bar here.

### 7.9 About (`/about`)

- Firm statement: what AIVI is, where it's registered, how it works, why it exists (§2.2 in prose).
- **People.** Present real, consented people only. Each card: name, one-line credential, focus
  area, 1–2 line bio, optional link (LinkedIn/Scholar). **[FOUNDER INPUT: names, bios, consent]**
- If only the founder is confirmed at launch, ship the founder card plus an honest statement:
  *"AIVI commissions specialist associates per engagement. We name who will do the work before you
  agree to anything."* **Do not invent people, headshots, or credentials.**
- Placeholder convention while awaiting input: render nothing rather than a fake. Leave a
  `{/* TODO(founder): additional associate cards */}` comment and log it in `OPEN-QUESTIONS.md`.
- Testimonials/outcomes: build the `<Testimonial>` component and leave the data array **empty**, so
  the section does not render until real, consented quotes exist. Document this in the README.

### 7.10 Contact (`/contact`)

Deliberately secondary. Email address (mailto), response-time expectation ("within one working
day"), company legal block, and one line steering to the call: *"If it's about working together,
the free 30-minute call is faster."* Optional form per §15.

### 7.11 404

Short, human, with links to `/services`, `/pricing`, `/book`.

---

## 8. Design system

**Aesthetic:** modern, minimal, inviting, type-led. Editorial calm, not SaaS gradient. Lots of
whitespace. One accent colour used sparingly so that every accent element is a CTA. The page should
feel like it respects the reader's time — which is also the product promise.

### 8.1 Colour tokens

Default direction — **"Ink & Signal"** (use this; it's approved to build with):

```css
--color-ink:          #0F1115;  /* near-black, primary text */
--color-ink-soft:     #3A4048;  /* secondary text */
--color-ink-muted:    #6B7280;  /* tertiary / meta */
--color-paper:        #FBFAF8;  /* page background, warm off-white */
--color-surface:      #FFFFFF;  /* cards */
--color-surface-alt:  #F2F0EC;  /* alternating section bands */
--color-line:         #E3E0DA;  /* hairlines, borders */
--color-accent:       #1F4FFF;  /* CTAs, links, focus rings */
--color-accent-hover: #1740D6;
--color-accent-soft:  #E8EDFF;  /* accent tint backgrounds */
--color-positive:     #167A5B;  /* "included", checkmarks */
--color-warn:         #9A6400;  /* used only in review-severity contexts */
```

Alternative direction if the founder rejects blue — **"Ink & Ochre"**: same neutrals,
`--color-accent: #C2571A`, `--color-accent-soft: #FBEDE3`. **[FOUNDER INPUT: confirm; default is
Ink & Signal]**

**Dark mode:** not required at launch. Do not build it unless the founder asks. If you do,
`prefers-color-scheme` + a `[data-theme]` override, and verify contrast in both.

**Contrast:** every text/background pair must meet WCAG AA (4.5:1 body, 3:1 large text). Verify
`--color-ink-muted` on `--color-surface-alt` specifically — it is the pair most likely to fail.

### 8.2 Typography

- **Display/headings:** a modern grotesque with character. Default: **Geist** (variable, self-hosted
  via `next/font/local`) or **Inter Variable**. If the founder wants warmth, pair with
  **Instrument Serif** for the h1 only.
- **Body:** Inter Variable (self-hosted).
- **Mono:** Geist Mono or JetBrains Mono, used only in code/resource contexts.
- Self-host all fonts, `font-display: swap`, preload the body weight. **No Google Fonts CDN**
  (latency + GDPR third-party request).

Scale (fluid via `clamp()`):

```
display   clamp(2.75rem, 6vw, 4.5rem)   / line-height 1.05 / letter-spacing -0.02em
h1        clamp(2.25rem, 4.5vw, 3.5rem) / 1.1  / -0.02em
h2        clamp(1.75rem, 3vw, 2.5rem)   / 1.15 / -0.015em
h3        clamp(1.25rem, 2vw, 1.5rem)   / 1.25
lede      clamp(1.125rem, 1.6vw, 1.375rem) / 1.5 / --color-ink-soft
body      1.0625rem / 1.65
small     0.875rem / 1.5 / --color-ink-muted
```

Max measure for prose: **68ch**. Never full-bleed body text.

### 8.3 Spacing, layout, shape

- 4px base scale: 4 8 12 16 24 32 48 64 96 128 160.
- Container max-width 1200px; prose container 720px; page gutter 20px mobile / 32px tablet /
  48px desktop.
- Section vertical rhythm: 96px mobile / 128px desktop, alternating `--color-paper` and
  `--color-surface-alt` bands to give the long pages structure.
- Radius: 4px (inputs, small), 10px (cards), 999px (pills only).
- Shadows: almost none. One soft elevation for cards on hover:
  `0 1px 2px rgba(15,17,21,.04), 0 8px 24px rgba(15,17,21,.06)`. Prefer 1px `--color-line` borders
  over shadows.
- Breakpoints: 480 / 768 / 1024 / 1280.

### 8.4 Motion

Subtle and purposeful only: 150–200ms ease-out on hover/focus; a 400ms fade-up (12px) on section
reveal via `IntersectionObserver`. **Everything wrapped in
`@media (prefers-reduced-motion: reduce)` no-ops.** No parallax, no scroll-jacking, no animated
gradients, no counters ticking up.

### 8.5 Imagery & graphics

- No stock photography of robots, brains, circuitry, glowing nodes, or generic "team collaborating"
  shots. They cheapen the positioning instantly.
- Use: generous type, thin rules, small abstract SVG diagrams (a workflow map, a severity-ranked
  list), and real screenshots of *anonymized* deliverable formats if available.
- All decorative SVG `aria-hidden="true"`; all meaningful images get real alt text.
- Logo: **[FOUNDER INPUT]**. Until supplied, use a clean wordmark "AIVI" set in the display font
  with -0.03em tracking, plus a simple favicon; keep it isolated in one component so swapping is
  one file.

### 8.6 Accessibility (non-negotiable)

- Visible focus ring on every interactive element: 2px `--color-accent`, 2px offset. Never
  `outline: none` without a replacement.
- Semantic landmarks (`header/nav/main/footer`), one `h1` per page, no heading level skips.
- Skip-to-content link as the first focusable element.
- Dropdown nav operable by keyboard (Escape closes, focus trapped while open, `aria-expanded`).
- FAQ accordion: `<button aria-expanded aria-controls>` + real disclosure semantics; content
  present in the DOM (collapsed via CSS) so crawlers read it.
- Target size ≥ 44×44px on mobile.
- Test the whole site once with keyboard only, and once with VoiceOver.

---

## 9. Component library

Build these as reusable, typed components in `components/`. No component invents content — all
copy arrives via props or from `content/`.

**Layout & chrome**
- `SiteHeader` — logo, nav with two mega-menu panels, accent CTA button; sticky with a subtle border
  once scrolled; mobile hamburger → full-screen panel.
- `MobileCtaBar` — fixed bottom bar with the primary CTA; hidden on `/book`; respects safe-area.
- `SiteFooter` — four link columns + legal/company block.
- `Container`, `Section` (props: `tone: 'paper' | 'alt'`, `spacing`).
- `Breadcrumbs` (+ emits `BreadcrumbList` JSON-LD).
- `SkipLink`.

**Content**
- `Hero` — eyebrow, h1, lede, primary + secondary CTA, trust line.
- `ServiceCard` — name, outcome, hours, price, turnaround, href. Price and hours come from the
  service record; never hardcoded.
- `SegmentCard` — the four "where are you starting from" cards.
- `FactsBar` — the hours/price/turnaround/format strip on service pages.
- `StepList` — numbered process timeline (vertical mobile, horizontal desktop).
- `BulletList` — "Is this you?" / "What we do" / "What you get" / "What this is not". Variant prop
  controls the marker (check / dash / cross).
- `PriceTable` — full table on `md+`, stacked cards below; rendered from `content/services.ts`.
- `Faq` — accessible accordion; also emits `FAQPage` JSON-LD from the same data.
- `CtaBand` — heading, one line, primary button; `topic` prop appends `?topic=`.
- `HonestyNote` — the plain-text trust block.
- `PersonCard` — for `/about`, real people only.
- `Testimonial` — built, but rendered only when `content/testimonials.ts` is non-empty (launch:
  empty array).
- `Prose` — MDX typography wrapper for `/resources`.
- `ResourceCard`, `TableOfContents`.

**Utility**
- `Button` — variants `primary | secondary | ghost`, sizes `md | lg`, renders `<a>` when `href` is
  given and `<button>` otherwise.
- `CalendlyEmbed` — §12.
- `Reveal` — IntersectionObserver fade-up, no-op under reduced motion.
- `JsonLd` — serializes an object into `<script type="application/ld+json">` with proper escaping.
- `Seo` helper / `generateMetadata` factory — §13.

---

## 10. Content model

All business content lives in typed TypeScript files so a cold agent (and later the founder) edits
data, not JSX. **A price appears in exactly one place in the codebase.**

`content/services.ts`:

```ts
export type Audience = 'students' | 'founders' | 'professionals' | 'teams';

export interface Service {
  slug: string;                 // URL segment
  name: string;                 // "Code & Architecture Review"
  outcome: string;              // one line, benefit-first
  audiences: Audience[];        // drives filtering + who-we-help pages
  weight: Partial<Record<Audience, 1 | 2 | 3>>; // §3.9 matrix, 3 = strongest
  hours: string;                // "8–10 hours"
  price: string;                // "€1,200"  (display string, excl. VAT)
  priceNote?: string;           // "student rate", "per month", "from"
  turnaround: string;           // "Report within 5 working days"
  format: string;               // "Remote · async + 60-min walkthrough"
  isThisYou: string[];
  whatWeDo: string[];
  whatYouGet: string[];
  whatThisIsNot: string[];
  howItRuns: { label: string; detail: string }[];
  faq: { q: string; a: string }[];
  related: string[];            // slugs
  order: number;                // display order in /services
  featured: boolean;            // shown on home
  paymentMode: 'call-first' | 'self-serve';  // §12.5 — launch: all 'call-first'
  paymentLink?: string;         // Stripe Payment Link; required iff self-serve
  seo: { title: string; description: string };
}

export const services: Service[] = [ /* all 8 offerings from §3 */ ];
export const getService = (slug: string) => services.find(s => s.slug === slug);
export const servicesFor = (a: Audience) =>
  services.filter(s => s.audiences.includes(a))
          .sort((x, y) => (y.weight[a] ?? 0) - (x.weight[a] ?? 0));
```

Other content files:
- `content/segments.ts` — the four audiences: slug, headline, pains, outcome, faq, seo.
- `content/faq.ts` — the general FAQ bank (§7.6).
- `content/company.ts` — confirmed values, use verbatim:

  ```ts
  export const company = {
    legalName: 'AIVI AI Services',
    brandName: 'AIVI',
    street: 'Science Park 608',
    postalCode: '1098 XH',
    city: 'Amsterdam',
    country: 'The Netherlands',
    countryCode: 'NL',
    vat: 'NL005436672B26',        // VIES-validated 2026-07-28
    kvk: 'TODO_KVK',              // [FOUNDER INPUT] — blocks launch
    email: 'TODO_EMAIL',          // [FOUNDER INPUT]
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
    socials: [] as string[],      // [FOUNDER INPUT] — LinkedIn etc.; empty renders nothing
  };
  ```

  These values feed the footer, `/legal/*`, and the `ProfessionalService` JSON-LD `address` /
  `vatID` fields (§13.2). Never invent a registration number — `validate-content.ts` must fail the
  production build while any `TODO_` token remains.
- `content/people.ts` — real, consented people only. May be a single entry.
- `content/testimonials.ts` — `export const testimonials: Testimonial[] = [];` at launch.
- `content/resources/*.mdx` — articles with frontmatter (title, description, date, readingTime,
  audience, faq?).

Add a build-time validation step (`scripts/validate-content.ts`, run in `prebuild`) that fails the
build if: a `related` slug doesn't exist, a service is missing a required field, an FAQ answer is
under 40 characters, or any banned word from §2.4 appears in content files.

---

## 11. Tech stack & repository

### 11.1 Stack

- **Next.js (App Router, latest stable) + TypeScript**, fully static (`output: 'export'` is
  acceptable; plain SSG on Vercel is also fine — no dynamic server rendering is needed).
- **Tailwind CSS** with the §8 tokens defined as CSS custom properties in `app/globals.css` and
  mapped into the Tailwind theme. Do not scatter raw hex values in components.
- **MDX** for `/resources` (`@next/mdx` or `contentlayer`-style local loader — prefer the simplest
  that works).
- **Hosting: Vercel.** Auto-deploy `main` → production, PRs → previews.
- **No** state library, no UI kit, no animation library (use CSS + one small IntersectionObserver
  hook), no analytics SDK beyond §14, no chat widget, no cookie-setting third parties beyond
  Calendly on `/book`.

Rationale: SSG emits complete semantic HTML at build time, which is what both search crawlers and
AI answer engines need, and it makes the "no backend" requirement literal rather than aspirational.

**Acceptable alternative:** Astro, same structure and same Calendly approach. **Not acceptable:** a
client-rendered SPA (Vite/CRA without SSR/SSG) — it degrades SEO/AEO, which is a stated first-class
requirement.

### 11.2 File tree

```
aivi-website/
├─ app/
│  ├─ layout.tsx                 # html shell, fonts, header/footer, Organization JSON-LD
│  ├─ globals.css                # tokens, base, prose styles
│  ├─ page.tsx                   # Home
│  ├─ services/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx         # generateStaticParams from content/services.ts
│  ├─ who-we-help/
│  │  ├─ page.tsx
│  │  └─ [segment]/page.tsx
│  ├─ approach/page.tsx
│  ├─ pricing/page.tsx
│  ├─ about/page.tsx
│  ├─ resources/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ book/
│  │  ├─ page.tsx
│  │  └─ confirmed/page.tsx      # §12.5.4 — noindex, unlinked, post-payment landing
│  ├─ contact/page.tsx
│  ├─ legal/{privacy,terms,cookies}/page.tsx
│  ├─ not-found.tsx
│  ├─ sitemap.ts
│  ├─ robots.ts
│  └─ opengraph-image.tsx        # generated OG image (or static /public/og.png)
├─ components/                   # §9
├─ content/                      # §10
├─ lib/
│  ├─ seo.ts                     # metadata factory
│  ├─ jsonld.ts                  # schema builders
│  └─ calendly.ts                # URL builder (§12)
├─ public/
│  ├─ fonts/                     # self-hosted variable fonts
│  ├─ llms.txt                   # §13.5
│  └─ favicon/…
├─ scripts/validate-content.ts
├─ OPEN-QUESTIONS.md             # every [FOUNDER INPUT] you defaulted or stubbed
├─ HANDOFF.md                    # §20.5
└─ README.md
```

### 11.3 Conventions

- Server Components by default. `'use client'` only for: mobile nav, mega-menu, FAQ accordion,
  services filter, `Reveal`, and the Calendly embed.
- No `any`. Strict TS. ESLint + Prettier, and a `lint:copy` script for banned words.
- Conventional commits. Small PRs matching the §18 phases.

---

## 12. Calendly integration (exact spec)

### 12.1 Calendly account setup (document what you configure in `HANDOFF.md`)

- **One event type only: "AIVI — Free 30-minute call"**, 30 minutes, remote (Google Meet or Zoom
  — **[FOUNDER INPUT: which]**).
- Connected to **one** calendar. **[FOUNDER INPUT: Google or Microsoft, which account]**
- Availability: **[FOUNDER INPUT: working hours + time zone Europe/Amsterdam]**. Recommend a
  minimum scheduling notice of 12 hours and a daily cap of 3 so the founder isn't swamped.
- **US-reachable slots (do not skip this).** A Mon–Fri 09:00–17:00 Europe/Amsterdam window gives a
  US East Coast visitor only 03:00–11:00 ET, and a West Coast visitor 00:00–08:00 PT — i.e. the
  West Coast sees almost nothing bookable. If US clients are wanted, add a recurring evening block,
  e.g. **Tue + Thu 18:00–20:30 CET** (= 12:00–14:30 ET / 09:00–11:30 PT). This costs two evenings a
  week and is the difference between a US visitor booking and bouncing. Calendly handles the
  time-zone conversion automatically; the constraint is purely which hours you open.
- Buffers: 15 minutes after each booking.
- **Intake questions** (this is our lead qualification — keep it to four, all short):
  1. Name *(built-in)* · 2. Email *(built-in)*
  3. "Which best describes you?" — single select: *Student / early career · Founder with a product ·
     Professional wanting better AI workflows · Team or company lead · Something else*
  4. "In one or two sentences, what would you like help with?" — long text, required.
  5. "Anything we should look at before the call? (link to your app, repo, or site)" — short text,
     optional.
- Confirmation & reminder workflows on: confirmation immediately, reminder 24h and 1h before.
- Brand colour set to `--color-accent`; remove Calendly branding if the plan tier allows.
- Time zone auto-detection on (default).
- **[FOUNDER INPUT: Calendly plan tier]** — the free tier supports one event type and is
  sufficient for launch; paid tiers add branding removal and workflows.

Store the scheduling URL in an env var, not in source:
`NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/<handle>/30min`.

### 12.2 The embed component

`components/CalendlyEmbed.tsx` — client component, used **only** on `/book`:

- Renders `<div class="calendly-inline-widget" data-url={url} data-auto-load="false" />` with a
  reserved `min-height: 700px` (and `min-height: 1000px` below `md`) so there is **no layout
  shift**.
- Loads `https://assets.calendly.com/assets/external/widget.js` via `next/script` with
  `strategy="lazyOnload"`, then calls `Calendly.initInlineWidget(...)`.
- Shows a lightweight skeleton (a bordered box with "Loading the calendar…") until the widget
  reports ready or 4 seconds elapse.
- **Fallback:** if the script fails to load or JS is off, render a plain
  `<a href={url} target="_blank" rel="noopener">Open the booking page →</a>`. Ship this inside
  `<noscript>` as well. Never leave a blank box.
- Cleans up the injected widget on unmount.

### 12.3 URL builder (`lib/calendly.ts`)

```ts
export function buildCalendlyUrl(topic?: string) {
  const base = process.env.NEXT_PUBLIC_CALENDLY_URL!;
  const p = new URLSearchParams({
    hide_gdpr_banner: '1',
    primary_color: '1F4FFF',
    utm_source: 'website',
    utm_medium: 'book_page',
  });
  if (topic) { p.set('utm_campaign', topic); p.set('utm_content', topic); }
  return `${base}?${p.toString()}`;
}
```

`utm_campaign`/`utm_content` surface in Calendly's booking notification, so the founder sees which
engagement the visitor was reading before they booked. Validate `topic` against the known service
slugs before using it — never interpolate an arbitrary query param into a URL or into the page.

Set `hide_gdpr_banner=1` **only if** the site's own privacy policy and (if used) cookie notice
cover Calendly as a processor — see §16. Otherwise leave Calendly's banner on.

### 12.4 What we deliberately do not build

No popup widget, no Calendly script on pages other than `/book`, no Calendly API integration, no
webhook receiver, no second event type, no paid Calendly events, no Stripe. The migration path if
paid bookings are wanted later is §12.5. Note it in `HANDOFF.md`.

---

## 12.5 Taking payment on the site — deferred by design, seams reserved

### 12.5.1 The decision

**At launch, the website takes no payment.** Every engagement runs: free call → written scope →
invoice. This is correct for the €950–€3,000 work (it needs scoping, an NDA, and repo access before
a price is honest) and acceptable everywhere else while volume is zero.

**It is not correct forever for the low tier.** A €75 student roadmap that requires a free 30-minute
call first costs ~2 hours of founder time for €75 — under €40/hour, before invoicing admin. A €140
working session has the same problem in miniature, plus it contradicts the "published price, start
now" positioning: making someone book a sales call to buy one hour is the friction we differentiate
against.

So: the site launches call-only, and the implementing agent must make switching a single service to
self-serve a **content edit, not a rebuild.**

### 12.5.2 The seam (build this at launch — it is ~20 lines)

Add two optional fields to the `Service` type in `content/services.ts` (§10):

```ts
  paymentMode: 'call-first' | 'self-serve';  // launch: every service is 'call-first'
  paymentLink?: string;                      // Stripe Payment Link URL; required iff self-serve
```

`validate-content.ts` must fail the build if `paymentMode === 'self-serve'` and `paymentLink` is
absent, or if `paymentLink` is set on a `call-first` service.

`ServiceCard`, `FactsBar`, and `CtaBand` branch on `paymentMode`:

| `paymentMode` | CTA label | href |
|---|---|---|
| `call-first` | "Book a free 30-min call" | `/book?topic=<slug>` |
| `self-serve` | "Book and pay — €140" | `service.paymentLink` |

That branch is the entire feature. Every service ships `call-first`; nothing else changes at launch.

### 12.5.3 Switching one on later (founder-operable, no developer)

1. In the **Stripe dashboard**, create a Payment Link for the product. Set its post-payment redirect
   to `https://<site>/book/confirmed?s=<slug>`. Enable card, **iDEAL** (Dutch clients expect it),
   and international cards if selling to the US. Optionally enable **Stripe Tax** so VAT is
   determined and applied automatically at checkout — this is the main reason to prefer a Payment
   Link over a manual invoice for cross-border self-serve sales.
2. In `content/services.ts`, set `paymentMode: 'self-serve'` and paste the `paymentLink`.
3. Commit. Vercel redeploys. Done.

### 12.5.4 `/book/confirmed` (build at launch, unlinked)

A static thank-you page: *"Payment received. Now pick your time."* plus the same `CalendlyEmbed`,
with `topic` read from the `?s=` param and validated against known slugs. `noindex`, excluded from
`sitemap.ts`, not in any nav.

No session verification, no webhook, no API call. The page is only reachable via Stripe's redirect,
and the worst case if someone guesses the URL is that they book a call they didn't pay for — which
you see on your calendar before it happens. Do not add server-side verification to close that
hole; the cure costs more than the disease.

### 12.5.5 Still explicitly not building

Stripe Checkout Sessions, Stripe API keys anywhere in the repo, webhook receivers, serverless
functions, session verification, a currency switcher. If any of these ever become genuinely
necessary, that is a separate project with its own plan.

**Alternative worth knowing about:** Calendly's native Stripe payment collection takes payment *at
the moment of booking*, which is a cleaner single-flow UX than link-then-schedule. It needs a paid
Calendly tier and one event type per priced product. If the founder is already paying for Calendly,
prefer it over §12.5.3. **[FOUNDER INPUT: verify the current Calendly tier that includes payments —
their plan structure changes.]**

---

## 13. SEO / AEO specification

### 13.1 Technical

- Every route statically pre-rendered; view-source must show full content, not a JS shell.
- Unique `<title>` (≤60 chars) and meta description (≤155 chars) per route, from `service.seo` /
  `segment.seo` / page constants via `lib/seo.ts`.
- Canonical URL on every page, absolute, from `NEXT_PUBLIC_SITE_URL`.
- `app/sitemap.ts` generating all routes from the content files; `app/robots.ts` allowing all and
  pointing to the sitemap.
- OpenGraph + Twitter card on every page; a generated OG image with the page title on the brand
  background.
- `lang="en"`; `html` has a sensible `theme-color`.
- No `noindex` anywhere except previews (set `X-Robots-Tag: noindex` on non-production Vercel
  deployments).

### 13.2 Structured data (JSON-LD) — critical for AEO

In `lib/jsonld.ts`, build and inject:

- **`ProfessionalService`** (site-wide, in `app/layout.tsx`): legal name, alternateName "AIVI",
  url, logo, description, `areaServed: "Worldwide"`, `address` (NL), `email`, `sameAs` socials,
  `priceRange`, and `hasOfferCatalog` listing all eight offerings as `Offer` → `Service` with
  `name`, `description`, and `priceSpecification` (EUR, `valueAddedTaxIncluded: false`).
- **`Service`** on each `/services/<slug>`: `name`, `serviceType`, `provider` (@id ref to the
  organization), `description`, `areaServed`, `offers` with price + currency, `audience`.
- **`FAQPage`** on home, pricing, every service page, every segment page — generated from the same
  data the visible accordion renders, so they can never disagree.
- **`BreadcrumbList`** on all nested pages.
- **`Person`** on `/about` for each real, consented person only.
- **`Article`** on each resource page (headline, description, datePublished, author =
  organization).
- **`WebSite`** with `url` and `name` in the layout.

Validate every page against Google's Rich Results Test and the Schema.org validator before launch.

### 13.3 AEO content patterns

- Each page opens by answering its own question in the first 40 words. No throat-clearing.
- Answers are **self-contained** — an AI answer engine lifting one paragraph must get a complete,
  accurate statement including the price or the number of hours where relevant.
- Use question-form h2/h3s on service and resource pages ("What do you need from me?", "What does
  a code review cost?").
- Define the entity explicitly, once, in prose on `/about` and in the JSON-LD: *what AIVI is, where
  it is registered, who it serves, what it charges.*
- Keep prices in **text**, never inside an image.
- Internal linking: every service page links to its segment pages and vice versa; resources link to
  the relevant service.

### 13.4 Target queries to write for

"AI consultant for non-technical founders", "code review for vibe-coded app", "is my AI-built app
secure", "hourly AI consulting", "AI workflow audit for professionals", "AI career advice for
students", "affordable AI consultant Netherlands", "architecture review fixed price".

Each should have an obvious landing page. Map query → page in `HANDOFF.md`.

### 13.5 `llms.txt`

Publish `/public/llms.txt` — a plain-text summary of what AIVI is, the eight offerings with prices
and hours, who each is for, and the booking URL. Cheap to maintain, increasingly used by answer
engines.

### 13.6 Verification

Google Search Console + Bing Webmaster Tools verification (DNS TXT or the meta-tag method),
sitemap submitted for both. **[FOUNDER INPUT: domain + registrar access]**

---

## 14. Analytics

- **Vercel Web Analytics** (default) or **Plausible** — both cookieless, so no consent banner is
  required for analytics alone. **[FOUNDER INPUT: preference; default Vercel Web Analytics]**
- Do **not** install Google Analytics unless the founder insists; if they do, it must be gated
  behind an opt-in consent banner (§16) and `/legal/cookies` must ship.
- Events worth tracking (custom events, no PII):
  - `cta_click` with `{ location, topic }` — every primary CTA.
  - `book_page_view`, `calendly_loaded`.
  - `segment_card_click` with `{ segment }`.
  - `pricing_view`, `service_view` with `{ slug }`.
- Calendly's own dashboard is the source of truth for bookings. Cross-check monthly.

---

## 15. Contact form (optional, secondary)

Default: **no form** — publish an email address and steer to the call. This keeps the build fully
static and the funnel single-threaded.

If the founder wants a form, implement the smallest version:
- Fields: name, email, message, plus a honeypot input hidden from users and screen readers.
- Submit to a **hosted provider** (Formspree/Basin) — no API keys in the repo, no serverless
  function, still zero backend. Alternative: one Vercel Function → Resend, with the API key in a
  server-only env var, never `NEXT_PUBLIC_`.
- Cloudflare Turnstile if spam appears; do not add it preemptively.
- Accessible: real `<label>`s, `aria-describedby` errors, inline validation messages, a visible
  success state, no "success" that lies about delivery.

---

## 16. Legal & compliance (Netherlands / EU)

- **Footer + `/legal/*` company block — confirmed values, use verbatim:**

  ```
  AIVI AI Services
  Science Park 608
  1098 XH Amsterdam
  The Netherlands
  VAT / BTW: NL005436672B26
  KvK: [FOUNDER INPUT — still outstanding]
  ```

  VAT number validated against the EU VIES registry on 2026-07-28: valid, registered to
  "AIVI AI SERVICES", Science Park 00608, 1098XH Amsterdam. **KvK number is the only company
  identifier still missing and it blocks launch** — Dutch law requires it on business
  communications. Do not invent it; ship the `[FOUNDER INPUT]` token and flag it in
  `OPEN-QUESTIONS.md`.
- **Privacy policy** (`/legal/privacy`) — GDPR. Must cover:
  - What we collect: booking data via Calendly (name, email, answers, calendar entry), analytics
    (cookieless, aggregate), form data if §15 is enabled, email correspondence.
  - Lawful basis: legitimate interest / performance of a contract for bookings; consent for
    non-essential cookies if any exist.
  - **Processors named explicitly:** Calendly (US, booking), Vercel (hosting), the video-call
    provider (Google Meet or Zoom), the email provider, the analytics provider. State the
    international-transfer mechanism (SCCs / DPF as applicable).
  - Retention periods, data-subject rights (access, erasure, portability, objection), and the
    contact address for requests. Right to complain to the Autoriteit Persoonsgegevens.
- **Terms** (`/legal/terms`) — engagement scope, what a deliverable is and is not, payment terms
  (14 days), cancellation/reschedule policy (§4), IP ownership of deliverables (client owns the
  deliverable; AIVI retains generic know-how), confidentiality, and a limitation of liability.
  **[FOUNDER INPUT: confirm; have a Dutch lawyer or accountant review before launch.]**
- **Cookies** — with cookieless analytics and Calendly loading only on `/book`, a consent banner is
  likely unnecessary sitewide. **Verify empirically:** load every page with devtools open and
  confirm no cookies or localStorage are set before interaction. If `/book` sets Calendly cookies,
  either (a) disclose it in the privacy policy and leave Calendly's own GDPR banner enabled (i.e.
  drop `hide_gdpr_banner`), or (b) gate the embed behind a click-to-load consent card. **Prefer
  (b) if the founder wants to be conservative** — it's a small component and removes the question.
- **VAT** — prices shown excl. VAT with a clear note. Dutch BTW applied per NL/EU rules; reverse
  charge for valid EU VAT-registered business clients; outside the EU see §16.1. **[FOUNDER INPUT:
  confirm with accountant; the site must not state a VAT treatment that hasn't been confirmed.]**
- **No unverifiable claims** — see §0.6.

### 16.1 Selling outside the EU — the United States in particular

The founder has a KvK registration, so AIVI is a registered Dutch business supplying services
cross-border. Six things matter, roughly in order of how likely each is to actually bite.

**1. Scheduling is the real barrier, not tax.** See §12.1 — default Amsterdam office hours make
AIVI effectively unbookable from the US West Coast. Fix the availability window before worrying
about anything else on this list.

**2. Getting paid — never ask a US client for a SEPA/IBAN transfer.** An international wire from a
US bank costs the sender $25–50, can lose value to intermediary banks, and takes days; US finance
teams treat it as friction and some will simply stall. Send a **Stripe-hosted invoice or payment
link** instead — they pay by card or ACH in one click. Note that international cards cost
noticeably more in Stripe fees than EEA cards, with currency conversion on top; check Stripe's
current rate card. At these ticket sizes, absorb it rather than surcharging. If US revenue becomes
regular, a Wise Business USD receiving account is worth opening.

**3. Have a W-8BEN-E filled out and ready — this is the most common cause of a stalled first US
invoice.** Most US companies' accounts-payable systems will not release payment to a foreign
supplier without a W-8 on file. It certifies foreign status and claims benefits under the
US–Netherlands income tax treaty. **W-8BEN-E** if invoicing as an entity (BV); **W-8BEN** if
invoicing as an individual/eenmanszaak. Because the services are performed from the Netherlands,
the income is foreign-source and generally not subject to the 30% withholding at all — but the form
is still what unblocks the payment. Fill one in now, keep the PDF, send it the same day it's asked
for. Relatedly: with no US office, employees, or dependent agent, there is no US permanent
establishment, so the treaty's business-profits article keeps AIVI outside US income tax.

**4. Dutch VAT generally does not apply to US clients.** Consultancy and advisory services fall
under the place-of-supply rules that locate the supply where the customer belongs, so a client
established outside the EU is outside the scope of Dutch BTW — invoice shows €0 VAT with a short
note explaining why. **Two carve-outs to check specifically:** services *physically performed* in
the US (an on-site workshop) and anything that qualifies as an electronically-supplied service
rather than live human consulting can follow different rules. **[FOUNDER INPUT: confirm the general
case and both carve-outs with the accountant. Until confirmed, the website states only "prices
exclude VAT; VAT is applied per your location and status" and nothing more specific.]**

**5. US state sales tax — almost certainly not a concern yet.** Most states do not tax professional
consulting services; a few tax certain computer or data-processing services. Economic-nexus
thresholds are typically $100k or 200 transactions per state per year, far above launch volume.
**Publish nothing about US tax on the website.** Revisit only if US revenue becomes material.

**6. Currency and governing law.** Keep **EUR as the single published currency** — a US buyer
seeing €140 is not friction, and a currency switcher is (see §12.5.5). Be willing to invoice in USD
if their AP asks.

`/legal/terms` states: **governed by the laws of the Netherlands, with the Rechtbank Amsterdam
(Amsterdam District Court) having exclusive jurisdiction** — the registered seat is Amsterdam, so
this is the natural forum. Include the liability cap (recommend: capped at the fees paid for the
engagement in question). Expect occasional pushback from larger US clients; at these engagement
sizes, declining to negotiate is reasonable.

**One drafting caveat for the lawyer:** several offerings (AI Career Roadmap, Working Session) are
sold to **consumers**, not businesses. Under EU consumer-protection rules a choice-of-law clause
cannot strip an EU consumer of the mandatory protections of their own country of residence, and
consumer jurisdiction rules differ from B2B. The terms should therefore distinguish business
clients from consumers rather than applying one clause to everyone. **[FOUNDER INPUT: Dutch lawyer
review before launch — this is the one clause worth paying for.]**

---

## 17. Performance & quality budgets

| Metric | Target |
|---|---|
| Lighthouse Performance (mobile) | ≥ 95 (≥ 90 on `/book` with the embed) |
| Lighthouse Accessibility | ≥ 98 |
| Lighthouse SEO | ≥ 100 |
| Lighthouse Best Practices | ≥ 95 |
| LCP | < 2.0s mobile |
| CLS | < 0.02 (0 on all pages except `/book`) |
| INP | < 200ms |
| First-load JS (non-`/book` pages) | < 90KB gzipped |
| Third-party requests on non-`/book` pages | 0 |

How to hit these: static HTML, self-hosted variable fonts with `preload` on the body face, no
image-heavy hero, SVG for all graphics, `next/image` with explicit dimensions for any raster,
minimal client components, Calendly isolated to one lazily-loaded page.

---

## 18. Build phases

Each phase is a shippable PR. Deploy to a Vercel preview at the end of each.

**Phase 0 — Setup (½ day)**
- Init Next.js + TS + Tailwind. Configure tokens from §8 in `globals.css` + Tailwind theme.
- Self-host fonts via `next/font/local`. ESLint, Prettier, strict TS.
- `content/` skeleton with all §10 types. `OPEN-QUESTIONS.md` created.
- Deploy an empty shell to Vercel. Confirm previews work.

**Phase 1 — Chrome & design system (1 day)**
- `SiteHeader` (with working keyboard-accessible mega-menus), `SiteFooter`, `MobileCtaBar`,
  `Container`, `Section`, `Button`, `SkipLink`, `Reveal`, `JsonLd`.
- `app/layout.tsx` with fonts, metadata defaults, `ProfessionalService` + `WebSite` JSON-LD.
- A `/styleguide` route (excluded from sitemap and `noindex`) rendering every component and type
  scale — delete or keep behind an env flag before launch.

**Phase 2 — Content data (1 day)**
- Fill `content/services.ts` with all eight offerings from §3, verbatim scope/price/turnaround.
- Fill `content/segments.ts`, `content/faq.ts`, `content/company.ts` (placeholders flagged),
  `content/people.ts`, empty `content/testimonials.ts`.
- `scripts/validate-content.ts` + wire into `prebuild`.

**Phase 3 — Core pages (2–3 days)**
- Home (§7.1) with all eight sections.
- `/services` + the `[slug]` template → 8 pages.
- `/who-we-help` + `[segment]` → 4 pages.
- `/approach`, `/pricing`, `/about`, `/contact`, `/404`.
- All CTAs wired to `/book?topic=…`.

**Phase 4 — Booking (½ day)**
- `/book` with `CalendlyEmbed`, topic banner, skeleton, no-JS fallback, cleanup on unmount.
- Verify: no layout shift, works with JS disabled, works on mobile Safari.
- Build the §12.5 payment seam: `paymentMode` / `paymentLink` fields, the CTA branch in
  `ServiceCard` / `FactsBar` / `CtaBand`, the validator rule, and `/book/confirmed` (noindex,
  unlinked). All services stay `call-first`. Test the branch once with a dummy link, then revert.

**Phase 5 — SEO/AEO (1 day)**
- `lib/seo.ts` metadata for every route; `sitemap.ts`; `robots.ts`; OG images.
- All JSON-LD from §13.2; validate every type in the Rich Results Test.
- `/public/llms.txt`. Banned-word lint pass over all copy.

**Phase 6 — Resources (1 day)**
- MDX pipeline, `Prose`, `/resources` index, three launch articles (§7.7), `Article` JSON-LD, TOC.

**Phase 7 — Legal & analytics (½ day)**
- `/legal/privacy`, `/legal/terms`, `/legal/cookies` (if needed). Footer company block.
- Analytics installed; events from §14 firing.
- Cookie audit per §16.

**Phase 8 — QA & launch (1 day)**
- Full §19 checklist. Lighthouse on mobile for home, a service page, pricing, `/book`.
- Keyboard-only pass and a VoiceOver pass.
- Cross-browser: Safari (macOS + iOS), Chrome, Firefox. Widths 320 / 375 / 768 / 1024 / 1440.
- Domain + DNS + HTTPS. Search Console + Bing verification, sitemaps submitted.
- Email domain auth: **SPF, DKIM, DMARC** on the sending domain — the founder will be emailing
  prospects and proposals from it, and without these the mail lands in spam.
- `HANDOFF.md` + `OPEN-QUESTIONS.md` finalized.

Estimated total: **8–10 working days.**

---

## 19. Acceptance criteria

Functionality
- [ ] Every page server-renders full content (view-source, JS disabled) — including FAQ answers and
      all service cards.
- [ ] Every primary CTA on every page reaches `/book`; service-page CTAs carry the correct
      `?topic=` slug.
- [ ] `/book` embed loads, is bookable end-to-end on desktop and mobile, and produces a real
      calendar invite in the connected calendar.
- [ ] The booking notification shows the intake answers and the `utm_content` topic.
- [ ] `/book` degrades to a working link with JS disabled or the Calendly script blocked.
- [ ] Every service ships `paymentMode: 'call-first'`; no Stripe key, link, or SDK appears anywhere
      in the repo or the client bundle (grep confirms).
- [ ] Flipping one service to `'self-serve'` with a dummy `paymentLink` changes its CTA correctly
      and the build still passes — verify once locally, then revert (proves the §12.5 seam works).
- [ ] `/book/confirmed` renders, is `noindex`, and is absent from `sitemap.xml` and all navigation.
- [ ] Nav mega-menus and the FAQ accordion are fully keyboard operable; Escape closes menus.

Content integrity
- [ ] Every price, hour count, and turnaround on the site traces to `content/services.ts` — grep
      confirms no hardcoded prices in JSX.
- [ ] Zero fabricated people, credentials, clients, testimonials, logos, or metrics.
- [ ] No banned words from §2.4 (lint script passes).
- [ ] Every `[FOUNDER INPUT]` that was defaulted or stubbed is listed in `OPEN-QUESTIONS.md`.

SEO/AEO
- [ ] Unique title + description + canonical on every route.
- [ ] `sitemap.xml` lists every public route; `robots.txt` points to it.
- [ ] `ProfessionalService`, `Service` ×8, `FAQPage`, `BreadcrumbList`, `Person`, `Article`,
      `WebSite` all validate in the Rich Results Test.
- [ ] `llms.txt` present and accurate.
- [ ] Non-production deployments are `noindex`.

Performance & accessibility
- [ ] §17 budgets met on mobile Lighthouse.
- [ ] Zero third-party network requests on any page except `/book`.
- [ ] WCAG AA contrast on every text/background pair, verified including `ink-muted` on
      `surface-alt`.
- [ ] Visible focus ring everywhere; skip link works; one `h1` per page; no heading-level skips.
- [ ] All motion disabled under `prefers-reduced-motion`.

Compliance
- [ ] Privacy, terms (and cookies, if applicable) published and linked from the footer.
- [ ] Footer shows legal name, KvK, VAT, and contact email (real values, or the launch is blocked
      on founder input — flag it, don't invent).
- [ ] Cookie audit done: no non-essential cookies set before interaction on any page but `/book`,
      and `/book` handled per §16.
- [ ] SPF, DKIM, DMARC configured on the sending domain.

---

## 20. Deliverables from the implementing agent

1. Production site deployed on the chosen domain via Vercel, HTTPS, previews on PRs.
2. GitHub repo, clean history, README covering: local setup, env vars, **how to change a price**,
   **how to add a service**, **how to add a resource article**, **how to add a person**, and how to
   swap the logo.
3. `OPEN-QUESTIONS.md` — every founder input still outstanding, with the default currently shipped
   and the exact file:line to change.
4. `HANDOFF.md` — Calendly configuration as built (event type, intake questions, availability,
   workflows), analytics setup, DNS records, Search Console access, the query→page map (§13.4), and
   the documented migration path to paid Calendly bookings (§12.4).
5. Lighthouse reports (mobile) for home, one service page, `/pricing`, `/book`.
6. A short screen recording of the booking flow end to end.

---

## 21. Open decisions (consolidated) — every one has a shipping default

| # | Decision | Proposed default (build with this) |
|---|---|---|
| 1 | Domain | [FOUNDER INPUT — blocks launch only, not build] |
| 2 | Tagline | "AI expertise, by the hour." |
| 3 | Accent colour | Ink & Signal (`#1F4FFF`) |
| 4 | Logo | Wordmark set in the display font |
| 5 | Working Session rate | €140/hr; €375 for 3 hours |
| 6 | Code & Architecture Review | €1,200, 8–10 hrs, 5 working days |
| 7 | AI Workflow Audit | €950, 6–8 hrs, 5 working days |
| 8 | AI Career Roadmap (student) | €75, 45 min + written roadmap |
| 9 | Build Sprint | €2,200 (2 days) / €3,000 (3 days) |
| 10 | Advisory Retainer | €500/month, 4 hrs |
| 11 | Team Workshop | €1,400 remote / €1,900 on-site NL |
| 12 | Cancellation policy | Free reschedule ≥24h; 50% for late cancellation |
| 13 | Deposit threshold | 50% deposit above €2,000 |
| 14 | Calendly plan / calendar / video tool | Free tier, Google Calendar, Google Meet |
| 15 | Availability window | Mon–Fri, 09:00–17:00 Europe/Amsterdam, 12h notice, max 3/day |
| 16 | Analytics | Vercel Web Analytics |
| 17 | Contact form | No form; email address only |
| 18 | People on `/about` | Founder only + honest associate-network statement |
| 19a | VAT/BTW number | ✅ **NL005436672B26** — VIES-validated 2026-07-28 |
| 19b | Registered address | ✅ **Science Park 608, 1098 XH Amsterdam, NL** |
| 19c | KvK number | **No default — must be supplied before launch** |
| 19d | Public contact email | **No default — needed for footer, JSON-LD, `/contact`** |
| 20 | VAT treatment wording | **No default — confirm with accountant before launch** |
| 21 | Payment on the site | None at launch; all services `call-first`, §12.5 seam built |
| 22 | US-reachable call slots | Add Tue + Thu 18:00–20:30 CET to Calendly availability |
| 23 | Governing law for `/legal/terms` | ✅ Dutch law, Rechtbank Amsterdam — lawyer to draft the B2C/B2B split (§16.1.6) |
| 24 | W-8BEN-E / W-8BEN on file | Ops task, not a website blocker — prepare before first US invoice |

Items **19c, 19d and 20** are the only ones that genuinely block go-live. Everything else ships on
the default and is a one-line content edit afterwards.
