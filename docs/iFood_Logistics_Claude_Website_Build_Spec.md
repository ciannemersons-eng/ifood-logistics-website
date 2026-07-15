# iFood Logistics Landing Page — Claude Build Specification

## 1. Project Objective

Build a polished, responsive, production-ready landing page for **iFood Logistics**, operated by **iFood Specialist Corporation**, focused on cold storage and logistics services in Cebu.

The website must:

- Present iFood Logistics as a reliable, modern, and operationally capable cold-chain partner.
- Generate qualified storage inquiries and quotation requests.
- Allow authorized company staff to replace images, icons, partner logos, statistics, and selected text without editing React components.
- Follow the approved iFood Logistics color and typography guidelines.
- Be optimized for mobile, tablet, desktop, accessibility, performance, and search engines.
- Use reusable components and structured content rather than hardcoded page sections.

---

## 2. Recommended Technology Stack

Use the following stack unless an implementation constraint requires an equivalent alternative:

- **Framework:** Next.js with React, App Router, and TypeScript
- **Styling:** Tailwind CSS
- **Content management:** Sanity CMS
- **Hosting and deployment:** Vercel
- **Domain registrar and DNS:** GoDaddy
- **Inquiry database:** Supabase
- **Transactional email:** Resend
- **Form protection:** Cloudflare Turnstile
- **Form validation:** Zod
- **Icons:** Lucide React plus optional uploaded SVG or PNG icons
- **Analytics:** Google Analytics 4 or Plausible, configured only after consent requirements are reviewed

Do not build this as a single monolithic component.

---

## 3. Domain and Hosting Arrangement

The domain is already registered with GoDaddy.

Use this arrangement:

1. Keep the domain registered with GoDaddy.
2. Deploy the Next.js project to Vercel.
3. Add the production domain in the Vercel project settings.
4. Update the required DNS records in GoDaddy.
5. Configure both the root domain and `www`.
6. Redirect one version consistently to the preferred canonical domain.
7. Enable HTTPS.
8. Preserve any existing email-related DNS records such as MX, SPF, DKIM, and DMARC.

Do not transfer the domain unless the company specifically requests it.

---

## 4. Content Management Requirement

All frequently changed content must come from Sanity CMS.

### Staff must be able to change:

- Hero image or video poster
- Hero headline, supporting text, and buttons
- Facility images
- Service icons
- Facility-highlight icons
- Partner names and logos
- Affiliate names and logos
- Statistics and labels
- Section visibility
- Section order where practical
- Contact information
- Form recipient email address
- SEO title and description
- Social-sharing image
- FAQ entries
- Expansion announcement
- Footer information

### Do not hardcode editable assets inside components.

Components must receive data through props. Sanity documents should control the visible content.

### Image fields should include:

- Image file
- Alternative text
- Caption
- Focal point or hotspot
- Optional mobile image
- Optional dark-overlay setting
- Optional credit field
- `isVisible` toggle

### Icon fields should support both:

1. A curated icon selected by key from a controlled Lucide icon map
2. A custom uploaded SVG or PNG file

Suggested icon object:

```ts
type EditableIcon = {
  mode: "library" | "upload";
  libraryKey?: IconKey;
  uploadedAsset?: {
    url: string;
    alt: string;
  };
};
```

Do not dynamically import icons from arbitrary user input. Use a controlled icon map.

Example:

```ts
import {
  Warehouse,
  Snowflake,
  PackageCheck,
  Container,
  ShieldCheck,
  Truck,
  ThermometerSnowflake,
  Database,
  PlugZap,
  DoorOpen,
} from "lucide-react";

export const iconMap = {
  warehouse: Warehouse,
  snowflake: Snowflake,
  packageCheck: PackageCheck,
  container: Container,
  shieldCheck: ShieldCheck,
  truck: Truck,
  thermometerSnowflake: ThermometerSnowflake,
  database: Database,
  plugZap: PlugZap,
  doorOpen: DoorOpen,
} as const;

export type IconKey = keyof typeof iconMap;
```

---

## 5. Brand Guidelines

### Approved colors

```css
--ifood-dark-blue: #042B65;
--ifood-light-blue: #99E2FE;
--ifood-medium-blue: #2095CB;
--ifood-royal-blue: #00459F;
--ifood-white: #FFFFFF;
--ifood-black: #1F1D1D;
--ifood-gray: #515151;
```

### Typography

- **Display and headings:** Poppins
- **Body text:** Aptos

Use `next/font/google` for Poppins.

Do not bundle or distribute Aptos font files unless the company confirms it has the appropriate web-font rights. Use this fallback stack:

```css
font-family: Aptos, "Segoe UI", Arial, sans-serif;
```

### Typography hierarchy

- Hero headline: Poppins, bold
- Section headings: Poppins, semibold or bold
- Card headings: Poppins, semibold
- Navigation: Poppins, medium or semibold
- Buttons: Poppins, semibold
- Statistics: Poppins, bold
- Body copy: Aptos or fallback, regular
- Captions and form help text: Aptos or fallback, regular

### Button styles

#### Primary button

- Background: `#042B65`
- Text: `#FFFFFF`
- Hover: `#00459F`
- Minimum touch height: 44px

