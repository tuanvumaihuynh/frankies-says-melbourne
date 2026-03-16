import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { NavLink } from './nav-link'
import { OpenStatus } from './open-status'

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const location = useLocation()

  useEffect(() => {
    onOpenChange(false)
  }, [location.pathname, onOpenChange])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Frankie Says</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="text-base py-2"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8">
          <OpenStatus />
        </div>
        <div className="mt-6">
          <Button render={<Link to="/booking" />} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Book a Table
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
