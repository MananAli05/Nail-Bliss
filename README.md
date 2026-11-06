# Nail Bliss

A nail beauty blog (nail designs, nail art ideas, nail shapes and nail care tips) for a US audience coming from Pinterest and Google. Built with Next.js 16 and Tailwind CSS 4, with every page pre-rendered for speed and SEO.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Adding a post (admin panel)

Posts are managed with [Keystatic](https://keystatic.com) at `/keystatic`:

- **Live site:** open https://www.nailblissbs.com/keystatic and log in with GitHub. Only GitHub accounts with write access to this repo can edit. Saving a post commits it to GitHub, and Vercel publishes it in about 1–2 minutes.
- **Locally:** run `npm run dev`, then open http://localhost:3000/keystatic. Edits are written straight to the files in `content/posts/`.

Each post is a Markdown file in `content/posts/` (the file name is the URL slug), with its images in `public/images/posts/<slug>/`. Image sizes are read from the files automatically.

### One-time GitHub setup for the live admin

1. Locally, put `NEXT_PUBLIC_KEYSTATIC_GITHUB=1` in `.env.local`, run `npm run dev` and open http://localhost:3000/keystatic.
2. Follow the prompt to create the GitHub App, and install it on this repository. Keystatic writes the four `KEYSTATIC_*` keys to a local `.env` file (never commit it).
3. In the GitHub App settings, add the callback URL `https://www.nailblissbs.com/api/keystatic/github/oauth/callback`.
4. Add the four keys to Vercel (Settings → Environment Variables; mark the client secret and `KEYSTATIC_SECRET` as Secret) and redeploy.
5. Remove `NEXT_PUBLIC_KEYSTATIC_GITHUB=1` from `.env.local`.

Until the keys are set, the live admin stays switched off (its API returns 404).

## Configuration

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: live domain
- `NEXT_PUBLIC_PINTEREST_VERIFY`: Pinterest site verification code
- `NEXT_PUBLIC_ADSENSE_CLIENT`: AdSense publisher ID (ads stay hidden until it's set)

Site name, contact email, Pinterest link and categories are in `src/lib/site.ts`.
