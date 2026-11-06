/**
 * The admin (Keystatic) only runs locally, or in production once the GitHub App
 * keys are set. Without them the admin API returns 404, so nobody can reach an
 * unauthenticated editor on the live site.
 */
export const adminEnabled =
  process.env.NODE_ENV === "development" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  );
