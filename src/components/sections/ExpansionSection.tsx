import type { ExpansionSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhilippinesMapWatermark } from "@/components/ui/PhilippinesMapWatermark";

export function ExpansionSection({ content }: { content: ExpansionSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "expansion"} className="bg-white py-14 sm:py-16">
      <Container>
        <Reveal variant="card">
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-card border border-ifood-lightBlue/40 bg-[#F5FBFF] p-8 transition-shadow duration-200 hover:shadow-soft sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <PhilippinesMapWatermark className="pointer-events-none absolute -right-8 top-1/2 h-[340px] w-auto -translate-y-1/2 text-white opacity-20 sm:-right-6 sm:h-[420px]" />

            <div className="relative max-w-2xl">
              {content.eyebrow ? (
                <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ifood-mediumBlue">
                  {content.eyebrow}
                </p>
              ) : null}
              {content.heading ? (
                <h2 className="font-display text-2xl font-bold text-ifood-darkBlue sm:text-3xl">{content.heading}</h2>
              ) : null}
              <div className="mt-3 space-y-3 font-body text-sm leading-relaxed text-ifood-gray sm:text-base">
                {content.copy.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            {content.cta.isVisible !== false ? (
              <Button href={content.cta.href} className="relative shrink-0">
                {content.cta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
