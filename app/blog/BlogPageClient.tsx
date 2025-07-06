"use client"

import { useState, useEffect } from "react"
import { TagFilterDropdown } from "@/components/tag-filter-dropdown"
import { getAllTags, getAllBlogPosts, type BlogPost } from "@/lib/blog"
import { CategorizedTagCloud } from "@/components/categorized-tag-cloud"
import { TagCategoryPills } from "@/components/tag-category-pills"
import { getTagsByCategory } from "@/lib/tag-categories"
import { BlogPostCard } from "@/components/blog-post-card"
import { FeaturedPostsCarousel } from "@/components/featured-posts-carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionTitle } from "@/components/section-title"

interface BlogPageClientProps {
  posts?: BlogPost[]
  featuredPosts?: BlogPost[]
}

export default function BlogPageClient({ posts = [], featuredPosts = [] }: BlogPageClientProps) {
  // Use the provided posts or get all blog posts if none provided  
  const allBlogPosts = posts.length > 0 ? posts : getAllBlogPosts()

  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(allBlogPosts)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filterMode, setFilterMode] = useState<"AND" | "OR">("OR")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>("all")

  const getFilteredPosts = () => {
    let filtered = [...allBlogPosts]

    // Filter by category first
    if (selectedCategory) {
      const categoryTags = getTagsByCategory(selectedCategory)
      filtered = filtered.filter((post) => post.tags && post.tags.some((tag) => categoryTags.includes(tag)))
    }

    // Then apply tag filters
    if (selectedTags.length === 0) return filtered

    return filtered.filter((post) => {
      if (!post.tags) return false

      if (filterMode === "OR") {
        return selectedTags.some((tag) => post.tags.includes(tag))
      } else {
        return selectedTags.every((tag) => post.tags.includes(tag))
      }
    })
  }

  useEffect(() => {
    setFilteredPosts(getFilteredPosts())
  }, [selectedTags, filterMode, selectedCategory])

  const handleSelectTag = (tag: string) => {
    setSelectedTags((prev) => {
      // Don't add the tag if it's already selected
      if (prev.includes(tag)) return prev
      return [...prev, tag]
    })
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  const handleClearTags = () => {
    setSelectedTags([])
  }

  const handleChangeFilterMode = (mode: "AND" | "OR") => {
    setFilterMode(mode)
  }

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId ?? undefined)
  }

  return (
    <div className="space-y-10">
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <SectionTitle>Featured Articles</SectionTitle>
          <div className="mt-6">
            <FeaturedPostsCarousel posts={featuredPosts} />
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <main className="col-span-1 md:col-span-3">
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">All Articles</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <p>No posts found matching your filters.</p>
              )}
            </TabsContent>
            <TabsContent value="latest" className="mt-0">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...filteredPosts]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((post) => (
                      <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
              ) : (
                <p>No posts found matching your filters.</p>
              )}
            </TabsContent>
            <TabsContent value="popular" className="mt-0">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* For now, just show the same posts since we don't have popularity data */}
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <p>No posts found matching your filters.</p>
              )}
            </TabsContent>
          </Tabs>
        </main>

        <aside className="space-y-8">
          <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-4">Filter by Category</h3>
            <TagCategoryPills selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
          </div>

          <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <TagFilterDropdown
              tags={selectedCategory ? getTagsByCategory(selectedCategory) : getAllTags()}
              selectedTags={selectedTags}
              filterMode={filterMode}
              onSelectTag={handleSelectTag}
              onRemoveTag={handleRemoveTag}
              onClearTags={handleClearTags}
              onChangeFilterMode={handleChangeFilterMode}
            />
          </div>

          <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="font-medium text-lg p-4 border-b">Topics by Category</h3>
            <CategorizedTagCloud onSelectTag={handleSelectTag} />
          </div>
        </aside>
      </div>
    </div>
  )
}
