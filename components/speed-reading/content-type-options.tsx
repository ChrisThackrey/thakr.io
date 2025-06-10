"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Code, Heading1, AlertTriangle, Zap } from "lucide-react"

interface ContentTypeOptionsProps {
  highlightText: boolean
  onHighlightTextChange: (value: boolean) => void
  skipCodeBlocks: boolean
  onSkipCodeBlocksChange: (value: boolean) => void
  pauseOnHeadings: boolean
  onPauseOnHeadingsChange: (value: boolean) => void
  slowDownOnComplexity: boolean
  onSlowDownOnComplexityChange: (value: boolean) => void
}

export function ContentTypeOptions({
  highlightText,
  onHighlightTextChange,
  skipCodeBlocks,
  onSkipCodeBlocksChange,
  pauseOnHeadings,
  onPauseOnHeadingsChange,
  slowDownOnComplexity,
  onSlowDownOnComplexityChange,
}: ContentTypeOptionsProps) {
  return (
    <div className="w-full bg-card/50 border border-border rounded-lg p-4">
      <h3 className="text-sm font-medium mb-3">Content Options</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Switch id="highlight-text" checked={highlightText} onCheckedChange={onHighlightTextChange} />
          <Label htmlFor="highlight-text" className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5" />
            <span>Highlight text</span>
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="skip-code" checked={skipCodeBlocks} onCheckedChange={onSkipCodeBlocksChange} />
          <Label htmlFor="skip-code" className="flex items-center gap-1">
            <Code className="h-3.5 w-3.5" />
            <span>Skip code blocks</span>
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="pause-headings" checked={pauseOnHeadings} onCheckedChange={onPauseOnHeadingsChange} />
          <Label htmlFor="pause-headings" className="flex items-center gap-1">
            <Heading1 className="h-3.5 w-3.5" />
            <span>Pause on headings</span>
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="slow-complex" checked={slowDownOnComplexity} onCheckedChange={onSlowDownOnComplexityChange} />
          <Label htmlFor="slow-complex" className="flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Slow down on complex content</span>
          </Label>
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-3">
        <p>Press keyboard shortcuts: H (highlight), C (code), P (pause), S (slow)</p>
      </div>
    </div>
  )
}
