import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function Alert({
  variant = "info",
  children,
}: {
  variant?: "info" | "success" | "error";
  children: ReactNode;
}) {
  const variantClasses = {
    info: "bg-ifood-lightBlue/30 text-ifood-darkBlue border-ifood-lightBlue",
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
  } as const;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "rounded-[10px] border px-4 py-3 font-body text-sm",
        variantClasses[variant],
      )}
    >
      {children}
    </div>
  );
}
