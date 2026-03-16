import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import { LazyImage } from '@/components/common/lazy-image'
import type { GalleryImage as GalleryImageType } from '@/lib/types/gallery'

interface GalleryImageProps {
  image: GalleryImageType
  index: number
  onClick: (index: number) => void
}

export function GalleryImage({ image, index, onClick }: GalleryImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      className="break-inside-avoid mb-4 cursor-pointer group relative rounded-xl overflow-hidden"
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.alt}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(index)
        }
      }}
    >
      <LazyImage
        src={image.src}
        alt={image.alt}
        color={image.color}
        aspectRatio={image.aspectRatio}
        className="w-full"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        {image.caption && (
          <p className="text-white text-xs font-medium leading-snug mb-1">
            {image.caption}
          </p>
        )}
        <div className="flex items-center justify-end">
          <ZoomIn className="size-5 text-white/80" />
        </div>
      </div>
    </motion.div>
  )
}
