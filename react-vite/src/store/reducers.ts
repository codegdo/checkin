import { AnyAction, combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import { initialSession, sessionReducer } from './session/session.reducer';
import { initialTheme, themeReducer } from './theme/theme.reducer';
import { initialUser, userReducer } from './user/user.reducer';

export type AppState = ReturnType<typeof appReducer>;
type RootReducer = ReturnType<typeof rootReducer>;

export const appReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  theme: themeReducer,
});

const rootReducer = (
  state: AppState | undefined,
  action: AnyAction
): AppState => {
  // reset store
  if (action.type === 'session/DELETE') {
    void storage.removeItem('persist:root');

    state = {
      ...state,
      session: initialSession,
      user: initialUser,
      theme: initialTheme,
    };
  }
  return appReducer(state, action);
};

export const persistedReducer: Reducer<
  RootReducer & PersistPartial,
  AnyAction
> = persistReducer({ key: 'root', storage }, rootReducer);
