"use client"

import { useState, useRef } from "react"
import type { BlogSummary } from "@/utils/summary-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer, Download, Copy, Share2, X } from "lucide-react"

interface PrintableSummaryProps {
  summary: BlogSummary
  onClose: () => void
}

export function PrintableSummary({ summary, onClose }: PrintableSummaryProps) {
  const [copied, setCopied] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Create a text version of the summary
    let content = `# ${summary.title}\n\n`

    summary.sections.forEach((section) => {
      content += `${"#".repeat(section.level)} ${section.title}\n\n`

      section.keyPoints.forEach((point) => {
        content += `- ${point}\n`
      })

      content += "\n"
    })

    content += `\nWord count: ${summary.wordCount} | Reading time: ${summary.readingTime} min`

    // Create and download the file
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${summary.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-summary.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    // Create a text version of the summary
    let content = `${summary.title}\n\n`

    summary.sections.forEach((section) => {
      content += `${section.title}\n\n`

      section.keyPoints.forEach((point) => {
        content += `• ${point}\n`
      })

      content += "\n"
    })

    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Summary: ${summary.title}`,
          text: `Check out this summary of "${summary.title}"`,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto">
      <Card className="w-full max-w-3xl mx-auto shadow-lg print:shadow-none" ref={summaryRef}>
        <CardHeader className="flex flex-row items-center justify-between print:pb-0">
          <CardTitle className="text-xl font-bold print:text-2xl">Summary: {summary.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="print:hidden">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 print:space-y-2">
          {summary.sections.map((section, index) => (
            <div key={index} className="space-y-2 print:space-y-1">
              <h3 className="font-semibold text-lg print:text-base">{section.title}</h3>

              {section.keyPoints.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 print:space-y-0.5">
                  {section.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-sm print:text-xs">
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground italic print:text-xs">
                  No key points found for this section.
                </p>
              )}
            </div>
          ))}

          <div className="text-xs text-muted-foreground pt-2 border-t print:text-[10px]">
            Word count: {summary.wordCount} | Reading time: {summary.readingTime} min
          </div>
        </CardContent>

        <CardFooter className="flex justify-between print:hidden">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