#### Secondary button

- Background: `#99E2FE`
- Text: `#042B65`
- Hover: use a slightly darker accessible blue
- Minimum touch height: 44px

### Visual direction

The design should feel:

- Clean
- Dependable
- Contemporary
- Operationally capable
- Professional
- Approachable
- Spacious and easy to scan

Avoid:

- Grunge textures
- Excessive gradients
- Generic AI-looking warehouse images
- Overly dark industrial imagery
- Busy motion effects
- Tiny text
- Unreadable text over photographs
- Unapproved logo changes
- Excessive rounded cards
- Decorative elements unrelated to logistics or cold storage

---

## 6. Design and Layout Direction

Use the supplied modern corporate landing-page reference strictly as **layout and visual inspiration**. Do not copy its company name, content, imagery, teal palette, icons, or exact dimensions.

Translate the reference into the approved iFood Logistics identity using actual cold-storage and logistics content.

### Core layout characteristics to reproduce

- A large full-width photographic hero
- A slim navigation bar positioned over the hero
- Left-aligned hero copy with generous white space
- A soft white-to-transparent image gradient behind the hero copy
- A floating statistics panel overlapping the bottom of the hero
- Small uppercase eyebrow labels above major headings
- Spacious white and very light-blue sections
- Four-column service-card layouts on desktop
- A split text-and-image company section
- One restrained floating information card over a large image
- Large image-led facility cards
- A contrasting dark-blue information section
- A simple partner-logo strip
- A strong final inquiry section before the footer
- Soft shadows, moderate corner radii, and restrained motion
- Clear vertical rhythm and generous space between sections

### Do not reproduce

- The reference company's name, wording, or statistics
- Its teal branding
- Its exact icons
- Its corporate office-building images
- Its exact spacing measurements
- Its exact navigation or service categories
- Any trademarked visual asset from the reference

### Desktop composition

Use a centered page container with a maximum width between approximately `1180px` and `1280px`.

Recommended grid:

- 12-column desktop grid
- 24px to 32px column gaps
- 64px to 112px vertical section padding depending on section importance
- 20px to 24px card gaps
- Text columns should not become excessively wide

### Mobile composition

- Stack split sections vertically
- Place copy before imagery unless the content benefits from the reverse order
- Convert four-column cards to one column
- Convert the statistics panel to a two-column grid
- Convert horizontal process steps to a vertical timeline
- Ensure all important text is visible without depending on image overlays
- Preserve at least 20px side padding
- Avoid horizontal carousels for essential content

---

## 7. Visual System

## 7.1 Approved Colors

```css
--ifood-dark-blue: #042B65;
--ifood-light-blue: #99E2FE;
--ifood-medium-blue: #2095CB;
--ifood-royal-blue: #00459F;
--ifood-white: #FFFFFF;
--ifood-black: #1F1D1D;
--ifood-gray: #515151;
```

### Color application

- Navigation text: `#042B65` or `#1F1D1D`
- Primary headings: `#042B65`
- Accent words and small labels: `#2095CB`
- Main body text: `#1F1D1D`
- Supporting text: `#515151`
- Primary buttons: `#042B65`
- Primary button hover: `#00459F`
- Light section backgrounds: white or a very pale tint derived from `#99E2FE`
- Dark information sections and footer: `#042B65`
- Icons and subtle graphic accents: `#2095CB` and `#00459F`

Do not make every section blue. White space should remain the dominant visual field.

## 7.2 Typography

- **Display, headings, navigation, statistics, and buttons:** Poppins
- **Body text, form copy, captions, and FAQ answers:** Aptos

Use `next/font/google` for Poppins.

Do not bundle or distribute Aptos font files unless the company confirms appropriate web-font rights. Use:

```css
font-family: Aptos, "Segoe UI", Arial, sans-serif;
```

### Suggested hierarchy

- Hero heading: Poppins 700, responsive range approximately 48px to 72px
- Major section heading: Poppins 600 or 700, approximately 34px to 48px
- Card title: Poppins 600, approximately 18px to 22px
- Eyebrow label: Poppins 600, uppercase, approximately 11px to 13px with letter spacing
- Statistics: Poppins 700, approximately 28px to 42px
- Body copy: Aptos 400, approximately 16px to 18px
- Navigation and buttons: Poppins 500 or 600

Use responsive `clamp()` sizing where practical.

## 7.3 Buttons

### Primary button

- Background: `#042B65`
- Text: `#FFFFFF`
- Hover: `#00459F`
- Minimum height: 44px
- Moderate radius, approximately 6px to 10px
- Clear focus outline

### Secondary button

Use either:

- White or transparent background with a dark-blue border, or
- `#99E2FE` background with dark-blue text

Do not use oversized pill buttons throughout the entire page.

## 7.4 Cards

Recommended card treatment:

- White background
- Border using a very light neutral or pale blue
- Moderate radius, approximately 10px to 16px
- Soft shadow rather than a heavy drop shadow
- Consistent internal padding
- Gentle hover elevation on pointer devices
- No hover interaction required to reveal essential content

## 7.5 Photography

Prioritize authentic images of:

