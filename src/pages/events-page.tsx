import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { EventCard } from '@/components/events/event-card'
import { EventsEmptyState } from '@/components/events/events-empty-state'
import { Button } from '@/components/ui/button'
import eventsData from '@/data/events-data.json'
import type { CafeEvent } from '@/lib/types/events'

const events = eventsData as CafeEvent[]
const upcomingEvents = events.filter((e) => !e.isPast)
const pastEvents = events.filter((e) => e.isPast)

export function EventsPage() {
  const [showPast, setShowPast] = useState(false)

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading
          title="Events"
          subtitle="Special evenings, workshops, and experiences at Frankie Says."
        />

        {/* Upcoming events */}
        {upcomingEvents.length === 0 ? (
          <EventsEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Past events collapsible */}
        {pastEvents.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-semibold text-muted-foreground">
                Past Events
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPast((v) => !v)}
                className="gap-1.5"
              >
                {showPast ? (
                  <>
                    Hide <ChevronUp className="size-4" />
                  </>
                ) : (
                  <>
                    Show all <ChevronDown className="size-4" />
                  </>
                )}
              </Button>
            </div>

            {showPast && (
              <div className="space-y-3">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} compact />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
