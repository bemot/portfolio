const path = require("path");

module.exports = {
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "localhost",
      "localhost:1337",
      "127.0.0.1",
      "my-portfolio-dawn-glade-2810.fly.dev",
      "res.cloudinary.com",
      "media.dev.to",
      "media2.dev.to",
      "dev-to-uploads.s3.amazonaws.com",
      "cdn.simpleicons.org",
      "cdn-icons-png.flaticon.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["react-icons", "lottie-react"],
  },
};

//
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "1337",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//     ],
//   },
// };
//
