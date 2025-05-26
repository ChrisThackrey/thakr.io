"use client"

import { useState } from "react"
import { SocialShare } from "@/components/social-share"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogShareSectionProps {
  title: string
  url: string
  description?: string
  className?: string
  expanded?: boolean
}

export function BlogShareSection({ title, url, description, className, expanded = false }: BlogShareSectionProps) {
  const [isOpen, setIsOpen] = useState(expanded)

  return (
    <Card className={cn("w-full", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                <CardTitle className="text-lg">Share this article</CardTitle>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <CardDescription>Found this useful? Share it with your network</CardDescription>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <SocialShare title={title} url={url} description={description} showLabel={true} />
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground border-t pt-4">
            Thanks for sharing and supporting this content!
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
