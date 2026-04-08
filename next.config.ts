import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "delvgmrcfaeubuixprwz.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
    ],
  },
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Transpile packages that use ESM-only modules
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Webpack config to handle assets imported from src/assets
  webpack: (config) => {
    // Handle video/audio files imported as modules (replaces Vite's asset handling)
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|wav|mp3|flac|aac)$/,
      type: "asset/resource",
    });
    // Handle image files imported as modules
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|webp|avif|ico|bmp|tiff?)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
