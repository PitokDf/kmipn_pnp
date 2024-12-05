import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                protocol: "http",
                pathname: "/**",
                port: "2003"
            }
        ]
    }
};

export default nextConfig;
