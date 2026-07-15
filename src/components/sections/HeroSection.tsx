import Image from "next/image";
import type { HeroContent } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection({ content }: { content: HeroContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "home"} className="relative isolate flex min-h-[680px] items-center overflow-hidden pt-20 lg:min-h-[760px]">
      <div className="absolute inset-0 -z-10">
        {content.image?.url ? (
          <Image
            src={content.image.url}
            alt={content.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-ifood-darkBlue" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" aria-hidden="true" />
        {content.image?.darkOverlay ? (
          <div className="absolute inset-0 bg-ifood-darkBlue/30" aria-hidden="true" />
        ) : null}
      </div>

      <Container className="pb-24 pt-10 sm:pb-32">
        <div className={content.textAlign === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
          <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.16em] text-ifood-mediumBlue sm:text-sm">
            {content.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2rem,1.4rem+3vw,4.5rem)] font-bold leading-[1.05]">
            <span className="block text-ifood-darkBlue">{content.headlineLine1}</span>
            <span className="block text-ifood-mediumBlue">{content.headlineLine2}</span>
          </h1>
          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-ifood-gray sm:text-lg">
            {content.supportingCopy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {content.primaryCta.isVisible !== false ? (
              <Button href={content.primaryCta.href} variant="primary">
                {content.primaryCta.label}
              </Button>
            ) : null}
            {content.secondaryCta.isVisible !== false ? (
              <Button href={content.secondaryCta.href} variant="ghost">
                {content.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
