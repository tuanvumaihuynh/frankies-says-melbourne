import { Link } from 'react-router-dom'
import { Instagram, Music2, Facebook } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import hoursData from '@/data/hours.json'

const DAYS_ORDERED = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, '0')}${suffix}`
}

function getTodayIndex() {
  const day = new Date().toLocaleDateString('en-US', {
    timeZone: hoursData.timezone,
    weekday: 'long',
  })
  return DAYS_ORDERED.indexOf(day.toLowerCase() as (typeof DAYS_ORDERED)[number])
}

export function Footer() {
  const todayIdx = getTodayIndex()

  return (
    <footer className="border-t bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">
              Frankie Says
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              A Melbourne brunch cafe and evening dining experience in the heart
              of Abbotsford. Fresh seasonal menus, craft cocktails, and
              unforgettable moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-stone-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Opening Hours
            </h4>
            <dl className="mt-3 space-y-1 text-sm">
              {DAYS_ORDERED.map((day, i) => {
                const hours =
                  hoursData.schedule[day as keyof typeof hoursData.schedule]
                return (
                  <div
                    key={day}
                    className={`flex justify-between ${i === todayIdx ? 'text-white font-medium' : 'text-stone-400'}`}
                  >
                    <dt className="capitalize">{day.slice(0, 3)}</dt>
                    <dd>
                      {hours
                        ? `${formatTime(hours.open)} – ${formatTime(hours.close)}`
                        : 'Closed'}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h4>
            <div className="mt-3 flex gap-3">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-800 p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-800 p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="TikTok"
              >
                <Music2 className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-800 p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4 text-sm text-stone-400">
              <p>{SITE_CONFIG.address.full}</p>
              <p className="mt-1">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-stone-800 pt-6 text-center text-xs text-stone-500">
          &copy; {new Date().getFullYear()} Frankie Says Melbourne. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}
