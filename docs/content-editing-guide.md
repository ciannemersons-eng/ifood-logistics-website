# Content Editing Guide (for iFood Logistics Staff)

This guide explains how to update the website without any coding, using Sanity Studio.

## Getting access

Ask your project administrator to invite you to the Sanity project (Project Settings → Members). You'll receive an email invite and can log in at your Studio URL (either the locally-run Studio during development, or the hosted Studio URL after `npm run sanity:deploy`).

## What you can change

| What | Where in Studio |
|---|---|
| Hero image/video poster, headline, buttons | `Landing Page` → Hero Section |
| Facility images, service icons | `Landing Page` → Facility / Solutions sections, and the `Facility Highlight` / `Service` documents they reference |
| Partner and affiliate names/logos | `Partner` and `Affiliate` documents |
| Statistics and labels | `Landing Page` → Floating Statistics Panel |
| Show/hide any section | Each section has a **Show section** toggle |
| Section order | Reorder items in a reference list (drag to reorder), or contact your developer for top-level section order changes |
| Contact information, form recipient email | `Site Settings` |
| SEO title/description, social-sharing image | `Site Settings` → SEO metadata |
| FAQ entries | `FAQ Item` documents, referenced from `Landing Page` → FAQ Section |
| Expansion announcement | `Landing Page` → Expansion Section (has its own visibility toggle) |
| Footer information | `Landing Page` → Footer content and `Site Settings` |

## Publishing partners and affiliates

Every `Partner` and `Affiliate` document has two switches:

- **Approved for publication** — only turn this on once company management has confirmed permission to display that business's name or logo.
- **Visible** — the final on/off switch for showing it on the live site.

The website only displays a partner or affiliate when **both** switches are on. This is enforced in code, so leaving either off is a safe way to keep a logo out of production even if the rest of the entry is filled in.

## Icons

For any icon field, you can either:

1. Pick a **Library icon** from the dropdown (a curated set of logistics/cold-storage icons), or
2. Switch to **Uploaded file** and upload your own SVG or PNG.

You cannot upload arbitrary code — only image files.

## Images

Each image field supports:

- The main image (with drag-to-set focal point/hotspot)
- Alt text (required — describe the image for screen reader users)
- An optional caption and photo credit
- An optional separate mobile image
- A visibility toggle, so you can temporarily hide an image without deleting it

## Publishing

Sanity Studio has **Draft** and **Published** states. The website only reads published content. Click **Publish** after making changes — saving alone does not push changes live.

Changes typically appear on the live site within a few minutes (the site revalidates its cached content periodically).

## Getting help

If something looks wrong on the live site after a content change, check:

1. Did you click **Publish** (not just save)?
2. Is the section's **Show section** toggle turned on?
3. For partners/affiliates, are both **Approved for publication** and **Visible** turned on?

If it's still not resolved, contact your developer.
