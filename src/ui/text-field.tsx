import type { InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function TextField({
  id,
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-text)]">
      <span>{label}</span>
      <input
        id={id}
        className={cn(
          'h-12 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 text-base text-[var(--color-text)] outline-none transition-colors duration-300 placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]',
          error && 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/40',
          className,
        )}
        {...props}
      />
      <span className="min-h-5 text-xs text-red-500">{error ?? ''}</span>
    </label>
  )
}
