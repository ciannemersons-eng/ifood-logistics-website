import type { IconKey } from "@/lib/icons/iconMap";

export type SectionTheme = "white" | "lightBlue" | "darkBlue";

export interface EditableImage {
  url: string;
  alt: string;
  caption?: string;
  hotspot?: { x: number; y: number };
  mobileUrl?: string;
  darkOverlay?: boolean;
  credit?: string;
  isVisible?: boolean;
  width?: number;
  height?: number;
}

export interface EditableIcon {
  mode: "library" | "upload";
  libraryKey?: IconKey;
  uploadedAsset?: {
    url: string;
    alt: string;
  };
}

export interface Cta {
  label: string;
  href: string;
  isVisible?: boolean;
}

export interface Statistic {
  value: string;
  label: string;
  icon?: EditableIcon;
}

export interface SectionSettings {
  isVisible: boolean;
  anchorId?: string;
  theme?: SectionTheme;
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
}

export interface ServiceCard {
  id: string;
  icon: EditableIcon;
  title: string;
  description: string;
  link?: string;
  isVisible: boolean;
  sortOrder: number;
  accentBackground?: boolean;
}

export interface FacilityHighlight {
  id: string;
  title: string;
  description: string;
  technicalValue?: string;
  image: EditableImage;
  icon?: EditableIcon;
  link?: string;
  isVisible: boolean;
  sortOrder: number;
}

export interface Industry {
  id: string;
  name: string;
  icon?: EditableIcon;
  image?: EditableImage;
  isVisible: boolean;
  sortOrder: number;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  isVisible: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: EditableImage;
  website?: string;
  relationshipDescription?: string;
  approvedForPublication: boolean;
  isVisible: boolean;
  sortOrder: number;
}

export interface Affiliate {
  id: string;
  name: string;
  logo?: EditableImage;
  approvedForPublication: boolean;
  isVisible: boolean;
  sortOrder: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isVisible: boolean;
  sortOrder: number;
}

export interface ContactDetails {
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

export interface SeoSettings {
  title: string;
  description: string;
  socialImage?: EditableImage;
  keywords?: string[];
}

export interface SiteSettings {
  companyLegalName: string;
  tradingName: string;
  logo: EditableImage;
  logoWhite?: EditableImage;
  contactEmail: string;
  contactPhone: string;
  address: string;
  inquiryRecipientEmail: string;
  headerCta: Cta;
  footerText: string;
  seo: SeoSettings;
}

export interface HeroContent extends SectionSettings {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  supportingCopy: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  image: EditableImage;
  textAlign?: "left" | "center";
  overlayStrength?: "none" | "light" | "medium" | "strong";
}

export interface StatsSectionContent extends SectionSettings {
  stats: Statistic[];
}

export interface SolutionsSectionContent extends SectionSettings {
  sectionLink?: Cta;
  cards: ServiceCard[];
}

export interface AboutSectionContent extends SectionSettings {
  bodyCopy: string;
  trustPoints: string[];
  cta: Cta;
  image: EditableImage;
  floatingCardEyebrow: string;
  floatingCardText: string;
}

export interface FacilitySectionContent extends SectionSettings {
  introCopy: string;
  highlights: FacilityHighlight[];
}

export interface InventorySectionContent extends SectionSettings {
  copy: string;
  benefits: string[];
  cta: Cta;
  image?: EditableImage;
}

export interface WhyIfoodItem {
  id: string;
  icon?: EditableIcon;
  title: string;
  description: string;
  isVisible: boolean;
  sortOrder: number;
}

export interface WhyIfoodSectionContent extends SectionSettings {
  items: WhyIfoodItem[];
}

export interface IndustriesSectionContent extends SectionSettings {
  industries: Industry[];
}

export interface ProcessSectionContent extends SectionSettings {
  steps: ProcessStep[];
  cta: Cta;
}

export interface PartnersSectionContent extends SectionSettings {
  supportingCopy: string;
  partners: Partner[];
  legalCaption: string;
}

export interface AffiliatesSectionContent extends SectionSettings {
  copy: string;
  affiliates: Affiliate[];
}

export interface ExpansionSectionContent extends SectionSettings {
  copy: string;
  cta: Cta;
}

export interface InquirySectionContent extends SectionSettings {
  copy: string;
  reassurancePoints: string[];
  submitLabel: string;
  reassuranceCopy: string;
  successMessage: string;
  errorMessage: string;
}

export interface FaqSectionContent extends SectionSettings {
  items: FaqItem[];
}

export interface FooterContent {
  logo: EditableImage;
  operatedByLine: string;
  address: string;
  contact: ContactDetails;
  quickLinks: Cta[];
  statement: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface LandingPageContent {
  navItems: NavItem[];
  headerCta: Cta;
  hero: HeroContent;
  stats: StatsSectionContent;
  solutions: SolutionsSectionContent;
  about: AboutSectionContent;
  facility: FacilitySectionContent;
  inventory: InventorySectionContent;
  whyIfood: WhyIfoodSectionContent;
  industries: IndustriesSectionContent;
  process: ProcessSectionContent;
  partners: PartnersSectionContent;
  affiliates: AffiliatesSectionContent;
  expansion: ExpansionSectionContent;
  inquiry: InquirySectionContent;
  faq: FaqSectionContent;
  footer: FooterContent;
}
