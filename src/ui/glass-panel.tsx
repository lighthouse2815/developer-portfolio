import type { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type GlassPanelProps = PropsWithChildren<{
  className?: string
}>

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-[var(--radius-panel)] p-6 md:p-8',
        className,
      )}
    >
      {children}
    </div>
  )
}
