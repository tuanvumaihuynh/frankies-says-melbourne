import { useState, useMemo } from 'react'
import type { GalleryCategory, GalleryImage } from '@/lib/types/gallery'
import galleryData from '@/data/gallery-data.json'

const images = galleryData as GalleryImage[]

export function useGalleryFilter() {
  const [activeCategory, setCategory] = useState<GalleryCategory>('all')

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return images
    return images.filter((img) => img.category === activeCategory)
  }, [activeCategory])

  const categoryCounts = useMemo(
    () => ({
      all: images.length,
      food: images.filter((img) => img.category === 'food').length,
      ambiance: images.filter((img) => img.category === 'ambiance').length,
      events: images.filter((img) => img.category === 'events').length,
    }),
    []
  )

  return { activeCategory, setCategory, filteredImages, categoryCounts }
}
