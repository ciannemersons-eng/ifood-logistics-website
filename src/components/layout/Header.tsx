"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavItem, Cta, EditableImage } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils/cn";

export function Header({
  logo,
  navItems,
  cta,
}: {
  logo: EditableImage;
  navItems: NavItem[];
  cta: Cta;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        isScrolled
          ? "border-b border-ifood-gray/10 bg-white shadow-sm"
          : "bg-white/70 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="#home" className="flex items-center" aria-label="iFood Logistics home">
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={logo.alt}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <span className="font-display text-lg font-bold text-ifood-darkBlue">iFood Logistics</span>
          )}
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-medium text-ifood-darkBlue transition-colors hover:text-ifood-mediumBlue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          {cta.isVisible !== false ? <Button href={cta.href}>{cta.label}</Button> : null}
        </div>

        <MobileMenu navItems={navItems} cta={cta} />
      </Container>
    </header>
  );
}
