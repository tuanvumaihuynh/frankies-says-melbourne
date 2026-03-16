import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src?: string
  alt: string
  color?: string
  aspectRatio?: string
  className?: string
  objectPosition?: string
}

const aspectMap: Record<string, string> = {
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
}

export function LazyImage({
  src,
  alt,
  color = 'bg-stone-200',
  aspectRatio = '4/3',
  className,
  objectPosition = 'center',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const aspectClass = aspectMap[aspectRatio] ?? 'aspect-[4/3]'

  if (!src) {
    return (
      <div
        className={cn('relative w-full overflow-hidden', aspectClass, color, className)}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-center text-xs text-white/70 font-medium leading-snug line-clamp-3 drop-shadow">
            {alt}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative w-full overflow-hidden', aspectClass, className)}>
      {!loaded && <div className={cn('absolute inset-0', color)} />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{ objectPosition }}
      />
    </div>
  )
}
