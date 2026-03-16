import { cn } from '@/lib/utils'
import { DIETARY_CONFIG, type DietaryTag } from '@/lib/types/menu'

interface DietaryBadgeProps {
  tag: DietaryTag
  className?: string
}

export function DietaryBadge({ tag, className }: DietaryBadgeProps) {
  const config = DIETARY_CONFIG[tag]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
        config.color,
        className
      )}
      title={config.label}
    >
      {tag}
    </span>
  )
}
