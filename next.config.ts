import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  basePath: '/johlun2325/photo-portfolio',
  assetPrefix: '/johlun2325/photo-portfolio',
};

export default nextConfig;
