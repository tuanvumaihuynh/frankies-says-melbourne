import { useState, useEffect, useRef, CSSProperties } from 'react'

interface UseParallaxOptions {
  speed?: number
}

interface UseParallaxReturn {
  style: CSSProperties
  ref: React.RefObject<HTMLDivElement | null>
}

export function useParallax({ speed = 0.3 }: UseParallaxOptions = {}): UseParallaxReturn {
  const ref = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const checkEnabled = () => {
      setEnabled(!mq.matches && !rmq.matches)
    }

    checkEnabled()
    mq.addEventListener('change', checkEnabled)
    rmq.addEventListener('change', checkEnabled)

    return () => {
      mq.removeEventListener('change', checkEnabled)
      rmq.removeEventListener('change', checkEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setTranslateY(0)
      return
    }

    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            const viewportCenter = window.innerHeight / 2
            const elementCenter = rect.top + rect.height / 2
            const offset = (viewportCenter - elementCenter) * speed
            setTranslateY(offset)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled, speed])

  return {
    ref,
    style: enabled ? { transform: `translateY(${translateY}px)` } : {},
  }
}
