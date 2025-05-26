import { Skeleton } from "@/components/ui/skeleton"
import { PageTransition } from "@/components/page-transition"
import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/ui/card"

export default function BookingLoading() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>Book a Meeting</SectionTitle>
          <Skeleton className="h-6 w-3/4 mt-4 mb-12" />

          <Card className="p-6 md:p-8 bg-background/80 backdrop-blur-sm">
            <Skeleton className="h-8 w-1/3 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-[350px] w-full rounded-md" />
              </div>

              <div>
                <Skeleton className="h-6 w-1/2 mb-4" />
                <div className="grid grid-cols-2 gap-2">
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Skeleton className="h-10 w-32" />
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
