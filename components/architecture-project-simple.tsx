"use client"

import { ThreeDViewer } from "@/components/three-d-viewer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, ImageIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ArchitectureProjectSimpleProps {
  title: string
  description: string
  imageUrl: string
  images?: {
    url: string
    alt: string
    caption?: string
  }[]
  modelUrl?: string
  tags: string[]
  year: string
  location: string
  slug: string
}

export function ArchitectureProjectSimple({
  title,
  description,
  imageUrl,
  images,
  tags,
  year,
  location,
  slug,
}: ArchitectureProjectSimpleProps) {
  const hasMultipleImages = images && images.length > 1

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="h-full">
      <Card className="overflow-hidden h-full flex flex-col border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="aspect-video w-full overflow-hidden relative group">
          <ThreeDViewer
            imageUrl={imageUrl}
            fallbackText="3D model loading disabled"
            height="240px"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>

          {/* Image count indicator */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium shadow-md flex items-center">
              <ImageIcon className="h-3 w-3 mr-1" />
              {images.length} images
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
            <div className="text-sm font-medium text-muted-foreground">{year}</div>
          </div>
          <CardDescription className="text-sm font-medium">{location}</CardDescription>
        </CardHeader>
        <CardContent className="pb-4 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-medium py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button asChild className="w-full" variant="outline">
            <Link href={`/architecture/${slug}`} className="flex items-center justify-center">
              View Project
              <motion.div
                className="ml-2 inline-block"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ExternalLink className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
