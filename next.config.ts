import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary, env-gated output dir used only for isolated perf measurement
  // builds so a running `next dev` (which owns `.next`) is never disturbed.
  // Falls back to the default `.next` whenever PERF_DISTDIR is unset.
  distDir: process.env.PERF_DISTDIR || ".next",
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
