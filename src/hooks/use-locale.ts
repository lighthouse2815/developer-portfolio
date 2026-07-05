import { useAppSelector } from '../app/hooks'

export function useLocale() {
  return useAppSelector((state) => state.locale.value)
}
