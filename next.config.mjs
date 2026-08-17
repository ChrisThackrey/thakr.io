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
      // Blog posts are hidden behind a coming-soon screen for now; send all
      // blog sub-routes (posts, series, tags) to /blog.
      {
        source: "/blog/:path+",
        destination: "/blog",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
