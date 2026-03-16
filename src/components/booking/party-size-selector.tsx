import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SITE_CONFIG } from '@/lib/constants'

interface PartySizeSelectorProps {
  value: number
  onChange: (size: number) => void
}

const BUTTON_SIZES = [1, 2, 3, 4, 5, 6, 7, 8]
const LARGE_SIZES = [9, 10, 11, 12]

export function PartySizeSelector({ value, onChange }: PartySizeSelectorProps) {
  const isLarge = value > 8

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {BUTTON_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={cn(
              'size-10 rounded-lg border text-sm font-semibold transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              value === size
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-background hover:border-accent hover:bg-accent/10'
            )}
          >
            {size}
          </button>
        ))}
        <Select<string>
          value={isLarge ? String(value) : undefined}
          onValueChange={(v) => { if (v !== null) onChange(Number(v)) }}
        >
          <SelectTrigger
            className={cn(
              'h-10 w-20 text-sm font-semibold',
              isLarge && 'border-accent bg-accent text-accent-foreground'
            )}
          >
            <SelectValue placeholder="9+" />
          </SelectTrigger>
          <SelectContent>
            {LARGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} guests
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {value >= 7 && (
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Phone className="size-3.5 shrink-0" />
          For larger parties, please call us at{' '}
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="font-medium text-foreground hover:underline"
          >
            {SITE_CONFIG.phone}
          </a>
        </p>
      )}
    </div>
  )
}
