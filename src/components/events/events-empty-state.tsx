import { CalendarX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export function EventsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="p-4 rounded-full bg-muted">
        <CalendarX className="size-10 text-muted-foreground" />
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold mb-1">
          No upcoming events right now
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          We're cooking up something special. Follow us on Instagram to be first
          to know.
        </p>
      </div>
      <Button asChild variant="outline">
        <a
          href={SITE_CONFIG.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow us on Instagram
        </a>
      </Button>
    </div>
  )
}
