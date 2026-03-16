import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuPreviewCardProps {
  title: string
  description: string
  to: string
  gradient: string
  image?: string
}

export function MenuPreviewCard({ title, description, to, gradient, image }: MenuPreviewCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group relative flex flex-col justify-end overflow-hidden rounded-xl p-6 min-h-[260px]',
        'transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
      )}
    >
      {/* Background image or gradient fallback */}
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={cn('absolute inset-0 transition-opacity duration-300', gradient)} />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/85 transition-colors duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-serif text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/75 text-sm leading-relaxed mb-4">{description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white group-hover:gap-2.5 transition-all duration-200">
          View Menu
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
