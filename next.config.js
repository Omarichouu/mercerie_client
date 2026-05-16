// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = {
//   env: {
//     NEXT_PUBLIC_MY_URL: process.env.NEXT_PUBLIC_MY_URL,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'assets.aceternity.com',
//         port: '',
       
//       },
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
       
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         port: '',
       
//       },
//       {
//         protocol: 'https',
//         hostname: 'firebasestorage.googleapis.com',
//         port: '',
       
//       },
//     ],
//   },
// }



const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'standalone',
  env: {
        NEXT_PUBLIC_MY_URL: process.env.NEXT_PUBLIC_MY_URL,
      },
      images: {
        // Disable Next.js built-in image optimization to avoid Vercel image
        // transformation quota usage. We use external CDN / transformed URLs
        // (Cloudinary, etc.) and/or plain <img> for delivery.
        unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.aceternity.com',
            port: '',
           
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
           
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
           
          },
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
           
          },
        ],
      },
};
 
module.exports = withNextIntl(nextConfig);
