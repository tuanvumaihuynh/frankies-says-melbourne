import type { MenuCategory as MenuCategoryType } from '@/lib/types/menu'
import { MenuItemCard } from './menu-item-card'

interface MenuCategoryProps {
  category: MenuCategoryType
}

export function MenuCategory({ category }: MenuCategoryProps) {
  if (category.items.length === 0) return null

  return (
    <section className="mb-10">
      <div className="mb-4">
        <h3 className="font-serif text-xl font-semibold text-foreground">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
