import { useState, useMemo } from 'react'
import type { MenuCategory, DietaryTag } from '@/lib/types/menu'
import { useDebounce } from './use-debounce'

export function useMenuFilter(categories: MenuCategory[]) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<DietaryTag[]>([])

  const debouncedSearch = useDebounce(search, 300)

  const toggleFilter = (tag: DietaryTag) => {
    setFilters((prev) =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setFilters([])
  }

  const totalCount = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.items.length, 0),
    [categories]
  )

  const filtered = useMemo(() => {
    const query = debouncedSearch.toLowerCase().trim()

    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const matchesSearch =
            !query ||
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)

          const matchesDietary =
            filters.length === 0 ||
            filters.every((tag) => item.dietary.includes(tag))

          return matchesSearch && matchesDietary
        }),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [categories, debouncedSearch, filters])

  const filteredCount = useMemo(
    () => filtered.reduce((sum, cat) => sum + cat.items.length, 0),
    [filtered]
  )

  return {
    search,
    setSearch,
    filters,
    toggleFilter,
    clearFilters,
    filtered,
    totalCount,
    filteredCount,
  }
}
