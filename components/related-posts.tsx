import { BlogPostCard } from "./blog-post-card"
import type { BlogPost } from "@/types/blog"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Related Posts</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
