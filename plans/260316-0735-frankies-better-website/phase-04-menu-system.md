# Phase 04 - Menu System

## Overview

| Field | Value |
|-------|-------|
| Priority | P1 - Critical |
| Status | Pending |
| Effort | 5h |
| Dependencies | Phase 02 |

Build searchable text-based menu pages with Day/Night/Special tabs, dietary filters, price display, item cards with food photography, and category grouping. This is the single biggest improvement over the original site's image-only menus.

## Key Insights

- Original menus are PNG images - zero searchability, no SEO, no accessibility, no filtering
- Text-based menus with structured JSON data unlock: search, dietary filters, SEO schema, screen readers
- Dual menu model (Day/Night) maps to cafe's actual operation - tabs are natural UX
- Dietary filters (V, VG, GF, DF, NF) are expected by Melbourne's health-conscious market
- Keep the visual appeal - each item can have optional food photo
- Menu data should be easy for cafe staff to update (simple JSON structure)

## Requirements

### Functional
- Tabbed interface: Day Menu / Night Menu / Special/Seasonal
- Each menu organized by category (e.g., "Eggs & Toast", "Bowls", "Drinks")
- Menu item card: name, description, price, dietary tags, optional image
- Real-time text search across all menu items (name + description)
- Dietary filter toggles: Vegetarian, Vegan, Gluten Free, Dairy Free, Nut Free
- Active filters shown as removable badges
- "No results" empty state with clear filters action
- Item count display ("Showing 12 of 34 items")
- Optional: click item to expand details/image in dialog

### Non-Functional
- Search debounced at 300ms
- Filters update results instantly (client-side)
- Menu data < 50KB JSON (no runtime API needed)
- Schema.org `Menu` + `MenuItem` structured data
- All menu items keyboard accessible

## Architecture

### Component Tree
```
MenuPage
├── MenuHeader
│   ├── SectionHeading ("Our Menu")
│   └── MenuDescription
├── MenuTabs (Day / Night / Special)
│   ├── MenuToolbar
│   │   ├── SearchInput (with search icon)
│   │   ├── DietaryFilterGroup
│   │   │   └── FilterToggle[] (V, VG, GF, DF, NF)
│   │   ├── ActiveFilters (badge pills)
│   │   └── ResultCount
│   └── MenuContent
│       └── MenuCategory[]
│           ├── CategoryHeading
│           └── MenuItemCard[]
│               ├── ItemImage (optional, lazy)
│               ├── ItemName
│               ├── ItemDescription
│               ├── ItemPrice
│               └── DietaryBadge[]
├── MenuImageFallback (original PNG menu image, toggle)
└── BookingCTABanner ("Loved what you see? Book a table")
```

### Data Model
```typescript
interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  dietary: DietaryTag[]     // ['V', 'VG', 'GF', 'DF', 'NF']
  image?: string            // optional food photo path
  featured?: boolean        // highlight badge
  available?: boolean       // seasonal availability
}

interface MenuCategory {
  id: string
  name: string
  description?: string
  items: MenuItem[]
}

interface MenuData {
  day: MenuCategory[]
  night: MenuCategory[]
  special: MenuCategory[]
}

type DietaryTag = 'V' | 'VG' | 'GF' | 'DF' | 'NF'
```

### Filtering Logic
```
filteredItems = items
  .filter(item => matchesSearch(item, searchQuery))
  .filter(item => matchesDietaryFilters(item, activeFilters))
```
- Search: case-insensitive match on `name` OR `description`
- Dietary: AND logic - item must have ALL selected tags (intersection)

## Related Code Files

### Files to Create
- `/src/pages/menu-page.tsx` - Menu page composition
- `/src/components/menu/menu-tabs.tsx` - Day/Night/Special tab container
- `/src/components/menu/menu-toolbar.tsx` - Search + filters bar
- `/src/components/menu/search-input.tsx` - Debounced search field
- `/src/components/menu/dietary-filter-group.tsx` - Filter toggle buttons
- `/src/components/menu/active-filters.tsx` - Active filter badges
- `/src/components/menu/menu-category.tsx` - Category section with heading
- `/src/components/menu/menu-item-card.tsx` - Individual menu item
- `/src/components/menu/dietary-badge.tsx` - Single dietary tag badge
- `/src/components/menu/menu-empty-state.tsx` - No results state
- `/src/components/menu/menu-image-fallback.tsx` - Toggle to view original PNG
- `/src/hooks/use-menu-filter.ts` - Search + dietary filter logic
- `/src/data/menu-data.json` - Complete menu data (day, night, special)
- `/src/lib/types/menu.ts` - TypeScript types for menu data

### Files to Modify
- `/src/App.tsx` - Register /menu route

## Implementation Steps

1. **Define menu types** in `lib/types/menu.ts`:
   - `DietaryTag`, `MenuItem`, `MenuCategory`, `MenuData` interfaces
   - Dietary tag display config: `{ V: { label: 'Vegetarian', color: 'green' }, ... }`

