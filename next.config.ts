import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/chat",
        destination: "http://localhost:3000/chat",
      },
    ];
  },
  // 添加额外的配置以支持流式响应
  experimental: {
    allowedRevalidateHeaderKeys: ["*"],
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
