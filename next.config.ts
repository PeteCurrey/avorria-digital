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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Transpile packages that use ESM-only modules
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  async redirects() {
    return [
      {
        source: '/web-design/for/trades',
        destination: '/services/web-design',
        permanent: true,
      },
      {
        source: '/seo-agency/for/professional-services',
        destination: '/services/seo',
        permanent: true,
      },
      {
        source: '/paid-media-agency/for/saas',
        destination: '/services/paid-media',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
