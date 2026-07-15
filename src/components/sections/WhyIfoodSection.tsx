import type { WhyIfoodSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditableIcon } from "@/components/ui/EditableIcon";
import { Reveal } from "@/components/ui/Reveal";

export function WhyIfoodSection({ content }: { content: WhyIfoodSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "why-ifood"} className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} heading={content.heading} align="center" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <Reveal key={item.id} delayMs={(index % 3) * 80}>
              <div className="group flex flex-col items-start gap-3 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-ifood-lightBlue/30 text-ifood-royalBlue transition-colors duration-200 group-hover:bg-ifood-lightBlue/50">
                  <EditableIcon icon={item.icon} size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-ifood-darkBlue">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-ifood-gray">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
