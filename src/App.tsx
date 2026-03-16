import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootLayout } from '@/components/layout/root-layout'
import { NotFoundPage } from '@/pages/not-found-page'

const HomePage = lazy(() =>
  import('@/pages/home-page').then((m) => ({ default: m.HomePage }))
)
const MenuPage = lazy(() =>
  import('@/pages/menu-page').then((m) => ({ default: m.MenuPage }))
)
const BookingPage = lazy(() =>
  import('@/pages/booking-page').then((m) => ({ default: m.BookingPage }))
)
const EventsPage = lazy(() =>
  import('@/pages/events-page').then((m) => ({ default: m.EventsPage }))
)
const GalleryPage = lazy(() =>
  import('@/pages/gallery-page').then((m) => ({ default: m.GalleryPage }))
)
const AboutPage = lazy(() =>
  import('@/pages/about-page').then((m) => ({ default: m.AboutPage }))
)
const ContactPage = lazy(() =>
  import('@/pages/contact-page').then((m) => ({ default: m.ContactPage }))
)

const queryClient = new QueryClient()

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center pt-24">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/menu',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MenuPage />
          </Suspense>
        ),
      },
      {
        path: '/booking',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BookingPage />
          </Suspense>
        ),
      },
      {
        path: '/events',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EventsPage />
          </Suspense>
        ),
      },
      {
        path: '/gallery',
        element: (
          <Suspense fallback={<PageLoader />}>
            <GalleryPage />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
