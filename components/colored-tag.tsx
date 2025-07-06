import Link from "next/link"
import { getTagColors } from "../lib/tag-colors"

interface ColoredTagProps {
  tag: string
  highlightTag?: boolean
  small?: boolean
  href?: string
}

export function ColoredTag({ tag, highlightTag = false, small = false, href }: ColoredTagProps) {
  const baseClasses = `inline-block rounded-full ${small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"} ${getTagColors(
    tag,
  )} ${highlightTag ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400" : ""}`

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} hover:opacity-90 transition-opacity`}>
        {tag}
      </Link>
    )
  }

  return <span className={baseClasses}>{tag}</span>
}

export default ColoredTag
