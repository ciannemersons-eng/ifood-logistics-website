import { Facebook, Instagram, Linkedin, Twitter, Youtube, Globe, type LucideIcon } from "lucide-react";

/**
 * Picks a brand icon based on the link's domain so editors don't need a
 * separate "platform" field in Sanity — they just paste the URL and label.
 * Falls back to a generic globe icon for anything unrecognized (TikTok,
 * WhatsApp, a company blog, etc.).
 */
function getSocialIcon(href: string): LucideIcon {
  let hostname = "";
  try {
    hostname = new URL(href).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return Globe;
  }

  if (hostname.includes("facebook.com") || hostname.includes("fb.com")) return Facebook;
  if (hostname.includes("instagram.com")) return Instagram;
  if (hostname.includes("linkedin.com")) return Linkedin;
  if (hostname.includes("twitter.com") || hostname.includes("x.com")) return Twitter;
  if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) return Youtube;

  return Globe;
}

export function SocialIcon({
  href,
  label,
  size = 18,
  className,
}: {
  href: string;
  label: string;
  size?: number;
  className?: string;
}) {
  const Icon = getSocialIcon(href);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      <Icon size={size} aria-hidden="true" />
    </a>
  );
}
