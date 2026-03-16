import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import promotionsData from '@/data/promotions.json'

interface Promotion {
  id: string
  title: string
  description: string
  badge: string
  active: boolean
}

const DISMISSED_KEY = 'dismissed_promotions'

function getDismissed(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(DISMISSED_KEY) ?? '[]')
  } catch {
    return []
  }
}

function setDismissed(ids: string[]) {
  sessionStorage.setItem(DISMISSED_KEY, JSON.stringify(ids))
}

export function PromotionBanner() {
  const [visible, setVisible] = useState<Promotion | null>(null)

  useEffect(() => {
    const dismissed = getDismissed()
    const active = (promotionsData as Promotion[]).find(
      (p) => p.active && !dismissed.includes(p.id)
    )
    setVisible(active ?? null)
  }, [])

  function dismiss() {
    if (!visible) return
    const dismissed = getDismissed()
    setDismissed([...dismissed, visible.id])
    setVisible(null)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="bg-accent/10 border-b border-accent/20"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
            <Badge className="bg-accent text-accent-foreground shrink-0">
              {visible.badge}
            </Badge>
            <p className="text-sm text-foreground flex-1">
              <span className="font-semibold">{visible.title}</span>
              {' — '}
              <span className="text-muted-foreground">{visible.description}</span>
            </p>
            <button
              onClick={dismiss}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss promotion"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
