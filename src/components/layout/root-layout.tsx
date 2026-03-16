import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { Header } from './header'
import { Footer } from './footer'
import { ScrollToTop } from './scroll-to-top'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  )
}
