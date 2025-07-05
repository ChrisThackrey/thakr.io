import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { ImageGallery } from "@/components/image-gallery"

interface ArchitectureProjectProps {
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
  client: string
  role: string
  team?: string[]
  externalUrl?: string
}

export function ArchitectureProject({
  title,
  description,
  imageUrl,
  images,
  modelUrl,
  tags,
  year,
  location,
  client,
  role,
  team,
  externalUrl,
}: ArchitectureProjectProps) {
  // Create a default images array if none provided
  const projectImages = images || [
    {
      url: imageUrl,
      alt: title,
    },
  ]

  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <Button variant="ghost" asChild className="group">
            <Link href="/architecture" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
          {externalUrl && (
            <Button variant="outline" asChild className="group">
              <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Visit Project
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm py-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{description}</p>
          </div>

          <Card className="border border-border/50 shadow-sm h-fit">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Year</h3>
                <p className="text-muted-foreground">{year}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Location</h3>
                <p className="text-muted-foreground">{location}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Client</h3>
                <p className="text-muted-foreground">{client}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Role</h3>
                <p className="text-muted-foreground">{role}</p>
              </div>
              {team && team.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Team</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {team.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <ImageGallery images={projectImages} height="500px" projectTitle={title} />
        </div>
      </div>
    </div>
  )
}
