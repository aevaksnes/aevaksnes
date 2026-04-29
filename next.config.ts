import type { NextConfig } from "next";

/**
 * Next.js Configuration
 * This file allows you to customize the behavior of the Next.js framework.
 */
const nextConfig: NextConfig = {
  /* Configuring remote patterns allows next/image to optimize 
     images hosted on external domains like Firebase Storage.
  */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/**', // Allows all paths under your storage bucket
      },
    ],
    unoptimized: false, 
  },

  // Helps catch common React mistakes during development
  reactStrictMode: true,
};

export default nextConfig;