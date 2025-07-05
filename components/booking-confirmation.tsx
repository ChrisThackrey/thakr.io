"use client"

import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { useState } from "react"

interface BookingConfirmationProps {
  bookingDetails: {
    name: string
    email: string
    topic: string
    date: Date | null
    meetingLink?: string
  }
  onBack: () => void
  onDone?: () => void
}

export function BookingConfirmation({ bookingDetails, onBack, onDone }: BookingConfirmationProps) {
  const [linkCopied, setLinkCopied] = useState(false)

  const copyMeetingLink = () => {
    if (bookingDetails.meetingLink) {
      navigator.clipboard.writeText(bookingDetails.meetingLink)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Icons.check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold">Meeting Scheduled</h2>
        <p className="text-muted-foreground mt-2">
          Your meeting has been successfully scheduled. You'll receive a confirmation email shortly.
        </p>
      </div>

      <div className="bg-muted p-6 rounded-lg space-y-4">
        <div>
          <h3 className="font-medium">Meeting Details</h3>
        </div>

        <div className="grid gap-3">
          <div className="flex items-start">
            <Icons.calendar className="h-5 w-5 mr-3 mt-0.5 text-primary" />
            <div>
              <p className="font-medium">Date & Time</p>
              {bookingDetails.date && (
                <p className="text-muted-foreground">{format(bookingDetails.date, "EEEE, MMMM d, yyyy 'at' h:mm a")}</p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <div className="h-5 w-5 mr-3" />
            <div>
              <p className="font-medium">Topic</p>
              <p className="text-muted-foreground">{bookingDetails.topic}</p>
            </div>
          </div>

          {bookingDetails.meetingLink && (
            <div className="flex items-start">
              <div className="h-5 w-5 mr-3" />
              <div className="flex-1">
                <p className="font-medium">Google Meet Link</p>
                <div className="flex items-center mt-1">
                  <input
                    type="text"
                    value={bookingDetails.meetingLink}
                    readOnly
                    className="flex-1 p-2 text-sm bg-background border rounded-l-md focus:outline-none"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-l-none bg-transparent"
                    onClick={copyMeetingLink}
                  >
                    {linkCopied ? <Icons.check className="h-4 w-4" /> : <Icons.copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center bg-transparent">
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {onDone ? (
          <Button onClick={onDone} className="flex items-center">
            Done
          </Button>
        ) : (
          <Link href="/">
            <Button className="flex items-center">
              <Icons.home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
