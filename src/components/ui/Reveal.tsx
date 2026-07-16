"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Wraps children in a short fade/upward reveal the first time they enter
 * the viewport. Respects prefers-reduced-motion (handled globally in
 * globals.css, which zeroes animation durations) and never hides content
 * from assistive tech — it only affects opacity/transform, not presence.
 *
 * `delayMs` lets grids of cards stagger their reveal slightly (e.g. 0, 80,
 * 160...) for a more polished feel without becoming a "busy" effect.
 * `variant="card"` adds a touch of scale for card-shaped content; `variant=
 * "slide-right"` slides in from the right (e.g. the fleet truck graphic);
 * the default "fade" variant is a plain upward fade for headings/text blocks.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
  variant = "fade",
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: "fade" | "card" | "slide-right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const variantAnimationClass =
    variant === "card" ? "animate-card-in" : variant === "slide-right" ? "animate-slide-in-right" : "animate-fade-up";

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && variantAnimationClass,
        "motion-reduce:animate-none motion-reduce:opacity-100",
        className,
      )}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
