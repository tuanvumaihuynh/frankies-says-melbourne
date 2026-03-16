import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/common/section-heading'
import { SITE_CONFIG } from '@/lib/constants'

export function AboutPreviewSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionHeading
              title="Our Story"
              subtitle="Born from a love of Melbourne's vibrant cafe culture."
              align="left"
            />

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Frankie Says grew out of a simple belief: that great food deserves great company.
                Nestled on Acacia Place in Abbotsford, we've built a space where the neighbourhood
                gathers — from the early-morning regulars with their flat whites to the
                Friday-night crowd chasing something special.
              </p>
              <p>
                Our kitchen is driven by the seasons. We source from local Victorian producers and
                small farms, which means the menu is always evolving and always honest. When
                something's in peak condition, we celebrate it. When it's not, we wait.
              </p>
              <p>
                From brunch through to late-night dining, Frankie Says is a place to slow down,
                eat well, and feel at home in Melbourne's most storied neighbourhood.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group"
              >
                Our Story
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Location teaser */}
            <div className="rounded-xl border border-border bg-secondary/30 p-5 flex items-start gap-4">
              <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm mb-1">Find Us</p>
                <p className="text-sm text-muted-foreground mb-3">{SITE_CONFIG.address.full}</p>
                <Button render={<a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" />} size="sm" variant="outline" className="gap-2">
                    Get Directions
                    <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Placeholder visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/gallery/scene3.webp"
                alt="Frankie Says Melbourne interior"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl bg-accent/20 -z-10" />
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-stone-200 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
