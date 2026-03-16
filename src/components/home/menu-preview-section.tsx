import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeading } from '@/components/common/section-heading'
import { MenuPreviewCard } from './menu-preview-card'

const MENU_CARDS = [
  {
    title: 'Day Menu',
    description: 'Fresh seasonal brunch and lunch plates, all-day coffee, and house-made pastries.',
    to: '/menu?tab=day',
    gradient: 'bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900',
    image: '/images/food/bigbreakie.jpg',
  },
  {
    title: 'Night Menu',
    description: 'Evening dining featuring share plates, mains, and craft cocktails for the full experience.',
    to: '/menu?tab=night',
    gradient: 'bg-gradient-to-br from-stone-700 via-stone-800 to-slate-900',
    image: '/images/food/frannkiecombo.jpg',
  },
  {
    title: 'Seasonal Specials',
    description: 'Chef-driven dishes celebrating the best local produce of the current season.',
    to: '/menu?tab=special',
    gradient: 'bg-gradient-to-br from-emerald-800 via-stone-800 to-stone-900',
    image: '/images/food/truffleudon.jpg',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function MenuPreviewSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Our Menu"
          subtitle="From morning rituals to late-night dining — there's always something worth coming back for."
          align="center"
        />
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {MENU_CARDS.map((card) => (
            <motion.div key={card.to} variants={cardVariants}>
              <MenuPreviewCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
