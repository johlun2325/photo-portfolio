import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  basePath: isProduction ? '/photo-portfolio' : '',
  assetPrefix: isProduction ? '/photo-portfolio' : '',
};

export default nextConfig;
