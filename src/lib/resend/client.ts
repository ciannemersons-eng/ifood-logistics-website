import { Resend } from "resend";

let cachedClient: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[resend] RESEND_API_KEY is not configured — emails will not be sent.");
    return null;
  }
  if (!cachedClient) {
    cachedClient = new Resend(apiKey);
  }
  return cachedClient;
}
