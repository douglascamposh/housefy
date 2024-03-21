import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { propertiesApi } from './services/propertiesApi';
import { authApi } from './services/authApi';
import rootReducer from './reducers';
import computeReducer from './slice/computeSlice';
import { roleApi } from "./services/roleApi";
import { usersApi } from './services/usersApi';

export const store = configureStore({
  reducer: {
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    rootReducer: rootReducer,
    compute: computeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesApi.middleware, authApi.middleware,roleApi.middleware,usersApi.middleware),
});

setupListeners(store.dispatch);
