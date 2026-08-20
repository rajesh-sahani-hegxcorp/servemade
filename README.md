# Serve Made — Next.js + Tailwind + PostgreSQL

Production-structured rewrite of the Serve Made homepage wireframe: React (Next.js
14 App Router) on the frontend, Next.js Route Handlers as the backend, and
PostgreSQL (via Prisma) for storing quote/sample requests.

## Stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Frontend   | React 18 + Tailwind CSS (App Router)      |
| Backend    | Next.js Route Handlers (`src/app/api/**`) |
| Database   | PostgreSQL, via Prisma ORM                |
| Validation | Zod                                       |
| Icons      | lucide-react                              |

## Project layout

```
src/
  app/                 # Routes only (App Router). Pages stay thin — they import
                        # components/data and set metadata; no business logic here.
    api/quote/route.ts  # POST — validates + writes a QuoteRequest to Postgres
    api/health/route.ts # GET  — DB connectivity check for uptime monitors
    products/[slug]/    # Dynamic category pages
    industries/[slug]/
    resources/[slug]/
  components/
    ui/                # Generic, reusable primitives (Button, Tag, ProductArt…)
    layout/             # Header, Footer, UtilityBar, WhatsAppFab, ContentPage
    home/                # Homepage sections (Hero, FAQ, Testimonials…)
    quote/               # QuoteForm (used by /quote and /samples)
  context/CartContext.tsx # Shared "quote list" state (React Context)
  hooks/                # useReveal, useCountUp — extracted, reusable logic
  lib/                  # db.ts (Prisma client), utils.ts, jsonld.ts, validation.ts
  data/                  # Static content — single source of truth for both the
                         # UI and the FAQPage/Organization JSON-LD
  types/                 # Shared TypeScript types
prisma/schema.prisma      # Postgres schema (QuoteRequest, QuoteRequestItem)
```

**Why it's split this way:** every function lives in `lib/` or `hooks/`
(never inline in a component), every color/shadow/animation is a Tailwind
theme token in `tailwind.config.ts` (never a hard-coded hex in a component),
and all copy/content lives in `data/` so the FAQ on the page and the FAQPage
JSON-LD can never drift out of sync.

## Local setup

```bash
npm install                 # also runs `prisma generate` via postinstall
cp .env.example .env         # then fill in DATABASE_URL
npm run db:migrate           # creates the QuoteRequest / QuoteRequestItem tables
npm run dev                  # http://localhost:3000
```

You need a Postgres database for `DATABASE_URL`. Easiest local option:

```bash
docker run --name serve-made-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=servemade -p 5432:5432 -d postgres:16
```

Or use a free hosted instance (Neon, Supabase) — see `.env.example` for
connection-string formats for each.

## Scripts

| Command              | What it does                                   |
|-----------------------|-------------------------------------------------|
| `npm run dev`          | Local dev server                                |
| `npm run build`        | `prisma generate` + production build            |
| `npm run start`        | Run the production build                        |
| `npm run lint`         | ESLint (Next.js core-web-vitals rules)          |
| `npm run typecheck`    | `tsc --noEmit`                                  |
| `npm run db:migrate`   | Create/update tables from `prisma/schema.prisma` (dev) |
| `npm run db:deploy`    | Apply committed migrations (CI/production)      |
| `npm run db:studio`    | Prisma Studio — browse the database in a GUI    |

## The one real backend feature

`POST /api/quote` is the working end-to-end example: the pack finder on the
homepage lets a visitor build a "kit" and add it to an in-memory quote list
(`CartContext`); the `/quote` and `/samples` pages render that list and submit
it, along with contact details, to `/api/quote`, which validates the payload
with Zod and writes a `QuoteRequest` + its `QuoteRequestItem` rows via Prisma.
`GET /api/health` checks the DB connection — point your uptime monitor at it.

Everything else on the site (category/industry/resource pages, footer links,
etc.) is a real Next.js route today so nothing 404s, with placeholder copy
you should replace with real content before launch.

## SEO / AEO / GEO notes (carried over from the original wireframe brief)

- `sitemap.ts` / `robots.ts` are generated from the same `data/*.ts` files
  that drive the UI, so they can't fall out of sync with real pages.
- `robots.ts` explicitly allows `GPTBot`, `ClaudeBot`, and `PerplexityBot`.
- The homepage's JSON-LD (`lib/jsonld.ts`) pulls its FAQ content from
  `data/faqs.ts` — the same array the on-page `<FAQ>` component renders — so
  schema and visible copy can never drift apart.
- Add a real `/llms.txt` at the site root once you have durable guide/case
  study content worth an AI system citing.

## Deployment

**Recommended: Vercel + Neon/Supabase/Vercel Postgres.**

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add a Postgres integration (Vercel Postgres, or connect Neon/Supabase) —
   this sets `DATABASE_URL` for you, or set it manually under
   Project Settings → Environment Variables using `.env.example` as a guide.
4. Also set `NEXT_PUBLIC_SITE_URL` (your real domain) and
   `NEXT_PUBLIC_WHATSAPP_NUMBER`.
5. Deploy. Vercel runs `npm run build`, which runs `prisma generate` then
   `next build`.
6. After the first deploy, run `npm run db:deploy` against the production
   `DATABASE_URL` (e.g. via `vercel env pull` + running it locally, or a
   one-off CI step) to create the tables.

Any other Node host (Railway, Render, Fly.io, a plain VPS) works the same
way: set `DATABASE_URL`, run `npm run build`, run `npm run db:deploy` once,
then `npm run start`.

## Known placeholders to replace before launch

- `src/data/testimonials.ts` — swap in named, verifiable references.
- `/ar` — stub page; build out full Arabic content/routing when ready.
- `public/og/serve-made-home.png` and `public/logo.png` — add real brand assets
  (referenced in `layout.tsx` metadata and `lib/jsonld.ts`).
- `src/app/privacy`, `src/app/terms` — replace placeholder legal copy.
- Real product photography to replace the `ProductArt` SVG placeholders.
