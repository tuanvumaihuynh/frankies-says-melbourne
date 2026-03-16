import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import testimonialsData from '@/data/testimonials.json'

interface Testimonial {
  id: string
  name: string
  quote: string
  rating: number
  source: string
}

const testimonials = testimonialsData as Testimonial[]

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[index] as HTMLElement
    if (card) {
      container.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    scrollToIndex(activeIndex)
  }, [activeIndex, scrollToIndex])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="What Our Guests Say"
          subtitle="Real experiences from the Frankie Says community."
          align="center"
        />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[420px] bg-card rounded-xl p-6 border border-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="flex items-center justify-between">
                <span className="font-semibold text-sm">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.source}</span>
              </footer>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-border'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
