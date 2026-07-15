import Image from "next/image";
import { iconMap } from "@/lib/icons/iconMap";
import type { EditableIcon as EditableIconType } from "@/types/content";
import { cn } from "@/lib/utils/cn";

/**
 * Renders either a curated Lucide icon (selected by key) or an uploaded
 * SVG/PNG asset. Never dynamically imports based on arbitrary CMS input.
 */
export function EditableIcon({
  icon,
  className,
  size = 24,
}: {
  icon?: EditableIconType;
  className?: string;
  size?: number;
}) {
  if (!icon) return null;

  if (icon.mode === "upload" && icon.uploadedAsset?.url) {
    return (
      <Image
        src={icon.uploadedAsset.url}
        alt={icon.uploadedAsset.alt || ""}
        width={size}
        height={size}
        className={cn("object-contain", className)}
      />
    );
  }

  if (icon.mode === "library" && icon.libraryKey && icon.libraryKey in iconMap) {
    const LucideIcon = iconMap[icon.libraryKey];
    return <LucideIcon size={size} className={className} aria-hidden="true" />;
  }

  return null;
}
