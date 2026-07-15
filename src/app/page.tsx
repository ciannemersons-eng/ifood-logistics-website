import { getLandingPageContent, getSiteSettings } from "@/lib/getPageData";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FacilitySection } from "@/components/sections/FacilitySection";
import { InventorySection } from "@/components/sections/InventorySection";
import { WhyIfoodSection } from "@/components/sections/WhyIfoodSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { AffiliatesSection } from "@/components/sections/AffiliatesSection";
import { ExpansionSection } from "@/components/sections/ExpansionSection";
import { InquirySection } from "@/components/sections/InquirySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { StructuredData } from "@/components/StructuredData";

// In production this caches the rendered page for 5 minutes so we're not
// hitting Sanity on every request. In development we always fetch fresh so
// content edits in Sanity Studio show up on refresh without restarting the
// dev server.
export const revalidate = process.env.NODE_ENV === "production" ? 300 : 0;

export default async function HomePage() {
  const [site, content] = await Promise.all([getSiteSettings(), getLandingPageContent()]);

  return (
    <>
      <StructuredData site={site} faq={content.faq} />
      <Header logo={site.logo} navItems={content.navItems} cta={content.headerCta} />
      <main id="main-content">
        <HeroSection content={content.hero} />
        <StatsSection content={content.stats} />
        <SolutionsSection content={content.solutions} />
        <AboutSection content={content.about} />
        <FacilitySection content={content.facility} />
        <InventorySection content={content.inventory} />
        <WhyIfoodSection content={content.whyIfood} />
        <IndustriesSection content={content.industries} />
        <ProcessSection content={content.process} />
        <PartnersSection content={content.partners} />
        <AffiliatesSection content={content.affiliates} />
        <ExpansionSection content={content.expansion} />
        <InquirySection content={content.inquiry} />
        <FaqSection content={content.faq} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
