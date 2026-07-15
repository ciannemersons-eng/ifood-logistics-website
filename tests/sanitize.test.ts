import { describe, expect, it } from "vitest";
import { escapeHtml, sanitizePlainText } from "@/lib/utils/sanitize";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml("<script>alert('x')</script>")).toBe(
      "&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;",
    );
  });
});

describe("sanitizePlainText", () => {
  it("trims and collapses whitespace", () => {
    expect(sanitizePlainText("  hello    world  ")).toBe("hello world");
  });

  it("strips control characters", () => {
    expect(sanitizePlainText("helloworld")).toBe("helloworld");
  });
});
