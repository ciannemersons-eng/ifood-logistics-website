import type { StatsSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { EditableIcon } from "@/components/ui/EditableIcon";

export function StatsSection({ content }: { content: StatsSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <div className="relative z-10 -mt-16 px-5 sm:-mt-20 sm:px-6 lg:-mt-24 lg:px-8">
      <Container className="px-0">
        <div className="grid grid-cols-2 gap-6 rounded-card border border-ifood-lightBlue/30 bg-white p-6 shadow-soft sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-ifood-gray/10 lg:gap-0 lg:p-8">
          {content.stats.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className={
                index === content.stats.length - 1 && content.stats.length % 2 === 1
                  ? "col-span-2 flex flex-col items-center gap-2 text-center sm:col-span-1 lg:px-4"
                  : "flex flex-col items-center gap-2 text-center lg:px-4"
              }
            >
              {stat.icon ? <EditableIcon icon={stat.icon} className="text-ifood-mediumBlue" size={28} /> : null}
              <p className="font-display text-[clamp(1.5rem,1.3rem+1vw,2.6rem)] font-bold text-ifood-darkBlue">
                {stat.value}
              </p>
              <p className="font-body text-xs text-ifood-gray sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
