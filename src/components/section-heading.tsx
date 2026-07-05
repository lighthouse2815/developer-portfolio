import { cn } from '../utils/cn'

type SectionHeadingProps = {
  title: string
  description: string
  className?: string
}

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', className)}>
      <h2 className="text-balance">{title}</h2>
      <p className="max-w-[62ch] text-base leading-7 text-[var(--color-text-muted)] md:text-lg">
        {description}
      </p>
    </div>
  )
}