- The actual iFood Logistics facility
- Loading bays and dock doors
- Freezer rooms
- Pallet racking
- Reefer containers
- Refrigeration equipment
- Warehouse personnel carrying out real operations
- Receiving, weighing, pallet handling, and dispatch activity
- Facility exterior and truck movement

Images must feel clean, credible, and naturally photographed.

Avoid:

- Generic AI-generated warehouses
- Office towers unrelated to cold storage
- Fake workers
- Distorted equipment
- Overly blue cinematic color grading
- Images with unreadable embedded text
- Dark, dirty, or unsafe-looking environments

Every major image must be replaceable in Sanity CMS and must support:

- Desktop asset
- Optional mobile asset
- Alt text
- Focal point or hotspot
- Caption
- Optional image credit
- Visibility toggle

## 7.6 Motion

Use subtle motion only:

- Short fade or upward reveal on first viewport entry
- Small card lift on hover
- Smooth but restrained navigation transitions
- No continuous floating animations
- No autoplay background video on mobile
- Respect `prefers-reduced-motion`

---

## 8. Page Architecture and Landing Page Content

Recommended navigation:

- Home
- Solutions
- Facility
- Industries
- About
- FAQ
- Contact

Primary navigation CTA:

**Request a Storage Quote**

Use smooth anchor navigation. The mobile menu must be keyboard accessible. The sticky header must not cover anchor targets.

---

## 8.1 Header

### Layout

Use a slim navigation bar over the hero image.

**Left:**
- Official iFood Logistics logo

**Center or right:**
- Home
- About Us
- Solutions
- Facility
- Industries
- FAQ
- Contact

**Far right:**
- Primary CTA: **Request a Quote**

### Behavior

- Initially transparent or very lightly translucent
- Becomes a solid white sticky header after scrolling
- Add a subtle bottom border or soft shadow once sticky
- Use a clear mobile menu button
- Keep logo proportions unchanged

Do not redraw, crop, stretch, recolor, or reinterpret the official logo.

All navigation labels and CTA text must be editable in Sanity.

---

## 8.2 Hero Section

### Layout

Follow the reference composition:

- Full-width facility image
- Copy aligned to the left
- Main architectural or operational subject visible on the right
- Soft white-to-transparent gradient behind the left-side copy
- Approximately 680px to 760px tall on large desktop screens
- Enough bottom space for the floating statistics panel

### Eyebrow

**COLD STORAGE & LOGISTICS IN CEBU**

### Headline

# Reliable Cold Storage.  
# Smarter Logistics.

Style the first line in dark blue and the second line in medium blue.

### Supporting copy

Protect your frozen inventory with dependable temperature control, SAP-supported stock management, efficient receiving, and secure 24/7 operations.

### Primary CTA

**Request a Storage Quote**

### Secondary CTA

**Explore Our Facility**

The secondary button may use a simple arrow, warehouse icon, or location icon. Do not use a video-play icon unless an actual overview video is provided.

### CMS controls

The hero must support:

- Eyebrow
- Two-line or rich headline
- Supporting copy
- Primary and secondary CTA
- Desktop image
- Mobile image
- Alt text
- Focal point
- Overlay strength
- Text alignment option
- Section visibility

---

## 8.3 Floating Facility Statistics Panel

Place a white information panel overlapping the bottom edge of the hero.

### Desktop layout

Use five equal columns:

- **10,000** — Pallet Capacity
- **20** — Freezer Rooms
- **14** — Loading Doors
- **35** — Reefer Plug-In Stations
- **24/7** — Security & Monitoring

### Visual treatment

- White background
- Soft shadow
- Moderate corner radius
- Thin vertical dividers
- Small replaceable blue icons
- Poppins Bold for values
- Aptos for labels

### Mobile layout

Use a two-column grid. The last item may span two columns if needed.

All values, labels, icons, order, and visibility must be editable in Sanity.

Do not delay the numbers with lengthy count-up animation.

---

## 8.4 Solutions Section

### Layout

Follow the reference's service-section structure:

- Eyebrow and heading on the left
- Short supporting paragraph and text link on the right
- Four cards across on desktop
- One card per row on small mobile screens

### Eyebrow

**OUR SOLUTIONS**

### Heading

# Cold-Chain Services  
# Built Around Your Business

### Supporting paragraph

From regular frozen storage to seasonal overflow and coordinated dispatch, iFood Logistics provides practical cold-chain support based on your inventory and operating requirements.

### Section link

**Explore All Solutions →**

### Primary cards

#### Frozen Storage

Secure frozen storage with temperatures maintained as low as **–25°C**, subject to the assigned room and approved operating specifications.

#### Inventory Management

SAP-supported stock monitoring provides organized records of inventory receipts, movements, balances, and releases.

#### Reefer Container Support

A total of **35 plug-in stations** supports reefer containers while maintaining continuous power and temperature control.

#### Receiving and Dispatch

Structured receiving, weighing, unloading, pallet handling, reboxing, release, and dispatch processes.

### Optional second row

#### Seasonal Overflow Storage

Additional storage capacity for peak seasons, promotions, import arrivals, production increases, and unexpected inventory requirements.

#### Storage and Release Coordination

Store inventory with iFood and schedule full or partial releases according to branch, production, or customer requirements.

