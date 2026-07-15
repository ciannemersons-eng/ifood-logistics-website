import { NextResponse, type NextRequest } from "next/server";
import { inquirySchema } from "@/lib/validation/inquirySchema";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getResendClient } from "@/lib/resend/client";
import { generateReferenceNumber } from "@/lib/utils/generateReferenceNumber";
import { sanitizePlainText } from "@/lib/utils/sanitize";
import { isRateLimited } from "@/lib/utils/rateLimit";
import InquiryNotificationEmail from "@/emails/InquiryNotificationEmail";
import InquiryAcknowledgmentEmail from "@/emails/InquiryAcknowledgmentEmail";

export const runtime = "nodejs";

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again in a moment." },
      { status: 429 },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(rawBody);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        success: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const { turnstileToken, ...formValues } = parsed.data;

  const isHuman = await verifyTurnstileToken(turnstileToken, clientIp);
  if (!isHuman) {
    return NextResponse.json(
      { success: false, message: "We could not verify this submission. Please try again." },
      { status: 400 },
    );
  }

  const sanitized = {
    ...formValues,
    fullName: sanitizePlainText(formValues.fullName),
    companyName: sanitizePlainText(formValues.companyName),
    productType: sanitizePlainText(formValues.productType),
    message: formValues.message ? sanitizePlainText(formValues.message) : undefined,
    handlingRequirements: formValues.handlingRequirements
      ? sanitizePlainText(formValues.handlingRequirements)
      : undefined,
  };

  const referenceNumber = generateReferenceNumber();

  // 1. Persist to Supabase first — this is the source of truth. Email
  // delivery can fail or be delayed, so we never depend on it alone.
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("inquiries").insert({
      reference_number: referenceNumber,
      status: "new",
      full_name: sanitized.fullName,
      company_name: sanitized.companyName,
      email: sanitized.email,
      mobile_number: sanitized.mobileNumber,
      product_type: sanitized.productType,
      required_temperature: sanitized.requiredTemperature || null,
      estimated_pallets: sanitized.estimatedPallets ?? null,
      expected_arrival_date: sanitized.expectedArrivalDate || null,
      storage_duration: sanitized.storageDuration || null,
      dispatch_frequency: sanitized.dispatchFrequency || null,
      handling_requirements: sanitized.handlingRequirements || null,
      preferred_contact_method: sanitized.preferredContactMethod || null,
      best_time_to_call: sanitized.bestTimeToCall || null,
      source: sanitized.hearAboutUs || null,
      consent_privacy: sanitized.consentPrivacy,
      utm_source: sanitized.utmSource || null,
      utm_medium: sanitized.utmMedium || null,
      utm_campaign: sanitized.utmCampaign || null,
      referrer: sanitized.referrer || null,
    });

    if (error) {
      console.error("[inquiries] Supabase insert failed:", error);
      return NextResponse.json(
        { success: false, message: "We could not submit your inquiry. Please contact our team directly." },
        { status: 500 },
      );
    }
  } else {
    console.warn("[inquiries] Supabase is not configured — inquiry was not persisted:", referenceNumber);
  }

  // 2. Send notification + acknowledgment emails. Failures here are logged
  // but do not fail the request, since the record is already saved.
  const resend = getResendClient();
  const notificationRecipient = process.env.INQUIRY_NOTIFICATION_EMAIL;
  const fromAddress = process.env.INQUIRY_FROM_EMAIL;

  if (resend && notificationRecipient && fromAddress) {
    try {
      await resend.emails.send({
        from: fromAddress,
        to: notificationRecipient,
        subject: `New iFood Storage Inquiry — ${sanitized.companyName} — ${referenceNumber}`,
        react: InquiryNotificationEmail({ referenceNumber, data: sanitized }),
      });
    } catch (error) {
      console.error("[inquiries] Failed to send internal notification email:", error);
    }

    try {
      await resend.emails.send({
        from: fromAddress,
        to: sanitized.email,
        subject: `We received your iFood Logistics inquiry — ${referenceNumber}`,
        react: InquiryAcknowledgmentEmail({
          referenceNumber,
          fullName: sanitized.fullName,
          companyContactEmail: notificationRecipient,
          companyContactPhone: process.env.NEXT_PUBLIC_SITE_CONTACT_PHONE || "",
        }),
      });
    } catch (error) {
      console.error("[inquiries] Failed to send visitor acknowledgment email:", error);
    }
  } else {
    console.warn("[inquiries] Resend is not fully configured — emails were not sent for:", referenceNumber);
  }

  return NextResponse.json({ success: true, referenceNumber });
}
