import type { Components, Options } from "react-markdown";
import { cn } from "@/lib/utils";

/**
 * Default options for React Markdown
 */
export const defaultMarkdownOptions = {
  // Enable GitHub Flavored Markdown
  gfm: true,
  // Enable HTML in markdown
  allowedElements: [
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
    "code",
    "em",
    "strong",
    "del",
    "a",
    "img",
    "hr",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "div",
    "span",
    "br",
    "figure",
    "figcaption",
    "mark",
    "abbr",
    "kbd",
    "sub",
    "sup",
    "details",
    "summary",
    "dl",
    "dt",
    "dd",
  ],
};

/**
 * Custom components for React Markdown
 */
export function createMarkdownComponents(options?: {
  className?: string;
  headingClassName?: string;
  paragraphClassName?: string;
  linkClassName?: string;
  imageClassName?: string;
  codeClassName?: string;
  blockquoteClassName?: string;
  listClassName?: string;
}): Components {
  return {
    // Headings
    h1: ({ node, className, children, ...props }) => (
      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-16 mb-8 pb-2 border-b border-border",
          options?.headingClassName,
          className,
        )}
        id={typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : undefined}
        data-heading
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ node, className, children, ...props }) => (
      <h2
        className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tight mt-12 mb-6 pb-1 border-b border-border/70",
          options?.headingClassName,
          className,
        )}
        id={typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : undefined}
        data-heading
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ node, className, children, ...props }) => (
      <h3
        className={cn(
          "text-xl sm:text-2xl font-semibold tracking-tight mt-10 mb-4",
          options?.headingClassName,
          className,
        )}
        id={typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : undefined}
        data-heading
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ node, className, children, ...props }) => (
      <h4
        className={cn(
          "text-lg sm:text-xl font-semibold tracking-tight mt-8 mb-3",
          options?.headingClassName,
          className,
        )}
        id={typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : undefined}
        data-heading
        {...props}
      >
        {children}
      </h4>
    ),

    // Paragraphs
    p: ({ node, className, children, ...props }) => (
      <p
        className={cn(
          "text-base sm:text-lg leading-7 sm:leading-8 tracking-normal mb-6",
          options?.paragraphClassName,
          className,
        )}
        data-paragraph
        {...props}
      >
        {children}
      </p>
    ),

    // Links
    a: ({ node, className, href, children, ...props }) => (
      <a
        href={href}
        className={cn(
          "text-primary hover:text-primary/80 transition-colors border-b border-primary/30 hover:border-primary/80",
          options?.linkClassName,
          className,
        )}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),

    // Code blocks
    code: ({ node, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !match
        ? (
          <code
            className={cn(
              "bg-muted px-1.5 py-0.5 rounded text-sm font-mono border border-border/30",
              options?.codeClassName,
              className,
            )}
            {...props}
          >
            {children}
          </code>
        )
        : (
          <div className="relative">
            <pre
              className={cn(
                "bg-muted/80 p-4 rounded-lg overflow-x-auto my-8 border border-border/30",
                options?.codeClassName,
                className,
              )}
            >
            <code className={cn("text-sm font-mono", `language-${match[1]}`)}>{children}</code>
            </pre>
            <div className="absolute top-2 right-2 text-xs text-muted-foreground px-2 py-1 rounded bg-muted">
              {match[1]}
            </div>
          </div>
        );
    },

    // Blockquotes
    blockquote: ({ node, className, children, ...props }) => (
      <blockquote
        className={cn(
          "border-l-4 border-primary/40 pl-6 py-4 my-8 italic text-muted-foreground bg-muted/20 rounded-r",
          options?.blockquoteClassName,
          className,
        )}
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Lists
    ul: ({ node, className, children, ...props }) => (
      <ul
        className={cn(
          "my-6 ml-6 space-y-2 text-base sm:text-lg",
          options?.listClassName,
          className,
        )}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ node, className, children, ...props }) => (
      <ol
        className={cn(
          "my-6 ml-6 space-y-2 text-base sm:text-lg",
          options?.listClassName,
          className,
        )}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ node, className, children, ...props }) => (
      <li
        className={cn("mb-2 pl-2 leading-7 sm:leading-8", className)}
        {...props}
      >
        {children}
      </li>
    ),

    // Images
    img: ({ node, className, src, alt, ...props }) => (
      <img
        src={src || "/placeholder.svg"}
        alt={alt || ""}
        className={cn(
          "rounded-lg shadow-md my-10 mx-auto max-w-full",
          options?.imageClassName,
          className,
        )}
        loading="lazy"
        {...props}
      />
    ),

    // Figure and figcaption
    figure: ({ node, className, children, ...props }) => (
      <figure className={cn("my-10", className)} {...props}>
        {children}
      </figure>
    ),
    figcaption: ({ node, className, children, ...props }) => (
      <figcaption
        className={cn(
          "text-sm text-center text-muted-foreground mt-2 italic",
          className,
        )}
        {...props}
      >
        {children}
      </figcaption>
    ),

    // Tables
    table: ({ node, className, children, ...props }) => (
      <div className="overflow-x-auto my-8">
        <table
          className={cn(
            "w-full border-collapse text-sm sm:text-base",
            className,
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ node, className, children, ...props }) => (
      <thead className={cn("bg-muted", className)} {...props}>
        {children}
      </thead>
    ),
    tbody: ({ node, className, children, ...props }) => (
      <tbody className={className} {...props}>
        {children}
      </tbody>
    ),
    tr: ({ node, className, children, ...props }) => (
      <tr className={cn("border-b border-muted", className)} {...props}>
        {children}
      </tr>
    ),
    th: ({ node, className, children, ...props }) => (
      <th
        className={cn(
          "border border-border p-2 text-left font-semibold",
          className,
        )}
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ node, className, children, ...props }) => (
      <td
        className={cn("border border-border p-2 text-left", className)}
        {...props}
      >
        {children}
      </td>
    ),

    // Horizontal rule
    hr: ({ node, className, ...props }) => (
      <hr
        className={cn(
          "my-12 border-t-2 border-border/50 max-w-md mx-auto",
          className,
        )}
        {...props}
      />
    ),

    // Enhanced elements
    mark: ({ node, className, children, ...props }) => (
      <mark
        className={cn(
          "bg-yellow-200 dark:bg-yellow-800 px-1 rounded",
          className,
        )}
        {...props}
      >
        {children}
      </mark>
    ),

    kbd: ({ node, className, children, ...props }) => (
      <kbd
        className={cn(
          "bg-muted px-2 py-1 text-xs font-mono rounded border border-border shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </kbd>
    ),

    sub: ({ node, className, children, ...props }) => (
      <sub className={cn("text-xs", className)} {...props}>
        {children}
      </sub>
    ),

    sup: ({ node, className, children, ...props }) => (
      <sup className={cn("text-xs", className)} {...props}>
        {children}
      </sup>
    ),

    // Definition lists
    dl: ({ node, className, children, ...props }) => (
      <dl className={cn("my-6", className)} {...props}>
        {children}
      </dl>
    ),

    dt: ({ node, className, children, ...props }) => (
      <dt className={cn("font-semibold mt-4", className)} {...props}>
        {children}
      </dt>
    ),

    dd: ({ node, className, children, ...props }) => (
      <dd className={cn("ml-4 mb-4", className)} {...props}>
        {children}
      </dd>
    ),

    // Details and summary
    details: ({ node, className, children, ...props }) => (
      <details
        className={cn(
          "my-4 border border-border rounded-md overflow-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </details>
    ),

    summary: ({ node, className, children, ...props }) => (
      <summary
        className={cn("bg-muted/50 p-3 cursor-pointer font-medium", className)}
        {...props}
      >
        {children}
      </summary>
    ),
  };
}

// Re-export for backward compatibility
export default {
  defaultMarkdownOptions,
  createMarkdownComponents,
};
