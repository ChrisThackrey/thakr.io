import type React from "react"
import { MDXRemote } from "next-mdx-remote"
import type { BlogPost } from "../types"
import Layout from "./layout"
import Head from "next/head"
import { parseISO, format } from "date-fns"
import { RelatedTags } from "./related-tags"

type Props = {
  post: BlogPost
  content: any
}

const BlogPostLayout: React.FC<Props> = ({ post, content }) => {
  return (
    <Layout>
      <Head>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article className="mx-auto max-w-3xl py-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-4">Published {format(parseISO(post.date), "MMMM dd, yyyy")}</div>
        <MDXRemote {...content} />
        <hr className="my-8" />
        {post.tags && post.tags.length > 0 && <RelatedTags post={post} />}
      </article>
    </Layout>
  )
}

export default BlogPostLayout
