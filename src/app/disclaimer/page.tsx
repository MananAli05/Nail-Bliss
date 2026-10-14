import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Nail Bliss content is for general information and inspiration only.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" path="/disclaimer" updated="October 14, 2026">
      <p>
        The information on {site.name} is provided for general information and inspiration only. We are
        not licensed nail technicians, dermatologists or medical professionals.
      </p>
      <h2>Not medical advice</h2>
      <p>
        Nail care tips shared here are not a substitute for professional medical advice. If you notice
        pain, swelling, discoloration, signs of infection or any unusual changes in your nails or skin,
        please see a doctor or dermatologist.
      </p>
      <h2>Products and allergies</h2>
      <p>
        Always read product labels, patch-test new products, and use nail products in a well-ventilated
        area. Stop using any product that causes irritation. Results may vary from person to person.
      </p>
      <h2>Advertising</h2>
      <p>
        {site.name} may display ads served by third parties such as Google AdSense. We do not control the
        content of these ads, and their appearance does not mean we endorse the products advertised.
      </p>
      <h2>Images</h2>
      <p>
        Some images on this site are illustrations created for inspiration and may not show a real
        finished manicure.
      </p>
    </StaticPage>
  );
}
