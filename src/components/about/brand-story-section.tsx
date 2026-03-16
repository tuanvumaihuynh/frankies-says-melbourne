import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/section-heading'

export function BrandStorySection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionHeading title="Our Story" align="left" />
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Frankie Says was born from a simple belief: that great food
              deserves great company. Nestled on Acacia Place in the heart of
              Abbotsford, we opened our doors as a neighbourhood cafe with a
              commitment to the rhythms of Melbourne life — slow mornings,
              long lunches, and evenings that linger.
            </p>
            <p>
              Everything on our menu follows the seasons. We work closely with
              local Victorian producers and farmers to source the freshest
              ingredients, letting the produce speak for itself. From our
              house-made pastries at dawn to our wood-fired small plates at
              dusk, each dish reflects the vibrant, multicultural spirit of
              Abbotsford.
            </p>
            <p>
              We believe a cafe should be a third place — somewhere between
              home and work where the community gathers. Whether you're in for
              a quiet solo coffee, a celebration with friends, or a relaxed
              evening dinner, Frankie Says is here to make the ordinary feel
              extraordinary.
            </p>
          </div>
        </motion.div>

        {/* Cafe photo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="relative h-80 lg:h-full min-h-72 rounded-2xl overflow-hidden"
        >
          <img
            src="/images/hero/background.jpg"
            alt="Frankie Says Melbourne storefront"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
