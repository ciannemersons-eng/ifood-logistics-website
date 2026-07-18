"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import type { InquirySectionContent } from "@/types/content";
import { inquirySchema, type InquiryFormValues } from "@/lib/validation/inquirySchema";
import { Container } from "@/components/ui/Container";
import { FormField, inputClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils/cn";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; referenceNumber: string }
  | { status: "error"; message: string };

function track(eventName: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; plausible?: (...args: unknown[]) => void };
  w.gtag?.("event", eventName);
  w.plausible?.(eventName);
}

export function InquirySection({ content }: { content: InquirySectionContent }) {
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { consentPrivacy: false, turnstileToken: "" },
  });

  // TurnstileWidget reports its token via a plain callback, not a
  // react-hook-form-registered field, so it has to be synced into the form's
  // own values explicitly. Without this, react-hook-form's internal copy of
  // turnstileToken never leaves its default "" and Zod's min(1) check on it
  // fails on every submit attempt — silently, since no error is rendered for
  // this field — which blocks handleSubmit from ever calling onSubmit at all.
  const handleTurnstileToken = (token: string) => {
    setTurnstileToken(token);
    setValue("turnstileToken", token, { shouldValidate: true });
  };

  if (!content.isVisible) return null;

  const onFirstInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      track("inquiry_form_start");
    }
  };

  const onSubmit = async (values: InquiryFormValues) => {
    setSubmitState({ status: "submitting" });
    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          turnstileToken,
          utmSource: params.get("utm_source") ?? undefined,
          utmMedium: params.get("utm_medium") ?? undefined,
          utmCampaign: params.get("utm_campaign") ?? undefined,
          referrer: document.referrer || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmitState({ status: "error", message: data.message || content.errorMessage });
        track("inquiry_form_submit_error");
        return;
      }

      setSubmitState({ status: "success", referenceNumber: data.referenceNumber });
      track("inquiry_form_submit_success");
      reset();
    } catch {
      setSubmitState({ status: "error", message: content.errorMessage });
      track("inquiry_form_submit_error");
    }
  };

  if (submitState.status === "success") {
    return (
      <section id={content.anchorId || "inquiry"} className="bg-[#F5FBFF] py-16 sm:py-20 lg:py-28">
        <Container className="max-w-2xl">
          <Reveal variant="card">
            <div className="rounded-card border border-green-200 bg-white p-8 text-center shadow-soft" role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto mb-4 animate-card-in text-green-600 [animation-delay:100ms]" size={40} aria-hidden="true" />
              <p className="font-body text-base text-ifood-black">{content.successMessage}</p>
              <p className="mt-3 font-display text-sm font-semibold text-ifood-darkBlue">
                Reference number: {submitState.referenceNumber}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section id={content.anchorId || "inquiry"} className="bg-[#F5FBFF] py-16 sm:py-20 lg:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            {content.heading ? (
              <h2 className="font-display text-[clamp(1.75rem,1.4rem+1.6vw,3rem)] font-bold leading-tight text-ifood-darkBlue">
                {content.heading}
              </h2>
            ) : null}
            <p className="mt-4 font-body text-base leading-relaxed text-ifood-gray">{content.copy}</p>
            <ul className="mt-6 space-y-2">
              {content.reassurancePoints.map((point) => (
                <li key={point} className="flex items-start gap-2 font-body text-sm text-ifood-black">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-ifood-mediumBlue" size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="card" delayMs={100}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onFocus={onFirstInteraction}
          noValidate
          className="rounded-card border border-ifood-gray/10 bg-white p-6 shadow-soft sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField id="fullName" label="Full name" required error={errors.fullName?.message} className="sm:col-span-2">
              <input id="fullName" className={inputClasses} autoComplete="name" {...register("fullName")} />
            </FormField>

            <FormField id="companyName" label="Company name" required error={errors.companyName?.message}>
              <input id="companyName" className={inputClasses} autoComplete="organization" {...register("companyName")} />
            </FormField>

            <FormField id="email" label="Work email" required error={errors.email?.message}>
              <input id="email" type="email" className={inputClasses} autoComplete="email" {...register("email")} />
            </FormField>

            <FormField id="mobileNumber" label="Mobile number" required error={errors.mobileNumber?.message}>
              <input id="mobileNumber" type="tel" className={inputClasses} autoComplete="tel" {...register("mobileNumber")} />
            </FormField>

            <FormField id="productType" label="Product type" required error={errors.productType?.message}>
              <input id="productType" className={inputClasses} {...register("productType")} />
            </FormField>

            <FormField id="estimatedPallets" label="Estimated number of pallets" error={errors.estimatedPallets?.message}>
              <input id="estimatedPallets" type="number" min={0} className={inputClasses} {...register("estimatedPallets")} />
            </FormField>

            <FormField id="expectedArrivalDate" label="Expected arrival date" error={errors.expectedArrivalDate?.message}>
              <input id="expectedArrivalDate" type="date" className={inputClasses} {...register("expectedArrivalDate")} />
            </FormField>

            <FormField id="message" label="Message" className="sm:col-span-2" hint="Anything else we should know?">
              <textarea id="message" rows={3} className={inputClasses} {...register("message")} />
            </FormField>

            {showMoreFields ? (
              <div className="col-span-full grid animate-fade-up grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField id="requiredTemperature" label="Required storage temperature">
                  <input id="requiredTemperature" className={inputClasses} placeholder="e.g. -18°C" {...register("requiredTemperature")} />
                </FormField>

                <FormField id="storageDuration" label="Estimated storage duration">
                  <input id="storageDuration" className={inputClasses} placeholder="e.g. 3 months" {...register("storageDuration")} />
                </FormField>

                <FormField id="dispatchFrequency" label="Required dispatch frequency">
                  <input id="dispatchFrequency" className={inputClasses} placeholder="e.g. Weekly" {...register("dispatchFrequency")} />
                </FormField>

                <FormField id="currentLocation" label="Current location">
                  <input id="currentLocation" className={inputClasses} {...register("currentLocation")} />
                </FormField>

                <FormField id="preferredContactMethod" label="Preferred contact method">
                  <select id="preferredContactMethod" className={inputClasses} {...register("preferredContactMethod")}>
                    <option value="">Select an option</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone call</option>
                    <option value="mobile">Text / SMS</option>
                  </select>
                </FormField>

                <FormField id="bestTimeToCall" label="Best time to call">
                  <input id="bestTimeToCall" className={inputClasses} {...register("bestTimeToCall")} />
                </FormField>

                <FormField id="hearAboutUs" label="How did you hear about iFood?" className="sm:col-span-2">
                  <input id="hearAboutUs" className={inputClasses} {...register("hearAboutUs")} />
                </FormField>

                <FormField
                  id="handlingRequirements"
                  label="Additional handling requirements"
                  className="sm:col-span-2"
                >
                  <textarea id="handlingRequirements" rows={3} className={inputClasses} {...register("handlingRequirements")} />
                </FormField>
              </div>
            ) : (
              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowMoreFields(true)}
                  className="font-display text-sm font-semibold text-ifood-mediumBlue hover:underline"
                >
                  + Add storage temperature, duration, and dispatch details
                </button>
              </div>
            )}
          </div>

          <div className="mt-5 flex items-start gap-3">
            <input
              id="consentPrivacy"
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 rounded border-ifood-gray/40 text-ifood-royalBlue focus:ring-ifood-royalBlue"
              {...register("consentPrivacy")}
            />
            <label htmlFor="consentPrivacy" className="font-body text-sm text-ifood-gray">
              I consent to iFood Logistics using my information to evaluate and respond to this storage inquiry, per
              the{" "}
              <a href="/privacy" className="text-ifood-mediumBlue hover:underline">
                privacy notice
              </a>
              .
            </label>
          </div>
          {errors.consentPrivacy ? (
            <p role="alert" className="mt-1 font-body text-xs font-medium text-red-600">
              {errors.consentPrivacy.message}
            </p>
          ) : null}

          <div className="mt-5">
            <TurnstileWidget onToken={handleTurnstileToken} />
            {errors.turnstileToken ? (
              <p role="alert" className="mt-1 font-body text-xs font-medium text-red-600">
                {errors.turnstileToken.message}
              </p>
            ) : null}
          </div>

          {submitState.status === "error" ? (
            <div className="mt-5">
              <Alert variant="error">{submitState.message}</Alert>
            </div>
          ) : null}

          <Button
            type="submit"
            disabled={submitState.status === "submitting"}
            className={cn("mt-6 w-full justify-center", submitState.status === "submitting" && "opacity-80")}
          >
            {submitState.status === "submitting" ? <LoadingSpinner label="Submitting…" /> : content.submitLabel}
          </Button>

          <p className="mt-4 font-body text-xs text-ifood-gray">{content.reassuranceCopy}</p>
        </form>
        </Reveal>
      </Container>
    </section>
  );
}
