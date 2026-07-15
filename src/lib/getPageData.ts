import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery, landingPageQuery } from "@/lib/sanity/queries";
import { fallbackContent, fallbackSiteSettings } from "@/content/fallbackContent";
import type { LandingPageContent, SiteSettings, Partner, Affiliate } from "@/types/content";

/**
 * Deep-merges Sanity data over fallback content. Sanity may return partial
 * documents (fields not yet filled in) so we never want a raw null/undefined
 * field to blank out working fallback copy in production.
 */
function mergeSection<T>(fallback: T, fromCms: Partial<T> | null | undefined): T {
  if (!fromCms) return fallback;
  const merged: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };
  for (const [key, value] of Object.entries(fromCms)) {
    if (value !== null && value !== undefined) {
      merged[key] = value;
    }
  }
  return merged as T;
}

function onlyPublishablePartners(partners: Partner[] | undefined, fallback: Partner[]): Partner[] {
  const source = partners && partners.length > 0 ? partners : fallback;
  return source.filter((p) => p.approvedForPublication && p.isVisible);
}

function onlyPublishableAffiliates(affiliates: Affiliate[] | undefined, fallback: Affiliate[]): Affiliate[] {
  const source = affiliates && affiliates.length > 0 ? affiliates : fallback;
  return source.filter((a) => a.approvedForPublication && a.isVisible);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const cms = await sanityFetch<Partial<SiteSettings>>(siteSettingsQuery);
  return mergeSection(fallbackSiteSettings, cms);
}

export async function getLandingPageContent(): Promise<LandingPageContent> {
  const cms = await sanityFetch<Partial<LandingPageContent>>(landingPageQuery);

  const merged: LandingPageContent = {
    ...fallbackContent,
    ...(cms
      ? {
          navItems: cms.navItems?.length ? cms.navItems : fallbackContent.navItems,
          headerCta: cms.headerCta ?? fallbackContent.headerCta,
          hero: mergeSection(fallbackContent.hero, cms.hero),
          stats: mergeSection(fallbackContent.stats, cms.stats),
          solutions: mergeSection(fallbackContent.solutions, cms.solutions),
          about: mergeSection(fallbackContent.about, cms.about),
          facility: mergeSection(fallbackContent.facility, cms.facility),
          inventory: mergeSection(fallbackContent.inventory, cms.inventory),
          whyIfood: mergeSection(fallbackContent.whyIfood, cms.whyIfood),
          industries: mergeSection(fallbackContent.industries, cms.industries),
          process: mergeSection(fallbackContent.process, cms.process),
          partners: mergeSection(fallbackContent.partners, cms.partners),
          affiliates: mergeSection(fallbackContent.affiliates, cms.affiliates),
          expansion: mergeSection(fallbackContent.expansion, cms.expansion),
          inquiry: mergeSection(fallbackContent.inquiry, cms.inquiry),
          faq: mergeSection(fallbackContent.faq, cms.faq),
        }
      : {}),
  };

  // Enforce the partner/affiliate publication rule regardless of source.
  merged.partners.partners = onlyPublishablePartners(cms?.partners?.partners, fallbackContent.partners.partners);
  merged.affiliates.affiliates = onlyPublishableAffiliates(
    cms?.affiliates?.affiliates,
    fallbackContent.affiliates.affiliates,
  );

  // Only keep visible items in editable collections.
  merged.solutions.cards = merged.solutions.cards.filter((c) => c.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);
  merged.facility.highlights = merged.facility.highlights
    .filter((h) => h.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  merged.industries.industries = merged.industries.industries
    .filter((i) => i.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  merged.process.steps = merged.process.steps.filter((s) => s.isVisible).sort((a, b) => a.stepNumber - b.stepNumber);
  merged.whyIfood.items = merged.whyIfood.items.filter((i) => i.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);
  merged.faq.items = merged.faq.items.filter((f) => f.isVisible).sort((a, b) => a.sortOrder - b.sortOrder);

  return merged;
}
