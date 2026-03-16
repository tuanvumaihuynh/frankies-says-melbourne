import { CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadICS } from '@/lib/booking-utils'
import type { BookingFormData } from '@/lib/schemas/booking-schema'

interface AddToCalendarButtonProps {
  booking: BookingFormData & { reference: string }
}

export function AddToCalendarButton({ booking }: AddToCalendarButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => downloadICS(booking)}
      className="gap-2"
    >
      <CalendarPlus className="size-4" />
      Add to Calendar
    </Button>
  )
}
