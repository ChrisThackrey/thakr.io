"use client"

import { useRef, useState, Suspense, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Html, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Loader2, Maximize2, Minimize2, AlertTriangle, ImageIcon } from "lucide-react"
import Image from "next/image"

// Fallback component when 3D model can't be loaded
function ModelFallback({ text = "No 3D model available", imageUrl = null }) {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
        {imageUrl ? (
          <>
            <ImageIcon className="h-8 w-8 mb-2 text-primary/60" />
            <p className="text-sm mb-2">{text}</p>
            <p className="text-xs">Using 2D image instead</p>
          </>
        ) : (
          <>
            <AlertTriangle className="h-8 w-8 mb-2 text-yellow-500" />
            <p className="text-sm">{text}</p>
          </>
        )}
      </div>
    </Html>
  )
}

// Loading component shown while the 3D model is loading
function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Loading 3D model...</p>
      </div>
    </Html>
  )
}

// Camera controls component
function CameraController() {
  const { camera, gl } = useThree()

  return (
    <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} camera={camera} domElement={gl.domElement} />
  )
}

// Main 3D viewer component
export function ThreeDViewer({
  modelUrl,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  environmentPreset = "city",
  className = "",
  height = "400px",
  fallbackText = "3D model could not be loaded",
  imageUrl,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [modelError, setModelError] = useState(false)
  const containerRef = useRef(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Always use the fallback for now to avoid model loading errors
  useEffect(() => {
    // Set modelError to true to always use the fallback
    setModelError(true)
  }, [])

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    if (typeof document !== "undefined") {
      document.addEventListener("fullscreenchange", handleFullscreenChange)
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
      }
    }
  }, [])

  // If we've detected an error with the model and we have an image fallback,
  // show the image instead of trying to render the 3D scene
  if (modelError && imageUrl) {
    return (
      <div
        ref={containerRef}
        className={`relative rounded-lg overflow-hidden border border-border ${className}`}
        style={{ height: isFullscreen ? "100vh" : height }}
      >
        <div className="relative h-full w-full">
          <Image
            src={imageUrl || "/placeholder.svg?height=400&width=600&query=3D%20architectural%20model"}
            alt="Project visualization"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-background/80 backdrop-blur-sm z-10"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden border border-border ${className}`}
      style={{ height: isFullscreen ? "100vh" : height }}
    >
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={<ModelLoader />}>
          <ModelFallback text={fallbackText} imageUrl={imageUrl} />
          <Environment preset={environmentPreset} />
        </Suspense>
        <CameraController />
      </Canvas>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm z-10"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
