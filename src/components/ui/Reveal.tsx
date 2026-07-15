"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps children in a short fade/upward reveal the first time they enter
 * the viewport. Respects prefers-reduced-motion (handled globally in
 * globals.css, which zeroes animation durations) and never hides content
 * from assistive tech — it only affects opacity/transform, not presence.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
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

  return (
    <div ref={ref} className={`animate-on-view ${isVisible ? "is-visible" : ""} ${className ?? ""}`}>
      {children}
    </div>
  );
}
