import { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import { themeStorageKey } from '../app/slices/theme-slice'

export function useThemeSync() {
  const mode = useAppSelector((state) => state.theme.mode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
    document.documentElement.dataset.theme = mode
    window.localStorage.setItem(themeStorageKey, mode)
  }, [mode])
}
