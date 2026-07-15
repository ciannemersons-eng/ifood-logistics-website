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

export const revalidate = 300;

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
