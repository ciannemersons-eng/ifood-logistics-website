# Pre-Launch Quality Control & Publishing Verification Checklist

Do not publish unverified claims. Company management must confirm every item below before production launch, per the build specification.

## Content and legal verification

- [ ] Exact legal public-facing company name confirmed
- [ ] Confirmed whether "iFood Logistics" is the approved trading name
- [ ] Final official logo files supplied and installed (replacing placeholder logo)
- [ ] Correct facility address confirmed
- [ ] Correct contact details (phone, email) confirmed
- [ ] Confirmed whether –25°C applies to all relevant rooms, or only specific ones
- [ ] Confirmed whether 650 kVA backup power is combined or per generator
- [ ] Confirmed whether any "ISO-certified" or similar certification claims are documented and approved
- [ ] Confirmed whether every loading dock has the listed equipment (levelers, digital scales, dock lighting, inflatable seals)
- [ ] Confirmed whether reefer trucking/transport is actually offered, or only storage and dispatch coordination
- [ ] Current Luzon expansion status confirmed (or Expansion section hidden if not ready to announce)
- [ ] Approval to publish every partner name and logo (see `approvedForPublication` flags)
- [ ] Approval to publish every affiliate name and logo
- [ ] Privacy Policy reviewed and approved by legal counsel (replacing the placeholder in `src/app/privacy/page.tsx`)
- [ ] Terms of Use reviewed and approved by legal counsel (replacing the placeholder in `src/app/terms/page.tsx`)
- [ ] Inquiry recipient email confirmed and monitored
- [ ] Sending domain verified in Resend for `INQUIRY_FROM_EMAIL`

## Technical verification

- [ ] All real photography in place (hero, facility highlights, about section) — no placeholder images remain
- [ ] Official logo file installed and rendered without distortion, cropping, or recoloring
- [ ] All environment variables in `.env.example` set to real production values in Vercel
- [ ] Supabase migration (`supabase/migrations/0001_inquiries.sql`) applied to the production project
- [ ] Row Level Security confirmed active on the `inquiries` table
- [ ] Cloudflare Turnstile site key + secret key configured (form protection confirmed working, not silently skipped)
- [ ] Test inquiry submitted end-to-end: confirms Supabase record created, internal notification email received, visitor acknowledgment email received
- [ ] Production domain connected via GoDaddy DNS, HTTPS active, `www`/root canonicalization confirmed
- [ ] Existing MX/SPF/DKIM/DMARC records preserved after DNS changes
- [ ] Sanity CORS origins updated to include the production domain
- [ ] `npm run build`, `npm run lint`, `npm run typecheck`, and `npm test` all pass
- [ ] Responsive check at 320/375/430/768/1024/1280/1440/1920px
- [ ] Keyboard navigation verified across header, mobile menu, FAQ accordion, and inquiry form
- [ ] Lighthouse/PageSpeed Core Web Vitals reviewed
- [ ] Google Search Console verified and sitemap submitted
- [ ] Analytics configured only after consent requirements are reviewed, and confirmed no personal data (names, emails, phone numbers) is sent to analytics events
