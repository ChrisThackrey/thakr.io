import type { ReactNode } from "react"

interface BlogLayoutProps {
  children: ReactNode
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <article
      className="
        prose prose-lg dark:prose-invert 
        max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:mb-4
        prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mt-10 prose-h3:mb-4
        prose-p:leading-relaxed
        prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md prose-code:font-mono
        prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg
        prose-img:rounded-xl prose-img:shadow-md
        prose-li:my-2
      "
      data-blog-content="true"
    >
      {children}
    </article>
  )
}
