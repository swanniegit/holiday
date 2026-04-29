# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Next.js)
npm run build     # Production build
npm run lint      # ESLint via next lint
```

No test suite is configured.

## Architecture

Next.js 15 App Router project (TypeScript + Tailwind CSS). Deployed on Vercel.

**Key directories:**
- `src/app/` — pages and API routes (App Router)
- `src/components/` — React client/server components
- `src/lib/` — shared utilities (Beachcomber API client, mail, Supabase)
- `src/config/site.ts` — single source of truth for site name, nav, destinations, packages, hotel codes, testimonials, and departure cities
- `src/types/beachcomber.ts` — TypeScript types for all Beachcomber API request/response shapes

**API routes** (`src/app/api/`):
- `enquiry/` — validates and inserts into Supabase `enquiries` table, then sends email via Resend
- `newsletter/` — saves email to Supabase `newsletter_subscribers` table (unique constraint silently ignores duplicates), sends notification email
- `chat/` — "Let's Chat" modal submission, email only (no DB insert)
- `beachcomber/rates/` — proxies `getrates` from Beachcomber API (1 h ISR cache)
- `beachcomber/quote/` — proxies `getquote` (live availability search)
- `beachcomber/send-quote/` — proxies `sendQuote` (emails a quote PDF from Beachcomber)

**External services:**
- **Beachcomber API** (`api.beachcomberonline.co.za`) — live Mauritius hotel + flight quotes; authenticated via `BEACHCOMBER_API_KEY` header
- **Resend** — transactional email; `from: noreply@yellowarcher.co.za`, `to: travel@pjfmarkgraaff.co.za`; key in `RESEND_API_KEY`. Never use nodemailer — Vercel blocks outbound SMTP.
- **Supabase** — enquiry persistence; `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`; client in `src/lib/supabase.ts` returns `null` if env vars are absent (graceful degradation)

**Design system (Tailwind):**
- Colors: `gold` (#b8923a), `gold-light`, `gold-dark`, `cream` (#f5f0e8), `cream-dark`, `charcoal` (#2c2c2c)
- Fonts: `font-sans` (Inter, `--font-sans`) and `font-display` (Playfair Display, `--font-display`)

**Domain / SEO:**
- `BASE` URL is hardcoded as `https://32onh.co.za` in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`
- Google Search Console verification token is a placeholder in `layout.tsx` — update when confirmed
- JSON-LD structured data (TravelAgency) is injected in the root layout

**Forms / modals:**
- `EnquiryModal` — package enquiry form triggered from package cards; posts to `/api/enquiry`
- `ChatModal` + `ChatButton` — floating "Let's Chat" button (fixed bottom-right); posts to `/api/chat`
- `BeachcomberSearch` — live Mauritius quote widget on `/packages#live-quotes`; all state is local (`useState`)
- `AppDatePicker` (`src/components/ui/`) — thin wrapper around `react-datepicker` with `dd MMM yy` format used across all forms
