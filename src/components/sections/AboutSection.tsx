import type { AboutSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2 } from "lucide-react";

export function AboutSection({ content }: { content: AboutSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "about"} className="bg-white py-16 sm:py-20 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div>
            {content.eyebrow ? (
              <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ifood-mediumBlue sm:text-sm">
                {content.eyebrow}
              </p>
            ) : null}
            {content.heading ? (
              <h2 className="whitespace-pre-line font-display text-[clamp(1.75rem,1.4rem+1.6vw,3rem)] font-bold leading-tight text-ifood-darkBlue">
                {content.heading}
              </h2>
            ) : null}
            <div className="mt-5 space-y-4 font-body text-base leading-relaxed text-ifood-gray">
              {content.bodyCopy.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {content.trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 font-body text-sm text-ifood-black sm:text-base">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-ifood-mediumBlue" size={20} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {content.cta.isVisible !== false ? (
              <Button href={content.cta.href} className="mt-8">
                {content.cta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>

        <Reveal variant="card" delayMs={120} className="order-1 lg:order-2">
          <div className="relative">
            <ResponsiveImage image={content.image} className="aspect-[4/5] rounded-card" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute -bottom-6 left-6 max-w-[220px] rounded-card bg-white p-5 shadow-soft sm:left-8">
              <p className="font-display text-2xl font-bold text-ifood-darkBlue">{content.floatingCardEyebrow}</p>
              <p className="mt-1 font-body text-sm text-ifood-gray">{content.floatingCardText}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
