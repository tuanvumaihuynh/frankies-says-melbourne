import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function BookingCtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-stone-900 text-white py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-accent text-sm tracking-widest uppercase mb-4 font-medium">
          Join Us
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-6 leading-tight">
          Reserve Your Experience
        </h2>
        <p className="text-stone-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Whether it's a relaxed weekend brunch or an intimate evening dinner, we'll make sure
          your table is ready and waiting.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-10"
        >
          <Link to="/booking">Book a Table</Link>
        </Button>
      </motion.div>
    </section>
  )
}
