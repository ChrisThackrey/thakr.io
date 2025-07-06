"use client";
import ReactMarkdown from "react-markdown";
import {
  createMarkdownComponents,
  defaultMarkdownOptions,
} from "@/lib/markdown-config";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  headingClassName?: string;
  paragraphClassName?: string;
  linkClassName?: string;
  imageClassName?: string;
  codeClassName?: string;
  blockquoteClassName?: string;
  listClassName?: string;
}

export function MarkdownRenderer({
  content,
  className,
  headingClassName,
  paragraphClassName,
  linkClassName,
  imageClassName,
  codeClassName,
  blockquoteClassName,
  listClassName,
}: MarkdownRendererProps) {
  const components = createMarkdownComponents({
    className,
    headingClassName,
    paragraphClassName,
    linkClassName,
    imageClassName,
    codeClassName,
    blockquoteClassName,
    listClassName,
  });

  return (
    <div className={className}>
      <ReactMarkdown {...defaultMarkdownOptions} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
