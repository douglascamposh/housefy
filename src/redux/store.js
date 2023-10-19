import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesApi } from './services/propertiesApi'
import rootReducer from './reducers'
export const store = configureStore({
  reducer: {
    [propertiesApi.reducerPath]:propertiesApi.reducer,
    rootReducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesApi.middleware),
})
setupListeners(store.dispatch)

