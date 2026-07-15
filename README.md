# iFood Logistics Landing Page

A production-ready marketing landing page for **iFood Logistics** (operated by **iFood Specialist Corporation**), built with Next.js App Router, TypeScript, and Tailwind CSS. Content is managed through Sanity CMS; storage inquiries are validated, protected by Cloudflare Turnstile, stored in Supabase, and emailed via Resend.

This README covers local setup, environment variables, CMS editing, deployment, and DNS connection. See also:

- [`docs/deployment-guide.md`](docs/deployment-guide.md) — Vercel + GoDaddy DNS steps
- [`docs/content-editing-guide.md`](docs/content-editing-guide.md) — guide for non-technical staff editing content in Sanity
- [`docs/qc-checklist.md`](docs/qc-checklist.md) — pre-launch quality control and publishing verification checklist

## Tech stack

- **Framework:** Next.js 14 (App Router, TypeScript, Server Components by default)
- **Styling:** Tailwind CSS with iFood brand tokens
- **CMS:** Sanity (schemas in `sanity/schemaTypes`)
- **Inquiry database:** Supabase (Postgres)
- **Transactional email:** Resend + React Email templates
- **Form protection:** Cloudflare Turnstile
- **Validation:** Zod (shared between client and server)
- **Icons:** Lucide React, plus a controlled icon map for CMS-selected icons
- **Testing:** Vitest

## Project structure

```text
src/
  app/                 Routes: landing page, API route, privacy/terms, sitemap/robots
  components/
    layout/            Header, MobileMenu, Footer
    sections/          One component per landing-page section
    ui/                 Reusable primitives (Button, Container, FormField, ...)
    forms/              TurnstileWidget
  content/
    fallbackContent.ts  Static fallback content used when Sanity has no data yet
  lib/
    sanity/             Client, image builder, GROQ queries
    supabase/           Server-only admin client
    resend/             Email client
    turnstile/          Server-side token verification
    validation/         Zod inquiry schema (shared client/server)
    icons/              Controlled Lucide icon map
    utils/              Reference numbers, sanitization, rate limiting
    getPageData.ts      Merges Sanity data over fallback content
  emails/               React Email templates
  types/                Shared TypeScript types
sanity/
  schemaTypes/          Sanity Studio document + object schemas
supabase/
  migrations/           SQL migration for the inquiries table
tests/                  Vitest tests for validation, reference numbers, rate limiting, sanitization
```

## Local setup

Requirements: Node.js 20+, npm.

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
npm run dev
```

`--legacy-peer-deps` is needed because Sanity Studio's package graph (`sanity`, `@sanity/vision`) pins peer ranges on `styled-components` slightly ahead of what `next-sanity` requests; this is a known upstream peer-dependency quirk, not a project issue, and does not affect runtime behavior.

The site runs at `http://localhost:3000` and renders using `src/content/fallbackContent.ts` until Sanity is configured — no CMS account is required to develop or preview the design.

Useful scripts:

```bash
npm run dev          # Start the Next.js dev server
npm run build         # Production build
npm run start         # Serve the production build
npm run lint          # ESLint
npm run typecheck     # TypeScript --noEmit
npm test              # Vitest test suite
npm run sanity:dev    # Run Sanity Studio locally (requires Sanity env vars)
npm run sanity:deploy # Deploy the hosted Sanity Studio
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values before connecting each service. Every variable is documented inline in `.env.example`. Summary:

| Variable | Used by | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | SEO metadata, sitemap, robots | Public |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` | Sanity client (Next.js app) | Public |
| `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` | Sanity Studio CLI (`sanity:dev`/`sanity:deploy`) | Same values as above — Sanity's own dev/build tooling only reads `SANITY_STUDIO_`-prefixed vars, not `NEXT_PUBLIC_` ones |
| `SANITY_API_READ_TOKEN` | Sanity client | Server-only; only needed for private datasets |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Inquiry storage | **Server-only.** Never expose the service-role key to the browser |
| `RESEND_API_KEY` | Emails | Server-only |
| `INQUIRY_NOTIFICATION_EMAIL` | Emails | Where new inquiries are sent internally |
| `INQUIRY_FROM_EMAIL` | Emails | Must be a verified sending domain in Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Form protection | Public site key + server-only secret |

**Without these configured**, the site still runs: the landing page falls back to static content, the inquiry form still submits, Turnstile verification is skipped with a console warning, and Supabase/Resend calls are skipped with console warnings instead of throwing. Every one of these must be configured before production launch — see `docs/qc-checklist.md`.

## Content management (Sanity)

All frequently changed content — hero copy and image, statistics, service cards, facility highlights, industries, process steps, partners, affiliates, FAQ, footer, and SEO metadata — is modelled in `sanity/schemaTypes` and queried through `src/lib/sanity/queries.ts`. Nothing editable is hardcoded inside React components; components receive content through props, and `src/lib/getPageData.ts` merges live Sanity data over the static fallback so a partially-filled-in CMS document never blanks out a section.

Two special rules are enforced in code, not just editorial policy:

1. **Partners and affiliates only render when both `approvedForPublication` and `isVisible` are true** (see `getPageData.ts`). This is enforced regardless of what other fields are set.
2. **Icons are only ever selected from a controlled map** (`src/lib/icons/iconMap.ts`) or rendered from an uploaded image asset — the app never dynamically imports a module based on arbitrary CMS input.

To set up Sanity for the first time:

```bash
npx sanity init   # creates a new project if you don't have one; note the project ID
# add the resulting project ID/dataset to .env.local
npm run sanity:dev
```

Then open the Studio, create one `siteSettings` document and one `landingPage` document, and populate the referenced `service`, `facilityHighlight`, `industry`, `processStep`, `partner`, `affiliate`, and `faqItem` documents.

See `docs/content-editing-guide.md` for a plain-language walkthrough intended for company staff.

## Inquiry system

1. Visitor submits the form (client-side Zod validation via `react-hook-form`).
2. `POST /api/inquiries` (`src/app/api/inquiries/route.ts`) runs:
   - a basic in-memory rate limit per IP,
   - Turnstile token verification,
   - server-side Zod validation (never trusts the client),
   - plain-text sanitization of free-text fields,
   - a Supabase insert (the system of record — see `supabase/migrations/0001_inquiries.sql`),
   - a Resend notification email to `INQUIRY_NOTIFICATION_EMAIL` and an acknowledgment email to the visitor.
3. The API always returns a generated reference number on success, and never leaks internal error detail to the client.

Run the SQL migration against your Supabase project (SQL editor or `supabase db push`) before going live. Row Level Security is enabled and restricted to the service-role key only.

## Deployment

See [`docs/deployment-guide.md`](docs/deployment-guide.md) for the full Vercel deployment and GoDaddy DNS connection steps.

## Testing

```bash
npm test
```

Covers the shared Zod inquiry schema, reference-number generation, the rate limiter, and text sanitization helpers.

## Before launch

Company management must confirm several open items (legal company name, final logo files, generator capacity, partner/affiliate publication approval, privacy policy and terms content, etc.) before this goes live. The full list is in [`docs/qc-checklist.md`](docs/qc-checklist.md) — do not publish unverified claims.
