import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"
import { TOC } from "@/components/toc"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default elements with custom styling
    h1: ({ children }) => (
      <h1
        className="text-4xl font-bold tracking-tight mt-8 mb-4"
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="text-3xl font-bold tracking-tight mt-8 mb-4"
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-2xl font-bold tracking-tight mt-6 mb-3"
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className="text-xl font-bold tracking-tight mt-4 mb-2"
        id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h4>
    ),
    p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
    a: ({ href, children }) => (
      <Link href={href || "#"} className="text-primary hover:underline">
        {children}
      </Link>
    ),
    img: ({ src, alt, width, height }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={Number(width) || 800}
        height={Number(height) || 450}
        className="rounded-lg my-6"
      />
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
    code: ({ children }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{children}</code>,
    // Add custom components
    TOC,
    ...components,
  }
}
