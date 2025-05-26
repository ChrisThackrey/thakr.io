import { BookingPageSkeleton } from "@/components/skeletons/booking-page-skeleton"
import { PageTransition } from "@/components/page-transition"

export default function BookingLoading() {
  return (
    <PageTransition>
      <BookingPageSkeleton />
    </PageTransition>
  )
}
