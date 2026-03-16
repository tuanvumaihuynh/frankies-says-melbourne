import { HeroSection } from '@/components/home/hero-section'
import { PromotionBanner } from '@/components/home/promotion-banner'
import { MenuPreviewSection } from '@/components/home/menu-preview-section'
import { BookingCtaSection } from '@/components/home/booking-cta-section'
import { GalleryPreviewSection } from '@/components/home/gallery-preview-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { AboutPreviewSection } from '@/components/home/about-preview-section'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <PromotionBanner />
      <MenuPreviewSection />
      <BookingCtaSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <AboutPreviewSection />
    </>
  )
}
