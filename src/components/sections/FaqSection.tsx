"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({ content }: { content: FaqSectionContent }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!content.isVisible) return null;

  return (
    <section id={content.anchorId || "faq"} className="bg-white py-16 sm:py-20 lg:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={content.eyebrow} heading={content.heading} align="center" />

        <div className="mt-10 divide-y divide-ifood-gray/10 rounded-card border border-ifood-gray/10">
          {content.items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-medium text-ifood-darkBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-ifood-royalBlue sm:px-6"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      className={`shrink-0 text-ifood-mediumBlue transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-4 font-body text-sm leading-relaxed text-ifood-gray sm:px-6 sm:text-base"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
