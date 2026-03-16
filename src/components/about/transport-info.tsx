import { TramFront, Train, Car } from 'lucide-react'
import locationData from '@/data/location-data.json'

const transportItems = [
  { icon: TramFront, key: 'tram' as const, label: 'Tram' },
  { icon: Train, key: 'train' as const, label: 'Train' },
  { icon: Car, key: 'parking' as const, label: 'Parking' },
]

export function TransportInfo() {
  return (
    <div className="mt-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Getting here
      </p>
      {transportItems.map(({ icon: Icon, key, label }) => (
        <div key={key} className="flex items-start gap-3">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <span className="text-xs font-medium text-foreground">{label}: </span>
            <span className="text-xs text-muted-foreground">
              {locationData.transport[key]}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
