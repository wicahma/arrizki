/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "localhost", "api.arrizkitour.com"],
  },
  env: {
    API_URL: "http://localhost:4000",
  },
};

module.exports = nextConfig;
