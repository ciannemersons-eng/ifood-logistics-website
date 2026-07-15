import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

let hasWarnedMissingProjectId = false;

/**
 * Returns a configured Sanity client, or null when the project is not
 * configured (e.g. local development before Sanity credentials exist).
 * Callers must fall back to fallbackContent when this returns null.
 */
export function getSanityClient(): SanityClient | null {
  if (!projectId) {
    // Log once (not on every request) so a missing NEXT_PUBLIC_SANITY_PROJECT_ID
    // is visible in the server console instead of silently rendering fallback
    // content with no explanation. Note this is a distinct variable from
    // SANITY_STUDIO_PROJECT_ID, which only the Studio CLI reads.
    if (!hasWarnedMissingProjectId) {
      console.warn(
        "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — the site will render fallback content only. " +
          "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local (these are separate " +
          "from SANITY_STUDIO_PROJECT_ID/SANITY_STUDIO_DATASET, which only the Studio CLI reads).",
      );
      hasWarnedMissingProjectId = true;
    }
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_READ_TOKEN,
    perspective: "published",
  });
}

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity fetch failed, falling back to static content:", error);
    return null;
  }
}
