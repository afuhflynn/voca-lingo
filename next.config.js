/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dashboard.vapi.ai",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**", // allow avatar URLs like /u/138466374?v=4
      },
    ],
  },
};

module.exports = nextConfig;
