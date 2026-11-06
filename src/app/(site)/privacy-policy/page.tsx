import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nail Bliss collects, uses and protects information, including cookies and Google AdSense advertising.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" path="/privacy-policy" updated="October 14, 2026">
      <p>
        At {site.name} ({site.url}), your privacy matters to us. This Privacy Policy explains what
        information we collect when you visit our website and how we use it.
      </p>

      <h2>Information we collect</h2>
      <p>
        We do not require you to create an account. When you contact us by email, we receive the
        information you choose to share, such as your name and email address, and use it only to reply.
      </p>
      <p>
        Like most websites, we and our partners automatically collect standard log information such as
        your browser type, device, referring pages, pages visited and the date and time of your visit.
        This helps us understand which content is most useful.
      </p>

      <h2>Cookies and web beacons</h2>
      <p>
        {site.name} uses cookies to store information about visitors&apos; preferences and to improve your
        experience. You can choose to disable cookies through your browser settings. Note that some
        features may not work correctly without them.
      </p>

      <h2>Google AdSense and the DoubleClick cookie</h2>
      <p>
        We may use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies
        to serve ads on our site. Google&apos;s use of advertising cookies enables it and its partners to
        serve ads to you based on your visits to this site and/or other sites on the internet.
      </p>
      <p>
        You may opt out of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . You can also opt out of some third-party vendors&apos; use of cookies for personalized advertising
        at{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
          www.aboutads.info
        </a>
        . Learn more about{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          how Google uses data from sites that use its services
        </a>
        .
      </p>

      <h2>Third-party privacy policies</h2>
      <p>
        Our Privacy Policy does not apply to other advertisers or websites, including Pinterest, which you
        may reach through our &ldquo;Save&rdquo; buttons. Please check the privacy policies of those
        services for details on their practices.
      </p>

      <h2>Your privacy rights (CCPA &amp; GDPR)</h2>
      <p>
        Depending on where you live, you may have the right to request access to, correction of, or
        deletion of personal data we hold about you, and to opt out of the &ldquo;sale&rdquo; or sharing
        of personal data. To make a request, contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Children&apos;s information</h2>
      <p>
        {site.name} does not knowingly collect personal information from children under 13. If you believe
        your child has shared personal information with us, please <Link href="/contact">contact us</Link>{" "}
        and we will promptly remove it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an
        updated date.
      </p>
    </StaticPage>
  );
}
