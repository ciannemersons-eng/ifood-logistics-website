"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FacilityHighlight, FacilitySectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { EditableIcon } from "@/components/ui/EditableIcon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";

export function FacilitySection({ content }: { content: FacilitySectionContent }) {
  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "facility"} className="bg-[#F5FBFF] py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} heading={content.heading} align="left" />
          {content.introCopy ? (
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ifood-gray">{content.introCopy}</p>
          ) : null}
        </Reveal>

        <Reveal delayMs={100}>
          <FacilityGallery highlights={content.highlights} />
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Steam store page style media gallery: one large featured item on top
 * (the "stage") with a scrollable strip of thumbnails below it. Clicking or
 * keyboard-navigating a thumbnail swaps the stage content. Unlike the
 * previous scroll-tracked carousel, the active item here is driven purely by
 * click/keyboard state, not by measuring layout — so there's no possibility
 * of a resize-triggers-detection-triggers-resize feedback loop.
 */
function FacilityGallery({ highlights }: { highlights: FacilityHighlight[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const goTo = useCallback(
    (index: number, focusThumb = false) => {
      const clamped = Math.max(0, Math.min(index, highlights.length - 1));
      setActiveIndex(clamped);
      const thumb = thumbRefs.current[clamped];
      thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      if (focusThumb) thumb?.focus();
    },
    [highlights.length],
  );

  const onThumbKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(highlights.length - 1, true);
    }
  };

  if (highlights.length === 0) return null;

  const active = highlights[activeIndex] ?? highlights[0];
  if (!active) return null;
  const stagePanelId = "facility-stage-panel";

  return (
    <div className="mt-12">
      <div
        id={stagePanelId}
        role="tabpanel"
        aria-label={`${activeIndex + 1} of ${highlights.length}: ${active.title}`}
        className="relative overflow-hidden rounded-card border border-ifood-gray/10 bg-white shadow-soft"
      >
        <div className="relative">
          <div key={`${active.id}-image`} className="animate-card-in motion-reduce:animate-none">
            <ResponsiveImage
              image={active.image}
              className="aspect-[16/9] sm:aspect-[21/9]"
              sizes="(min-width: 1024px) 900px, 100vw"
              priority
            />
          </div>

          {highlights.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous facility highlight"
                aria-controls={stagePanelId}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ifood-darkBlue shadow-soft transition-all hover:-translate-x-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === highlights.length - 1}
                aria-label="Next facility highlight"
                aria-controls={stagePanelId}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ifood-darkBlue shadow-soft transition-all hover:translate-x-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>

        <div key={`${active.id}-copy`} className="animate-fade-up motion-reduce:animate-none border-t border-ifood-gray/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-ifood-royalBlue">
            <EditableIcon icon={active.icon} size={22} />
            {active.technicalValue ? (
              <span className="font-display text-xs font-semibold uppercase tracking-wide">
                {active.technicalValue}
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold text-ifood-darkBlue">{active.title}</h3>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ifood-gray sm:text-base">
            {active.description}
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Facility highlight thumbnails"
        className="mt-4 flex gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {highlights.map((highlight, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={highlight.id}
              ref={(el) => {
                thumbRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={stagePanelId}
              aria-label={`Show highlight ${index + 1}: ${highlight.title}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => goTo(index)}
              onKeyDown={(event) => onThumbKeyDown(event, index)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 sm:h-[70px] sm:w-[104px]",
                isActive
                  ? "border-ifood-darkBlue opacity-100 ring-2 ring-ifood-lightBlue ring-offset-2 ring-offset-[#F5FBFF]"
                  : "border-transparent opacity-60 hover:opacity-90",
              )}
            >
              <ResponsiveImage image={highlight.image} className="h-full w-full" imgClassName="object-cover" sizes="120px" />
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-body text-sm text-ifood-gray" aria-hidden="true">
        {activeIndex + 1} / {highlights.length}
      </p>
    </div>
  );
}
