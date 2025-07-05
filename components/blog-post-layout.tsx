import type React from "react"
import { MDXRemote } from "next-mdx-remote"
import type { BlogPost } from "../types"
import Layout from "./layout"
import Head from "next/head"
import { parseISO, format } from "date-fns"
import { RelatedTags } from "./related-tags"
import Link from "next/link"

type Props = {
  post: BlogPost
  content: any
}

const BlogPostLayout: React.FC<Props> = ({ post, content }) => {
  const { title, date, tags, excerpt, slug } = post

  return (
    <Layout>
      <Head>
        <title>{title} - My Blog</title>
        <meta name="description" content={excerpt} />
      </Head>
      <article className="mx-auto max-w-3xl py-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="text-gray-600 mb-4">Published {format(parseISO(date), "MMMM dd, yyyy")}</div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/categories/${tag.toLowerCase()}`}
                className="bg-muted hover:bg-muted/80 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <MDXRemote {...content} />
        <hr className="my-8" />
        {post.tags && post.tags.length > 0 && <RelatedTags post={post} />}
      </article>
    </Layout>
  )
}

export default BlogPostLayout
