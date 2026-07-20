import type { LandingPageContent, SiteSettings } from "@/types/content";

/**
 * Fallback content used when Sanity is unreachable or a document has not
 * been published yet (e.g. local development without a configured project).
 * This mirrors the copy approved in the build spec so the site never ships
 * empty sections. All of this is designed to be fully overridden by Sanity.
 */

const ph = (w: number, h: number, label: string, bg = "042B65", fg = "FFFFFF") =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(label)}`;

export const fallbackSiteSettings: SiteSettings = {
  companyLegalName: "iFood Specialist Corporation",
  tradingName: "iFood Logistics",
  logo: {
    url: ph(240, 80, "iFood Logistics", "FFFFFF", "042B65"),
    alt: "iFood Logistics logo",
    isVisible: true,
  },
  logoWhite: {
    url: ph(240, 80, "iFood Logistics", "042B65", "FFFFFF"),
    alt: "iFood Logistics logo (white)",
    isVisible: true,
  },
  contactEmail: "inquiry@ifoodlogistics.com",
  contactPhone: "+63 32 000 0000",
  address: "P. Remedio Street, Banilad, Mandaue City, Cebu, Philippines",
  inquiryRecipientEmail: "support@gemsfoods.ph",
  headerCta: { label: "Request a Quote", href: "#inquiry", isVisible: true },
  footerText:
    "Reliable cold storage, inventory management, and dispatch support for businesses across Cebu and the Philippines.",
  seo: {
    title: "iFood Logistics",
    description:
      "Reliable cold storage in Mandaue, Cebu with 10,000-pallet capacity, SAP inventory management, equipped loading docks, backup power, and 24/7 security.",
    keywords: [
      "Cold storage Cebu",
      "Cold storage Mandaue",
      "Frozen warehouse Cebu",
      "Cold chain logistics Cebu",
      "Food storage facility Cebu",
      "Frozen storage Philippines",
      "Reefer container plug-in Cebu",
      "Cold warehouse rental Cebu",
    ],
    socialImage: {
      url: ph(1200, 630, "iFood Logistics", "042B65", "FFFFFF"),
      alt: "iFood Logistics cold storage facility",
      isVisible: true,
    },
  },
};

export const fallbackContent: LandingPageContent = {
  navItems: [
    { label: "Home", href: "#home" },
    { label: "Solutions", href: "#solutions" },
    { label: "Facility", href: "#facility" },
    { label: "Industries", href: "#industries" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#inquiry" },
  ],
  headerCta: { label: "Request a Quote", href: "#inquiry", isVisible: true },

  hero: {
    isVisible: true,
    anchorId: "home",
    eyebrow: "COLD STORAGE & LOGISTICS IN CEBU",
    headlineLine1: "Reliable Cold Storage.",
    headlineLine2: "Smarter Logistics.",
    supportingCopy:
      "Protect your frozen inventory with dependable temperature control, SAP-supported stock management, efficient receiving, and secure 24/7 operations.",
    primaryCta: { label: "Request a Storage Quote", href: "#inquiry", isVisible: true },
    secondaryCta: { label: "Explore Our Facility", href: "#facility", isVisible: true },
    image: {
      url: ph(1920, 1080, "Facility Hero Photo", "0B3A73"),
      alt: "iFood Logistics cold storage facility exterior with trucks at loading bays",
      isVisible: true,
      darkOverlay: false,
    },
    textAlign: "left",
    overlayStrength: "light",
  },

  stats: {
    isVisible: true,
    stats: [
      { value: "10,000", label: "Pallet Capacity", icon: { mode: "library", libraryKey: "boxes" } },
      { value: "20", label: "Freezer Rooms", icon: { mode: "library", libraryKey: "snowflake" } },
      { value: "14", label: "Loading Doors", icon: { mode: "library", libraryKey: "doorOpen" } },
      { value: "35", label: "Reefer Plug-In Stations", icon: { mode: "library", libraryKey: "plugZap" } },
      { value: "24/7", label: "Security & Monitoring", icon: { mode: "library", libraryKey: "shieldCheck" } },
    ],
  },

  solutions: {
    isVisible: true,
    anchorId: "solutions",
    eyebrow: "OUR SOLUTIONS",
    heading: "Cold-Chain Services\nBuilt Around Your Business",
    supportingCopy:
      "From regular frozen storage to seasonal overflow and coordinated dispatch, iFood Logistics provides practical cold-chain support based on your inventory and operating requirements.",
    sectionLink: { label: "Explore All Solutions →", href: "#facility", isVisible: true },
    cards: [
      {
        id: "frozen-storage",
        icon: { mode: "library", libraryKey: "snowflake" },
        title: "Frozen Storage",
        description:
          "Secure frozen storage with temperatures maintained as low as –25°C, subject to the assigned room and approved operating specifications.",
        isVisible: true,
        sortOrder: 1,
        accentBackground: true,
      },
      {
        id: "inventory-management",
        icon: { mode: "library", libraryKey: "database" },
        title: "Inventory Management",
        description:
          "SAP-supported stock monitoring provides organized records of inventory receipts, movements, balances, and releases.",
        isVisible: true,
        sortOrder: 2,
        accentBackground: true,
      },
      {
        id: "reefer-container-support",
        icon: { mode: "library", libraryKey: "plugZap" },
        title: "Reefer Container Support",
        description:
          "A total of 35 plug-in stations supports reefer containers while maintaining continuous power and temperature control.",
        isVisible: true,
        sortOrder: 3,
        accentBackground: true,
      },
      {
        id: "receiving-and-dispatch",
        icon: { mode: "library", libraryKey: "packageCheck" },
        title: "Receiving and Dispatch",
        description:
          "Structured receiving, weighing, unloading, pallet handling, reboxing, release, and dispatch processes.",
        isVisible: true,
        sortOrder: 4,
        accentBackground: true,
      },
      {
        id: "seasonal-overflow-storage",
        icon: { mode: "library", libraryKey: "warehouse" },
        title: "Seasonal Overflow Storage",
        description:
          "Additional storage capacity for peak seasons, promotions, import arrivals, production increases, and unexpected inventory requirements.",
        isVisible: true,
        sortOrder: 5,
        accentBackground: true,
      },
      {
        id: "storage-and-release-coordination",
        icon: { mode: "library", libraryKey: "clipboardCheck" },
        title: "Storage and Release Coordination",
        description:
          "Store inventory with iFood and schedule full or partial releases according to branch, production, or customer requirements.",
        isVisible: true,
        sortOrder: 6,
        accentBackground: true,
      },
    ],
  },

  about: {
    isVisible: true,
    anchorId: "about",
    eyebrow: "ABOUT IFOOD LOGISTICS",
    heading: "Your Reliable Partner\nfor Cold-Chain Operations",
    bodyCopy:
      "Established in May 2018, iFood Specialist Corporation, operating as iFood Logistics, provides dependable cold-storage solutions to food businesses throughout Cebu and the surrounding region.\n\nOur facility combines reliable refrigeration, efficient loading infrastructure, SAP-supported inventory management, backup power, and round-the-clock security.\n\nWhether you require regular storage, seasonal overflow, or storage with dispatch support, our team works with you to develop a practical solution based on your operational requirements.",
    trustPoints: [
      "Established cold-storage operation in Cebu",
      "SAP-supported inventory monitoring",
      "Industrial refrigeration and backup systems",
      "Responsive local operations team",
    ],
    cta: { label: "Learn More About iFood", href: "#facility", isVisible: true },
    image: {
      url: ph(1200, 1400, "Facility Photo", "0B3A73"),
      alt: "Interior of iFood Logistics cold storage facility with pallet racking",
      isVisible: true,
    },
    floatingCardEyebrow: "Since 2018",
    floatingCardText: "Providing dependable cold-storage support to businesses across Cebu.",
  },

  facility: {
    isVisible: true,
    anchorId: "facility",
    eyebrow: "FACILITY HIGHLIGHTS",
    heading: "Infrastructure You Can Depend On",
    supportingCopy: undefined,
    introCopy:
      "Our cold-storage facility is designed to support efficient receiving, secure storage, accurate inventory control, and reliable dispatch operations.",
    highlights: [
      {
        id: "property-size",
        title: "20,000 m² Property",
        description:
          "A spacious and secure facility with room for cold storage, truck movement, reefer containers, loading operations, and customer requirements.",
        image: { url: ph(1000, 750, "Facility Grounds", "0B3A73"), alt: "Aerial view of iFood Logistics facility grounds", isVisible: true },
        icon: { mode: "library", libraryKey: "building2" },
        isVisible: true,
        sortOrder: 1,
      },
      {
        id: "pallet-capacity",
        title: "10,000-Pallet Capacity",
        description:
          "Organized storage capacity for recurring and high-volume frozen inventory requirements.",
        image: { url: ph(1000, 750, "Pallet Racking", "0B3A73"), alt: "Pallet racking inside a freezer room", isVisible: true },
        icon: { mode: "library", libraryKey: "boxes" },
        isVisible: true,
        sortOrder: 2,
      },
      {
        id: "freezer-rooms",
        title: "20 Freezer Rooms",
        description:
          "Multiple freezer rooms allow inventory to be managed according to customer, product, storage, and operational requirements.",
        image: { url: ph(1000, 750, "Freezer Room", "0B3A73"), alt: "Interior of a freezer room", isVisible: true },
        icon: { mode: "library", libraryKey: "snowflake" },
        isVisible: true,
        sortOrder: 3,
      },
      {
        id: "loading-bays",
        title: "12-Meter Loading Bays",
        description:
          "Wide loading areas provide sufficient maneuvering space and support faster unloading, handling, reboxing, weighing, and dispatch.",
        image: { url: ph(800, 600, "Loading Bay", "0B3A73"), alt: "Wide loading bay with a truck docked", isVisible: true },
        icon: { mode: "library", libraryKey: "ruler" },
        isVisible: true,
        sortOrder: 4,
      },
      {
        id: "loading-docks",
        title: "14 Advanced Loading Docks",
        description:
          "Equipped with dock levelers, digital scales, dock lighting, and inflatable dock seals to improve efficiency and help protect the cold chain.",
        image: { url: ph(800, 600, "Loading Dock", "0B3A73"), alt: "Loading dock with dock leveler and seals", isVisible: true },
        icon: { mode: "library", libraryKey: "doorOpen" },
        isVisible: true,
        sortOrder: 5,
      },
      {
        id: "refrigeration",
        title: "Industrial Ammonia Refrigeration",
        description:
          "A centralized refrigeration system with Quantum LX touchscreen controls and Thermofin air coolers supports temperature management down to –25°C, subject to approved facility specifications.",
        image: { url: ph(800, 600, "Refrigeration Plant", "0B3A73"), alt: "Industrial ammonia refrigeration plant room", isVisible: true },
        icon: { mode: "library", libraryKey: "thermometerSnowflake" },
        isVisible: true,
        sortOrder: 6,
      },
      {
        id: "insulated-construction",
        title: "Insulated Cold-Room Construction",
        description:
          "Heated freezer doors and fire-resistant insulated panels help maintain stable internal temperatures and protect stored inventory.",
        image: { url: ph(800, 600, "Cold Room Panels", "0B3A73"), alt: "Insulated cold-room wall panels and door", isVisible: true },
        icon: { mode: "library", libraryKey: "doorClosed" },
        isVisible: true,
        sortOrder: 7,
      },
      {
        id: "hdpe-pallets",
        title: "Hygienic HDPE Pallets",
        description:
          "Washable, anti-slip plastic pallets are used instead of wooden pallets to support cleanliness and cold-storage handling requirements.",
        image: { url: ph(800, 600, "HDPE Pallets", "0B3A73"), alt: "Stacked HDPE plastic pallets", isVisible: true },
        icon: { mode: "library", libraryKey: "recycle" },
        isVisible: true,
        sortOrder: 8,
      },
      {
        id: "reefer-stations",
        title: "35 Reefer Plug-In Stations",
        description:
          "Dedicated stations help maintain continuous power for reefer containers awaiting unloading, storage, or dispatch.",
        image: { url: ph(800, 600, "Reefer Plug-Ins", "0B3A73"), alt: "Reefer container plugged into a power station", isVisible: true },
        icon: { mode: "library", libraryKey: "plugZap" },
        isVisible: true,
        sortOrder: 9,
      },
      {
        id: "backup-power",
        title: "Backup Power",
        description:
          "Two Caterpillar generator sets with a stated combined capacity of 650 kVA support operational continuity during power interruptions. Confirm the final published capacity before launch.",
        image: { url: ph(800, 600, "Generator Sets", "0B3A73"), alt: "Backup generator sets", isVisible: true },
        icon: { mode: "library", libraryKey: "batteryCharging" },
        isVisible: true,
        sortOrder: 10,
      },
      {
        id: "security",
        title: "24/7 Security and CCTV",
        description:
          "Round-the-clock security personnel and facility-wide CCTV monitoring help protect customer inventory and property.",
        image: { url: ph(800, 600, "Security & CCTV", "0B3A73"), alt: "CCTV camera monitoring the facility", isVisible: true },
        icon: { mode: "library", libraryKey: "camera" },
        isVisible: true,
        sortOrder: 11,
      },
    ],
  },

  inventory: {
    isVisible: true,
    anchorId: "inventory",
    eyebrow: "INVENTORY VISIBILITY",
    heading: "Know What Is in Storage",
    copy:
      "Cold storage should provide more than available space. It should give your team confidence that inventory is properly received, recorded, stored, and released.\n\niFood Logistics uses SAP Enterprise Resource Planning to support real-time inventory records and stock movements.",
    benefits: [
      "Organized receiving and release records",
      "Traceable inventory movements",
      "Accurate stock balances",
      "Structured pallet and product monitoring",
      "Improved coordination between storage and dispatch",
      "Clearer reporting for planning and reconciliation",
    ],
    cta: { label: "Ask About Our Inventory Process", href: "#inquiry", isVisible: true },
    image: { url: ph(900, 700, "SAP Inventory System", "042B65"), alt: "Warehouse staff reviewing inventory records on a tablet", isVisible: true },
  },

  whyIfood: {
    isVisible: true,
    anchorId: "why-ifood",
    eyebrow: "WHY IFOOD LOGISTICS",
    heading: "Reduce Risk Across Your Cold Chain",
    items: [
      {
        id: "temperature-control",
        icon: { mode: "library", libraryKey: "thermometerSnowflake" },
        title: "Reliable Temperature Control",
        description:
          "Industrial refrigeration systems and insulated cold rooms help maintain stable frozen-storage conditions.",
        isVisible: true,
        sortOrder: 1,
      },
      {
        id: "operational-continuity",
        icon: { mode: "library", libraryKey: "batteryCharging" },
        title: "Operational Continuity",
        description:
          "Backup generators, refrigeration controls, reefer plug-in stations, and security systems support dependable daily operations.",
        isVisible: true,
        sortOrder: 2,
      },
      {
        id: "receiving-dispatch",
        icon: { mode: "library", libraryKey: "truck" },
        title: "Efficient Receiving and Dispatch",
        description:
          "Wide loading bays and equipped loading docks help move products into and out of storage efficiently.",
        isVisible: true,
        sortOrder: 3,
      },
      {
        id: "inventory-visibility",
        icon: { mode: "library", libraryKey: "database" },
        title: "Better Inventory Visibility",
        description:
          "SAP-supported records provide greater control over receipts, movements, balances, and releases.",
        isVisible: true,
        sortOrder: 4,
      },
      {
        id: "flexible-storage",
        icon: { mode: "library", libraryKey: "boxes" },
        title: "Flexible Storage Arrangements",
        description:
          "Solutions can be structured around required temperature, pallet volume, storage duration, and dispatch schedule.",
        isVisible: true,
        sortOrder: 5,
      },
      {
        id: "local-support",
        icon: { mode: "library", libraryKey: "shieldCheck" },
        title: "Responsive Local Support",
        description:
          "Work directly with a Cebu-based team that understands the operational needs of food businesses, importers, distributors, and restaurant groups.",
        isVisible: true,
        sortOrder: 6,
      },
    ],
  },

  industries: {
    isVisible: true,
    anchorId: "industries",
    eyebrow: "INDUSTRIES WE SUPPORT",
    heading: "Supporting Businesses Across the Food Supply Chain",
    supportingCopy:
      "From importation and manufacturing to retail and foodservice, iFood Logistics provides dependable cold-chain infrastructure that helps preserve product quality at every stage.",
    industries: [
      { id: "importers", name: "Food importers and distributors", icon: { mode: "library", libraryKey: "container" }, isVisible: true, sortOrder: 1 },
      { id: "manufacturers", name: "Food manufacturers", icon: { mode: "library", libraryKey: "factory" }, isVisible: true, sortOrder: 2 },
      { id: "restaurants", name: "Restaurant and foodservice groups", icon: { mode: "library", libraryKey: "utensils" }, isVisible: true, sortOrder: 3 },
      { id: "hospitality", name: "Hotels and hospitality groups", icon: { mode: "library", libraryKey: "hotel" }, isVisible: true, sortOrder: 4 },
      { id: "retail", name: "Retail and supermarket chains", icon: { mode: "library", libraryKey: "shoppingCart" }, isVisible: true, sortOrder: 5 },
      { id: "commissaries", name: "Commissaries and institutional kitchens", icon: { mode: "library", libraryKey: "building" }, isVisible: true, sortOrder: 6 },
      { id: "seafood-meat", name: "Seafood and meat traders", icon: { mode: "library", libraryKey: "fish" }, isVisible: true, sortOrder: 7 },
    ],
  },

  process: {
    isVisible: true,
    anchorId: "process",
    eyebrow: "HOW IT WORKS",
    heading: "A Straightforward Storage Process",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Share Your Requirements", description: "Provide the product type, required temperature, estimated pallet quantity, expected arrival date, and storage duration.", isVisible: true },
      { id: "step-2", stepNumber: 2, title: "Receive a Storage Proposal", description: "The iFood team reviews the requirements and recommends the appropriate storage and handling arrangement.", isVisible: true },
      { id: "step-3", stepNumber: 3, title: "Schedule Delivery", description: "Coordinate the receiving date, vehicle information, product documentation, and unloading requirements.", isVisible: true },
      { id: "step-4", stepNumber: 4, title: "Store and Track Inventory", description: "Products are received, recorded, stored, and monitored through the inventory-management process.", isVisible: true },
      { id: "step-5", stepNumber: 5, title: "Schedule Inventory Releases", description: "Request full or partial releases according to production, distribution, or customer-delivery schedules.", isVisible: true },
    ],
    cta: { label: "Start Your Storage Inquiry", href: "#inquiry", isVisible: true },
  },

  partners: {
    isVisible: true,
    anchorId: "partners",
    heading: "TRUSTED BY LEADING FOODSERVICE BUSINESSES",
    supportingCopy:
      "iFood Logistics has supported restaurant groups, commissaries, foodservice operators, traders, and institutions across the Philippines.",
    // NOTE: approvedForPublication is set to true here only to demonstrate the
    // section in local development. Before production launch, company
    // management must confirm publication approval for every partner name
    // and logo per section 17 of the build spec, and this flag should be
    // managed from Sanity, not this fallback file.
    partners: [
      "Shakey's Pizza Commerce",
      "Manila Commissario — Kuya J",
      "Scotland Phils. Inc. — Bonchon",
      "Savory Classic",
      "Golden Acres",
      "Cafe France",
      "Vikings Group",
      "Moment Group",
      "Curated Concepts, Inc.",
      "Artemis Plus Express",
      "Harbor View",
      "Premier Foods Inc.",
      "Top Resto Group",
      "8Fish Seafood Trading Corp.",
      "One-0-One Food Corp.",
    ].map((name, index) => ({
      id: `partner-${index + 1}`,
      name,
      logo: { url: ph(200, 100, name, "FFFFFF", "515151"), alt: `${name} logo`, isVisible: true },
      approvedForPublication: true,
      isVisible: true,
      sortOrder: index + 1,
    })),
    legalCaption:
      "Company names and trademarks belong to their respective owners. Display is subject to customer approval.",
  },

  affiliates: {
    isVisible: true,
    anchorId: "affiliates",
    heading: "Backed by a Diversified Business Group",
    copy:
      "iFood Logistics is part of a diversified group with business interests across food distribution, construction, manufacturing, packaging, real estate, and related industries in the Visayas.\n\nThis broader business network provides operational experience, local knowledge, and long-term support as iFood continues to strengthen its cold-chain capabilities.",
    affiliates: [
      "Grand Cement Manufacturing Corporation",
      "Benedicto & Sons Inc.",
      "Benedicto Development Corporation",
      "Berben Wood Industries",
      "Cadiz Steel Corporation",
      "Cebu Grand Industries",
      "Anisilon Packaging Solutions",
      "RLC Holdings",
      "Emersons Specialty Products Corporation",
      "G. Emersons Premium Foods Corporation",
      "Coastal Highpoint Ventures",
    ].map((name, index) => ({
      id: `affiliate-${index + 1}`,
      name,
      approvedForPublication: true,
      isVisible: true,
      sortOrder: index + 1,
    })),
  },

  expansion: {
    isVisible: true,
    anchorId: "expansion",
    eyebrow: "OUR EXPANSION",
    heading: "Building a Stronger Cold-Chain Network",
    copy:
      "From our established facility in Cebu, iFood Logistics is preparing for further expansion across the Philippines.\n\nAn additional 18,000-pallet facility in Luzon is under development, with future plans for Mindanao.\n\nOur goal is to provide customers with a more connected, reliable, and scalable cold-chain network as their businesses grow.",
    cta: { label: "Partner With Us", href: "#inquiry", isVisible: true },
  },

  inquiry: {
    isVisible: true,
    anchorId: "inquiry",
    heading: "Secure the Right Cold Storage for Your Business",
    copy:
      "Tell us what you need to store, how much space you require, and when your inventory is expected to arrive. Our team will help identify the appropriate cold-storage and handling arrangement.",
    reassurancePoints: [
      "Locally based Cebu team",
      "Response based on your submitted requirements",
      "No obligation storage proposal",
    ],
    submitLabel: "Submit Storage Inquiry",
    reassuranceCopy: "Your information will only be used to evaluate and respond to your storage inquiry.",
    successMessage:
      "Thank you. Your storage inquiry has been received. Our team will review your requirements and contact you using the details provided.",
    errorMessage:
      "We could not submit your inquiry. Please check the highlighted fields or contact our team directly.",
  },

  faq: {
    isVisible: true,
    anchorId: "faq",
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      { id: "faq-location", question: "Where is iFood Logistics located?", answer: "Our Cebu cold-storage facility is located along P. Remedio Street, Banilad, Mandaue City, Cebu.", isVisible: true, sortOrder: 1 },
      { id: "faq-temperature", question: "What temperature can the facility maintain?", answer: "The freezer facility is designed to maintain temperatures as low as –25°C, depending on the assigned storage room and approved operating requirements.", isVisible: true, sortOrder: 2 },
      { id: "faq-capacity", question: "How much inventory can the facility accommodate?", answer: "The facility has a stated capacity of approximately 10,000 pallet positions across 20 freezer rooms.", isVisible: true, sortOrder: 3 },
      { id: "faq-reefer", question: "Can you accommodate reefer containers?", answer: "Yes. The facility has 35 plug-in stations that support continuous power and temperature control for reefer containers.", isVisible: true, sortOrder: 4 },
      { id: "faq-inventory", question: "How is inventory monitored?", answer: "Inventory receipts, movements, balances, and releases are managed using SAP-supported processes.", isVisible: true, sortOrder: 5 },
      { id: "faq-power", question: "What happens during a power interruption?", answer: "Two Caterpillar generator sets provide backup power to support continuity of cold-storage operations.", isVisible: true, sortOrder: 6 },
      { id: "faq-seasonal", question: "Do you accept short-term or seasonal storage?", answer: "Storage arrangements may be structured for regular, temporary, seasonal, or overflow requirements, subject to available space and product requirements.", isVisible: true, sortOrder: 7 },
      { id: "faq-quotation", question: "What information is required for a quotation?", answer: "Provide the product type, required temperature, pallet quantity, expected arrival date, storage duration, and anticipated release schedule.", isVisible: true, sortOrder: 8 },
    ],
  },

  footer: {
    logo: fallbackSiteSettings.logo,
    operatedByLine: "Operated by iFood Specialist Corporation",
    address: "P. Remedio Street, Banilad, Mandaue City, Cebu, Philippines",
    contact: {
      address: "P. Remedio Street, Banilad, Mandaue City, Cebu, Philippines",
      phone: "+63 32 000 0000",
      email: "support@gemsfoods.ph",
    },
    quickLinks: [
      { label: "Home", href: "#home", isVisible: true },
      { label: "Solutions", href: "#solutions", isVisible: true },
      { label: "Facility", href: "#facility", isVisible: true },
      { label: "Industries", href: "#industries", isVisible: true },
      { label: "About", href: "#about", isVisible: true },
      { label: "FAQ", href: "#faq", isVisible: true },
      { label: "Contact", href: "#inquiry", isVisible: true },
      { label: "Privacy Policy", href: "/privacy", isVisible: true },
      { label: "Terms of Use", href: "/terms", isVisible: true },
    ],
    statement:
      "Reliable cold storage, inventory management, and dispatch support for businesses across Cebu and the Philippines.",
  },
};
