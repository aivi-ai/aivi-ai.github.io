# AIVI website

Company site for [AIVI](https://weareaivi.com) — senior AI consulting by the
hour. Next.js 16 (App Router), statically exported to GitHub Pages.

## Stack

- **Next.js 16** with `output: "export"` → `./out`, deployed via GitHub
  Pages on push to `main` (`.github/workflows/deploy.yml`)
- **Content:** Markdown resources (guides for founders, professionals, and
  students) under `content/resources/`, rendered at build time with
  `marked` (see `lib/resources.ts`). No MDX.
- **CI** (`.github/workflows/ci.yml`): `tsc --noEmit` → `lint` → `build` →
  `npm audit --audit-level=high` on every PR and push to main.

## Adding a resource (article)

1. Copy `content/resources/_TEMPLATE.md` to `content/resources/<slug>.md`
   — `<slug>` becomes the URL path (`/resources/<slug>`).
2. Fill in the frontmatter: `title`, `description`, `date` (ISO),
   `readingTime` (e.g. `"7 min read"`), `audience`
   (`students` | `professionals` | `founders`), and an optional `faq`
   list (shown as an accordion + FAQPage JSON-LD on the article page).
3. Write the body in plain Markdown — headings, lists, links, **bold**.
   No JSX/MDX. Keep the house voice: specific, concrete, honest. The
   content validator (`scripts/validate-content.ts`) rejects buzzwords
   like "revolutionize", "unlock", "supercharge".
4. Submit as a branch + PR (CI must pass), or push to `main` directly —
   deploy happens automatically on merge/push.

Files starting with `_` in `content/resources/` are ignored by the index,
sitemap, and RSS feed — that's how the template stays unpublished.

## Local development

```bash
npm run dev       # dev server on :3000
npm run build     # static export to ./out (runs the prebuild validator)
npm run lint
npx tsc --noEmit
```

## Notes

- **No Vercel**: this site deploys to GitHub Pages. `basePath` and
  `assetPrefix` are empty for the `<org>.github.io` case; set
  `NEXT_PUBLIC_BASE_PATH` only if the repo serves under a subpath.
- RSS feed at `/feed.xml` (built from `content/resources/`).
- Sitemap at `/sitemap.xml` includes all resources.
