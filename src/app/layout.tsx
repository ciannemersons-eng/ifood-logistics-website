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

// See src/app/page.tsx for why this is disabled outside production.
export const revalidate = process.env.NODE_ENV === "production" ? 300 : 0;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.seo.title,
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
      icon: "/favicon.ico",
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
