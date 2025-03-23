import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: process.env.HOSTNAME!,
                protocol: "http",
                // pathname: "/**",
                // port: "2003"
            },
            {
                hostname: "drive.google.com",
                protocol: "https",
            }
        ]
    }
};

export default nextConfig;
