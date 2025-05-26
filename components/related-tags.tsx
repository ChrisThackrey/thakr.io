import { ColoredTag } from "./colored-tag"
import { getRelatedTags, getRelationshipDescription } from "@/lib/related-tags"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

interface RelatedTagsProps {
  currentTag: string
  limit?: number
  minScore?: number
}

export function RelatedTags({ currentTag, limit = 5, minScore = 0.2 }: RelatedTagsProps) {
  const relatedTags = getRelatedTags(currentTag, limit, minScore)

  if (relatedTags.length === 0) {
    return null
  }

  return (
    <Card className="mt-12 backdrop-blur-sm bg-background/80 dark:bg-background/80 border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Related Topics</CardTitle>
        <CardDescription>Other topics that frequently appear with "{currentTag}"</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {relatedTags.map(({ tag, score }) => (
            <div key={tag} className="flex flex-col items-center gap-1">
              <ColoredTag
                tag={tag}
                href={`/blog/categories/${encodeURIComponent(tag)}`}
                className="text-base px-1 py-0.5"
              />
              <Badge variant="outline" className="text-xs bg-transparent border-transparent text-muted-foreground">
                {getRelationshipDescription(score)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
