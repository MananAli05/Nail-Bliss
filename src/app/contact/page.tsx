import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Nail Bliss team for questions, feedback or collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <StaticPage title="Say" script="hello" path="/contact">
      <p>
        We&apos;d love to hear from you! Whether you have a question about a post, a nail design request,
        feedback, or a collaboration idea, drop us a line and we&apos;ll get back to you as soon as we can,
        usually within 2–3 business days.
      </p>
      <h2>Email</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Pinterest</h2>
      <p>
        Follow and message us on{" "}
        <a href={site.pinterest} target="_blank" rel="noopener noreferrer">
          Pinterest
        </a>{" "}
        for daily nail inspiration.
      </p>
      <h2>Please note</h2>
      <p>
        We&apos;re a nail inspiration blog, not a salon, so we can&apos;t take bookings. For medical concerns
        about your nails or skin, please speak with a dermatologist.
      </p>
    </StaticPage>
  );
}
