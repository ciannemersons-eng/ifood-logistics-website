import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-20">
      <div className="mb-8 rounded-card border border-amber-300 bg-amber-50 p-4 font-body text-sm text-amber-900">
        <strong>Placeholder content — pending legal review.</strong> This page is a structural placeholder only.
        Replace this text with Terms of Use reviewed and approved by iFood Specialist Corporation&apos;s legal counsel
        before production launch.
      </div>

      <h1 className="font-display text-3xl font-bold text-ifood-darkBlue">Terms of Use</h1>
      <p className="mt-2 font-body text-sm text-ifood-gray">Last updated: [date pending legal review]</p>

      <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-ifood-black">
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Acceptance of Terms</h2>
          <p className="mt-2 text-ifood-gray">
            [Placeholder] By using this website, you agree to these Terms of Use.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Use of Content</h2>
          <p className="mt-2 text-ifood-gray">
            [Placeholder] Describe permitted and prohibited use of website content, imagery, and trademarks.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">No Warranty</h2>
          <p className="mt-2 text-ifood-gray">
            [Placeholder] Describe applicable disclaimers regarding facility specifications and availability.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Governing Law</h2>
          <p className="mt-2 text-ifood-gray">[Placeholder] These terms are governed by the laws of the Philippines.</p>
        </section>
      </div>
    </Container>
  );
}
