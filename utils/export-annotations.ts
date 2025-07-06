import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { Annotation } from "@/components/image-gallery"

export interface ExportOptions {
  format: "pdf" | "png" | "jpg"
  includeAnnotationList?: boolean
  quality?: number
  fileName?: string
}

export async function exportAnnotatedImage(
  imageElement: HTMLElement,
  _imageUrl: string,
  imageAlt: string,
  annotations: Annotation[],
  options: ExportOptions,
) {
  const {
    format,
    includeAnnotationList = true,
    quality = 0.95,
    fileName = `${imageAlt.replace(/\s+/g, "-").toLowerCase()}-annotated`,
  } = options

  try {
    // Create a canvas from the annotated image element
    const canvas = await html2canvas(imageElement, {
      useCORS: true,
      allowTaint: true,
      scale: 2, // Higher quality
      logging: false,
      backgroundColor: null,
    })

    if (format === "pdf") {
      // Export as PDF
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const orientation = imgWidth > imgHeight ? "landscape" : "portrait"

      // Calculate PDF dimensions
      const pdf = new jsPDF({
        orientation,
        unit: "px",
        format: [imgWidth, imgHeight],
      })

      // Add the annotated image
      const imgData = canvas.toDataURL("image/png", quality)
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

      // Add annotation list on a new page if requested
      if (includeAnnotationList && annotations.length > 0) {
        pdf.addPage()

        // Set font
        pdf.setFontSize(24)
        pdf.text("Annotations", 40, 40)

        pdf.setFontSize(14)
        let yPosition = 80

        annotations.forEach((annotation, index) => {
          // Add annotation number and text
          const annotationText = `${index + 1}. ${annotation.text}`
          const lines = pdf.splitTextToSize(annotationText, imgWidth - 80)

          // Check if we need a new page
          if (yPosition + lines.length * 20 > imgHeight - 40) {
            pdf.addPage()
            yPosition = 40
          }

          // Set color based on annotation color
          const rgb = hexToRgb(annotation.color)
          if (rgb) {
            pdf.setTextColor(rgb.r, rgb.g, rgb.b)
          }

          pdf.text(lines, 40, yPosition)
          yPosition += lines.length * 20 + 10

          // Reset text color
          pdf.setTextColor(0, 0, 0)
        })
      }

      // Save the PDF
      pdf.save(`${fileName}.pdf`)
    } else {
      // Export as image (PNG or JPG)
      const link = document.createElement("a")
      link.download = `${fileName}.${format}`

      if (format === "jpg") {
        // Convert to JPG with white background
        const jpgCanvas = document.createElement("canvas")
        jpgCanvas.width = canvas.width
        jpgCanvas.height = canvas.height
        const ctx = jpgCanvas.getContext("2d")

        if (ctx) {
          // Fill white background
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height)

          // Draw the image
          ctx.drawImage(canvas, 0, 0)

          link.href = jpgCanvas.toDataURL("image/jpeg", quality)
        }
      } else {
        // PNG format
        link.href = canvas.toDataURL("image/png", quality)
      }

      link.click()
    }

    return { success: true }
  } catch (error) {
    console.error("Export failed:", error)
    return { success: false, error }
  }
}

export async function exportAnnotationSummary(imageTitle: string, annotations: Annotation[], projectTitle?: string) {
  try {
    const pdf = new jsPDF()

    // Add title
    pdf.setFontSize(20)
    pdf.text(projectTitle || "Architecture Project", 20, 20)

    pdf.setFontSize(16)
    pdf.text(imageTitle, 20, 35)

    pdf.setFontSize(12)
    pdf.text(`Total Annotations: ${annotations.length}`, 20, 50)

    // Add annotations
    let yPosition = 70

    annotations.forEach((annotation, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 20
      }

      // Add annotation
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      pdf.text(`Annotation ${index + 1}`, 20, yPosition)

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)

      // Add position info
      pdf.text(`Position: (${Math.round(annotation.x * 100)}%, ${Math.round(annotation.y * 100)}%)`, 30, yPosition + 10)

      // Add annotation text
      const lines = pdf.splitTextToSize(annotation.text, 160)
      pdf.text(lines, 30, yPosition + 20)

      yPosition += 30 + lines.length * 5
    })

    // Save the PDF
    pdf.save(`${imageTitle.replace(/\s+/g, "-").toLowerCase()}-annotations-summary.pdf`)

    return { success: true }
  } catch (error) {
    console.error("Export summary failed:", error)
    return { success: false, error }
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}
