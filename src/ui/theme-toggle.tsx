import { MoonStar, SunMedium } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { toggleTheme } from '../app/slices/theme-slice'
import { siteCopy } from '../data/site-copy'
import { getLocalizedValue } from '../utils/i18n'

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)
  const locale = useAppSelector((state) => state.locale.value)

  return (
    <button
      type="button"
      aria-label={getLocalizedValue(
        locale,
        mode === 'dark'
          ? siteCopy.theme.switchToLight
          : siteCopy.theme.switchToDark,
      )}
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-soft)] active:translate-y-px"
    >
      {mode === 'dark' ? (
        <SunMedium className="h-5 w-5" />
      ) : (
        <MoonStar className="h-5 w-5" />
      )}
    </button>
  )
}
