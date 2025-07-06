import type * as React from "react"
import { cn } from "@/lib/utils"

const Steps = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "ml-4 mb-4 border-l pl-6 [counter-reset:step]",
      "[&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:tracking-tight",
      "[&>h3::before]:bg-primary [&>h3::before]:text-primary-foreground [&>h3::before]:content-[counter(step)] [&>h3::before]:[counter-increment:step] [&>h3::before]:w-7 [&>h3::before]:h-7 [&>h3::before]:rounded-full [&>h3::before]:flex [&>h3::before]:items-center [&>h3::before]:justify-center [&>h3::before]:mr-4 [&>h3::before]:font-mono [&>h3::before]:text-sm",
      "[&>h3]:flex [&>h3]:items-center",
      className,
    )}
    {...props}
  />
)

export { Steps }
