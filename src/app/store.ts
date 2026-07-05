import { localeReducer } from './slices/locale-slice'
import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from './slices/theme-slice'

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
