import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cloud.appwrite.io"],
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
