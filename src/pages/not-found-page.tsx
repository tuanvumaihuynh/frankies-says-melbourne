import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24">
      <h1 className="font-serif text-6xl font-bold text-muted-foreground/30">
        404
      </h1>
      <h2 className="mt-4 font-serif text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button render={<Link to="/" />} className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
    </div>
  )
}
