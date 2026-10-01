import type { NextConfig } from "next";

/**
 * Static export: the landing page is plain HTML/CSS served from any static
 * host. It has no server runtime and no runtime dependency on the Na Pista
 * API, the Console or the UL Platform — it only links to them.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
