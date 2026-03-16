import type { ComponentType } from 'react'
import { format } from 'date-fns'
import { CalendarDays, Clock, Users, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import type { BookingFormData } from '@/lib/schemas/booking-schema'

interface BookingSummaryProps {
  data: Partial<BookingFormData>
  reference?: string
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  )
}

export function BookingSummary({ data, reference }: BookingSummaryProps) {
  const dateLabel = data.date
    ? format(data.date, 'EEEE, MMMM d, yyyy')
    : '—'

  const timeLabel = data.timeSlot
    ? (() => {
        const [h, m] = data.timeSlot.split(':').map(Number)
        const period = h >= 12 ? 'PM' : 'AM'
        const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
        const min = m === 0 ? '' : `:${String(m).padStart(2, '0')}`
        return `${hour}${min} ${period}`
      })()
    : '—'

  return (
    <div className="space-y-3">
      {reference && (
        <>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Booking Reference
            </p>
            <p className="font-mono text-lg font-bold text-accent">{reference}</p>
          </div>
          <Separator />
        </>
      )}

      <div className="grid gap-3">
        <SummaryRow icon={CalendarDays} label="Date" value={dateLabel} />
        <SummaryRow icon={Clock} label="Time" value={timeLabel} />
        <SummaryRow
          icon={Users}
          label="Party Size"
          value={
            data.partySize
              ? `${data.partySize} ${data.partySize === 1 ? 'guest' : 'guests'}`
              : '—'
          }
        />

        {data.name && (
          <SummaryRow icon={User} label="Name" value={data.name} />
        )}
        {data.email && (
          <SummaryRow icon={Mail} label="Email" value={data.email} />
        )}
        {data.phone && (
          <SummaryRow icon={Phone} label="Phone" value={data.phone} />
        )}
        {data.specialRequests && (
          <SummaryRow
            icon={MessageSquare}
            label="Special Requests"
            value={data.specialRequests}
          />
        )}
      </div>
    </div>
  )
}
