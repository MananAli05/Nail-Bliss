# Nail Bliss

A nail beauty blog (nail designs, nail art ideas, nail shapes and nail care tips) for a US audience coming from Pinterest and Google. Built with Next.js 16 and Tailwind CSS 4, with every page pre-rendered for speed and SEO.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Adding a post

Add the images to `public/images/posts/` (Pinterest pin) and `public/images/covers/` (photo for cards), then create a Markdown file in `content/posts/`. The file name becomes the URL slug. Copy the front matter from an existing post and change the values. `category` must be one of `nail-care-tips`, `nail-beauty`, `nail-shapes`, `nail-art-ideas` or `nail-designs`.

## Configuration

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: live domain
- `NEXT_PUBLIC_PINTEREST_VERIFY`: Pinterest site verification code
- `NEXT_PUBLIC_ADSENSE_CLIENT`: AdSense publisher ID (ads stay hidden until it's set)

Site name, contact email, Pinterest link and categories are in `src/lib/site.ts`.
