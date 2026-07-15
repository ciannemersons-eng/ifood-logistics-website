import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key. Must never be
 * imported from a Client Component or exposed to the browser.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.warn("[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured.");
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
