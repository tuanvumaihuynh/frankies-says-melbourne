import { cn } from '@/lib/utils'
import type { TimeSlot } from '@/hooks/use-availability'

interface TimeSlotGridProps {
  slots: TimeSlot[]
  selected: string
  onSelect: (time: string) => void
}

function getGroup(time: string): 'Morning' | 'Afternoon' | 'Evening' {
  const [h] = time.split(':').map(Number)
  if (h < 12) return 'Morning'
  if (h < 17) return 'Afternoon'
  return 'Evening'
}

export function TimeSlotGrid({ slots, selected, onSelect }: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        No availability for this date.
      </p>
    )
  }

  const groups: Record<string, TimeSlot[]> = {}
  for (const slot of slots) {
    const group = getGroup(slot.time)
    if (!groups[group]) groups[group] = []
    groups[group].push(slot)
  }

  const groupOrder = ['Morning', 'Afternoon', 'Evening'] as const

  return (
    <div className="space-y-4">
      {groupOrder.map((groupName) => {
        const groupSlots = groups[groupName]
        if (!groupSlots?.length) return null
        return (
          <div key={groupName}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {groupName}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {groupSlots.map((slot) => {
                const isSelected = selected === slot.time
                const isDisabled = slot.status === 'unavailable'
                const isLimited = slot.status === 'limited'

                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => onSelect(slot.time)}
                    className={cn(
                      'relative rounded-lg border px-2 py-2 text-xs font-medium transition-all',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isDisabled &&
                        'opacity-40 cursor-not-allowed bg-muted border-transparent text-muted-foreground',
                      !isDisabled &&
                        !isSelected &&
                        !isLimited &&
                        'border-border hover:border-accent hover:bg-accent/10 bg-background',
                      !isDisabled &&
                        !isSelected &&
                        isLimited &&
                        'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400',
                      isSelected &&
                        'border-accent bg-accent text-accent-foreground'
                    )}
                  >
                    {slot.label}
                    {isLimited && !isSelected && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[9px] font-bold px-1 rounded-full whitespace-nowrap leading-tight py-0.5">
                        Few left
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
