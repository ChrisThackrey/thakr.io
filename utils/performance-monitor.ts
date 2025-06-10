/**
 * Utility to monitor animation performance
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private frameCount = 0
  private lastTime = 0
  private fps = 0
  private isMonitoring = false
  private callback?: (fps: number) => void

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  public startMonitoring(callback?: (fps: number) => void): void {
    if (this.isMonitoring) return

    this.isMonitoring = true
    this.callback = callback
    this.frameCount = 0
    this.lastTime = performance.now()

    requestAnimationFrame(this.monitor.bind(this))
  }

  public stopMonitoring(): void {
    this.isMonitoring = false
  }

  public getFPS(): number {
    return this.fps
  }

  private monitor(timestamp: number): void {
    if (!this.isMonitoring) return

    this.frameCount++

    const elapsed = timestamp - this.lastTime

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed)
      this.frameCount = 0
      this.lastTime = timestamp

      if (this.callback) {
        this.callback(this.fps)
      }

      // Log performance issues
      if (this.fps < 30) {
        console.warn(`Low animation performance detected: ${this.fps} FPS`)
      }
    }

    requestAnimationFrame(this.monitor.bind(this))
  }
}

// Helper function to enable performance monitoring in development
export function monitorPerformance(callback?: (fps: number) => void): () => void {
  if (process.env.NODE_ENV !== "development") {
    return () => {} // No-op in production
  }

  const monitor = PerformanceMonitor.getInstance()
  monitor.startMonitoring(callback)

  return () => monitor.stopMonitoring()
}
