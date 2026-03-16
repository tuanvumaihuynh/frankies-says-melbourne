import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { GalleryCategory } from '@/lib/types/gallery'

const TABS: { label: string; value: GalleryCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Food', value: 'food' },
  { label: 'Ambiance', value: 'ambiance' },
  { label: 'Events', value: 'events' },
]

interface GalleryFilterTabsProps {
  activeCategory: GalleryCategory
  categoryCounts: Record<GalleryCategory, number>
  onSelect: (category: GalleryCategory) => void
}

export function GalleryFilterTabs({
  activeCategory,
  categoryCounts,
  onSelect,
}: GalleryFilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
      {TABS.map((tab) => {
        const isActive = activeCategory === tab.value
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(tab.value)}
            className={cn(
              'relative px-5 py-2 text-sm font-medium rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="gallery-filter-bg"
                className="absolute inset-0 rounded-full bg-accent/15 border border-accent/30"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">
              {tab.label}{' '}
              <span
                className={cn(
                  'ml-1 text-xs',
                  isActive ? 'text-accent' : 'text-muted-foreground/60'
                )}
              >
                {categoryCounts[tab.value]}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
