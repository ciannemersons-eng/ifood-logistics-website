import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import type { FooterContent } from "@/types/content";
import { Container } from "@/components/ui/Container";

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-ifood-lightBlue/40 bg-ifood-darkBlue text-white">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          {content.logo?.url ? (
            <Image
              src={content.logo.url}
              alt={content.logo.alt}
              width={320}
              height={96}
              className="h-20 w-auto object-contain sm:h-24"
            />
          ) : (
            <span className="font-display text-lg font-bold">iFood Logistics</span>
          )}
          <p className="mt-3 font-body text-sm text-ifood-lightBlue">{content.operatedByLine}</p>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/80">{content.statement}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ifood-lightBlue">
            Quick Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2">
            {content.quickLinks
              .filter((link) => link.isVisible !== false)
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/85 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ifood-lightBlue">
            Contact
          </h3>
          <ul className="mt-4 flex flex-col gap-3 font-body text-sm text-white/85">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0 text-ifood-lightBlue" aria-hidden="true" />
              <span>{content.contact.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={18} className="mt-0.5 shrink-0 text-ifood-lightBlue" aria-hidden="true" />
              <span className="flex flex-col">
                {content.contact.phone.split(",").map((number) => {
                  const trimmed = number.trim();
                  return (
                    <a key={trimmed} href={`tel:${trimmed.replace(/\s+/g, "")}`} className="hover:text-white">
                      {trimmed}
                    </a>
                  );
                })}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="shrink-0 text-ifood-lightBlue" aria-hidden="true" />
              <a href={`mailto:${content.contact.email}`} className="hover:text-white">
                {content.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ifood-lightBlue">
            Legal
          </h3>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link href="/privacy" className="font-body text-sm text-white/85 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="font-body text-sm text-white/85 hover:text-white">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-center font-body text-xs text-white/60 sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} iFood Specialist Corporation. All rights reserved.</p>
          <p>{content.address}</p>
        </Container>
      </div>
    </footer>
  );
}