### Card requirements

Each card must support:

- Editable icon
- Editable title
- Editable description
- Optional link
- Visibility toggle
- Sort order
- Optional pale accent background behind the icon

Use mostly white cards with restrained blue accents.

---

## 8.5 About Section

### Layout

Use a two-column split section similar to the reference.

**Left column:**
- Eyebrow
- Heading
- Body copy
- Trust-point list
- CTA

**Right column:**
- Large authentic facility image
- One small floating information card

### Eyebrow

**ABOUT IFOOD LOGISTICS**

### Heading

# Your Reliable Partner  
# for Cold-Chain Operations

### Copy

Established in May 2018, **iFood Specialist Corporation**, operating as **iFood Logistics**, provides dependable cold-storage solutions to food businesses throughout Cebu and the surrounding region.

Our facility combines reliable refrigeration, efficient loading infrastructure, SAP-supported inventory management, backup power, and round-the-clock security.

Whether you require regular storage, seasonal overflow, or storage with dispatch support, our team works with you to develop a practical solution based on your operational requirements.

### Trust points

- Established cold-storage operation in Cebu
- SAP-supported inventory monitoring
- Industrial refrigeration and backup systems
- Responsive local operations team

### CTA

**Learn More About iFood**

### Floating card

Preferred option:

**Since 2018**

Providing dependable cold-storage support to businesses across Cebu.

Alternative option:

**–25°C**

Designed for reliable frozen-storage conditions.

Use only one floating card at a time. Its content must be editable.

---

## 8.6 Facility Highlights Section

### Eyebrow

**FACILITY HIGHLIGHTS**

### Heading

# Infrastructure You Can Depend On

### Introduction

Our cold-storage facility is designed to support efficient receiving, secure storage, accurate inventory control, and reliable dispatch operations.

### Layout

Do not recreate the old checkerboard presentation.

Use one of these responsive patterns:

- Three large image cards followed by a smaller supporting grid, or
- A balanced two-column image-card grid, or
- A featured large card plus smaller supporting cards

### Highlight content

#### 20,000 m² Property

A spacious and secure facility with room for cold storage, truck movement, reefer containers, loading operations, and customer requirements.

#### 10,000-Pallet Capacity

Organized storage capacity for recurring and high-volume frozen inventory requirements.

#### 20 Freezer Rooms

Multiple freezer rooms allow inventory to be managed according to customer, product, storage, and operational requirements.

#### 12-Meter Loading Bays

Wide loading areas provide sufficient maneuvering space and support faster unloading, handling, reboxing, weighing, and dispatch.

#### 14 Advanced Loading Docks

Equipped with dock levelers, digital scales, dock lighting, and inflatable dock seals to improve efficiency and help protect the cold chain.

#### Industrial Ammonia Refrigeration

A centralized refrigeration system with Quantum LX touchscreen controls and Thermofin air coolers supports temperature management down to **–25°C**, subject to approved facility specifications.

#### Insulated Cold-Room Construction

Heated freezer doors and fire-resistant insulated panels help maintain stable internal temperatures and protect stored inventory.

#### Hygienic HDPE Pallets

Washable, anti-slip plastic pallets are used instead of wooden pallets to support cleanliness and cold-storage handling requirements.

#### 35 Reefer Plug-In Stations

Dedicated stations help maintain continuous power for reefer containers awaiting unloading, storage, or dispatch.

#### Backup Power

Two Caterpillar generator sets with a stated combined capacity of **650 kVA** support operational continuity during power interruptions. Confirm the final published capacity before launch.

#### 24/7 Security and CCTV

Round-the-clock security personnel and facility-wide CCTV monitoring help protect customer inventory and property.

### Card fields

Each facility card must support:

- Title
- Short description
- Technical value
- Image
- Mobile image
- Icon
- Alt text
- Optional link
- Visibility toggle
- Sort order

---

## 8.7 Inventory Visibility Section

Use a full-width dark-blue section to create a strong visual break.

### Layout

- Left: replaceable image or approved warehouse-system visual
- Right: text and benefit list

Reverse the order on mobile only if it improves comprehension.

### Eyebrow

**INVENTORY VISIBILITY**

### Heading

# Know What Is in Storage

### Copy

Cold storage should provide more than available space. It should give your team confidence that inventory is properly received, recorded, stored, and released.

iFood Logistics uses **SAP Enterprise Resource Planning** to support real-time inventory records and stock movements.

### Benefits

- Organized receiving and release records
- Traceable inventory movements
- Accurate stock balances
- Structured pallet and product monitoring
- Improved coordination between storage and dispatch
- Clearer reporting for planning and reconciliation

### CTA

**Ask About Our Inventory Process**

Use white text, light-blue accents, and minimal icons.

---

## 8.8 Why iFood Section

### Eyebrow

**WHY IFOOD LOGISTICS**

### Heading

# Reduce Risk Across Your Cold Chain

Use a clean three-column benefits grid on desktop.

### Benefit items

#### Reliable Temperature Control

Industrial refrigeration systems and insulated cold rooms help maintain stable frozen-storage conditions.

#### Operational Continuity

Backup generators, refrigeration controls, reefer plug-in stations, and security systems support dependable daily operations.

