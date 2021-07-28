import { AnyAction, combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import { sessionReducer } from './session/session.reducer';
import { layoutReducer } from './layout/layout.reducer';
import { navReducer } from './nav/nav.reducer';

export type AppState = ReturnType<typeof appReducer>;
type RootReducer = ReturnType<typeof rootReducer>;

export const appReducer = combineReducers({
  session: sessionReducer,
  layout: layoutReducer,
  nav: navReducer,
});

const rootReducer = (state: AppState | undefined, action: AnyAction): AppState => {
  // reset store
  if (action.type === 'session/DELETE_SESSION') {
    storage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

export const persistedReducer: Reducer<RootReducer & PersistPartial, AnyAction> =
  persistReducer({ key: 'root', storage }, rootReducer);
