import type { Metadata } from "next";
import { adminEnabled } from "@/lib/admin";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Nail Bliss Admin",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  if (!adminEnabled) {
    return (
      <div className="grid min-h-dvh place-items-center px-4 text-center">
        <div>
          <p className="font-display text-3xl font-semibold text-plum">Admin isn&apos;t set up yet</p>
          <p className="mt-2 text-sm text-muted">Add the Keystatic GitHub keys to the hosting environment to enable it.</p>
        </div>
      </div>
    );
  }
  return <KeystaticApp />;
}
