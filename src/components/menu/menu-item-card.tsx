import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DietaryBadge } from './dietary-badge'
import type { MenuItem } from '@/lib/types/menu'

interface MenuItemCardProps {
  item: MenuItem
  className?: string
}

export function MenuItemCard({ item, className }: MenuItemCardProps) {
  return (
    <div
      className={cn(
        'flex gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md',
        item.featured && 'border-l-4 border-l-[#c8a97e]',
        className
      )}
    >
      {item.image && (
        <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-serif font-semibold text-foreground leading-snug">
              {item.name}
            </h4>
            {item.featured && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-[#c8a97e] text-[#c8a97e]">
                Featured
              </Badge>
            )}
          </div>
          <span className="shrink-0 font-semibold text-foreground tabular-nums">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        {item.dietary.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.dietary.map((tag) => (
              <DietaryBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
