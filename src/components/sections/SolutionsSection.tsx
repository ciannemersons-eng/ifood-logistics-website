"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceCard, SolutionsSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditableIcon } from "@/components/ui/EditableIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";

export function SolutionsSection({ content }: { content: SolutionsSectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "solutions"} className="bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
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
        </Reveal>

        <Reveal delayMs={100}>
          <SolutionsCarousel cards={content.cards} />
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * A "merry-go-round" style 3D coverflow carousel: a forward-facing card sits
 * center stage while the rest fan out and recede in perspective on either
 * side, rotated as if wrapped around a wheel. Navigation wraps continuously
 * in both directions — like an actual merry-go-round, there's no first or
 * last card — driven by the prev/next controls, the dot indicators, clicking
 * a side card, or arrow keys. There is deliberately no auto-advance timer,
 * so nothing moves on its own (WCAG 2.2.2 is satisfied trivially rather than
 * needing a pause control).
 */
function SolutionsCarousel({ cards }: { cards: ServiceCard[] }) {
  const visibleCards = cards.filter((card) => card.isVisible);
  const count = visibleCards.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  if (count === 0) return null;

  return (
    <div className="mt-12">
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our solutions"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative h-[380px] overflow-hidden rounded-card border border-ifood-gray/10 bg-[#F5FBFF] outline-none focus-visible:ring-2 focus-visible:ring-ifood-lightBlue focus-visible:ring-offset-2 sm:h-[420px]"
        style={{ perspective: "1600px" }}
      >
        {visibleCards.map((card, index) => {
          let delta = index - activeIndex;
          if (delta > count / 2) delta -= count;
          if (delta < -count / 2) delta += count;
          const distance = Math.abs(delta);
          const isActive = delta === 0;
          const isShown = distance <= 2;

          return (
            <div
              key={card.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${card.title}`}
              aria-hidden={!isShown}
              onClick={() => !isActive && goTo(index)}
              className={cn(
                "absolute left-1/2 top-1/2 flex h-[300px] w-56 flex-col rounded-card border bg-white p-6 text-left shadow-soft transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none sm:h-[340px] sm:w-64",
                isActive ? "border-ifood-lightBlue" : "cursor-pointer border-ifood-gray/10",
                !isShown && "pointer-events-none",
              )}
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${delta} * clamp(5.5rem, 16vw, 9.5rem))) translateZ(${-distance * 70}px) rotateY(${delta * -28}deg) scale(${Math.max(1 - distance * 0.14, 0.68)})`,
                opacity: isShown ? Math.max(1 - distance * 0.3, 0.35) : 0,
                zIndex: 100 - distance,
              }}
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
              <p className="mt-2 line-clamp-4 font-body text-sm leading-relaxed text-ifood-gray">
                {card.description}
              </p>
              {card.link && isActive ? (
                <Link
                  href={card.link}
                  onClick={(event) => event.stopPropagation()}
                  className="mt-auto pt-4 font-display text-sm font-semibold text-ifood-mediumBlue hover:underline"
                >
                  Learn more →
                </Link>
              ) : null}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous solution"
          className="absolute left-3 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ifood-darkBlue shadow-soft transition-all hover:-translate-x-0.5 hover:bg-white"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next solution"
          className="absolute right-3 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ifood-darkBlue shadow-soft transition-all hover:translate-x-0.5 hover:bg-white"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {visibleCards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to solution ${index + 1}: ${card.title}`}
            aria-current={index === activeIndex}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === activeIndex ? "w-6 bg-ifood-royalBlue" : "w-2 bg-ifood-gray/25 hover:bg-ifood-gray/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
