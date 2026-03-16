import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Clock, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LazyImage } from '@/components/common/lazy-image'
import { EventDetailDialog } from '@/components/events/event-detail-dialog'
import { cn } from '@/lib/utils'
import type { CafeEvent } from '@/lib/types/events'

interface EventCardProps {
  event: CafeEvent
  compact?: boolean
}

export function EventCard({ event, compact = false }: EventCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const formattedDate = format(parseISO(event.date), 'd MMM yyyy')
  const dayName = format(parseISO(event.date), 'EEE')

  return (
    <>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <Card className={cn('overflow-hidden h-full flex flex-col gap-0 py-0', compact && 'flex-row')}>
          {/* Image with date badge */}
          <div className={cn('relative shrink-0', compact ? 'w-32' : 'w-full')}>
            <LazyImage
              alt={event.title}
              color={event.color}
              aspectRatio={compact ? '1/1' : '16/9'}
              className="w-full"
            />
            {/* Date badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-center shadow-sm min-w-[2.75rem]">
              <div className="text-[10px] font-semibold text-accent uppercase leading-none">
                {dayName}
              </div>
              <div className="text-sm font-bold text-foreground leading-tight">
                {format(parseISO(event.date), 'd')}
              </div>
              <div className="text-[10px] text-muted-foreground leading-none">
                {format(parseISO(event.date), 'MMM')}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={cn('flex flex-col flex-1 gap-2', compact ? 'p-3' : 'p-4')}>
            <div className="flex items-start justify-between gap-2">
              <h3 className={cn('font-serif font-semibold leading-snug', compact ? 'text-sm' : 'text-base')}>
                {event.title}
              </h3>
              {event.price && !compact && (
                <Badge variant="outline" className="shrink-0 text-xs">
                  {event.price}
                </Badge>
              )}
            </div>

            {!compact && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3" />
                <span>{event.time}</span>
              </div>
            )}

            {!compact && (
              <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                {event.description}
              </p>
            )}

            {compact && (
              <p className="text-xs text-muted-foreground">
                {formattedDate} · {event.time}
              </p>
            )}

            {!compact && (
              <div className="flex gap-2 mt-auto pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setDialogOpen(true)}
                >
                  View Details
                </Button>
                {event.rsvpEnabled && (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => setDialogOpen(true)}
                  >
                    RSVP
                  </Button>
                )}
              </div>
            )}

            {compact && (
              <button
                className="text-xs text-accent hover:underline text-left mt-auto"
                onClick={() => setDialogOpen(true)}
              >
                View details
              </button>
            )}
          </div>
        </Card>
      </motion.div>

      <EventDetailDialog
        event={event}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
