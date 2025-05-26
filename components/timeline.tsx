"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface TimelineItem {
  title: string
  company: string
  date: string
  description: string[]
  skills?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-6 bg-transparent">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="relative overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 bg-background">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-gradient-blue to-gradient-purple dark:from-gradient-blue/70 dark:to-gradient-purple/70" />
            <CardHeader className="pb-2 pl-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">{item.title}</CardTitle>
                  <CardDescription className="text-base font-medium text-muted-foreground mt-1">
                    {item.company}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="w-fit text-sm px-3 py-1 font-medium">
                  {item.date}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pl-8">
              <ul className="list-disc pl-5 space-y-3 mt-2">
                {item.description.map((desc, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </li>
                ))}
              </ul>
              {item.skills && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {item.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