#### Efficient Receiving and Dispatch

Wide loading bays and equipped loading docks help move products into and out of storage efficiently.

#### Better Inventory Visibility

SAP-supported records provide greater control over receipts, movements, balances, and releases.

#### Flexible Storage Arrangements

Solutions can be structured around required temperature, pallet volume, storage duration, and dispatch schedule.

#### Responsive Local Support

Work directly with a Cebu-based team that understands the operational needs of food businesses, importers, distributors, and restaurant groups.

Use replaceable line icons and concise card copy.

---

## 8.9 Industries Section

### Eyebrow

**INDUSTRIES WE SUPPORT**

### Heading

# Supporting Businesses Across the Food Supply Chain

### Industry cards

- Food importers and distributors
- Food manufacturers
- Restaurant and foodservice groups
- Hotels and hospitality groups
- Retail and supermarket chains
- Commissaries and institutional kitchens
- Seafood and meat traders

Use a four-card rhythm similar to the reference. Each card may use either an editable icon or image.

Avoid generic office imagery.

---

## 8.10 Storage Process Section

### Eyebrow

**HOW IT WORKS**

### Heading

# A Straightforward Storage Process

### Desktop layout

Create a horizontal five-step process with numbered circles connected by a fine blue line.

### Mobile layout

Convert to a vertical timeline.

### Steps

#### 1. Share Your Requirements

Provide the product type, required temperature, estimated pallet quantity, expected arrival date, and storage duration.

#### 2. Receive a Storage Proposal

The iFood team reviews the requirements and recommends the appropriate storage and handling arrangement.

#### 3. Schedule Delivery

Coordinate the receiving date, vehicle information, product documentation, and unloading requirements.

#### 4. Store and Track Inventory

Products are received, recorded, stored, and monitored through the inventory-management process.

#### 5. Schedule Inventory Releases

Request full or partial releases according to production, distribution, or customer-delivery schedules.

### CTA

**Start Your Storage Inquiry**

All steps and labels must be editable in Sanity.

---

## 8.11 Partners Section

### Layout

Use a restrained logo strip similar to the reference.

### Label

**TRUSTED BY LEADING FOODSERVICE BUSINESSES**

### Supporting copy

iFood Logistics has supported restaurant groups, commissaries, foodservice operators, traders, and institutions across the Philippines.

### Potential partner list

- Shakey's Pizza Commerce
- Manila Commissario — Kuya J
- Scotland Phils. Inc. — Bonchon
- Savory Classic
- Golden Acres
- Cafe France
- Vikings Group
- Moment Group
- Curated Concepts, Inc.
- Artemis Plus Express
- Harbor View
- Premier Foods Inc.
- Top Resto Group
- 8Fish Seafood Trading Corp.
- One-0-One Food Corp.

### Display behavior

- Show approved logos in grayscale by default
- Original colors may appear on hover
- Use two clean rows if needed
- Do not make logos too small
- Avoid an automatically moving carousel unless it can be paused and remains accessible

### Publishing rule

Do not display a partner name or logo until company management confirms permission.

Each partner item must include:

- Name
- Logo
- Alt text
- Optional website
- Optional relationship description
- `approvedForPublication`
- `isVisible`
- Sort order

Only render items where approval and visibility are both true.

Legal caption:

*Company names and trademarks belong to their respective owners. Display is subject to customer approval.*

---

## 8.12 Affiliates Section

Do not make this section visually compete with the partner section.

### Heading

# Backed by a Diversified Business Group

### Copy

iFood Logistics is part of a diversified group with business interests across food distribution, construction, manufacturing, packaging, real estate, and related industries in the Visayas.

This broader business network provides operational experience, local knowledge, and long-term support as iFood continues to strengthen its cold-chain capabilities.

### Potential affiliates

- Grand Cement Manufacturing Corporation
- Benedicto & Sons Inc.
- Benedicto Development Corporation
- Berben Wood Industries
- Cadiz Steel Corporation
- Cebu Grand Industries
- Anisilon Packaging Solutions
- RLC Holdings
- Emersons Specialty Products Corporation
- G. Emersons Premium Foods Corporation
- Coastal Highpoint Ventures

Use a clean list or smaller logo grid. Apply the same approval and visibility rules used for partners.

---

## 8.13 Expansion Section

This may be a compact image-and-text banner rather than a full oversized section.

### Eyebrow

**OUR EXPANSION**

### Heading

# Building a Stronger Cold-Chain Network

### Copy

From our established facility in Cebu, iFood Logistics is preparing for further expansion across the Philippines.

An additional **18,000-pallet facility in Luzon** is under development, with future plans for Mindanao.

Our goal is to provide customers with a more connected, reliable, and scalable cold-chain network as their businesses grow.

### Publishing rule

The entire section must have a CMS visibility toggle because construction status and expansion plans may change.

### CTA

**Partner With Us**

---

## 8.14 Inquiry Section

Create a strong conversion section immediately before the FAQ or footer.

### Layout

Use a two-column layout:

**Left:**
- Heading
- Supporting copy
- Optional direct contact information
- Short reassurance points

**Right:**
- White form card
- Strong visual hierarchy
- Clear field labels
- Generous spacing

