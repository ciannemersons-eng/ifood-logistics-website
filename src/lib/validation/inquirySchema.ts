import { z } from "zod";

/**
 * Shared Zod schema for the storage inquiry form. Used for both
 * client-side react-hook-form validation and server-side validation in the
 * API route, so the two can never drift out of sync.
 */
export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  companyName: z.string().trim().min(2, "Enter your company name").max(150),
  email: z.string().trim().email("Enter a valid work email address").max(200),
  mobileNumber: z
    .string()
    .trim()
    .min(7, "Enter a valid mobile number")
    .max(20)
    .regex(/^[+0-9()\-\s]+$/, "Enter a valid mobile number"),
  productType: z.string().trim().min(2, "Describe the product type").max(200),
  requiredTemperature: z.string().trim().max(100).optional().or(z.literal("")),
  estimatedPallets: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
    .refine((val) => val === undefined || (Number.isFinite(val) && val >= 0), {
      message: "Enter a valid number of pallets",
    })
    .optional(),
  expectedArrivalDate: z.string().trim().max(30).optional().or(z.literal("")),
  storageDuration: z.string().trim().max(150).optional().or(z.literal("")),
  dispatchFrequency: z.string().trim().max(150).optional().or(z.literal("")),
  handlingRequirements: z.string().trim().max(1000).optional().or(z.literal("")),
  currentLocation: z.string().trim().max(150).optional().or(z.literal("")),
  preferredContactMethod: z.string().trim().max(50).optional().or(z.literal("")),
  bestTimeToCall: z.string().trim().max(100).optional().or(z.literal("")),
  hearAboutUs: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consentPrivacy: z
    .union([z.boolean(), z.literal("on"), z.literal("true")])
    .transform((val) => val === true || val === "on" || val === "true")
    .refine((val) => val === true, { message: "You must accept the privacy notice" }),
  turnstileToken: z.string().min(1, "Please complete the verification challenge"),
  utmSource: z.string().trim().max(100).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(100).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(100).optional().or(z.literal("")),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

/** Subset of fields shown in the initial (progressive-disclosure) form step. */
export const inquiryStepOneFields = [
  "fullName",
  "companyName",
  "email",
  "mobileNumber",
  "productType",
  "estimatedPallets",
  "expectedArrivalDate",
  "message",
] as const;
