import Image from "next/image";
import type { Partner, PartnersSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Splits a logo count into descending row sizes for an "upside-down
 * pyramid" — widest row on top, tapering down — while keeping every row
 * between `minRowSize` and `maxRowSize` (a lone logo, or a thin row of one
 * or two, reads as a mistake rather than a deliberate shape). e.g. 11 with
 * min 3 / max 5 -> [4, 4, 3]. Works for any partner count, not just today's
 * 11: it finds the fewest rows that fit within the min/max band, then hands
 * out the remainder one logo at a time, row by row from the top, looping
 * back around — so rows stay as evenly sized as possible (rather than
 * maxing out the top row first) while still never increasing going down.
 */
function computePyramidRows(count: number, minRowSize = 3, maxRowSize = 5): number[] {
  if (count <= 0) return [];
  if (count <= minRowSize) return [count];

  let rowCount = 1;
  while (count > rowCount * maxRowSize || count < rowCount * minRowSize) rowCount++;

  const rows: number[] = Array.from({ length: rowCount }, () => minRowSize);
  let remaining = count - rowCount * minRowSize;

  let i = 0;
  while (remaining > 0) {
    const current = rows[i] ?? minRowSize;
    if (current < maxRowSize) {
      rows[i] = current + 1;
      remaining--;
    }
    i = (i + 1) % rowCount;
  }

  return rows;
}

function groupIntoRows<T>(items: T[], rowSizes: number[]): T[][] {
  const rows: T[][] = [];
  let cursor = 0;
  for (const size of rowSizes) {
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows;
}

function PartnerLogoCard({ partner, className }: { partner: Partner; className?: string }) {
  return (
    <div
      className={`flex h-28 items-center justify-center rounded-card border border-ifood-gray/10 bg-white p-3 grayscale transition-all duration-200 hover:scale-105 hover:grayscale-0 sm:h-32 sm:p-4 ${className ?? ""}`}
    >
      <Image
        src={partner.logo.url}
        alt={partner.logo.alt}
        width={180}
        height={90}
        className="h-full w-auto object-contain"
      />
    </div>
  );
}

export function PartnersSection({ content }: { content: PartnersSectionContent }) {
  const partnersWithLogos = content.partners.filter((partner) => Boolean(partner.logo?.url));

  if (!content.isVisible || partnersWithLogos.length === 0) return null;

  const pyramidRows = groupIntoRows(partnersWithLogos, computePyramidRows(partnersWithLogos.length));

  // Slant offsets are keyed by row *size*, not row position, so any two
  // rows with the same number of logos always land at the same horizontal
  // offset as each other — only rows of a different size lean differently.
  const uniqueRowSizesDesc = Array.from(new Set(pyramidRows.map((row) => row.length))).sort((a, b) => b - a);
  const sizeRank = new Map(uniqueRowSizesDesc.map((size, index) => [size, index]));
  const rankPivot = (uniqueRowSizesDesc.length - 1) / 2;
  const SLANT_STEP_PX = 26;

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
          {/*
            Mobile/tablet: a plain centered wrap grid. An upside-down pyramid
            needs more horizontal room than small screens have to read as a
            deliberate shape rather than an odd staircase.
          */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 overflow-x-hidden p-2 lg:hidden">
            {partnersWithLogos.map((partner) => (
              <PartnerLogoCard
                key={partner.id}
                partner={partner}
                className="w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)]"
              />
            ))}
          </div>

          {/*
            Desktop: upside-down pyramid — widest row on top, tapering down
            — with a gentle overall slant: rows lean sideways based on how
            many logos they hold, pivoting around the middle row size, so
            the whole arrangement leans instead of stacking dead-center.
            Rows with the same logo count always share the same offset, so
            they stay aligned with each other. Turns an odd total (like 11)
            into a deliberate shape rather than a stray leftover logo on its
            own row.
          */}
          <div className="mt-10 hidden flex-col items-center gap-6 overflow-x-hidden p-2 lg:flex">
            {pyramidRows.map((row, rowIndex) => {
              const rank = sizeRank.get(row.length) ?? 0;
              const offsetPx = uniqueRowSizesDesc.length > 1 ? (rank - rankPivot) * SLANT_STEP_PX : 0;
              return (
                <div
                  key={rowIndex}
                  className="flex justify-center gap-6"
                  style={offsetPx ? { transform: `translateX(${offsetPx}px)` } : undefined}
                >
                  {row.map((partner) => (
                    <PartnerLogoCard key={partner.id} partner={partner} className="w-48" />
                  ))}
                </div>
              );
            })}
          </div>
        </Reveal>

        {content.legalCaption ? (
          <p className="mt-8 text-center font-body text-xs italic text-ifood-gray/80">{content.legalCaption}</p>
        ) : null}
      </Container>
    </section>
  );
}
