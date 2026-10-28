import type { NextConfig } from "next";

// Old Wix routes point at their new homes so existing links keep working.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/story", permanent: true },
      { source: "/book-an-event", destination: "/events", permanent: true },
      { source: "/partnerships", destination: "/events#partner", permanent: true },
    ];
  },
};

export default nextConfig;
