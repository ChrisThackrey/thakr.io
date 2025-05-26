import { NextResponse } from "next/server"
import { getAllBlogPosts } from "@/lib/blog"

export async function GET() {
  try {
    // Get all blog posts
    const posts = await getAllBlogPosts()

    // Create an array of routes to prefetch
    const routes = [
      // Blog post routes
      ...posts.map((post) => `/blog/${post.slug}`),

      // Architecture project routes
      "/architecture/modern-urban-housing",
      "/architecture/tech-innovation-center",
      "/architecture/riverside-cultural-complex",

      // Add other dynamic routes as needed
    ]

    return NextResponse.json(routes)
  } catch (error) {
    console.error("Error generating routes for prefetching:", error)
    return NextResponse.json([], { status: 500 })
  }
}
