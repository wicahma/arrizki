/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "localhost", "api.arrizkitour.com"],
  },
  env: {
    API_URL: "https://api.arrizkitour.com",
  },
};

module.exports = nextConfig;
