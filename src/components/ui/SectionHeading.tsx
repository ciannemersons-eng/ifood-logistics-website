import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  heading,
  supportingCopy,
  align = "left",
  theme = "white",
}: {
  eyebrow?: string;
  heading?: string;
  supportingCopy?: string;
  align?: "left" | "center";
  theme?: "white" | "lightBlue" | "darkBlue";
}) {
  const isDark = theme === "darkBlue";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 font-display text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm",
            isDark ? "text-ifood-lightBlue" : "text-ifood-mediumBlue",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      {heading ? (
        <h2
          className={cn(
            "whitespace-pre-line font-display text-[clamp(1.75rem,1.4rem+1.6vw,3rem)] font-bold leading-tight",
            isDark ? "text-white" : "text-ifood-darkBlue",
          )}
        >
          {heading}
        </h2>
      ) : null}
      {supportingCopy ? (
        <p
          className={cn(
            "mt-4 font-body text-base leading-relaxed sm:text-lg",
            isDark ? "text-ifood-lightBlue/90" : "text-ifood-gray",
          )}
        >
          {supportingCopy}
        </p>
      ) : null}
    </div>
  );
}
