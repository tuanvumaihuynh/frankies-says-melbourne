import { cn } from '@/lib/utils'
import hoursData from '@/data/hours.json'

const DAYS_ORDERED = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, '0')}${suffix}`
}

function getTodayName(): string {
  return new Date()
    .toLocaleDateString('en-US', {
      timeZone: hoursData.timezone,
      weekday: 'long',
    })
    .toLowerCase()
}

export function HoursTable() {
  const todayName = getTodayName()

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <tbody>
          {DAYS_ORDERED.map((day) => {
            const hours = hoursData.schedule[day]
            const isToday = day === todayName

            return (
              <tr
                key={day}
                className={cn(
                  'border-b border-border last:border-0 transition-colors',
                  isToday ? 'bg-accent/15' : 'hover:bg-muted/40'
                )}
              >
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'capitalize font-medium',
                      isToday ? 'text-accent' : 'text-foreground'
                    )}
                  >
                    {day}
                    {isToday && (
                      <span className="ml-2 text-xs font-normal text-accent">
                        (Today)
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">
                  {hours
                    ? `${formatTime(hours.open)} – ${formatTime(hours.close)}`
                    : 'Closed'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
