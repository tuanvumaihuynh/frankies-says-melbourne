import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { ContactMethodCard } from './contact-method-card'

const channels = [
  {
    icon: Phone,
    label: 'Phone',
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
    description: 'Call us directly',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us',
    href: `https://wa.me/${SITE_CONFIG.whatsapp}`,
    description: 'Message us on WhatsApp',
  },
  {
    icon: Mail,
    label: 'Email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    description: 'Send us an email',
  },
  {
    icon: MapPin,
    label: 'Visit',
    value: SITE_CONFIG.address.full,
    href: '/about',
    description: 'Drop by and see us',
  },
] as const

export function ContactChannels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {channels.map((channel) => (
        <ContactMethodCard key={channel.label} {...channel} />
      ))}
    </div>
  )
}
