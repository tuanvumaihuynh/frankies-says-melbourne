import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MenuToolbar } from './menu-toolbar'
import { MenuCategory } from './menu-category'
import { MenuEmptyState } from './menu-empty-state'
import { useMenuFilter } from '@/hooks/use-menu-filter'
import type { MenuData } from '@/lib/types/menu'

type TabValue = 'day' | 'night' | 'special'

const TAB_LABELS: Record<TabValue, string> = {
  day: 'Day Menu',
  night: 'Night Menu',
  special: 'Specials',
}

const VALID_TABS: TabValue[] = ['day', 'night', 'special']

function isValidTab(value: string): value is TabValue {
  return VALID_TABS.includes(value as TabValue)
}

interface TabPanelProps {
  categories: MenuData[TabValue]
}

function TabPanel({ categories }: TabPanelProps) {
  const {
    search,
    setSearch,
    filters,
    toggleFilter,
    clearFilters,
    filtered,
    totalCount,
    filteredCount,
  } = useMenuFilter(categories)

  return (
    <div className="pt-4">
      <MenuToolbar
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onToggleFilter={toggleFilter}
        onClearFilters={clearFilters}
        filteredCount={filteredCount}
        totalCount={totalCount}
      />
      {filtered.length === 0 ? (
        <MenuEmptyState onClearFilters={clearFilters} />
      ) : (
        filtered.map((cat) => (
          <MenuCategory key={cat.id} category={cat} />
        ))
      )}
    </div>
  )
}

interface MenuTabsProps {
  data: MenuData
}

export function MenuTabs({ data }: MenuTabsProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawTab = searchParams.get('tab') ?? 'day'
  const activeTab: TabValue = isValidTab(rawTab) ? rawTab : 'day'

  const handleTabChange = (value: TabValue) => {
    setSearchParams({ tab: value }, { replace: true })
  }

  // Sync invalid param to default on mount
  useEffect(() => {
    if (!isValidTab(rawTab)) {
      setSearchParams({ tab: 'day' }, { replace: true })
    }
  }, [rawTab, setSearchParams])

  return (
    <Tabs value={activeTab} onValueChange={(v) => handleTabChange(v as TabValue)}>
      <TabsList className="w-full sm:w-auto">
        {VALID_TABS.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="flex-1 sm:flex-none px-4">
            {TAB_LABELS[tab]}
          </TabsTrigger>
        ))}
      </TabsList>

      {VALID_TABS.map((tab) => (
        <TabsContent key={tab} value={tab}>
          <TabPanel categories={data[tab]} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
