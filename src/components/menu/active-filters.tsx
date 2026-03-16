import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DIETARY_CONFIG, type DietaryTag } from '@/lib/types/menu'
import { cn } from '@/lib/utils'

interface ActiveFiltersProps {
  filters: DietaryTag[]
  onRemove: (tag: DietaryTag) => void
  onClearAll: () => void
  className?: string
}

export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
  className,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="text-xs text-muted-foreground">Active:</span>
      {filters.map((tag) => {
        const config = DIETARY_CONFIG[tag]
        return (
          <span
            key={tag}
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
              config.color
            )}
          >
            {config.label}
            <button
              onClick={() => onRemove(tag)}
              aria-label={`Remove ${config.label} filter`}
              className="ml-0.5 rounded-full hover:opacity-70 transition-opacity"
            >
              <X className="size-3" />
            </button>
          </span>
        )
      })}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  )
}
