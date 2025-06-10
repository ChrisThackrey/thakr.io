"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { SpeedReadingOptions } from "@/hooks/use-speed-reading"

interface SpeedReadingSettingsModalProps {
  options: SpeedReadingOptions
  onClose: () => void
  onUpdateOptions: (options: Partial<SpeedReadingOptions>) => void
}

export function SpeedReadingSettingsModal({ options, onClose, onUpdateOptions }: SpeedReadingSettingsModalProps) {
  return (
    <div className="fixed inset-0 z-[1010] flex items-center justify-center bg-black/50">
      <div
        className="w-full max-w-md rounded-xl bg-background p-6 relative shadow-lg mx-4"
        style={{ marginTop: "80px" }}
      >
        <h3 className="text-xl font-bold mb-4">Speed Reading Settings</h3>

        <div className="space-y-6">
          {/* Words per minute */}
          <div className="space-y-2">
            <Label>Reading Speed: {options.wordsPerMinute} WPM</Label>
            <Slider
              value={[options.wordsPerMinute]}
              min={100}
              max={1000}
              step={10}
              onValueChange={(values) => onUpdateOptions({ wordsPerMinute: values[0] })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>

          {/* Chunk size */}
          <div className="space-y-2">
            <Label>Words per chunk: {options.chunkSize}</Label>
            <Slider
              value={[options.chunkSize]}
              min={1}
              max={5}
              step={1}
              onValueChange={(values) => onUpdateOptions({ chunkSize: values[0] })}
            />
          </div>

          {/* Font scale */}
          <div className="space-y-2">
            <Label>Font Size: {Math.round(options.fontScale * 100)}%</Label>
            <Slider
              value={[options.fontScale]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={(values) => onUpdateOptions({ fontScale: values[0] })}
            />
          </div>

          {/* Toggle options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="highlight-text">Highlight current word</Label>
              <Switch
                id="highlight-text"
                checked={options.highlightText}
                onCheckedChange={(checked) => onUpdateOptions({ highlightText: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="skip-code">Skip code blocks</Label>
              <Switch
                id="skip-code"
                checked={options.skipCodeBlocks}
                onCheckedChange={(checked) => onUpdateOptions({ skipCodeBlocks: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="pause-headings">Pause on headings</Label>
              <Switch
                id="pause-headings"
                checked={options.pauseOnHeadings}
                onCheckedChange={(checked) => onUpdateOptions({ pauseOnHeadings: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="slow-complex">Slow down on complex words</Label>
              <Switch
                id="slow-complex"
                checked={options.slowDownOnComplexity}
                onCheckedChange={(checked) => onUpdateOptions({ slowDownOnComplexity: checked })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
