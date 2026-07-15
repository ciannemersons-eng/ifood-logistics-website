/**
 * Generates a human-friendly, sortable inquiry reference number, e.g.
 * IFL-20260715-4F2A. Not cryptographically significant, just for the
 * customer and staff to refer to the inquiry in conversation and email.
 */
export function generateReferenceNumber(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = crypto.randomUUID().split("-")[0]!.slice(0, 4).toUpperCase();
  return `IFL-${y}${m}${d}-${random}`;
}
