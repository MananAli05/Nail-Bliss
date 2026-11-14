"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  slot?: string;
  label?: string;
  className?: string;
};

export function AdSlot({ slot, label = "Advertisement", className = "" }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!slot || !ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = "true";
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [slot]);

  if (!slot) {
    if (process.env.NODE_ENV !== "development") return null;
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
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
