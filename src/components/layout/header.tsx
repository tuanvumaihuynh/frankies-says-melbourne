import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/lib/constants'
import { useScroll } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { NavLink } from './nav-link'
import { OpenStatus } from './open-status'
import { MobileMenu } from './mobile-menu'

export function Header() {
  const isScrolled = useScroll(50)
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleOpenChange = useCallback((open: boolean) => setMobileOpen(open), [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
          Frankie Says
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.filter((l) => l.path !== '/').map((link) => (
            <NavLink key={link.path} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <OpenStatus />
          </div>
          <Button
            render={<Link to="/booking" />}
            className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Book a Table
          </Button>
          <MobileMenu open={mobileOpen} onOpenChange={handleOpenChange} />
        </div>
      </div>
    </header>
  )
}
