import type { MDXComponents } from "mdx/types"
import Image, { type ImageProps } from "next/image"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Code, LinkIcon, Info, Lightbulb, TriangleAlert } from "lucide-react"
import { CopyButton } from "./components/copy-button"
import React from "react"

// Custom Link Component to handle internal and external links
const CustomLink = (props: React.ComponentProps<"a">) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return <Link href={href} {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

// Custom Heading Component factory to add anchor links on hover
const createHeading = (level: 1 | 2 | 3) => {
  const Tag: `h${typeof level}` = `h${level}`
  const Heading = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    if (typeof children !== "string") {
      return <Tag {...props}>{children}</Tag>
    }
    const slug = children
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")

    return (
      <Tag id={slug} className="group scroll-m-20" {...props}>
        {children}
        <a
          href={`#${slug}`}
          className="ml-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`Link to section: ${children}`}
        >
          <LinkIcon className="inline-block h-5 w-5" />
        </a>
      </Tag>
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}

// Custom `pre` component for code blocks with title and copy button
const CustomPre = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  const codeElement = React.Children.only(children) as React.ReactElement<{
    children: string
    className?: string
    title?: string
  }>
  const codeString = codeElement.props.children.trim()
  const title = codeElement.props.title

  return (
    <div className="not-prose my-6 rounded-lg border bg-zinc-900 text-sm text-zinc-50">
      {title && (
        <div className="flex items-center gap-2 rounded-t-lg border-b border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-400">
          <Code className="h-4 w-4" />
          <span>{title}</span>
        </div>
      )}
      <div className="relative">
        <pre {...props} className="p-4 overflow-x-auto">
          {children}
        </pre>
        <CopyButton code={codeString} />
      </div>
    </div>
  )
}

// Custom Callout component for info/warning boxes
const Callout = ({
  icon: Icon = Info,
  children,
  ...props
}: {
  icon?: React.ElementType
  children: React.ReactNode
}) => {
  return (
    <div className="not-prose my-6 flex items-start gap-4 rounded-lg border border-l-4 p-4" {...props}>
      <Icon className="mt-1 h-5 w-5 flex-shrink-0" />
      <div className="w-full">{children}</div>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Standard HTML elements
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
    a: CustomLink,
    ul: ({ children }) => <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>,
    li: ({ children }) => <li className="pl-2">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-muted-foreground pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    img: (props) => (
      <figure className="flex flex-col items-center">
        <Image width={804} height={452} sizes="(max-width: 768px) 100vw, 700px" {...(props as ImageProps)} />
        {props.alt && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{props.alt}</figcaption>}
      </figure>
    ),
    hr: () => <hr className="my-8 border-border" />,
    code: ({ children }) => (
      <code className="bg-muted text-muted-foreground rounded-md px-2 py-1 font-mono text-sm">{children}</code>
    ),
    pre: CustomPre,

    // Custom components
    Alert: ({ children, ...props }) => (
      <Alert {...props} className="my-6">
        {children}
      </Alert>
    ),
    AlertTitle,
    AlertDescription,
    Callout,
    InfoIcon: Info,
    IdeaIcon: Lightbulb,
    WarningIcon: TriangleAlert,

    ...components,
  }
}
