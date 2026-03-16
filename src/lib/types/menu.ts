export type DietaryTag = 'V' | 'VG' | 'GF' | 'DF' | 'NF'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  dietary: DietaryTag[]
  image?: string
  featured?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
  items: MenuItem[]
}

export interface MenuData {
  day: MenuCategory[]
  night: MenuCategory[]
  special: MenuCategory[]
}

export const DIETARY_CONFIG: Record<DietaryTag, { label: string; color: string }> = {
  V: { label: 'Vegetarian', color: 'bg-green-100 text-green-800' },
  VG: { label: 'Vegan', color: 'bg-emerald-100 text-emerald-800' },
  GF: { label: 'Gluten Free', color: 'bg-amber-100 text-amber-800' },
  DF: { label: 'Dairy Free', color: 'bg-blue-100 text-blue-800' },
  NF: { label: 'Nut Free', color: 'bg-orange-100 text-orange-800' },
}
