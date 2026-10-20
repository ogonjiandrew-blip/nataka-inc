/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/kpop-in-kenya-nairobi-fandom-kwave",
        destination: "/kwave",
        permanent: false,
      },
      {
        source: "/work/kwanini",
        destination: "/work/ssaru-fathermoh-kwanini",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
