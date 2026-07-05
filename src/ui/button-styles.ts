import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'md' | 'sm'

type ButtonStyleOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-[var(--color-text)] text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] hover:bg-[var(--color-accent)] dark:bg-[var(--color-accent)] dark:text-[#03111f] dark:hover:bg-[#8cbaff]',
  secondary:
    'bg-[var(--color-surface-strong)] text-[var(--color-text)] hover:bg-[var(--color-accent-soft)]',
  ghost:
    'border-transparent bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'h-12 px-6 text-[15px]',
  sm: 'h-11 px-5 text-sm',
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] font-medium transition-all duration-300 active:translate-y-px',
    sizeClasses[size],
    variantClasses[variant],
    className,
  )
}

export type { ButtonSize, ButtonStyleOptions, ButtonVariant }
