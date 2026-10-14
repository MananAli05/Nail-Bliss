"use client";

import { useEffect, useRef } from "react";
import { adsenseClient } from "@/lib/ads";

const isDev = process.env.NODE_ENV === "development";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Reserved ad space. Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT is set,
 * except in development, where a labelled placeholder shows where ads will go.
 */
export function AdSlot({
  slot,
  label = "Advertisement",
  className = "",
}: {
  slot?: string;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adsenseClient || !ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = "1";
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blockers */
    }
  }, []);

  if (!adsenseClient) {
    if (!isDev) return null;
    return (
      <div
        className={`grid min-h-[120px] place-items-center rounded-2xl border border-dashed border-rose bg-white/50 text-[0.65rem] uppercase tracking-[0.25em] text-rose-deep ${className}`}
      >
        Ad space · {label}
      </div>
    );
  }

  return (
    <div className={`min-h-[120px] ${className}`}>
      <p className="mb-1 text-center text-[0.6rem] uppercase tracking-[0.25em] text-muted/70">Advertisement</p>
      <ins
        ref={ref}
        className="adsbygoogle block"
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
