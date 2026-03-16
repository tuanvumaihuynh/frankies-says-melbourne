import { Instagram, Music2, Facebook } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { SectionHeading } from '@/components/common/section-heading'
import { ContactChannels } from '@/components/contact/contact-channels'
import { ContactForm } from '@/components/contact/contact-form'
import { FAQSection } from '@/components/contact/faq-section'
import { SITE_CONFIG } from '@/lib/constants'
import { useOpenStatus } from '@/hooks/use-open-status'

function HoursSidebar() {
  const { isOpen, label, todayHours } = useOpenStatus()

  return (
    <aside className="space-y-6">
      {/* Status */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-serif text-lg font-semibold">Today's Hours</h3>
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-400'}`}
          />
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        {todayHours && (
          <p className="mt-1 text-sm text-muted-foreground">
            {todayHours.open} – {todayHours.close}
          </p>
        )}
      </div>

      {/* Social */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-serif text-lg font-semibold">Follow Us</h3>
        <div className="mt-4 flex gap-3">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={SITE_CONFIG.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Music2 className="h-5 w-5" />
          </a>
          <a
            href={SITE_CONFIG.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>
      </div>
    </aside>
  )
}

export function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="We'd love to hear from you. Reach out however suits you best."
        />

        {/* Contact channels */}
        <ContactChannels />

        <Separator className="my-14" />

        {/* Form + sidebar */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>
          <HoursSidebar />
        </div>
      </div>

      {/* FAQ */}
      <Separator className="mt-14 mx-auto max-w-7xl" />
      <FAQSection />
    </div>
  )
}
