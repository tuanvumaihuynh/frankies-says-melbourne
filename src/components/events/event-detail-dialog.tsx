import { format, parseISO } from 'date-fns'
import { Calendar, Clock, Users, DollarSign } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { LazyImage } from '@/components/common/lazy-image'
import { RsvpForm } from '@/components/events/rsvp-form'
import type { CafeEvent } from '@/lib/types/events'

interface EventDetailDialogProps {
  event: CafeEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDetailDialog({
  event,
  open,
  onOpenChange,
}: EventDetailDialogProps) {
  if (!event) return null

  const formattedDate = format(parseISO(event.date), 'EEEE, d MMMM yyyy')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto p-0"
        showCloseButton
      >
        {/* Hero image */}
        <div className="rounded-t-xl overflow-hidden">
          <LazyImage
            alt={event.title}
            color={event.color}
            aspectRatio="16/9"
            className="w-full"
          />
        </div>

        <div className="p-5 space-y-4">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl leading-snug">
              {event.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Event details for {event.title}
            </DialogDescription>
          </DialogHeader>

          {/* Meta info */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0 text-accent" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-accent" />
              <span>{event.time}</span>
            </div>
            {event.price && (
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 shrink-0 text-accent" />
                <span>{event.price}</span>
              </div>
            )}
            {event.capacity && (
              <div className="flex items-center gap-2">
                <Users className="size-4 shrink-0 text-accent" />
                <span>Limited to {event.capacity} guests</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Full description */}
          <p className="text-sm text-foreground/80 leading-relaxed">
            {event.fullDescription}
          </p>

          {/* RSVP form */}
          {event.rsvpEnabled && !event.isPast && (
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-3">Reserve your spot</h4>
              <RsvpForm event={event} onSuccess={() => onOpenChange(false)} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
