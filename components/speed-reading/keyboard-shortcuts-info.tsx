"use client"

import { Button } from "@/components/ui/button"

interface KeyboardShortcutsInfoProps {
  onClose: () => void
}

export function KeyboardShortcutsInfo({ onClose }: KeyboardShortcutsInfoProps) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center glass-backdrop glass-animate-in">
      <div className="w-full max-w-md rounded-xl glass-card p-6 relative glass-modal-enter">
        <div className="glass-highlight"></div>
        <h3 className="text-xl font-bold mb-4">Keyboard Shortcuts</h3>

        <div className="space-y-2">
          <div className="flex justify-between py-2">
            <kbd className="px-2 py-1 text-sm font-medium bg-muted rounded">Space</kbd>
            <span className="text-muted-foreground">Play/Pause</span>
          </div>
          <div className="flex justify-between py-2">
            <kbd className="px-2 py-1 text-sm font-medium bg-muted rounded">←</kbd>
            <span className="text-muted-foreground">Previous Word</span>
          </div>
          <div className="flex justify-between py-2">
            <kbd className="px-2 py-1 text-sm font-medium bg-muted rounded">→</kbd>
            <span className="text-muted-foreground">Next Word</span>
          </div>
          <div className="flex justify-between py-2">
            <kbd className="px-2 py-1 text-sm font-medium bg-muted rounded">M</kbd>
            <span className="text-muted-foreground">Mini Player Mode</span>
          </div>
          <div className="flex justify-between py-2">
            <kbd className="px-2 py-1 text-sm font-medium bg-muted rounded">F</kbd>
            <span className="text-muted-foreground">Full Screen Mode</span>
          </div>
          <div className="flex justify-between py-2">
            <kbd className="px-2 py-1 text-sm font-medium bg-muted rounded">+/-</kbd>
            <span className="text-muted-foreground">Adjust Speed</span>
          </div>
          <div className="flex justify-between py-2">
            <kbd className="px-2 py-1 text-sm font-medium bg-muted rounded">Esc</kbd>
            <span className="text-muted-foreground">Close/Exit</span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="rounded-full glass-button border-0">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
