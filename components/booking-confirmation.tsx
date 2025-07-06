"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, Home } from "lucide-react"
import { format } from "date-fns"

interface BookingConfirmationProps {
  selectedDate: Date | null
}

export function BookingConfirmation({ selectedDate }: BookingConfirmationProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
      <CheckCircle className="h-16 w-16 text-green-500 booking-confirmation-icon" />
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
        <p className="text-muted-foreground max-w-md">
          Your meeting has been scheduled. You will receive a confirmation email with the meeting details shortly.
        </p>
      </div>

      {selectedDate && (
        <div className="border rounded-lg p-4 space-y-3 bg-muted/50 w-full max-w-sm">
          <h3 className="font-semibold text-lg">Meeting Details</h3>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(selectedDate, "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{format(selectedDate, "h:mm a")}</span>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
