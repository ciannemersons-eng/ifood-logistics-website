/**
 * Minimal HTML escaping for user-provided content that gets interpolated
 * into HTML email templates, to prevent stored/reflected HTML injection.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips ASCII control characters and trims excess whitespace from free text. */
export function sanitizePlainText(value: string): string {
  const withoutControlChars = Array.from(value)
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0;
      return code >= 32 && code !== 127;
    })
    .join("");
  return withoutControlChars.replace(/\s+/g, " ").trim();
}
