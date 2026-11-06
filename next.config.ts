import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic's GitHub login redirects local dev to 127.0.0.1 (dev-only setting)
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
