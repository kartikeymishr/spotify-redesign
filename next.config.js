/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rb.gy",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
