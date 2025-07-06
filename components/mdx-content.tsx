import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/mdx-components"

interface MDXContentProps {
  source: string
}

export async function MDXContent({ source }: MDXContentProps) {
  // @ts-expect-error - MDXRemote is an async component which is valid in Next.js 15
  return <MDXRemote source={source} components={mdxComponents} />
}
