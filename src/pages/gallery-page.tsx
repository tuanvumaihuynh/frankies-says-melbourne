import { SectionHeading } from '@/components/common/section-heading'
import { GalleryFilterTabs } from '@/components/gallery/gallery-filter-tabs'
import { MasonryGallery } from '@/components/gallery/masonry-gallery'
import { GalleryLightbox } from '@/components/gallery/gallery-lightbox'
import { useGalleryFilter } from '@/hooks/use-gallery-filter'
import { useLightbox } from '@/hooks/use-lightbox'

export function GalleryPage() {
  const { activeCategory, setCategory, filteredImages, categoryCounts } =
    useGalleryFilter()
  const { isOpen, currentIndex, open, close, next, prev } = useLightbox(
    filteredImages.length
  )

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          title="Gallery"
          subtitle="A look inside Frankie Says — the food, the space, the moments."
        />
        <GalleryFilterTabs
          activeCategory={activeCategory}
          categoryCounts={categoryCounts}
          onSelect={setCategory}
        />
        <MasonryGallery images={filteredImages} onImageClick={open} />
      </div>
      <GalleryLightbox
        images={filteredImages}
        isOpen={isOpen}
        currentIndex={currentIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </div>
  )
}
