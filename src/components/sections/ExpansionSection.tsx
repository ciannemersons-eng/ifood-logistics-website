import Image from "next/image";
import type { ExpansionSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ExpansionSection({ content }: { content: ExpansionSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "expansion"} className="bg-white py-14 sm:py-16">
      <Container>
        <Reveal variant="card">
          <div className="relative flex flex-col items-start gap-6 rounded-card border border-ifood-lightBlue/40 bg-[#F5FBFF] p-8 transition-shadow duration-200 hover:shadow-soft sm:p-10 lg:flex-row lg:items-center">
            {/*
              navy-ph.png is white-ph.png with every opaque pixel recolored
              to brand navy (#042B65) server-side, alpha channel untouched.
              That replaced an earlier CSS mask-image approach: masking a
              raster image to a solid color depends on mask-image browser
              support/prefixing that turned out unreliable in practice (the
              map didn't render at all), whereas a plain pre-colored PNG
              always renders. It's taller than the card and not clipped, so
              it bleeds past the bottom edge onto the page background.
            */}
            <Image
              src="/images/navy-ph.png"
              alt=""
              aria-hidden="true"
              width={663}
              height={948}
              className="pointer-events-none absolute mr-12 -right-4 -top-6 h-[380px] w-auto object-contain sm:-right-2 sm:h-[460px] lg:-right-6"
            />

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
              {content.cta.isVisible !== false ? (
                <Button href={content.cta.href} className="relative mt-6 inline-flex">
                  {content.cta.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  