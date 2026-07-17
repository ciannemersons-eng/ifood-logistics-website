import { cn } from "@/lib/utils/cn";
import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
