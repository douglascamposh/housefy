import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { propertiesApi } from './services/propertiesApi'
import { authApi } from './services/authApi'
import rootReducer from './reducers'

export const store = configureStore({
  reducer: {
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    rootReducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesApi.middleware, authApi.middleware),
})

setupListeners(store.dispatch);

