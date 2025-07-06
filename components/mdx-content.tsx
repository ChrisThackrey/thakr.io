import { MDXRemote } from "next-mdx-remote/rsc"
import { useMDXComponents } from "@/mdx-components"

interface MDXContentProps {
  source: string
}

export async function MDXContent({ source }: MDXContentProps) {
  const mdxComponents = useMDXComponents({})
  return <MDXRemote source={source} components={mdxComponents} />
}