On mobile, place the copy above the form.

### Heading

# Secure the Right Cold Storage for Your Business

### Copy

Tell us what you need to store, how much space you require, and when your inventory is expected to arrive. Our team will help identify the appropriate cold-storage and handling arrangement.

### Required form fields

- Full name
- Company name
- Work email
- Mobile number
- Product type
- Required storage temperature
- Estimated number of pallets
- Expected arrival date
- Estimated storage duration
- Required dispatch frequency
- Additional handling requirements
- Consent checkbox for privacy notice

### Optional fields

- Current location
- Preferred contact method
- Best time to call
- Upload product list or requirements document
- How the visitor heard about iFood

### Progressive disclosure

The visible first step may initially show:

- Full name
- Company
- Work email
- Mobile number
- Product type
- Estimated pallets
- Expected arrival date
- Message

Additional operational fields may expand after the visitor begins the inquiry or may appear in a second step.

Do not sacrifice data quality purely to make the form appear shorter.

### Form button

**Submit Storage Inquiry**

### Reassurance copy

*Your information will only be used to evaluate and respond to your storage inquiry.*

### Success message

**Thank you. Your storage inquiry has been received. Our team will review your requirements and contact you using the details provided.**

Also show a generated inquiry reference number.

### Error message

**We could not submit your inquiry. Please check the highlighted fields or contact our team directly.**

Do not expose technical error details.

---

## 8.15 FAQ Section

Use an accessible accordion with only one item open by default, or all closed by default.

### Where is iFood Logistics located?

Our Cebu cold-storage facility is located along P. Remedio Street, Banilad, Mandaue City, Cebu.

### What temperature can the facility maintain?

The freezer facility is designed to maintain temperatures as low as **–25°C**, depending on the assigned storage room and approved operating requirements.

### How much inventory can the facility accommodate?

The facility has a stated capacity of approximately **10,000 pallet positions** across 20 freezer rooms.

### Can you accommodate reefer containers?

Yes. The facility has **35 plug-in stations** that support continuous power and temperature control for reefer containers.

### How is inventory monitored?

Inventory receipts, movements, balances, and releases are managed using SAP-supported processes.

### What happens during a power interruption?

Two Caterpillar generator sets provide backup power to support continuity of cold-storage operations.

### Do you accept short-term or seasonal storage?

Storage arrangements may be structured for regular, temporary, seasonal, or overflow requirements, subject to available space and product requirements.

### What information is required for a quotation?

Provide the product type, required temperature, pallet quantity, expected arrival date, storage duration, and anticipated release schedule.

All questions, answers, order, and visibility must be editable in Sanity.

---

## 8.16 Footer

Use a dark-blue background rather than black.

Include:

- Official iFood Logistics logo
- Operated by iFood Specialist Corporation
- P. Remedio Street, Banilad, Mandaue City, Cebu, Philippines
- Contact details
- Quick links
- Privacy Policy
- Terms of Use
- Optional social or business contact links

Footer statement:

> Reliable cold storage, inventory management, and dispatch support for businesses across Cebu and the Philippines.

Add a thin medium-blue line along the top if it improves separation.

---

## 8.17 CMS-Editable Layout Controls

To support future company changes without code edits, provide these CMS controls where practical:

- Show or hide section
- Section heading and supporting copy
- Section theme: white, light blue, dark blue
- Image selection
- Mobile image selection
- Icon selection or upload
- Card order
- Statistic order
- Partner and affiliate order
- CTA text and URL
- Optional section anchor ID
- Optional featured-card toggle
- Optional image-left or image-right layout
- Optional floating-card content
- Optional maximum number of visible cards

Do not allow arbitrary raw CSS input from CMS users.

---

## 8.18 Design Acceptance Criteria

The page must:

- Clearly resemble the reference's level of polish and layout hierarchy without copying it
- Use an image-led hero with left-aligned copy
- Include a floating statistics bar overlapping the hero
- Use spacious white sections with restrained blue accents
- Use a four-column service-card layout on desktop
- Use a split about section with one floating information card
- Use authentic cold-storage facility imagery
- Include a dark-blue inventory-visibility section
- Use a clean partner-logo strip
- End with a prominent inquiry section
- Preserve the iFood Logistics logo accurately
- Use only the approved iFood palette and typography
- Allow replacement of all major images and icons through Sanity
- Remain fully responsive and accessible

---

## 8. Inquiry System Architecture

The inquiry system must not rely only on a `mailto:` link.

### Submission flow

1. Visitor completes the inquiry form.
2. Client-side validation provides immediate feedback.
3. Form sends a `POST` request to a secure Next.js Route Handler.
4. Server verifies the Cloudflare Turnstile token.
5. Server validates and sanitizes all fields using Zod.
6. Server applies a basic rate limit.
7. Server inserts the inquiry into Supabase.
8. Server sends a notification email to the configured iFood recipient through Resend.
9. Server sends an acknowledgment email to the visitor.
10. Server returns a success response with a reference number.

### Why both database and email are required

Email delivery can fail, be delayed, or enter spam. The Supabase record acts as the source of truth so inquiries are not lost.

### Suggested inquiry table

