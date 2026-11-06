import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the Nail Bliss website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Use" path="/terms" updated="October 14, 2026">
      <p>
        By accessing and using {site.name}, you agree to these Terms of Use. If you do not agree, please do
        not use the website.
      </p>
      <h2>Use of content</h2>
      <p>
        All text, images and graphics on {site.name} are owned by or licensed to us unless otherwise noted.
        You&apos;re welcome to share our posts and pin our images to Pinterest with a link back to the
        original post. You may not republish, copy or sell our content without written permission.
      </p>
      <h2>Information only</h2>
      <p>
        Our content is for general information and inspiration. Please read our{" "}
        <Link href="/disclaimer">Disclaimer</Link> before following any tips or tutorials.
      </p>
      <h2>External links</h2>
      <p>
        We may link to third-party websites. We are not responsible for the content or practices of those
        websites.
      </p>
      <h2>Changes</h2>
      <p>
        We may revise these terms at any time. Continued use of the website means you accept the updated
        terms.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </StaticPage>
  );
}
