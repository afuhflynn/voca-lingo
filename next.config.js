/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uploadthing.com", "https://dashboard.vapi.ai"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dashboard.vapi.ai",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
