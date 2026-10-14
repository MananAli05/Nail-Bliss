export const site = {
  name: "Nail Bliss",
  tagline: "Nail designs, nail art ideas & nail care tips",
  description:
    "Nail Bliss is your daily dose of nail inspiration: trending nail designs, nail art ideas, nail shapes and easy nail care tips for beautiful, healthy nails.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nailbliss.com").replace(/\/$/, ""),
  // TODO: replace with the client's real details before launch
  email: "hello@nailbliss.com",
  pinterest: "https://www.pinterest.com/",
  locale: "en_US",
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
};

export const categories: Category[] = [
  {
    slug: "nail-care-tips",
    image: "/images/covers/clean-nails-cotton-pad.jpg",
    imageAlt: "Cleaning natural pink nails with a cotton pad",
    name: "Nail Care & Tips",
    short: "Healthy, strong, glossy nails",
    description:
      "Easy nail care tips for strong, healthy nails: make your manicure last longer, stop polish chipping and care for cuticles at home.",
    intro:
      "Beautiful nails start with healthy nails. Here you'll find simple, salon-approved routines to keep your nails strong, your cuticles soft and your manicure looking fresh for days longer.",
  },
  {
    slug: "nail-beauty",
    image: "/images/covers/soft-pink-manicure-bow-ring.jpg",
    imageAlt: "Soft pink manicure with white bow details and a gold bow ring",
    name: "Nail Beauty",
    short: "Polish, colors & glam looks",
    description:
      "Nail beauty inspiration: the best nail polish colors, trending manicure looks and beauty tips for gorgeous hands.",
    intro:
      "From the season's must-have polish colors to glossy, glam manicures, this is where nail beauty meets everyday style.",
  },
  {
    slug: "nail-shapes",
    image: "/images/covers/nude-almond-nails-gold-ring.jpg",
    imageAlt: "Nude pink almond-shaped nails with gold rings",
    name: "Nail Shapes",
    short: "Almond, oval, coffin & more",
    description:
      "A guide to nail shapes: almond, oval, squoval, coffin, ballerina and square. Find the best nail shape for your hands and fingers.",
    intro:
      "The right nail shape can make your fingers look longer and your manicure look polished. Discover which shape flatters your hands best.",
  },
  {
    slug: "nail-art-ideas",
    image: "/images/covers/butterfly-nail-art.jpg",
    imageAlt: "Pastel pink butterfly nail art on almond nails",
    name: "Nail Art Ideas",
    short: "DIY techniques & tutorials",
    description:
      "Creative nail art ideas with step-by-step tutorials: bows, florals, French tips, chrome and easy DIY nail art you can do at home.",
    intro:
      "Step-by-step nail art tutorials and creative techniques you can actually recreate at home, no salon needed.",
  },
  {
    slug: "nail-designs",
    image: "/images/covers/cherry-nail-art.jpg",
    imageAlt: "Cherry red nail design with hand-painted cherries",
    name: "Nail Designs",
    short: "Looks for every season",
    description:
      "Trending nail designs for every season and occasion: summer nails, wedding nails, holiday nails, short nail designs and more.",
    intro:
      "Ready-to-screenshot nail designs for every season, holiday and occasion. Save your favorites and show them to your nail tech.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
