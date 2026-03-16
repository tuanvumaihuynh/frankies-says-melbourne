import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollIndicator } from '@/components/common/scroll-indicator'
import { useParallax } from '@/hooks/use-parallax'

export function HeroSection() {
  const parallax = useParallax({ speed: 0.3 })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background image */}
      <div
        ref={parallax.ref}
        className="absolute inset-0"
        style={parallax.style}
      >
        <img
          src="/images/hero/background.jpg"
          alt="Frankie Says Melbourne"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.p
          className="text-accent text-sm sm:text-base tracking-widest uppercase mb-4 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Abbotsford, Melbourne
        </motion.p>

        <motion.h1
          className="font-serif text-5xl sm:text-7xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Frankie Says
        </motion.h1>

        <motion.p
          className="text-stone-300 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Melbourne's favourite brunch &amp; evening dining
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button
            render={<Link to="/menu" />}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
          >
            Explore Our Menu
          </Button>
          <Button
            render={<Link to="/booking" />}
            size="lg"
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white/10 px-8"
          >
            Book a Table
          </Button>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
