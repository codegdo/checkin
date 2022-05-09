import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { persistedReducer } from './store/reducers';

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
