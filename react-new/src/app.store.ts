import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
//import thunk from 'redux-thunk';

import { persistedReducer } from './store/reducers';

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
  })
});

const persistor = persistStore(store);

export { store, persistor };