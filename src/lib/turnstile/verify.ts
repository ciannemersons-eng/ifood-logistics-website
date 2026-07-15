const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Cloudflare Turnstile token server-side. If TURNSTILE_SECRET_KEY
 * is not configured (e.g. local development before the account is set up),
 * verification is skipped with a loud console warning so this is never
 * silently disabled in production by accident.
 */
export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY is not configured — skipping verification. " +
        "This must be configured before production launch.",
    );
    return true;
  }

  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret: secretKey, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const response = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      body,
    });

    if (!response.ok) return false;

    const result = (await response.json()) as { success: boolean };
    return result.success === true;
  } catch (error) {
    console.error("[turnstile] Verification request failed:", error);
    return false;
  }
}
