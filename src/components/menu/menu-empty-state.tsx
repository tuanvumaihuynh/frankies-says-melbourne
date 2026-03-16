import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MenuEmptyStateProps {
  onClearFilters: () => void
}

export function MenuEmptyState({ onClearFilters }: MenuEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="size-8 text-muted-foreground" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground">
        No items match your filters
      </h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
        Try adjusting your search or dietary filters to find something delicious.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onClearFilters}
        className="mt-4"
      >
        Clear filters
      </Button>
    </div>
  )
}
