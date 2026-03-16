import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/common/section-heading'
import { useOpenStatus } from '@/hooks/use-open-status'
import { HoursTable } from './hours-table'

export function HoursSection() {
  const { isOpen, label } = useOpenStatus()

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-3 mb-8">
        <SectionHeading title="Opening Hours" className="mb-0" />
        <Badge variant={isOpen ? 'default' : 'secondary'}>
          {label}
        </Badge>
      </div>
      <HoursTable />
    </section>
  )
}
