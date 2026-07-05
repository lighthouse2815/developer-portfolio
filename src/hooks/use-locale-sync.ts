import { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import { localeStorageKey } from '../app/slices/locale-slice'
import { siteCopy } from '../data/site-copy'
import { getLocalizedValue } from '../utils/i18n'

export function useLocaleSync() {
  const locale = useAppSelector((state) => state.locale.value)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dataset.locale = locale
    window.localStorage.setItem(localeStorageKey, locale)
    document.title = getLocalizedValue(locale, siteCopy.meta.title)

    const descriptionTag = document.querySelector('meta[name="description"]')

    if (descriptionTag) {
      descriptionTag.setAttribute(
        'content',
        getLocalizedValue(locale, siteCopy.meta.description),
      )
    }
  }, [locale])
}
