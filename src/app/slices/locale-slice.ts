import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Locale } from '../../types/portfolio'

const STORAGE_KEY = 'duong-portfolio-locale'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'vi'
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY)

  if (storedLocale === 'vi' || storedLocale === 'en') {
    return storedLocale
  }

  return window.navigator.language.toLowerCase().startsWith('vi') ? 'vi' : 'en'
}

type LocaleState = {
  value: Locale
}

const initialState: LocaleState = {
  value: getInitialLocale(),
}

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.value = action.payload
    },
    toggleLocale(state) {
      state.value = state.value === 'vi' ? 'en' : 'vi'
    },
  },
})

export const { setLocale, toggleLocale } = localeSlice.actions
export const localeReducer = localeSlice.reducer
export { STORAGE_KEY as localeStorageKey }
