"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ThreeDViewer } from "@/components/three-d-viewer"
import { Button } from "@/components/ui/button"
import { useStaggeredChildren } from "@/hooks/use-staggered-children"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { View } from "lucide-react"
import { cn } from "@/lib/utils"

interface ArchitectureGalleryProps {
  projects: any[]
}

export function ArchitectureGallery({ projects }: ArchitectureGalleryProps) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDialogAnimating, setIsDialogAnimating] = useState(false)
  // Default to showing the image since 3D models aren't working properly
  const [showModel, setShowModel] = useState(false)
  const visibleChildren = useStaggeredChildren(projects.length, { staggerDelay: 70, initialDelay: 150 })
  const prefersReducedMotion = useReducedMotion()
  const galleryRef = useRef<HTMLDivElement>(null)

  // Handle dialog animation states
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (selectedProject) {
      setIsDialogAnimating(true)
      setShowModel(false) // Always start with the image view
      timer = setTimeout(() => setIsDialogAnimating(false), 400)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [selectedProject])

  return (
    <>
      <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className={cn(
              "group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-lg",
              !prefersReducedMotion && !visibleChildren[index]
                ? "opacity-0 translate-y-8"
                : "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: prefersReducedMotion ? "0ms" : `${index * 70}ms`,
            }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={project.imageUrl || "/placeholder.svg?height=400&width=600&query=architecture"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 transform translate-y-2 group-hover:translate-y-0">
                <h3 className="text-white font-bold text-lg">{project.title}</h3>
                <p className="text-white/80 text-sm mt-1 transform opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  {project.location}, {project.year}
                </p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
            {project.modelUrl && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  3D Available
                </Badge>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent
            className={cn(
              "max-w-4xl w-[90vw]",
              isDialogAnimating && !prefersReducedMotion ? "scale-[0.98] opacity-90" : "scale-100 opacity-100",
            )}
            style={{
              transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                {selectedProject.location}, {selectedProject.year}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-6">
              {selectedProject.modelUrl ? (
                <>
                  <div className="h-[400px] w-full">
                    {showModel ? (
                      <ThreeDViewer
                        modelUrl={selectedProject.modelUrl}
                        scale={selectedProject.modelScale || 1}
                        position={selectedProject.modelPosition || [0, 0, 0]}
                        rotation={selectedProject.modelRotation || [0, 0, 0]}
                        height="400px"
                        fallbackText="3D model visualization temporarily unavailable"
                        imageUrl={selectedProject.imageUrl}
                      />
                    ) : (
                      <div className="relative h-[400px] w-full overflow-hidden rounded-md">
                        <Image
                          src={selectedProject.imageUrl || "/placeholder.svg?height=800&width=1200&query=architecture"}
                          alt={selectedProject.title}
                          fill
                          className="object-cover rounded-md transition-transform duration-10000 hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowModel(!showModel)}
                      disabled={true} // Temporarily disable the button
                    >
                      <View className="h-4 w-4 mr-2" />
                      {showModel ? "View Image" : "View 3D Model"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="relative h-[400px] w-full overflow-hidden rounded-md">
                  <Image
                    src={selectedProject.imageUrl || "/placeholder.svg?height=800&width=1200&query=architecture"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-md transition-transform duration-10000 hover:scale-105"
                  />
                </div>
              )}

              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
