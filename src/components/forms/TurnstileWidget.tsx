"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

/**
 * Renders the Cloudflare Turnstile widget when a site key is configured.
 * When no site key is configured (e.g. local development before the
 * Cloudflare account is set up), renders a clearly labeled placeholder and
 * supplies a fixed dev token so the form can still be exercised locally.
 * The server independently no-ops verification when TURNSTILE_SECRET_KEY is
 * absent, so this placeholder never bypasses real verification in production.
 */
export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!siteKey || !scriptLoaded || !containerRef.current || !window.turnstile) return;
    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
    return () => {
      window.turnstile?.reset(widgetId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, scriptLoaded]);

  useEffect(() => {
    if (!siteKey) {
      // Local-development-only placeholder token. The server independently
      // no-ops verification when TURNSTILE_SECRET_KEY is unset, and will
      // reject real requests once the secret is configured, so this never
      // bypasses verification in a properly configured environment.
      onToken("dev-mode-no-turnstile-configured");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  if (!siteKey) {
    return (
      <div className="rounded-[8px] border border-dashed border-ifood-gray/40 bg-ifood-lightBlue/10 px-4 py-3 font-body text-xs text-ifood-gray">
        Turnstile is not configured yet. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY before
        production launch.
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div id={containerId} ref={containerRef} />
    </>
  );
}
