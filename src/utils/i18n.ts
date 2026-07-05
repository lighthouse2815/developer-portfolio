import type { Locale, LocalizedValue } from '../types/portfolio'

export function getLocalizedValue<T>(
  locale: Locale,
  value: LocalizedValue<T>,
): T {
  return value[locale]
}
