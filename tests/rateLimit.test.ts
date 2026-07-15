import { describe, expect, it } from "vitest";
import { isRateLimited } from "@/lib/utils/rateLimit";

describe("isRateLimited", () => {
  it("allows the first few requests from a key and then blocks", () => {
    const key = `test-key-${Math.random()}`;
    const results = Array.from({ length: 8 }, () => isRateLimited(key));
    expect(results.slice(0, 5)).toEqual([false, false, false, false, false]);
    expect(results.slice(5)).toEqual([true, true, true]);
  });

  it("tracks separate keys independently", () => {
    const keyA = `test-key-a-${Math.random()}`;
    const keyB = `test-key-b-${Math.random()}`;
    expect(isRateLimited(keyA)).toBe(false);
    expect(isRateLimited(keyB)).toBe(false);
  });
});
