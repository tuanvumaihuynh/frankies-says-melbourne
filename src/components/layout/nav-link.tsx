import { NavLink as RouterNavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  to: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function NavLink({ to, children, onClick, className }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'text-sm font-medium transition-colors hover:text-accent',
          isActive
            ? 'text-accent border-b-2 border-accent pb-0.5'
            : 'text-foreground/80',
          className
        )
      }
    >
      {children}
    </RouterNavLink>
  )
}
