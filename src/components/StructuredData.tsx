import type { SiteSettings, FaqSectionContent } from "@/types/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ifoodlogistics.com";

export function StructuredData({
  site,
  faq,
}: {
  site: SiteSettings;
  faq: FaqSectionContent;
}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.tradingName,
    legalName: site.companyLegalName,
    url: siteUrl,
    logo: site.logo?.url,
    email: site.contactEmail,
    telephone: site.contactPhone,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.tradingName,
    image: site.logo?.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Mandaue City",
      addressRegion: "Cebu",
      addressCountry: "PH",
    },
    // From the pin at https://maps.app.goo.gl/CqAhxHS3J1VfPo5z6
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.3474838,
      longitude: 123.9223534,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    telephone: site.contactPhone,
    email: site.contactEmail,
    url: siteUrl,
  };

  const faqSchema =
    faq.isVisible && faq.items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
    </>
  );
}
