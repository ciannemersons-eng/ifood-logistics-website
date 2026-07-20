import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-20">
      <h1 className="font-display text-3xl font-bold text-ifood-darkBlue">Privacy Policy</h1>
      <p className="mt-2 font-body text-sm text-ifood-gray">Last updated: July 20, 2026</p>

      <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-ifood-black">
        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Introduction</h2>
          <p className="mt-2 text-ifood-gray">
            iFood Specialist Corporation, operating as iFood Logistics (&quot;iFood Logistics,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;), respects your privacy and is committed to protecting personal data
            in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173) and its Implementing Rules and
            Regulations. This Privacy Policy explains what information we collect through this website, how we use
            it, and the rights available to you.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Information We Collect</h2>
          <p className="mt-2 text-ifood-gray">
            When you submit a storage inquiry through this website, we collect the information you provide,
            which may include:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ifood-gray">
            <li>Full name, company name, work email address, and mobile number</li>
            <li>
              Storage requirements you share with us, such as product type, required temperature, estimated pallet
              volume, expected arrival date, storage duration, dispatch frequency, handling requirements, and
              current storage location
            </li>
            <li>Your preferred contact method, best time to reach you, and how you heard about us</li>
            <li>Any additional message or details you choose to include</li>
          </ul>
          <p className="mt-2 text-ifood-gray">
            We also automatically receive limited technical information when you use the inquiry form, including
            campaign source data (UTM parameters), the referring page, and a verification token from Cloudflare
            Turnstile, which we use to confirm the submission was made by a person rather than automated software.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">How We Use Your Information</h2>
          <p className="mt-2 text-ifood-gray">
            We use the information submitted through our storage inquiry form to evaluate your request, prepare a
            storage proposal, respond to you by phone or email, and maintain internal records of business
            inquiries. We do not use this information for unrelated marketing purposes without your consent, and
            we do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Third-Party Service Providers</h2>
          <p className="mt-2 text-ifood-gray">
            We use a small number of third-party service providers to operate this website and process inquiries.
            These providers process data on our behalf and are contractually or contractually-equivalent restricted
            from using it for their own purposes:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ifood-gray">
            <li>
              <span className="font-semibold text-ifood-black">Cloudflare</span> — provides security, performance,
              and bot-protection services (including the Turnstile verification widget) for this website
            </li>
            <li>
              <span className="font-semibold text-ifood-black">Resend</span> — delivers the email notifications
              generated when you submit an inquiry
            </li>
            <li>
              <span className="font-semibold text-ifood-black">Vercel</span> — hosts this website
            </li>
            <li>
              <span className="font-semibold text-ifood-black">Sanity</span> — manages the published content shown
              on this website (not used to store inquiry submissions)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Cookies</h2>
          <p className="mt-2 text-ifood-gray">
            This website does not set marketing or advertising cookies. Cloudflare may set limited, essential
            cookies as part of its security and bot-protection services (including Turnstile) while you use the
            inquiry form. If analytics tools are added to this website in the future, this section will be updated
            to disclose them.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Data Retention and Security</h2>
          <p className="mt-2 text-ifood-gray">
            We retain inquiry submissions for up to twenty-four (24) months from your last interaction with us,
            after which they are securely deleted or anonymized, unless a longer retention period is required to
            comply with legal, tax, or accounting obligations. We apply reasonable organizational and technical
            safeguards to protect personal data, including encrypted transmission (HTTPS) and restricted access
            limited to authorized personnel.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Your Rights</h2>
          <p className="mt-2 text-ifood-gray">
            Under the Data Privacy Act of 2012, you have the right to:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ifood-gray">
            <li>Be informed that your personal data will be, are being, or have been processed</li>
            <li>Access your personal data that we hold</li>
            <li>Request correction of inaccurate or outdated personal data</li>
            <li>Object to the processing of your personal data, subject to legal and contractual restrictions</li>
            <li>Request erasure or blocking of your personal data under circumstances allowed by law</li>
            <li>Be indemnified for damages sustained due to inaccurate, incomplete, or unlawfully obtained data</li>
            <li>Lodge a complaint with the National Privacy Commission (NPC)</li>
          </ul>
          <p className="mt-2 text-ifood-gray">To exercise any of these rights, contact us using the details below.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Children&apos;s Privacy</h2>
          <p className="mt-2 text-ifood-gray">
            This website is intended for business use and is not directed at children. We do not knowingly collect
            personal data from individuals under 18 years of age.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Changes to This Policy</h2>
          <p className="mt-2 text-ifood-gray">
            We may update this Privacy Policy from time to time. Material changes will be reflected by updating the
            &quot;Last updated&quot; date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ifood-darkBlue">Contact</h2>
          <p className="mt-2 text-ifood-gray">
            For privacy-related questions or to exercise your rights under the Data Privacy Act of 2012, contact us
            at{" "}
            <a href="mailto:inquiry@ifoodlogistics.com" className="text-ifood-mediumBlue hover:underline">
              inquiry@ifoodlogistics.com
            </a>{" "}
            or by phone at 0917 632 8157 / 0999 229 6214. Our mailing address is P. Remedio Street, Banilad,
            Mandaue City, Cebu, Philippines.
          </p>
        </section>
      </div>
    </Container>
  );
}
