import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create an array of routes to prefetch
    const routes = [
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
