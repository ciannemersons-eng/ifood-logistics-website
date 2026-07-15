import type { IndustriesSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditableIcon } from "@/components/ui/EditableIcon";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";

export function IndustriesSection({ content }: { content: IndustriesSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "industries"} className="bg-[#F5FBFF] py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} heading={content.heading} align="center" />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {content.industries.map((industry, index) => (
            <Reveal key={industry.id} variant="card" delayMs={(index % 4) * 60}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-card border border-ifood-gray/10 bg-white p-6 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-soft">
                {industry.image ? (
                  <ResponsiveImage image={industry.image} className="h-14 w-14 rounded-full" fill />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ifood-lightBlue/30 text-ifood-royalBlue transition-colors duration-200 group-hover:bg-ifood-lightBlue/50">
                    <EditableIcon icon={industry.icon} size={22} />
                  </div>
                )}
                <p className="font-body text-sm font-medium text-ifood-black">{industry.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
