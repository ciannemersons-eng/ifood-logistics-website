import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-20">
      <div className="mb-8 rounded-card border border-amber-300 bg-amber-50 p-4 font-body text-sm text-amber-900">
        <strong>Placeholder content — pending legal review.</strong> This page is a structural placeholder only.
        Replace this text with a Privacy Policy reviewed and approved by iFood Specialist Corporation&apos;s legal
        counsel before production launch.
      </div>

      <h1 className="font-display text-3xl font-bold text-ifood-darkBlue">Privacy Policy</h1>
      <p className="mt-2 font-body text-sm text-ifood-gray">Last updated: [date pending legal review]</p>

      <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-ifood-black">
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Information We Collect</h2>
          <p className="mt-2 text-ifood-gray">
            [Placeholder] When you submit a storage inquiry, we collect your full name, company name, work email
            address, mobile number, and details about your storage requirements.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">How We Use Your Information</h2>
          <p className="mt-2 text-ifood-gray">
            [Placeholder] Information submitted through our storage inquiry form is used only to evaluate and
            respond to your request.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Data Retention and Security</h2>
          <p className="mt-2 text-ifood-gray">
            [Placeholder] Describe how long inquiry records are retained and the safeguards in place to protect
            them.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Your Rights</h2>
          <p className="mt-2 text-ifood-gray">
            [Placeholder] Describe applicable rights under the Philippine Data Privacy Act of 2012 and how to
            exercise them.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Contact</h2>
          <p className="mt-2 text-ifood-gray">[Placeholder] Contact details for privacy-related inquiries.</p>
        </section>
      </div>
    </Container>
  );
}
