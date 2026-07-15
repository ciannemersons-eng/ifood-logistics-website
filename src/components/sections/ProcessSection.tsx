import type { ProcessSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSection({ content }: { content: ProcessSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "process"} className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} heading={content.heading} align="center" />
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {content.steps.map((step, index) => (
            <li key={step.id} className="relative flex h-full flex-col items-center text-center lg:items-start lg:text-left">
              <Reveal delayMs={index * 90} className="flex h-full flex-col items-center lg:items-start">
                {index < content.steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-6 hidden h-px w-full bg-ifood-lightBlue lg:block"
                  />
                ) : null}
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ifood-darkBlue font-display text-lg font-bold text-white transition-transform duration-200 hover:scale-110">
                  {step.stepNumber}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ifood-darkBlue">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ifood-gray">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        {content.cta.isVisible !== false ? (
          <div className="mt-12 flex justify-center">
            <Button href={content.cta.href}>{content.cta.label}</Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
