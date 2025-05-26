import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getTagColorClasses } from "@/lib/tag-colors"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ColoredTagProps {
  tag: string
  href?: string
  className?: string
  highlightTag?: boolean
  tooltip?: string
  count?: number
}

export function ColoredTag({ tag, href, className = "", highlightTag = false, tooltip, count }: ColoredTagProps) {
  const colorClasses = getTagColorClasses(tag)

  // Create a shortened version of the tag if it's too long
  const displayTag = tag.length > 15 ? `${tag.substring(0, 12)}...` : tag

  const TagContent = () => (
    <span className="px-1.5 truncate max-w-full inline-block">
      {displayTag}
      {count !== undefined && <span className="ml-1 text-xs opacity-70">({count})</span>}
    </span>
  )

  const TagBadge = (
    <Badge
      variant="outline"
      className={`transition-colors h-7 inline-flex items-center px-1 ${colorClasses} ${className} ${
        highlightTag ? "ring-2 ring-offset-1 ring-offset-background" : ""
      } max-w-full`}
    >
      {href ? (
        <Link href={href} className="px-0.5 py-0.5 inline-flex items-center h-full truncate max-w-full">
          <TagContent />
        </Link>
      ) : (
        <TagContent />
      )}
    </Badge>
  )

  // If the tag is shortened or has a tooltip, wrap it in a tooltip
  if (tooltip || tag.length > 15) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{TagBadge}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip || tag}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return TagBadge
}
