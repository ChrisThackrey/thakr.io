"use client"

import { ArchitectureProjectSimple } from "@/components/architecture-project-simple"
import { PageTransition } from "@/components/page-transition"
import { StaggeredChildren } from "@/components/staggered-children"
import { AnimateInView } from "@/components/animate-in-view"
import { SectionTitle } from "@/components/section-title"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

// Architecture project data
const architectureProjects = [
  {
    title: "Modern Urban Housing",
    description:
      "A sustainable housing project designed for urban environments with a focus on community spaces and energy efficiency.",
    imageUrl: "/images/architecture/project1.png",
    images: [
      {
        url: "/images/architecture/project1.png",
        alt: "Modern Urban Housing - Exterior View",
        caption: "Exterior view of the sustainable urban housing complex",
      },
      {
        url: "/images/architecture/project2.png",
        alt: "Modern Urban Housing - Common Area",
        caption: "Common area with sustainable landscaping",
      },
      {
        url: "/images/architecture/project3.png",
        alt: "Modern Urban Housing - Interior",
        caption: "Interior of a model unit featuring energy-efficient design",
      },
      {
        url: "/images/architecture/project4.png",
        alt: "Modern Urban Housing - Rooftop Garden",
        caption: "Rooftop garden with solar panels and community space",
      },
    ],
    tags: ["Residential", "Sustainable", "Urban"],
    year: "2021",
    location: "Denver, CO",
    slug: "modern-urban-housing",
    category: "Residential",
  },
  {
    title: "Tech Innovation Center",
    description: "A cutting-edge facility designed to foster collaboration and innovation in the technology sector.",
    imageUrl: "/images/architecture/project2.png",
    images: [
      {
        url: "/images/architecture/project2.png",
        alt: "Tech Innovation Center - Main Building",
        caption: "Main entrance of the innovation center",
      },
      {
        url: "/images/architecture/project3.png",
        alt: "Tech Innovation Center - Collaboration Space",
        caption: "Open collaboration space with flexible furniture",
      },
      {
        url: "/images/architecture/project1.png",
        alt: "Tech Innovation Center - Conference Room",
        caption: "Smart conference room with integrated technology",
      },
    ],
    tags: ["Commercial", "Modern", "Workspace"],
    year: "2020",
    location: "Boulder, CO",
    slug: "tech-innovation-center",
    category: "Commercial",
  },
  {
    title: "Riverside Cultural Complex",
    description:
      "A multi-use cultural complex featuring exhibition spaces, performance venues, and educational facilities.",
    imageUrl: "/images/architecture/project3.png",
    images: [
      {
        url: "/images/architecture/project3.png",
        alt: "Riverside Cultural Complex - Exterior",
        caption: "Exterior view of the cultural complex along the river",
      },
      {
        url: "/images/architecture/project4.png",
        alt: "Riverside Cultural Complex - Exhibition Hall",
        caption: "Main exhibition hall with natural lighting",
      },
      {
        url: "/images/architecture/project1.png",
        alt: "Riverside Cultural Complex - Amphitheater",
        caption: "Outdoor amphitheater with river views",
      },
      {
        url: "/images/architecture/project2.png",
        alt: "Riverside Cultural Complex - Educational Wing",
        caption: "Educational wing with flexible classroom spaces",
      },
    ],
    tags: ["Cultural", "Public", "Waterfront"],
    year: "2019",
    location: "Portland, OR",
    slug: "riverside-cultural-complex",
    category: "Cultural",
  },
  {
    title: "Mountain Retreat",
    description:
      "A private residence designed to blend with the natural mountain landscape while providing modern comforts.",
    imageUrl: "/images/architecture/project4.png",
    images: [
      {
        url: "/images/architecture/project4.png",
        alt: "Mountain Retreat - Exterior",
        caption: "Exterior view showing integration with mountain landscape",
      },
      {
        url: "/images/architecture/project1.png",
        alt: "Mountain Retreat - Great Room",
        caption: "Great room with floor-to-ceiling windows and mountain views",
      },
      {
        url: "/images/architecture/project2.png",
        alt: "Mountain Retreat - Kitchen",
        caption: "Modern kitchen with local materials",
      },
    ],
    tags: ["Residential", "Mountain", "Luxury"],
    year: "2018",
    location: "Aspen, CO",
    slug: "mountain-retreat",
    category: "Residential",
  },
  {
    title: "Urban Renewal Project",
    description:
      "A mixed-use development aimed at revitalizing a former industrial area with residential, commercial, and public spaces.",
    imageUrl: "/images/architecture/project1.png",
    images: [
      {
        url: "/images/architecture/project1.png",
        alt: "Urban Renewal Project - Aerial View",
        caption: "Aerial view of the mixed-use development",
      },
      {
        url: "/images/architecture/project3.png",
        alt: "Urban Renewal Project - Public Plaza",
        caption: "Central public plaza with interactive water features",
      },
      {
        url: "/images/architecture/project2.png",
        alt: "Urban Renewal Project - Residential Building",
        caption: "Residential building with green terraces",
      },
      {
        url: "/images/architecture/project4.png",
        alt: "Urban Renewal Project - Commercial Space",
        caption: "Ground floor commercial spaces with pedestrian-friendly design",
      },
    ],
    tags: ["Mixed-Use", "Urban", "Revitalization"],
    year: "2017",
    location: "Seattle, WA",
    slug: "urban-renewal-project",
    category: "Mixed-Use",
  },
  {
    title: "Sustainable Office Campus",
    description:
      "An environmentally conscious office campus featuring green roofs, solar panels, and natural ventilation systems.",
    imageUrl: "/images/architecture/project2.png",
    images: [
      {
        url: "/images/architecture/project2.png",
        alt: "Sustainable Office Campus - Main Building",
        caption: "Main office building with green roof",
      },
      {
        url: "/images/architecture/project4.png",
        alt: "Sustainable Office Campus - Interior Atrium",
        caption: "Central atrium with natural ventilation",
      },
      {
        url: "/images/architecture/project3.png",
        alt: "Sustainable Office Campus - Solar Array",
        caption: "Solar panel array providing renewable energy",
      },
    ],
    tags: ["Commercial", "Sustainable", "Campus"],
    year: "2016",
    location: "Austin, TX",
    slug: "sustainable-office-campus",
    category: "Commercial",
  },
]

// Get unique categories from projects
const categories = ["All", ...new Set(architectureProjects.map((project) => project.category))]

export default function ArchitectureContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects =
    selectedCategory === "All"
      ? architectureProjects
      : architectureProjects.filter((project) => project.category === selectedCategory)

  return (
    <PageTransition>
      <div className="container py-12 md:py-16 space-y-12">
        <div className="space-y-6">
          <AnimateInView animation="slide-up">
            <SectionTitle>Architecture Portfolio</SectionTitle>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              A showcase of my architectural projects, designs, and visualizations. Each project represents a unique
              approach to solving spatial and functional challenges.
            </p>
          </AnimateInView>

          <AnimateInView animation="slide-up" delay={0.1}>
            <Card className="bg-secondary/50 border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {categories.map((category) => (
                    <motion.div key={category} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Badge
                        className={`text-sm py-1.5 px-3 cursor-pointer transition-all ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>

        <StaggeredChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          animation="slide-up"
          staggerDelay={0.05}
          childrenDelay={0.1}
        >
          {filteredProjects.map((project, index) => (
            <ArchitectureProjectSimple
              key={project.slug}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              images={project.images}
              tags={project.tags}
              year={project.year}
              location={project.location}
              slug={project.slug}
            />
          ))}
        </StaggeredChildren>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
