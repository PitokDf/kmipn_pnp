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
            }
        ]
    }
};

export default nextConfig;