```sql
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference_number text unique not null,
  status text not null default 'new',
  full_name text not null,
  company_name text not null,
  email text not null,
  mobile_number text not null,
  product_type text not null,
  required_temperature text,
  estimated_pallets integer,
  expected_arrival_date date,
  storage_duration text,
  dispatch_frequency text,
  handling_requirements text,
  preferred_contact_method text,
  best_time_to_call text,
  source text,
  consent_privacy boolean not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  created_at timestamptz not null default now(),
  contacted_at timestamptz,
  internal_notes text
);
```

Suggested statuses:

- `new`
- `contacted`
- `qualified`
- `proposal_sent`
- `won`
- `lost`
- `spam`

### Security requirements

- Never expose the Supabase service-role key to the browser.
- Never expose the Resend API key to the browser.
- Store all secrets in environment variables.
- Verify Turnstile on the server.
- Add rate limiting.
- Validate file type and size for uploads.
- Restrict database insert and read permissions.
- Escape user-provided content in emails.
- Log failures without storing unnecessary sensitive data.
- Include a privacy notice and consent checkbox.
- Do not place customer data in analytics events.

### Suggested environment variables

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
INQUIRY_NOTIFICATION_EMAIL=
INQUIRY_FROM_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Do not commit `.env.local`.

---

## 9. Email Requirements

### Internal notification email

Subject:

```text
New iFood Storage Inquiry — {{companyName}} — {{referenceNumber}}
```

Include all submitted details in a clean, readable format.

Provide clear action links where possible:

- Reply to customer
- Call customer
- Open inquiry record

### Visitor acknowledgment email

Subject:

```text
We received your iFood Logistics inquiry — {{referenceNumber}}
```

Body should:

- Thank the visitor
- Confirm receipt
- Summarize the submitted requirements
- Provide the reference number
- State that the team will respond using the supplied contact details
- Include official contact information
- Avoid promising a response time unless management approves one

---

## 10. Sanity Content Models

Create at least these document types:

- `siteSettings`
- `landingPage`
- `service`
- `facilityHighlight`
- `industry`
- `processStep`
- `partner`
- `affiliate`
- `faqItem`
- `contactDetails`
- `seoSettings`

### Recommended `siteSettings` fields

- Official company name
- Trading name
- Logo
- Logo alternative text
- Contact email
- Contact phone
- Address
- Social links
- Inquiry recipient email
- Header CTA
- Footer text
- Default SEO metadata

### Recommended reusable objects

- `cta`
- `editableImage`
- `editableIcon`
- `statistic`
- `richText`
- `sectionSettings`
- `seoMetadata`

Every major section should include:

- `isVisible`
- Section anchor ID
- Eyebrow
- Heading
- Supporting copy
- Theme
- Sort order where applicable

---

## 11. Suggested Project Structure

```text
src/
  app/
    api/
      inquiries/
        route.ts
    privacy/
      page.tsx
    terms/
      page.tsx
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
    sections/
      HeroSection.tsx
      StatsSection.tsx
      AboutSection.tsx
      SolutionsSection.tsx
      FacilitySection.tsx
      InventorySection.tsx
      WhyIfoodSection.tsx
      IndustriesSection.tsx
      ProcessSection.tsx
      PartnersSection.tsx
      AffiliatesSection.tsx
      ExpansionSection.tsx
      InquirySection.tsx
      FaqSection.tsx
    ui/
      Button.tsx
      Container.tsx
      SectionHeading.tsx
      EditableIcon.tsx
      ResponsiveImage.tsx
      FormField.tsx
      LoadingSpinner.tsx
      Alert.tsx
  content/
    fallbackContent.ts
  lib/
    sanity/
      client.ts
      queries.ts
      image.ts
    supabase/
      admin.ts
    resend/
      client.ts
    turnstile/
      verify.ts
    validation/
      inquirySchema.ts
    icons/
      iconMap.ts
    utils/
      generateReferenceNumber.ts
      sanitize.ts
  emails/
    InquiryNotificationEmail.tsx
    InquiryAcknowledgmentEmail.tsx
  types/
    content.ts
    inquiry.ts
sanity/
  schemaTypes/
    siteSettings.ts
    landingPage.ts
    service.ts
    facilityHighlight.ts
    industry.ts
    processStep.ts
    partner.ts
    affiliate.ts
    faqItem.ts
```

---

## 12. Responsive Design Requirements

Test at minimum:

- 320px
- 375px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Requirements:

- No horizontal scrolling
- No clipped headings
- Buttons remain readable and tappable
- Images preserve meaningful focal points
- Cards stack logically
- Form fields remain easy to complete on mobile
- Partner logos remain legible
- Mobile navigation can be used with keyboard and screen reader
- Sticky header must not cover anchor targets

---

## 13. Accessibility Requirements

Meet WCAG 2.2 AA where reasonably possible.

Include:

- Semantic headings in the correct order
- Keyboard-operable navigation
- Visible focus states
- Sufficient color contrast
- Descriptive alt text
- Empty alt text for purely decorative images
- Form labels connected to inputs
- Error messages linked to fields
- `aria-live` for submission status
- Reduced-motion support
- Accessible accordion behavior
- Accessible mobile menu
- No information conveyed only by color
- Minimum interactive target size of approximately 44px

