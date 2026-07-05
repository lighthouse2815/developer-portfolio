import type { ButtonHTMLAttributes } from 'react'
import { buttonStyles } from './button-styles'
import type { ButtonSize, ButtonVariant } from './button-styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  {
    variant?: ButtonVariant
    size?: ButtonSize
    className?: string
  }

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  )
}
