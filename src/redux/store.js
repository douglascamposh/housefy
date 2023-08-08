import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesApi } from './services/propertiesApi'

export const store = configureStore({
  reducer: {
    [propertiesApi.reducerPath]:propertiesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesApi.middleware),
})
setupListeners(store.dispatch)

