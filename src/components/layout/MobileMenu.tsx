"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavItem, Cta } from "@/types/content";
import { Button } from "@/components/ui/Button";

export function MobileMenu({ navItems, cta }: { navItems: NavItem[]; cta: Cta }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ifood-darkBlue"
      >
        <Menu aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-white p-6"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-ifood-darkBlue">Menu</span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ifood-darkBlue"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-3 font-display text-lg font-medium text-ifood-darkBlue hover:bg-ifood-lightBlue/20"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {cta.isVisible !== false ? (
            <Button href={cta.href} className="w-full justify-center" onClick={() => setIsOpen(false)}>
              {cta.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
