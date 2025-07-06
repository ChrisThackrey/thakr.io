"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { addDays, format, setHours, setMinutes, isBefore, isToday } from "date-fns"
import { Clock, ArrowRight } from "lucide-react"

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void
  initialDate?: Date | null
}

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 17; hour++) {
    slots.push({
      display: format(setHours(new Date(), hour), "h:mm a"),
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

  const disabledDays = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (isBefore(date, today)) return true
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    setSelectedTime(undefined)
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirm = () => {
    if (date && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      const fullDate = setMinutes(setHours(new Date(date), hours), minutes)
      onDateSelect(fullDate)
    }
  }

  const isTimeDisabled = (time: string) => {
    if (!date || !isToday(date)) return false
    const now = new Date()
    const [hours] = time.split(":").map(Number)
    const selectedDateTime = setHours(new Date(date), hours)
    return isBefore(selectedDateTime, now)
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center md:text-left">1. Select a Date</h3>
          <div className="flex justify-center">
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
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center md:text-left">2. Select a Time</h3>
          {date ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.value}
                  variant={selectedTime === slot.value ? "default" : "outline"}
                  className="w-full"
                  disabled={isTimeDisabled(slot.value)}
                  onClick={() => handleTimeChange(slot.value)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot.display}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[200px] border rounded-md bg-muted/50">
              <p className="text-muted-foreground text-center p-4">Please select a date to see available times</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleConfirm} disabled={!date || !selectedTime} size="lg">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
