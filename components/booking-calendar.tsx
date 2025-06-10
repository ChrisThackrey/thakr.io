"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { addDays, format, setHours, setMinutes, isBefore, isToday } from "date-fns"
import { Clock } from "lucide-react"

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void
  initialDate?: Date | null
}

// Generate available time slots from 9 AM to 5 PM in 12-hour format
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 17; hour++) {
    const amPm = hour < 12 ? "AM" : "PM"
    const hour12 = hour > 12 ? hour - 12 : hour
    slots.push({
      display: `${hour12}:00 ${amPm}`,
      value: `${hour}:00`,
    })
  }
  return slots
}

const timeSlots = generateTimeSlots()

export function BookingCalendar({ onDateSelect, initialDate }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate || undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    initialDate ? format(initialDate, "H:mm") : undefined,
  )

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (isBefore(date, today)) {
      return true
    }

    // Disable weekends (0 is Sunday, 6 is Saturday)
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    // Reset time selection when date changes
    setSelectedTime(undefined)
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirm = () => {
    if (date && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const selectedDate = new Date(date)
      const fullDate = setMinutes(setHours(selectedDate, hours), minutes)
      onDateSelect(fullDate)
    }
  }

  // Check if the selected date and time are in the past
  const isTimeDisabled = (time: string) => {
    if (!date || !isToday(date)) return false

    const now = new Date()
    const [hours, minutes] = time.split(":").map(Number)
    const selectedTime = setMinutes(setHours(new Date(date), hours), minutes)

    return isBefore(selectedTime, now)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Select a Date & Time</h2>
        <CardDescription className="mb-6">
          Choose a date and time for our one-hour meeting. I'm available on weekdays from 9 AM to 5 PM.
        </CardDescription>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">1. Select a Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            disabled={disabledDays}
            className="rounded-md border"
            fromDate={new Date()}
            toDate={addDays(new Date(), 60)}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">2. Select a Time</h3>
          {date ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.value}
                    variant={selectedTime === slot.value ? "default" : "outline"}
                    className="justify-start"
                    disabled={isTimeDisabled(slot.value)}
                    onClick={() => handleTimeChange(slot.value)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {slot.display}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] border rounded-md bg-muted/50">
              <p className="text-muted-foreground">Please select a date first</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleConfirm} disabled={!date || !selectedTime} className="min-w-[120px]">
          Continue
        </Button>
      </div>
    </div>
  )
}
