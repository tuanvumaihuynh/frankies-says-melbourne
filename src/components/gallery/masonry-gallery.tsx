import { AnimatePresence } from 'framer-motion'
import { GalleryImage } from '@/components/gallery/gallery-image'
import type { GalleryImage as GalleryImageType } from '@/lib/types/gallery'

interface MasonryGalleryProps {
  images: GalleryImageType[]
  onImageClick: (index: number) => void
}

export function MasonryGallery({ images, onImageClick }: MasonryGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No images in this category yet.
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <div
        key={images.map((i) => i.id).join(',')}
        className="columns-1 sm:columns-2 lg:columns-3 gap-4"
      >
        {images.map((image, index) => (
          <GalleryImage
            key={image.id}
            image={image}
            index={index}
            onClick={onImageClick}
          />
        ))}
      </div>
    </AnimatePresence>
  )
}
