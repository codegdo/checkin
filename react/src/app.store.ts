import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { persistedReducer } from './store/reducers';

const { createReduxHistory, routerMiddleware } = createReduxHistoryContext({
  history: createBrowserHistory(),
  savePreviousLocations: 1,
});

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, routerMiddleware],
});

const persistor = persistStore(store);
const history = createReduxHistory(store);

export { store, persistor, history };
