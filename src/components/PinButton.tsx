import { absoluteUrl } from "@/lib/site";
import { PinterestIcon } from "./icons";

/** Pinterest "Save" link. Plain anchor, so no Pinterest script is loaded (faster pages). */
export function PinButton({
  url,
  image,
  description,
  className = "",
  label = "Save",
}: {
  url: string;
  image: string;
  description: string;
  className?: string;
  label?: string;
}) {
  const href =
    "https://www.pinterest.com/pin/create/button/?" +
    new URLSearchParams({
      url: absoluteUrl(url),
      media: absoluteUrl(image),
      description,
    }).toString();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={`Save "${description}" to Pinterest`}
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:brightness-110 ${className}`}
    >
      <PinterestIcon className="size-4" />
      {label}
    </a>
  );
}
