import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ContactMethodCardProps {
  icon: LucideIcon
  label: string
  value: string
  href: string
  description: string
}

export function ContactMethodCard({
  icon: Icon,
  label,
  value,
  href,
  description,
}: ContactMethodCardProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group block"
    >
      <Card
        className={cn(
          'h-full transition-all duration-200',
          'group-hover:border-accent group-hover:shadow-md'
        )}
      >
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </div>
          <p className="font-medium text-foreground leading-snug">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </a>
  )
}
