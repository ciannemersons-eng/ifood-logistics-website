import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-20">
      <h1 className="font-display text-3xl font-bold text-ifood-darkBlue">Terms of Use</h1>
      <p className="mt-2 font-body text-sm text-ifood-gray">Last updated: July 20, 2026</p>

      <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-ifood-black">
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Acceptance of Terms</h2>
          <p className="mt-2 text-ifood-gray">
            These Terms of Use govern your access to and use of this website, operated by iFood Specialist
            Corporation (&quot;iFood Logistics,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By
            accessing or using this website, you agree to be bound by these Terms. If you do not agree, please do
            not use this website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Purpose of This Website</h2>
          <p className="mt-2 text-ifood-gray">
            This website is provided to share information about iFood Logistics&apos; cold storage and warehousing
            services in Cebu, Philippines, and to allow prospective customers to submit storage inquiries. It is
            not intended to form a binding contract for services; any storage arrangement is subject to a separate
            written agreement between you and iFood Specialist Corporation.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Use of Content</h2>
          <p className="mt-2 text-ifood-gray">
            All text, images, graphics, logos, and other content on this website are the property of iFood
            Specialist Corporation or its licensors and are protected by applicable intellectual property laws. You
            may view and use this content for your own personal or internal business evaluation of our services.
            You may not reproduce, distribute, modify, or otherwise use this content for commercial purposes, or
            use the iFood Logistics name, logo, or trademarks, without our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Storage Inquiry Submissions</h2>
          <p className="mt-2 text-ifood-gray">
            When you submit a storage inquiry, you agree to provide accurate and complete information. Submitting
            an inquiry does not guarantee availability of storage capacity or acceptance of your request. See our{" "}
            <a href="/privacy" className="text-ifood-mediumBlue hover:underline">
              Privacy Policy
            </a>{" "}
            for details on how submitted information is used.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Facility Information and No Warranty</h2>
          <p className="mt-2 text-ifood-gray">
            Facility specifications, capacity figures, and equipment details described on this website (including
            storage capacity, generator output, and refrigeration specifications) are provided for general
            informational purposes and are subject to change without notice. This website and its content are
            provided &quot;as is&quot; without warranties of any kind, express or implied, including as to
            accuracy, completeness, or availability. Please confirm current facility specifications and available
            capacity directly with our team before making business decisions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Limitation of Liability</h2>
          <p className="mt-2 text-ifood-gray">
            To the fullest extent permitted by law, iFood Specialist Corporation shall not be liable for any
            indirect, incidental, or consequential damages arising from your use of, or inability to use, this
            website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Third-Party Links and Services</h2>
          <p className="mt-2 text-ifood-gray">
            This website may reference or link to third-party services (such as Google Maps for directions). We
            are not responsible for the content, accuracy, or practices of any third-party websites or services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Changes to These Terms</h2>
          <p className="mt-2 text-ifood-gray">
            We may update these Terms of Use from time to time. Material changes will be reflected by updating the
            &quot;Last updated&quot; date at the top of this page. Continued use of this website after changes are
            posted constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Governing Law</h2>
          <p className="mt-2 text-ifood-gray">
            These Terms are governed by the laws of the Republic of the Philippines, without regard to conflict of
            law principles. Any disputes arising from these Terms or your use of this website shall be subject to
            the exclusive jurisdiction of the appropriate courts of Cebu, Philippines.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Contact</h2>
          <p className="mt-2 text-ifood-gray">
            Questions about these Terms of Use can be sent to{" "}
            <a href="mailto:inquiry@ifoodlogistics.com" className="text-ifood-mediumBlue hover:underline">
              inquiry@ifoodlogistics.com
            </a>{" "}
            or by phone at 0917 632 8157 / 0999 229 6214.
          </p>
        </section>
      </div>
    </Container>
  );
}
