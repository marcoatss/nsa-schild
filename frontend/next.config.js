/** @type {import('next').NextConfig} */

const createBundleAnalyzerPlugin = require("@next/bundle-analyzer");
const createNextIntlPlugin = require("next-intl/plugin");

const withBundleAnalyzer = createBundleAnalyzerPlugin();
const withNextIntl = createNextIntlPlugin();

let nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.backend.schild.taotor.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

nextConfig =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;

nextConfig = withNextIntl(nextConfig);

module.exports = nextConfig;
