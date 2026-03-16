import { Toggle } from '@/components/ui/toggle'
import { DIETARY_CONFIG, type DietaryTag } from '@/lib/types/menu'
import { cn } from '@/lib/utils'

const ALL_TAGS: DietaryTag[] = ['V', 'VG', 'GF', 'DF', 'NF']

interface DietaryFilterGroupProps {
  activeFilters: DietaryTag[]
  onToggle: (tag: DietaryTag) => void
  className?: string
}

export function DietaryFilterGroup({
  activeFilters,
  onToggle,
  className,
}: DietaryFilterGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {ALL_TAGS.map((tag) => {
        const config = DIETARY_CONFIG[tag]
        const isActive = activeFilters.includes(tag)
        return (
          <Toggle
            key={tag}
            pressed={isActive}
            onPressedChange={() => onToggle(tag)}
            size="sm"
            variant="outline"
            className={cn(
              'rounded-full text-xs transition-all',
              isActive
                ? cn(config.color, 'border-transparent')
                : 'text-muted-foreground'
            )}
            aria-label={config.label}
          >
            {tag}
            <span className="hidden sm:inline ml-0.5">· {config.label}</span>
          </Toggle>
        )
      })}
    </div>
  )
}
