// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
  
// };

// export default nextConfig;



// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.watchOptions = {
//         poll: 1000,           // check every 1s
//         aggregateTimeout: 300 // delay rebuild slightly
//       };
//     }
//     return config;
//   }
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mernstack-project.s3.eu-north-1.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
