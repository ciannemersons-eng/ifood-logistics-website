import Image from "next/image";
import type { PartnersSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PartnersSection({ content }: { content: PartnersSectionContent }) {
  const partnersWithLogos = content.partners.filter((partner) => Boolean(partner.logo?.url));

  if (!content.isVisible || partnersWithLogos.length === 0) return null;

  return (
    <section id={content.anchorId || "partners"} className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ifood-mediumBlue sm:text-sm">
              {content.heading}
            </p>
            {content.supportingCopy ? (
              <p className="mx-auto mt-3 max-w-xl font-body text-sm text-ifood-gray sm:text-base">
                {content.supportingCopy}
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {partnersWithLogos.map((partner) => (
              <div
                key={partner.id}
                className="flex h-20 items-center justify-center rounded-card border border-ifood-gray/10 bg-white p-4 grayscale transition-all duration-200 hover:scale-105 hover:grayscale-0"
              >
                <Image
                  src={partner.logo.url}
                  alt={partner.logo.alt}
                  width={140}
                  height={70}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {content.legalCaption ? (
          <p className="mt-8 text-center font-body text-xs italic text-ifood-gray/80">{content.legalCaption}</p>
        ) : null}
      </Container>
    </section>
  );
}
