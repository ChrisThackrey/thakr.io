import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { technicalSkills as SkillsType } from "@/lib/experience-data"
import { ColoredTag } from "./colored-tag"

interface TechnicalSkillsProps {
  skills: typeof SkillsType
}

export function TechnicalSkills({ skills }: TechnicalSkillsProps) {
  return (
    <Card className="w-full overflow-hidden shadow-lg bg-background/80 backdrop-blur-sm border border-border/30 h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Technical Skills</CardTitle>
        <CardDescription className="text-muted-foreground pt-1">
          A comprehensive overview of my technical proficiencies.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-6">
          {Object.entries(skills).map(([category, skillList], index) => (
            <div key={category}>
              {index > 0 && <hr className="my-6 border-border/30" />}
              <h3 className="text-lg font-semibold mb-3 text-foreground/90 tracking-wide">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <ColoredTag key={skill} tag={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
