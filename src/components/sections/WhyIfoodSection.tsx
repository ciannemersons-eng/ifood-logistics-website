import type { WhyIfoodSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditableIcon } from "@/components/ui/EditableIcon";

export function WhyIfoodSection({ content }: { content: WhyIfoodSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "why-ifood"} className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} heading={content.heading} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <div key={item.id} className="flex flex-col items-start gap-3 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-ifood-lightBlue/30 text-ifood-royalBlue">
                <EditableIcon icon={item.icon} size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ifood-darkBlue">{item.title}</h3>
              <p className="font-body text-sm leading-relaxed text-ifood-gray">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
