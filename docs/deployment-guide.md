# Deployment Guide: Vercel + GoDaddy DNS

## 1. Push the code to a Git repository

Vercel deploys from GitHub, GitLab, or Bitbucket. Push this project to a repository before continuing.

## 2. Create the Vercel project

1. Go to https://vercel.com/new and import the repository.
2. Framework preset: **Next.js** (auto-detected).
3. Add all environment variables from `.env.example` under Project Settings → Environment Variables, for both **Production** and **Preview** environments. Use real values, not placeholders, for Production.
4. Deploy.

## 3. Connect the domain

The domain stays registered with GoDaddy; do not transfer it unless the company specifically requests that.

1. In the Vercel project, go to **Settings → Domains** and add:
   - `ifoodlogistics.ph` (or the actual registered domain)
   - `www.ifoodlogistics.ph`
2. Vercel will show the DNS records it needs. Typically:
   - Root domain (`@`): an **A record** pointing to Vercel's IP (Vercel shows the exact value), or an **ALIAS/ANAME** if your GoDaddy plan supports it.
   - `www`: a **CNAME record** pointing to `cname.vercel-dns.com`.
3. In GoDaddy, go to **My Products → DNS → Manage DNS** for the domain and add/update those records exactly as Vercel specifies.
4. In Vercel, set one of the two domains (root or `www`) as the primary/canonical domain. Vercel will redirect the other to it automatically once both are verified.

## 4. Preserve existing email DNS records

Before editing DNS, note down and preserve any existing:

- **MX** records (mail routing)
- **SPF** (`TXT` record, usually starting with `v=spf1`)
- **DKIM** (`TXT` or `CNAME` records, often under a selector subdomain)
- **DMARC** (`TXT` record at `_dmarc`)

Adding the Vercel A/CNAME records for the web app does not require touching these — just make sure you don't accidentally delete them while editing the zone.

## 5. HTTPS

Vercel automatically provisions and renews a TLS certificate once DNS is verified. No manual action needed.

## 6. Verify

- Visit both the root domain and `www` over HTTPS and confirm one redirects to the other.
- Confirm mail still flows correctly (send/receive a test email) after DNS changes.
- Run the site through Google's Rich Results Test and PageSpeed Insights.
- Confirm `/sitemap.xml` and `/robots.txt` resolve correctly on the production domain.

## 7. Resend sending domain

Emails will not send reliably until the sending domain is verified in Resend (SPF/DKIM records added to GoDaddy DNS, separate from the app's own SPF/DKIM if you're sending from a subdomain like `mail.ifoodlogistics.ph`). Follow Resend's domain verification flow and add the records it provides to GoDaddy.

## 8. Sanity CORS

In the Sanity project's API settings, add the production domain (and the Vercel preview domain pattern, if used) to the allowed CORS origins so the deployed site can fetch content.
