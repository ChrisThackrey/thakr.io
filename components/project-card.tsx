"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, tags, liveUrl, repoUrl, image } = project
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full group"
    >
      <Card className="h-full flex flex-col bg-background/80 backdrop-blur-sm border border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={`Preview image for ${title}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardContent className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border/50">
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </Link>
            )}
            {repoUrl && (
              <Link
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                Code
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
