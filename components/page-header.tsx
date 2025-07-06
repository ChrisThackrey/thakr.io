import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 text-center", className)}>
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">{title}</h1>
      {description && <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">{description}</p>}
    </div>
  )
}
