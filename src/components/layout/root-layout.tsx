import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { Header } from './header'
import { Footer } from './footer'
import { ScrollToTop } from './scroll-to-top'
import { PageTransition } from './page-transition'

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  )
}
