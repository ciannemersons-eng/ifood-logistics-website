import Link from "next/link";
import type { SolutionsSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditableIcon } from "@/components/ui/EditableIcon";

export function SolutionsSection({ content }: { content: SolutionsSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "solutions"} className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={content.eyebrow} heading={content.heading} />
          <div className="max-w-sm lg:text-right">
            {content.supportingCopy ? (
              <p className="font-body text-sm leading-relaxed text-ifood-gray sm:text-base">
                {content.supportingCopy}
              </p>
            ) : null}
            {content.sectionLink?.isVisible !== false && content.sectionLink ? (
              <Link
                href={content.sectionLink.href}
                className="mt-3 inline-block font-display text-sm font-semibold text-ifood-mediumBlue hover:underline"
              >
                {content.sectionLink.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col rounded-card border border-ifood-gray/10 bg-white p-6 shadow-card transition-transform duration-200 hover:-translate-y-1"
            >
              <div
                className={
                  card.accentBackground
                    ? "mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-ifood-lightBlue/30 text-ifood-royalBlue"
                    : "mb-4 flex h-12 w-12 items-center justify-center text-ifood-royalBlue"
                }
              >
                <EditableIcon icon={card.icon} size={26} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ifood-darkBlue">{card.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ifood-gray">{card.description}</p>
              {card.link ? (
                <Link
                  href={card.link}
                  className="mt-4 font-display text-sm font-semibold text-ifood-mediumBlue hover:underline"
                >
                  Learn more →
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
