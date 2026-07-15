import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getSanityClient } from "./client";

export function urlForImage(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) return undefined;
  return imageUrlBuilder(client).image(source);
}
