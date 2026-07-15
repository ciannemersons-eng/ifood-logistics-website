import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function FormField({
  id,
  label,
  error,
  required,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-display text-sm font-medium text-ifood-darkBlue">
        {label}
        {required ? <span aria-hidden="true" className="text-ifood-mediumBlue"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="font-body text-xs text-ifood-gray">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="font-body text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClasses =
  "w-full rounded-[8px] border border-ifood-gray/30 bg-white px-4 py-2.5 font-body text-base text-ifood-black placeholder:text-ifood-gray/60 focus:border-ifood-royalBlue focus:outline-none focus:ring-2 focus:ring-ifood-royalBlue/30 min-h-[44px]";
