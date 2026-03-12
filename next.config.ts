import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      // Instagram CDN (real post images)
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
      // Sanity image CDN (columna mainImage)
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