2. **Create menu-data.json** with realistic Melbourne brunch items:
   - Day Menu categories: Eggs & Toast, Bowls & Salads, Sandwiches, Sweets, Hot Drinks, Cold Drinks
   - Night Menu categories: Small Plates, Mains, Dessert, Wine, Cocktails, Non-Alcoholic
   - Special: 3-5 seasonal items (Winter Series theme from original)
   - ~30-40 items total with prices in AUD, dietary tags

3. **Build `useMenuFilter` hook**:
   ```ts
   function useMenuFilter(categories: MenuCategory[]) {
     const [search, setSearch] = useState('')
     const [filters, setFilters] = useState<DietaryTag[]>([])
     const debouncedSearch = useDebounce(search, 300)

     const filtered = useMemo(() =>
       filterCategories(categories, debouncedSearch, filters),
       [categories, debouncedSearch, filters]
     )

     const totalCount = countItems(categories)
     const filteredCount = countItems(filtered)

     return { search, setSearch, filters, toggleFilter, clearFilters, filtered, totalCount, filteredCount }
   }
   ```

4. **Build SearchInput**:
   - `Input` from shadcn with `Search` icon prefix
   - Controlled value from `useMenuFilter`
   - Clear button (X) when has value
   - Placeholder: "Search menu items..."

5. **Build DietaryFilterGroup**:
   - Row of toggle buttons for each dietary tag
   - Each button: colored when active, muted when inactive
   - Badge-style appearance using shadcn `Toggle`
   - Display config: `V=green, VG=emerald, GF=amber, DF=blue, NF=orange`

6. **Build ActiveFilters**:
   - Shows only when filters active
   - Removable badge pills for each active filter
   - "Clear all" button

7. **Build MenuItemCard**:
   - Horizontal card layout: image (left, optional), content (right)
   - Name: Playfair Display serif, semi-bold
   - Description: Inter, muted color, 2-line clamp
   - Price: right-aligned, `$XX.X0` format
   - Dietary badges: small colored pills below description
   - Featured items: subtle accent border + "Featured" badge
   - Hover: slight elevation/shadow lift
   - Mobile: stack vertical (image on top)

8. **Build MenuCategory**:
   - Section heading with category name + optional description
   - Grid of MenuItemCards (1 col mobile, 2 col desktop)
   - Skip rendering if all items filtered out

9. **Build MenuEmptyState**:
   - Illustration or icon (Search icon)
   - "No items match your search" message
   - "Clear filters" button
   - Suggestion: "Try searching for 'eggs' or 'coffee'"

10. **Build MenuTabs** using shadcn Tabs:
    - 3 tabs: Day, Night, Special
    - Each tab triggers filter reset
    - URL sync: `/menu?tab=night` via searchParams
    - Tab content: MenuToolbar + MenuContent (categories)

11. **Build MenuImageFallback**:
    - Toggle button: "View as image"
    - Shows original PNG menu image in dialog/lightbox
    - Accessible alternative for users who prefer visual menu

12. **Build MenuPage** composition:
    - MenuHeader → MenuTabs → BookingCTABanner at bottom
    - Add Schema.org structured data in `<script type="application/ld+json">`

13. **Add structured data** (Schema.org Menu):
    ```json
    {
      "@context": "https://schema.org",
      "@type": "Menu",
      "name": "Frankie Says Day Menu",
      "hasMenuSection": [...]
    }
    ```

## Todo List

- [ ] Define TypeScript types for menu data
- [ ] Create menu-data.json with realistic items
- [ ] Build useMenuFilter hook with debounced search
- [ ] Build SearchInput component
- [ ] Build DietaryFilterGroup toggles
- [ ] Build ActiveFilters badges
- [ ] Build DietaryBadge component
- [ ] Build MenuItemCard component
- [ ] Build MenuCategory section
- [ ] Build MenuEmptyState
- [ ] Build MenuTabs with URL sync
- [ ] Build MenuImageFallback toggle
- [ ] Build MenuPage composition
- [ ] Add Schema.org Menu structured data
- [ ] Add BookingCTA banner at bottom

## Success Criteria

- All 3 tabs render menu categories with items
- Search filters items in real-time (300ms debounce)
- Dietary filters narrow results with AND logic
- Active filters shown as removable badges
- Empty state renders when no matches
- Result count updates: "Showing X of Y items"
- Menu items display name, description, price, dietary badges
- Mobile layout stacks properly
- Tab selection persists in URL params
- Keyboard navigation works through all controls

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Menu data maintenance burden | Medium | Medium | Simple JSON structure, easy to edit |
| Too many items cause slow rendering | Low | Low | Virtualize list if >100 items (unlikely for cafe) |
| Dietary tag accuracy (legal risk) | High | High | Add disclaimer: "Please inform staff of allergies" |
| Image-heavy menu slow to load | Medium | Medium | Images optional, lazy loaded, WebP format |

## Security Considerations

- Menu prices displayed client-side; not authoritative for billing
- Dietary info comes with allergy disclaimer
- No user-submitted data on this page