---

## 14. Performance Requirements

Target strong Core Web Vitals.

Implement:

- Next.js Image component
- Correct `sizes` attributes
- Modern image formats
- Lazy loading below the fold
- Priority loading only for the hero image
- Image dimensions to prevent layout shift
- Minimal client-side JavaScript
- Server Components by default
- Client Components only when interactivity is required
- Font subsetting
- No autoplay background video on mobile
- No heavy animation library unless clearly justified
- No giant uncompressed partner logos
- Cacheable CMS data where appropriate

---

## 15. SEO Requirements

### Page title

**iFood Logistics | Cold Storage and Warehousing in Cebu**

### Meta description

Reliable cold storage in Mandaue, Cebu with 10,000-pallet capacity, SAP inventory management, equipped loading docks, backup power, and 24/7 security.

### Suggested keywords

- Cold storage Cebu
- Cold storage Mandaue
- Frozen warehouse Cebu
- Cold chain logistics Cebu
- Food storage facility Cebu
- Frozen storage Philippines
- Reefer container plug-in Cebu
- Cold warehouse rental Cebu

### Technical SEO

Implement:

- Canonical URL
- Open Graph metadata
- Twitter card metadata
- Sitemap
- Robots file
- Organization schema
- LocalBusiness schema where appropriate
- FAQ schema only for visible FAQ content
- Meaningful page headings
- Human-readable anchor links
- Descriptive image alt text
- Proper 404 page
- Favicon and web manifest

Do not make unsupported claims in structured data.

---

## 16. Analytics and Conversion Tracking

Track only useful events:

- `request_quote_click`
- `explore_facility_click`
- `inquiry_form_start`
- `inquiry_form_submit_success`
- `inquiry_form_submit_error`
- `phone_click`
- `email_click`
- `partner_cta_click`

Do not send form contents, names, email addresses, phone numbers, or other personal information to analytics.

Capture UTM parameters in the inquiry record.

---

## 17. Publishing Verification Checklist

Before production launch, company management must confirm:

- Exact legal public-facing company name
- Whether “iFood Logistics” is the approved trading name
- Final official logo files
- Correct facility address
- Correct contact details
- Whether –25°C applies to all relevant rooms
- Whether 650 kVA is combined or per generator
- Whether “ISO-certified pallets” is documented and approved
- Whether every dock has the listed equipment
- Whether reefer trucking is actually offered
- Whether the company offers transport or only storage and dispatch coordination
- Current Luzon expansion status
- Approval to publish every partner name or logo
- Approval to publish every affiliate name or logo
- Privacy policy
- Terms of use
- Inquiry recipient email
- Email-domain verification for Resend

Do not publish unverified claims.

---

## 18. Acceptance Criteria

The build is complete only when:

- The page matches the approved brand colors and typography.
- All major images and icons can be changed from Sanity.
- No editable marketing content is trapped inside React components.
- The inquiry form stores a record in Supabase.
- The inquiry form sends an internal notification through Resend.
- The visitor receives an acknowledgment email.
- Turnstile verification happens server-side.
- Form validation works on both client and server.
- The site is responsive at all required breakpoints.
- Keyboard navigation works.
- SEO metadata is present.
- The production domain can be connected through GoDaddy DNS.
- A README explains setup, deployment, CMS editing, and environment variables.
- No credentials or private keys are committed.
- Partner and affiliate visibility requires explicit approval flags.
- The company can hide the expansion section without a code deployment.
- The official logo is preserved without alteration.

---

## 19. Instructions to Claude

Build the full project, not only a visual mockup.

Proceed in this order:

1. Create the Next.js project structure.
2. Configure TypeScript, Tailwind CSS, and global brand tokens.
3. Create reusable layout and UI components.
4. Create Sanity schemas and queries.
5. Build the landing-page sections using CMS data.
6. Add safe fallback content for local development.
7. Implement the inquiry form.
8. Implement server-side validation, Turnstile verification, Supabase storage, and Resend emails.
9. Add SEO metadata and structured data.
10. Add privacy and terms placeholders clearly marked for legal review.
11. Add responsive behavior and accessibility.
12. Add tests for form validation and API behavior.
13. Add a complete README.
14. Provide exact deployment steps for Vercel and DNS connection through GoDaddy.

### Coding rules

- Use strict TypeScript.
- Avoid `any`.
- Use Server Components by default.
- Keep components focused and reusable.
- Do not hardcode editable images, icons, partner logos, or statistics.
- Do not invent facility claims.
- Do not alter the official logo.
- Do not expose secrets to the client.
- Do not depend on email as the only inquiry record.
- Include helpful comments only where the logic is not obvious.
- Use accessible HTML.
- Return clear validation errors.
- Include loading, success, and failure states.
- Ensure the project can run with documented local setup commands.

### Expected output

Claude should produce:

- Full Next.js source code
- Sanity Studio configuration and schemas
- Supabase SQL migration
- Inquiry API route
- Resend email templates
- Turnstile integration
- Environment-variable example file
- README
- Deployment instructions
- DNS connection instructions
- Content-editing guide for company staff
- Final quality-control checklist
