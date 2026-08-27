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
      {
        source: "/products/bagasse-rectangular-container",
        destination: "/products/rectangle-container-with-lid",
        permanent: true,
      },
      {
        source: "/products/bagasse-3-compartment-round-plate",
        destination: "/products/bagasse-round-plate",
        permanent: true,
      },
      {
        source: "/products/bagasse-4-compartment-round-plate",
        destination: "/products/bagasse-round-plate",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
