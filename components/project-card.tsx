"use client"

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { EnhancedCard } from "@/components/micro-interactions/enhanced-card"
import { EnhancedButton } from "@/components/micro-interactions/enhanced-button"
import { EnhancedIcon } from "@/components/micro-interactions/enhanced-icon"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
}

export function ProjectCard({ title, description, tags, demoUrl, githubUrl }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <EnhancedCard className="flex flex-col h-full overflow-hidden border-border shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>
          <CardDescription className="text-base mt-2 leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-2">
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="micro-badge font-medium text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 pt-4 border-t border-border/50">
          {demoUrl && (
            <EnhancedButton variant="outline" size="sm" asChild className="flex-1">
              <Link href={demoUrl} target="_blank" rel="noopener noreferrer" className="font-medium">
                <EnhancedIcon className="mr-2">
                  <ExternalLink className="h-4 w-4" />
                </EnhancedIcon>
                Demo
              </Link>
            </EnhancedButton>
          )}
          {githubUrl && (
            <EnhancedButton variant="outline" size="sm" asChild className="flex-1">
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="font-medium">
                <EnhancedIcon className="mr-2" rotate>
                  <Github className="h-4 w-4" />
                </EnhancedIcon>
                Code
              </Link>
            </EnhancedButton>
          )}
        </CardFooter>
      </EnhancedCard>
    </motion.div>
  )
}
