import { MapPin, Copy, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { TransportInfo } from './transport-info'

export function AddressCard() {
  function handleCopy() {
    navigator.clipboard.writeText(SITE_CONFIG.address.full).then(() => {
      toast('Address copied!')
    })
  }

  return (
    <Card className="h-full">
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-medium text-foreground">
              {SITE_CONFIG.address.street}
            </p>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.address.suburb} {SITE_CONFIG.address.state}{' '}
              {SITE_CONFIG.address.postcode}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
            Copy Address
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => window.open(SITE_CONFIG.googleMapsUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            Get Directions
          </Button>
        </div>

        <TransportInfo />
      </CardContent>
    </Card>
  )
}
