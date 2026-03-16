import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { GalleryImage } from '@/lib/types/gallery'

interface GalleryLightboxProps {
  images: GalleryImage[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function GalleryLightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  if (!isOpen || images.length === 0) return null

  const current = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/10 text-white text-sm">
            {currentIndex + 1} of {images.length}
          </div>

          {/* Prev button */}
          <button
            className={cn(
              'absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors',
              images.length <= 1 && 'opacity-0 pointer-events-none'
            )}
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-4xl w-full mx-16 flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full rounded-xl overflow-hidden shadow-2xl">
              {current.src ? (
                <img
                  src={current.src}
                  alt={current.alt}
                  className="w-full h-auto max-h-[80vh] object-contain bg-black"
                />
              ) : (
                <div
                  className={cn('w-full aspect-[4/3] flex items-center justify-center', current.color)}
                >
                  <span className="text-white/70 text-sm">{current.alt}</span>
                </div>
              )}
            </div>
            {current.caption && (
              <p className="text-white/80 text-sm text-center px-4">
                {current.caption}
              </p>
            )}
          </motion.div>

          {/* Next button */}
          <button
            className={cn(
              'absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors',
              images.length <= 1 && 'opacity-0 pointer-events-none'
            )}
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
