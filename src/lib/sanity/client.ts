import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

/**
 * Returns a configured Sanity client, or null when the project is not
 * configured (e.g. local development before Sanity credentials exist).
 * Callers must fall back to fallbackContent when this returns null.
 */
export function getSanityClient(): SanityClient | null {
  if (!projectId) return null;

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
