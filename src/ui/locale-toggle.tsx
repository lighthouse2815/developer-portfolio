import type { Locale } from '../types/portfolio'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setLocale } from '../app/slices/locale-slice'
import { siteCopy } from '../data/site-copy'
import { getLocalizedValue } from '../utils/i18n'

const locales: Locale[] = ['vi', 'en']

export function LocaleToggle() {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.locale.value)

  return (
    <div
      className="inline-flex h-11 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-1"
      role="group"
      aria-label={getLocalizedValue(locale, siteCopy.header.languageSwitcher)}
    >
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => dispatch(setLocale(option))}
          aria-pressed={locale === option}
          className={`inline-flex h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
            locale === option
              ? 'bg-[var(--color-text)] text-white dark:bg-[var(--color-accent)] dark:text-[#03111f]'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
