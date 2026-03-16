export type GalleryCategory = 'all' | 'food' | 'ambiance' | 'events'

export interface GalleryImage {
  id: string
  src?: string
  alt: string
  caption?: string
  category: Exclude<GalleryCategory, 'all'>
  aspectRatio: string  // "4/3", "3/4", "1/1", "16/9"
  color: string        // fallback bg color like "bg-amber-200"
}
