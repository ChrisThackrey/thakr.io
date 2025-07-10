type ImagePriority = "critical" | "high" | "medium" | "low"

// Network Information API types
interface NetworkInformation {
  effectiveType?: string
  downlink?: number
  addEventListener?: (type: string, listener: () => void) => void
}

interface QueuedImage {
  id: string
  src: string
  priority: ImagePriority
  load: () => void
  loaded: boolean
}

// Convert priority to numeric value for sorting
const priorityValue = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

class ImagePriorityManager {
  private queue: QueuedImage[] = []
  private loading: Set<string> = new Set()
  private maxConcurrent = 4
  private networkInfo: { type: string; downlink: number } = { type: "unknown", downlink: 10 }
  private isLowEndDevice = false

  constructor() {
    if (typeof window !== "undefined") {
      // Detect network conditions
      if ("connection" in navigator) {
        const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
        if (conn) {
          this.networkInfo = {
            type: conn.effectiveType || "unknown",
            downlink: conn.downlink || 10,
          }

          // Adjust concurrent downloads based on network
          if (this.networkInfo.type === "4g" && this.networkInfo.downlink > 5) {
            this.maxConcurrent = 8
          } else if (this.networkInfo.type === "3g" || this.networkInfo.downlink < 2) {
            this.maxConcurrent = 2
          }

          // Listen for changes
          if (conn.addEventListener) {
            conn.addEventListener("change", this.updateNetworkInfo)
          }
        }
      }

      // Detect low-end devices
      this.isLowEndDevice = !matchMedia("(min-resolution: 2dppx)").matches && (navigator.hardwareConcurrency || 4) <= 4

      if (this.isLowEndDevice) {
        this.maxConcurrent = 2
      }
    }
  }

  private updateNetworkInfo = () => {
    if (typeof window !== "undefined" && "connection" in navigator) {
      const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
      if (conn) {
        this.networkInfo = {
          type: conn.effectiveType || "unknown",
          downlink: conn.downlink || 10,
        }
      }
    }
  }

  public queueImage(id: string, src: string, priority: ImagePriority, load: () => void): void {
    // Don't queue if already loading or loaded
    if (this.loading.has(id)) return

    // Check if image is already in queue
    const existingIndex = this.queue.findIndex((img) => img.id === id)
    if (existingIndex >= 0) {
      // Update priority if higher
      if (priorityValue[priority] < priorityValue[this.queue[existingIndex].priority]) {
        this.queue[existingIndex].priority = priority
        this.sortQueue()
      }
      return
    }

    // Add to queue
    this.queue.push({ id, src, priority, load, loaded: false })
    this.sortQueue()
    this.processQueue()
  }

  private sortQueue(): void {
    this.queue.sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority])
  }

  private processQueue(): void {
    if (this.queue.length === 0) return

    // Process as many images as allowed by maxConcurrent
    while (this.loading.size < this.maxConcurrent && this.queue.length > 0) {
      const nextImage = this.queue.shift()
      if (!nextImage) break

      this.loading.add(nextImage.id)

      // Load the image
      nextImage.load()

      // Simulate completion (in a real implementation, this would be called when the image loads)
      setTimeout(() => {
        this.loading.delete(nextImage.id)
        this.processQueue()
      }, 100) // Just for simulation
    }
  }

  public imageLoaded(id: string): void {
    this.loading.delete(id)
    this.processQueue()
  }

  public getNetworkInfo() {
    return this.networkInfo
  }

  public isSlowConnection() {
    return this.networkInfo.type === "2g" || this.networkInfo.type === "slow-2g" || this.networkInfo.downlink < 1
  }

  public shouldUseBlurPlaceholder() {
    return this.isSlowConnection() || this.isLowEndDevice
  }

  public getOptimalQuality() {
    if (this.isSlowConnection() || this.isLowEndDevice) {
      return 60 // Lower quality for slow connections or low-end devices
    } else if (this.networkInfo.type === "3g" || this.networkInfo.downlink < 5) {
      return 75 // Medium quality
    }
    return 85 // High quality
  }
}

// Singleton instance
export const imagePriorityManager = typeof window !== "undefined" ? new ImagePriorityManager() : null

// Hook for components to use
export function useImagePriority() {
  return imagePriorityManager
}
