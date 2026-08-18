/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // The blog is hidden for now; send /blog and all sub-routes home.
      {
        source: "/blog",
        destination: "/",
        permanent: false,
      },
      {
        source: "/blog/:path+",
        destination: "/",
        permanent: false,
      },
      // Architecture works are likewise behind a coming-soon screen; send all
      // project sub-routes to /architecture.
      {
        source: "/architecture/:path+",
        destination: "/architecture",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
