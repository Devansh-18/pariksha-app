import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging:{
    fetches:{
      fullUrl:true,
    }
  }
};

export default nextConfig;
