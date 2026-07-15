import type { AffiliatesSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function AffiliatesSection({ content }: { content: AffiliatesSectionContent }) {
  if (!content.isVisible || content.affiliates.length === 0) return null;

  return (
    <section id={content.anchorId || "affiliates"} className="bg-[#F5FBFF] py-14 sm:py-16">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-1">
              <SectionHeading heading={content.heading} />
            </div>
            <div className="lg:col-span-2">
              <p className="font-body text-sm leading-relaxed text-ifood-gray sm:text-base">{content.copy}</p>
              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {content.affiliates.map((affiliate) => (
                  <li key={affiliate.id} className="font-body text-sm text-ifood-black">
                    {affiliate.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
