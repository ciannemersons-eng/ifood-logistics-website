import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/getPageData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ifoodlogistics.ph";

// See src/app/page.tsx for why this is a plain static literal.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  // TEMPORARY DEBUG: shows the raw value/type of site.seo.title directly in
  // the tab so we can see exactly what production is resolving it to,
  // instead of guessing further. Remove once the empty-title bug is found.
  const debugTitle = `DEBUG[${JSON.stringify(site.seo.title)}|${typeof site.seo.title}]`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: debugTitle,
      template: `%s | ${site.tradingName}`,
    },
    description: site.seo.description,
    keywords: site.seo.keywords,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteUrl,
      title: site.seo.title,
      description: site.seo.description,
      siteName: site.tradingName,
      images: site.seo.socialImage?.url ? [{ url: site.seo.socialImage.url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
      images: site.seo.socialImage?.url ? [site.seo.socialImage.url] : undefined,
    },
    icons: {
      icon: "/images/ifood-just-logo.png",
      apple: "/images/ifood-just-logo.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-ifood-darkBlue focus:shadow-soft"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
