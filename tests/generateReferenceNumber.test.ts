import { describe, expect, it } from "vitest";
import { generateReferenceNumber } from "@/lib/utils/generateReferenceNumber";

describe("generateReferenceNumber", () => {
  it("produces the expected format", () => {
    const ref = generateReferenceNumber(new Date("2026-07-15T00:00:00Z"));
    expect(ref).toMatch(/^IFL-20260715-[0-9A-F]{4}$/);
  });

  it("produces unique values across calls", () => {
    const a = generateReferenceNumber();
    const b = generateReferenceNumber();
    expect(a).not.toBe(b);
  });
});
