import { debounce, throttle } from "lodash"

/**
 * Batch DOM reads and writes to prevent layout thrashing
 */
class DOMBatcher {
  private readQueue: Array<() => any> = []
  private writeQueue: Array<() => void> = []
  private scheduled = false

  constructor() {
    this.process = this.process.bind(this)
  }

  read<T>(fn: () => T): Promise<T> {
    return new Promise((resolve) => {
      this.readQueue.push(() => {
        const result = fn()
        resolve(result)
        return result
      })
      this.schedule()
    })
  }

  write(fn: () => void): Promise<void> {
    return new Promise((resolve) => {
      this.writeQueue.push(() => {
        fn()
        resolve()
      })
      this.schedule()
    })
  }

  private schedule(): void {
    if (!this.scheduled) {
      this.scheduled = true
      requestAnimationFrame(this.process)
    }
  }

  private process(): void {
    // Process all reads
    // const reads = this.readQueue
    this.readQueue = []
    const writes = this.writeQueue
    this.writeQueue = []

    // Force style calculation by reading
    // const results = reads.map((read) => read())

    // Then do all writes
    writes.forEach((write) => write())

    this.scheduled = false

    // If new tasks were added during processing, schedule another frame
    if (this.readQueue.length > 0 || this.writeQueue.length > 0) {
      this.schedule()
    }
  }
}

export const domBatcher = new DOMBatcher()

/**
 * Throttled scroll handler to improve performance
 */
export const createOptimizedScrollHandler = (handler: (event: Event) => void, wait = 16) => {
  return throttle(handler, wait, { leading: true, trailing: true })
}

/**
 * Debounced resize handler to improve performance
 */
export const createOptimizedResizeHandler = (handler: (event: Event) => void, wait = 100) => {
  return debounce(handler, wait)
}

/**
 * Apply styles to an element in a batched, optimized way
 */
export const applyStyles = (element: HTMLElement, styles: Partial<CSSStyleDeclaration>) => {
  domBatcher.write(() => {
    Object.entries(styles).forEach(([property, value]) => {
      // @ts-ignore - We know this is a valid style property
      element.style[property] = value
    })
  })
}

/**
 * Get element dimensions in an optimized way
 */
export const getElementDimensions = (element: HTMLElement) => {
  return domBatcher.read(() => {
    const rect = element.getBoundingClientRect()
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
    }
  })
}

/**
 * Add a passive event listener for better performance
 */
export const addPassiveEventListener = (
  element: HTMLElement | Window | Document,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions = { passive: true },
) => {
  element.addEventListener(event, handler, options)
  return () => {
    element.removeEventListener(event, handler)
  }
}
