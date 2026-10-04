/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/work/kwanini",
        destination: "/work/ssaru-fathermoh-kwanini",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
