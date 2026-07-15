import type { FacilitySectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { EditableIcon } from "@/components/ui/EditableIcon";

export function FacilitySection({ content }: { content: FacilitySectionContent }) {
  if (!content.isVisible) return null;

  const [featured, ...rest] = content.highlights;

  return (
    <section id={content.anchorId || "facility"} className="bg-[#F5FBFF] py-16 sm:py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} heading={content.heading} align="left" />
        {content.introCopy ? (
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ifood-gray">{content.introCopy}</p>
        ) : null}

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {featured ? (
            <article className="relative overflow-hidden rounded-card shadow-card lg:col-span-2">
              <ResponsiveImage image={featured.image} className="aspect-[16/10] h-full w-full" priority />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ifood-darkBlue/85 to-transparent p-6">
                <div className="flex items-center gap-2 text-ifood-lightBlue">
                  <EditableIcon icon={featured.icon} size={20} />
                  {featured.technicalValue ? (
                    <span className="font-display text-sm font-semibold">{featured.technicalValue}</span>
                  ) : null}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold text-white">{featured.title}</h3>
                <p className="mt-1 max-w-md font-body text-sm text-white/85">{featured.description}</p>
              </div>
            </article>
          ) : null}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 2).map((highlight) => (
              <FacilityCard key={highlight.id} highlight={highlight} />
            ))}
          </div>
        </div>

        {rest.length > 2 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rest.slice(2).map((highlight) => (
              <FacilityCard key={highlight.id} highlight={highlight} compact />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function FacilityCard({
  highlight,
  compact = false,
}: {
  highlight: FacilitySectionContent["highlights"][number];
  compact?: boolean;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-ifood-gray/10 bg-white shadow-card">
      <ResponsiveImage image={highlight.image} className={compact ? "aspect-[4/3]" : "aspect-[16/10]"} />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-ifood-royalBlue">
          <EditableIcon icon={highlight.icon} size={20} />
          {highlight.technicalValue ? (
            <span className="font-display text-xs font-semibold uppercase tracking-wide">
              {highlight.technicalValue}
            </span>
          ) : null}
        </div>
        <h3 className="font-display text-base font-semibold text-ifood-darkBlue">{highlight.title}</h3>
        <p className="mt-1 font-body text-sm leading-relaxed text-ifood-gray">{highlight.description}</p>
      </div>
    </article>
  );
}
