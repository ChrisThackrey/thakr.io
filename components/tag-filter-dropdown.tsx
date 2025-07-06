"use client"

import { useState } from "react"
import { Check, ChevronDown, Filter, X, Plus, FlagIcon as Union, Divide } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { ColoredTag } from "@/components/colored-tag"
import { getAllTags, getTagCounts } from "@/lib/blog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type FilterMode = "OR" | "AND"

interface TagFilterDropdownProps {
  tags?: string[]
  selectedTags: string[]
  filterMode: FilterMode
  onSelectTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
  onClearTags: () => void
  onChangeFilterMode: (mode: FilterMode) => void
  className?: string
}

export function TagFilterDropdown({
  selectedTags,
  filterMode,
  onSelectTag,
  onRemoveTag,
  onClearTags,
  onChangeFilterMode,
  className,
}: TagFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const tags = getAllTags()
  const tagCounts = getTagCounts()

  // Sort tags by count (most posts first)
  const sortedTags = [...tags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2 mb-2">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant={selectedTags.length > 0 ? "default" : "outline"} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter Posts</span>
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-1 font-normal">
                  {selectedTags.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[280px]">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Filter by Tags</span>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClearTags()
                    setIsOpen(false)
                  }}
                >
                  Clear all
                </Button>
              )}
            </DropdownMenuLabel>

            {selectedTags.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Filter Mode:</div>
                  <DropdownMenuRadioGroup
                    value={filterMode}
                    onValueChange={(value) => onChangeFilterMode(value as FilterMode)}
                  >
                    <div className="flex gap-2">
                      <DropdownMenuRadioItem value="OR" className="flex-1 justify-center">
                        <Union className="mr-2 h-4 w-4" />
                        <span>OR</span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="AND" className="flex-1 justify-center">
                        <Divide className="mr-2 h-4 w-4" />
                        <span>AND</span>
                      </DropdownMenuRadioItem>
                    </div>
                  </DropdownMenuRadioGroup>
                  <div className="text-xs text-muted-foreground mt-1">
                    {filterMode === "OR" ? "Posts with any selected tag" : "Posts with all selected tags"}
                  </div>
                </div>
              </>
            )}

            <DropdownMenuSeparator />

            <ScrollArea className="h-[300px]">
              <DropdownMenuGroup>
                {sortedTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag)
                  return (
                    <DropdownMenuItem
                      key={tag}
                      className={cn("flex justify-between items-center", isSelected && "bg-accent")}
                      onClick={(e) => {
                        e.preventDefault()
                        if (isSelected) {
                          onRemoveTag(tag)
                        } else {
                          onSelectTag(tag)
                        }
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4 opacity-50" />}
                        <ColoredTag tag={tag} />
                      </span>
                      <Badge variant="outline" className="ml-auto">
                        {tagCounts[tag] || 0}
                      </Badge>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Show selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="h-7 px-2 font-normal">
                  {filterMode === "OR" ? "ANY" : "ALL"}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{filterMode === "OR" ? "Posts with any selected tag" : "Posts with all selected tags"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {selectedTags.map((tag) => (
            <div key={tag} className="flex items-center h-7">
              <ColoredTag tag={tag} className="pr-1" />
              <Button variant="ghost" size="icon" className="h-7 w-7 p-0 -ml-1" onClick={() => onRemoveTag(tag)}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag} filter</span>
              </Button>
            </div>
          ))}

          {selectedTags.length > 1 && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={onClearTags}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
