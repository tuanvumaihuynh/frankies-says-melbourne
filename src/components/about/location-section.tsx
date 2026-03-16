import { SectionHeading } from '@/components/common/section-heading'
import { AddressCard } from './address-card'
import { GoogleMapEmbed } from './google-map-embed'

export function LocationSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title="Find Us" subtitle="Visit us in the heart of Abbotsford, Melbourne" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <AddressCard />
        <GoogleMapEmbed />
      </div>
    </section>
  )
}
