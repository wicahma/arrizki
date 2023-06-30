/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["via.placeholder.com", "localhost", "api.arrizkitour.com"],
  },
};

module.exports = nextConfig;
