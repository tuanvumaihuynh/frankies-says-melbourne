import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import galleryData from '@/data/gallery-images.json'

interface GalleryImage {
  id: string
  src?: string
  alt: string
  category: string
  aspectRatio: string
}

export function GalleryPreviewSection() {
  const images = galleryData as GalleryImage[]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Gallery"
          subtitle="A glimpse into the world of Frankie Says."
          align="center"
        />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid overflow-hidden rounded-xl group relative"
              style={{ aspectRatio: image.aspectRatio }}
            >
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-stone-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-xs text-white font-medium leading-snug">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  )
}
