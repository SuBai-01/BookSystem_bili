import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 把book/page.tx 里的mock数据链接分离出来，之后替换方便
  async rewrites() {
    return [{
      source: '/api/:path*',
      // //mock假数据
      // destination: 'https://mock.apifox.cn/m1/2398938-0-default/api/:path*'
      // 本地数据库数据
      destination: 'http://localhost:3005/api/:path*'
    }]
  },
  // picture url 解析
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pic.huitu.com",
      },
      {
        protocol: "https",
        hostname: "bpic.588ku.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
