"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { EditableImage } from "@/types/content";

export function ResponsiveImage({
  image,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
  fill = true,
}: {
  image?: EditableImage;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  if (!image || !image.url || image.isVisible === false || errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-ifood-lightBlue/30 text-ifood-darkBlue/50",
          className,
        )}
        role="img"
        aria-label={image?.alt || "Image unavailable"}
      >
        <span className="font-display text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <picture>
        {image.mobileUrl ? (
          <source media="(max-width: 767px)" srcSet={image.mobileUrl} />
        ) : null}
      </picture>
      <Image
        src={image.url}
        alt={image.alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
        onError={() => setErrored(true)}
      />
      {image.darkOverlay ? (
        <div className="absolute inset-0 bg-ifood-darkBlue/40" aria-hidden="true" />
      ) : null}
      {image.caption ? (
        <span className="sr-only">{image.caption}</span>
      ) : null}
    </div>
  );
}
