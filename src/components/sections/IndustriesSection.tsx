"use client";

import { useEffect, useRef, useState } from "react";
import type { Industry, IndustriesSectionContent } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditableIcon } from "@/components/ui/EditableIcon";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";

export function IndustriesSection({ content }: { content: IndustriesSectionContent }) {
  const industries = content.industries.filter((industry) => industry.isVisible);
  if (!content.isVisible || industries.length === 0) return null;

  return (
    <section id={content.anchorId || "industries"} className="bg-[#F5FBFF] py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            heading={content.heading}
            supportingCopy={content.supportingCopy}
            align="center"
          />
        </Reveal>

        <SupplyChainRoute industries={industries} />
      </Container>
    </section>
  );
}

/**
 * Lays every node out on a 4-column "snake" grid: row 0 runs left-to-right,
 * row 1 runs right-to-left, row 2 (if ever needed) runs left-to-right again,
 * and so on. This is what turns a flat list into a visual supply-chain
 * route without hardcoding the exact 7 industries — it degrades sensibly
 * for any count content editors provide. An odd row that's short a node
 * (like row 1 here, with only 3 of 4 slots filled) leaves the gap on the
 * leading edge, which is exactly the empty corner the route curves around.
 */
const COLUMNS = 4;
const VIEW_WIDTH = 1000;
const ROW_HEIGHT = 190;
const ROW_MARGIN = 135;
const UNDULATION = 16;

type NodePoint = { x: number; y: number; row: number; col: number };

function getNodePositions(count: number): NodePoint[] {
  return Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / COLUMNS);
    const indexInRow = index % COLUMNS;
    const isReversed = row % 2 === 1;
    const col = isReversed ? COLUMNS - 1 - indexInRow : indexInRow;
    const x = (col + 0.5) * (VIEW_WIDTH / COLUMNS);
    const y = ROW_MARGIN + row * ROW_HEIGHT + (col % 2 === 0 ? -UNDULATION : UNDULATION);
    return { x, y, row, col };
  });
}

/**
 * Connects the node centers with smooth cubic-bezier segments. Same-row
 * transitions get gentle horizontal curves; the transition between rows
 * gets an outward "swoop" (control points bulge toward whichever edge the
 * turn happens on) so the route reads as one continuous curved path rather
 * than a harsh right-angle turn.
 *
 * The route then closes itself: a final segment loops from the last node
 * back to the first, bulging out past the left edge (through the empty
 * corner the snake layout leaves behind). That turns the diagram from a
 * one-way line into a closed loop — reading as a "chain" rather than a
 * start-to-finish flow, which fits the cold-chain framing. Because it's
 * appended to the same path string, it draws in as part of the same single
 * stroke animation instead of a separate element.
 */
function buildRouteD(points: NodePoint[]): string {
  const first = points[0];
  if (!first) return "";
  const parts = [`M${first.x},${first.y}`];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    if (!prev || !curr) continue;
    if (curr.row === prev.row) {
      const dx = (curr.x - prev.x) / 3;
      parts.push(`C${prev.x + dx},${prev.y} ${curr.x - dx},${curr.y} ${curr.x},${curr.y}`);
    } else {
      const bulge = curr.x > VIEW_WIDTH / 2 ? 70 : -70;
      const dy = (curr.y - prev.y) / 3;
      parts.push(`C${prev.x + bulge},${prev.y + dy} ${curr.x + bulge},${curr.y - dy} ${curr.x},${curr.y}`);
    }
  }
  if (points.length > 2) {
    const last = points[points.length - 1]!;
    const bulgeX = Math.min(first.x, last.x) - 90;
    const dy = (first.y - last.y) / 3;
    parts.push(`C${bulgeX},${last.y + dy} ${bulgeX},${first.y - dy} ${first.x},${first.y}`);
  }
  return parts.join(" ");
}

function SupplyChainRoute({ industries }: { industries: Industry[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const positions = getNodePositions(industries.length);
  const rows = positions.length > 0 ? positions[positions.length - 1]!.row + 1 : 1;
  const viewHeight = ROW_MARGIN * 2 + (rows - 1) * ROW_HEIGHT;
  const routeD = buildRouteD(positions);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, [routeD]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop / large tablet: curved supply-chain route */}
      <div ref={rootRef} className="relative mt-16 hidden lg:block">
        <ol
          className="relative w-full"
          style={{ aspectRatio: `${VIEW_WIDTH} / ${viewHeight}` }}
        >
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${viewHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              ref={pathRef}
              d={routeD}
              fill="none"
              stroke="#99E2FE"
              strokeWidth={3}
              strokeLinecap="round"
              style={{
                strokeDasharray: pathLength || undefined,
                strokeDashoffset: reducedMotion ? 0 : isInView ? 0 : pathLength,
                transition: reducedMotion ? "none" : "stroke-dashoffset 1.6s cubic-bezier(0.65,0,0.35,1)",
              }}
            />
            {positions.map((point, index) => (
              <circle key={index} cx={point.x} cy={point.y} r={7} fill="#00459F" />
            ))}
          </svg>

          {industries.map((industry, index) => {
            const point = positions[index]!;
            return (
              <li
                key={industry.id}
                className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2 xl:w-[172px]"
                style={{ left: `${(point.x / VIEW_WIDTH) * 100}%`, top: `${(point.y / viewHeight) * 100}%` }}
              >
                <Reveal variant="card" delayMs={index * 90}>
                  <IndustryCard industry={industry} stepNumber={index + 1} />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobile / tablet: vertical timeline fallback */}
      <ol className="relative mt-12 flex flex-col gap-6 lg:hidden">
        <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-ifood-lightBlue" />
        {industries.map((industry, index) => (
          <li key={industry.id}>
            <Reveal delayMs={index * 60} className="flex items-center gap-4">
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ifood-darkBlue shadow-soft">
                <IndustryIcon industry={industry} />
              </span>
              <div className="flex-1 rounded-card border border-ifood-gray/10 bg-white px-4 py-3 shadow-card">
                <p className="font-display text-sm font-semibold text-ifood-darkBlue">{industry.name}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}

function IndustryIcon({ industry }: { industry: Industry }) {
  if (industry.image?.url) {
    return <ResponsiveImage image={industry.image} className="h-full w-full rounded-full" />;
  }
  return <EditableIcon icon={industry.icon} size={20} className="text-white" />;
}

function IndustryCard({ industry, stepNumber }: { industry: Industry; stepNumber: number }) {
  return (
    <div className="group relative flex flex-col items-center gap-3 rounded-card border border-ifood-gray/10 bg-white px-4 py-5 text-center shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-ifood-lightBlue/60 hover:shadow-soft">
      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ifood-mediumBlue font-display text-[10px] font-bold text-white shadow-soft">
        {String(stepNumber).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ifood-darkBlue transition-transform duration-200 group-hover:scale-110",
        )}
      >
        <IndustryIcon industry={industry} />
      </span>
      <p className="font-display text-xs font-semibold leading-snug text-ifood-darkBlue xl:text-sm">
        {industry.name}
      </p>
    </div>
  );
}
