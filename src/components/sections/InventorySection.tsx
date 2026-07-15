import { CheckCircle2 } from "lucide-react";
import type { InventorySectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export function InventorySection({ content }: { content: InventorySectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "inventory"} className="bg-ifood-darkBlue py-16 text-white sm:py-20 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <ResponsiveImage
            image={content.image}
            className="aspect-[4/3] rounded-card"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        <div className="order-1 lg:order-2">
          {content.eyebrow ? (
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ifood-lightBlue sm:text-sm">
              {content.eyebrow}
            </p>
          ) : null}
          {content.heading ? (
            <h2 className="font-display text-[clamp(1.75rem,1.4rem+1.6vw,3rem)] font-bold leading-tight text-white">
              {content.heading}
            </h2>
          ) : null}
          <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-ifood-lightBlue/90">
            {content.copy.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 font-body text-sm text-white/90">
                <CheckCircle2 className="mt-0.5 shrink-0 text-ifood-lightBlue" size={18} aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          {content.cta.isVisible !== false ? (
            <Button href={content.cta.href} variant="secondary" className="mt-8">
              {content.cta.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
