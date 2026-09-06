import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes a fully static site to ./out
  // that can be served from any static host.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export. Images are served as-is from their src.
    unoptimized: true,
  },
};

export default nextConfig;
