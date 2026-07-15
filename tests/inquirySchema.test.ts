import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/validation/inquirySchema";

const validPayload = {
  fullName: "Juan Dela Cruz",
  companyName: "Cebu Fresh Foods Inc.",
  email: "juan@cebufresh.ph",
  mobileNumber: "+63 917 000 0000",
  productType: "Frozen chicken",
  estimatedPallets: "50",
  expectedArrivalDate: "2026-08-01",
  message: "Need space for a seasonal overflow order.",
  consentPrivacy: true,
  turnstileToken: "test-token",
};

describe("inquirySchema", () => {
  it("accepts a valid payload", () => {
    const result = inquirySchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.estimatedPallets).toBe(50);
      expect(result.data.consentPrivacy).toBe(true);
    }
  });

  it("rejects a missing full name", () => {
    const result = inquirySchema.safeParse({ ...validPayload, fullName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = inquirySchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects when privacy consent is not given", () => {
    const result = inquirySchema.safeParse({ ...validPayload, consentPrivacy: false });
    expect(result.success).toBe(false);
  });

  it("rejects when the turnstile token is missing", () => {
    const result = inquirySchema.safeParse({ ...validPayload, turnstileToken: "" });
    expect(result.success).toBe(false);
  });

  it("allows optional operational fields to be omitted", () => {
    const { requiredTemperature, storageDuration, dispatchFrequency, ...minimal } = validPayload as Record<
      string,
      unknown
    >;
    const result = inquirySchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid mobile number", () => {
    const result = inquirySchema.safeParse({ ...validPayload, mobileNumber: "abc" });
    expect(result.success).toBe(false);
  });
});
