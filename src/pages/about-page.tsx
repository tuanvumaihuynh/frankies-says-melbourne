import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BrandStorySection } from '@/components/about/brand-story-section'
import { LocationSection } from '@/components/about/location-section'
import { HoursSection } from '@/components/about/hours-section'

export function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 px-4">
        <div className="relative z-10 text-center">
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest text-accent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Abbotsford, Melbourne
          </motion.p>
          <motion.h1
            className="font-serif text-4xl font-bold text-white sm:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Frankie Says
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-md text-stone-300"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our story, our neighbourhood, our philosophy.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <BrandStorySection />

      <Separator className="mx-auto max-w-7xl" />

      {/* Location */}
      <LocationSection />

      <Separator className="mx-auto max-w-7xl" />

      {/* Hours */}
      <HoursSection />

      {/* Booking CTA */}
      <section className="bg-stone-900 px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Ready to visit?
          </h2>
          <p className="mt-4 text-stone-400">
            Secure your table and experience Frankie Says for yourself.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-accent px-10 text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/booking">Book a Table</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}
