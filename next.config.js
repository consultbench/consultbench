const path = require("node:path");
const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
