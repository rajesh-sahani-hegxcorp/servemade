import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.servemade.example" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/why-verdano",
        destination: "/why-serve-made",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
