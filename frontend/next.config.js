const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "localhost",
      "localhost:1337",
      "127.0.0.1",
      "res.cloudinary.com",
      "media.dev.to",
    ],
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
