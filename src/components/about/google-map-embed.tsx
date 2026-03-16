import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import locationData from '@/data/location-data.json'

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${locationData.lat},${locationData.lng}&z=16&output=embed`

export function GoogleMapEmbed() {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-stone-100"
    >
      {loaded ? (
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Frankie Says location map"
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
          <MapPin className="h-8 w-8 animate-pulse text-accent" />
          <span className="text-sm">Loading map...</span>
        </div>
      )}
    </div>
  )
}
