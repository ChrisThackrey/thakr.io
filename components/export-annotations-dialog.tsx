"use client"

import { useState } from "react"
import { Download, FileText, ImageIcon, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import type { ExportOptions } from "@/utils/export-annotations"

interface ExportAnnotationsDialogProps {
  isOpen: boolean
  onClose: () => void
  onExport: (options: ExportOptions) => Promise<void>
  hasAnnotations: boolean
}

export function ExportAnnotationsDialog({ isOpen, onClose, onExport, hasAnnotations }: ExportAnnotationsDialogProps) {
  const [format, setFormat] = useState<"pdf" | "png" | "jpg">("pdf")
  const [includeAnnotationList, setIncludeAnnotationList] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      await onExport({
        format,
        includeAnnotationList: format === "pdf" ? includeAnnotationList : false,
        quality: 0.95,
      })

      toast({
        title: "Export successful",
        description: `Your annotated image has been exported as ${format.toUpperCase()}.`,
      })

      onClose()
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Annotated Image</DialogTitle>
          <DialogDescription>Choose how you'd like to export your annotated image.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>Export Format</Label>
            <RadioGroup value={format} onValueChange={(value) => setFormat(value as typeof format)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF Document
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="png" id="png" />
                <Label htmlFor="png" className="flex items-center cursor-pointer">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  PNG Image (Transparent)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jpg" id="jpg" />
                <Label htmlFor="jpg" className="flex items-center cursor-pointer">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  JPG Image (White Background)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {format === "pdf" && hasAnnotations && (
            <div className="space-y-3">
              <Label>PDF Options</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-list"
                  checked={includeAnnotationList}
                  onCheckedChange={(checked) => setIncludeAnnotationList(checked as boolean)}
                />
                <Label htmlFor="include-list" className="text-sm font-normal cursor-pointer">
                  Include annotation list on separate page
                </Label>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            {format === "pdf" ? (
              <p>
                The PDF will include the image with all visible annotations.
                {includeAnnotationList && hasAnnotations && " A second page will list all annotation details."}
              </p>
            ) : (
              <p>The image will be exported with all visible annotations overlaid.</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
