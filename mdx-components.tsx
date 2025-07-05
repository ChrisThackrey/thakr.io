import type { MDXComponents } from "mdx/types"
import { BlogPostImage } from "@/components/blog-image"
import { EnhancedLink } from "@/components/micro-interactions/enhanced-link"
import { cn } from "@/lib/utils"

// This file is used to customize the rendering of MDX content.
// We are adding the 'font-cal' class to all headings to ensure consistent styling.

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("font-cal text-4xl font-bold tracking-tight md:text-5xl mt-12 mb-8", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("font-cal text-3xl font-bold tracking-tight mt-12 mb-6", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("font-cal text-2xl font-bold tracking-tight mt-8 mb-4", className)} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn("font-cal text-xl font-bold tracking-tight mt-6 mb-3", className)} {...props} />
  ),
  h5: ({ className, ...props }) => <h5 className={cn("font-cal text-lg font-bold", className)} {...props} />,
  h6: ({ className, ...props }) => <h6 className={cn("font-cal text-base font-bold", className)} {...props} />,
  img: (props) => (
    <span className="block my-8">
      <BlogPostImage {...props} />
    </span>
  ),
  a: (props) => <EnhancedLink {...props} />,
  // You can add other custom components here, e.g., for <pre> or <code>
}
