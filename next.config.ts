import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Ignorar pastas desnecessárias no build
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
