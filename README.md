# Luma — Spanish residency, without the maze

Marketing site + eligibility triage demo. Next.js 14 (App Router), Tailwind, TypeScript. EN + ES via `/en` and `/es` routes.

## Structure

- `app/[locale]/page.tsx` — landing page (hero, how-it-works, pathways, pricing, privacy, FAQ, waitlist)
- `app/[locale]/triage/page.tsx` — interactive eligibility wizard
- `lib/triage.ts` — **deterministic rules engine**: 2026 thresholds, versioned (`RULES_VERSION`), every pathway carries its legal citation. This is the seed of the "regulation-as-code" repo from the business plan.
- `lib/i18n.ts` — EN/ES dictionaries

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
git init && git add -A && git commit -m "Luma: landing + triage demo"
# create a repo on GitHub, then:
git remote add origin git@github.com:YOUR_USER/luma-site.git
git push -u origin main
```

Then vercel.com → Add New Project → import `luma-site` → deploy (zero config, defaults work).

## Dossier app setup (Supabase, EU)

The core product (dossier planner + encrypted vault) lives at `/{locale}/app` and needs a Supabase project:

1. Create a project at database.new — **region: EU (Frankfurt)**.
2. In the SQL editor, run `supabase/schema.sql` (tables + row-level security only).
3. Set up the private storage bucket and its three policies **via the dashboard UI** — follow `supabase/storage-setup.md`. (The SQL editor cannot create storage policies.)
4. In Authentication → URL Configuration, set the site URL to your production domain and add `https://YOUR-DOMAIN/en/app` and `/es/app` as redirect URLs.
5. Copy Settings → API → Project URL + anon key into Vercel env vars (see `.env.example`), then redeploy.

Without the env vars the marketing site works normally and `/app` shows a setup notice.

## Before real launch

- Wire the waitlist form (`components/Waitlist.tsx`, marked TODO) to Resend/Loops or a serverless function — deliberately no third-party scripts included.
- Replace `hola@luma.legal` placeholder email; register domain.
- Legal review of all user-facing copy by the supervising gestor (per business plan §5.4).
- Thresholds in `lib/triage.ts` are current July 2026 (SMI/IPREM frozen); update when a 2026–27 budget passes.
