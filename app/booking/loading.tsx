import { BookingPageSkeleton } from "@/components/skeletons/booking-page-skeleton"

export default function BookingLoading() {
  // Add a key to ensure React treats this as a new component
  return <BookingPageSkeleton key="booking-skeleton" />
}
