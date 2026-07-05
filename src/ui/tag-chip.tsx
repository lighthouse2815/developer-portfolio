import type { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type TagChipProps = PropsWithChildren<{
  className?: string
  tone?: 'accent' | 'subtle'
}>

export function TagChip({
  children,
  className,
  tone = 'accent',
}: TagChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.04em]',
        tone === 'accent'
          ? 'border-transparent bg-[var(--color-accent-soft)] text-[var(--color-text)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface-strong)] text-[var(--color-text-muted)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
