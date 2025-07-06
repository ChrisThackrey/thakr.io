import { Construction } from "lucide-react"

export function ComingSoonBanner({ pageName }: { pageName: string }) {
  return (
    <div className="flex items-center justify-center gap-4 rounded-lg border border-dashed border-yellow-500 bg-yellow-500/10 p-6 text-center text-yellow-700 dark:text-yellow-400">
      <Construction className="h-8 w-8 flex-shrink-0" />
      <div>
        <h3 className="font-semibold">Under Construction</h3>
        <p className="text-sm">The {pageName} page is currently being built. Check back soon!</p>
      </div>
    </div>
  )
}
