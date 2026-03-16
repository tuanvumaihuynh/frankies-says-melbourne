import { useOpenStatus } from '@/hooks/use-open-status'

export function OpenStatus() {
  const { isOpen, label } = useOpenStatus()

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}
      />
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}
