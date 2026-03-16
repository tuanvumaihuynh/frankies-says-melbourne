import { SectionHeading } from '@/components/common/section-heading'
import { MenuTabs } from '@/components/menu/menu-tabs'
import menuData from '@/data/menu-data.json'
import type { MenuData } from '@/lib/types/menu'

export function MenuPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="Our Menu"
          subtitle="Locally sourced, thoughtfully prepared — from morning coffee to evening cocktails."
          align="center"
        />
        <MenuTabs data={menuData as MenuData} />
        <p className="mt-12 text-center text-sm text-muted-foreground border-t border-border pt-6">
          Please inform our staff of any dietary requirements or allergies.
        </p>
      </div>
    </main>
  )
}
