import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent framing / clickjacking (except for allowed self-embeds if needed)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Disable MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Hide referrer on cross-origin navigation
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unneeded browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Force HTTPS for 1 year (only meaningful in production)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Limit cross-origin interactions
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // remove X-Powered-By: Next.js

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // If you later migrate bg-image to <Image>, whitelist remote hosts here.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
