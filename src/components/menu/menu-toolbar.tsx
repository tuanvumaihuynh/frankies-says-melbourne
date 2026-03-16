import { SearchInput } from './search-input'
import { DietaryFilterGroup } from './dietary-filter-group'
import { ActiveFilters } from './active-filters'
import type { DietaryTag } from '@/lib/types/menu'

interface MenuToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  filters: DietaryTag[]
  onToggleFilter: (tag: DietaryTag) => void
  onClearFilters: () => void
  filteredCount: number
  totalCount: number
}

export function MenuToolbar({
  search,
  onSearchChange,
  filters,
  onToggleFilter,
  onClearFilters,
  filteredCount,
  totalCount,
}: MenuToolbarProps) {
  const isFiltered = search.length > 0 || filters.length > 0

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          className="sm:w-64"
        />
        <DietaryFilterGroup
          activeFilters={filters}
          onToggle={onToggleFilter}
        />
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <ActiveFilters
          filters={filters}
          onRemove={onToggleFilter}
          onClearAll={onClearFilters}
        />
        {isFiltered && (
          <p className="text-xs text-muted-foreground ml-auto">
            Showing {filteredCount} of {totalCount} items
          </p>
        )}
      </div>
    </div>
  )
}
