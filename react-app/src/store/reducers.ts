import { AnyAction, combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import { initialSessionState, sessionReducer } from './session/session.reducer';
import { initialLayout, layoutReducer } from './layout/layout.reducer';
import { initialTheme, themeReducer } from './theme/theme.reducer';
import { initialNavState, navReducer } from './nav/nav.reducer';
import { initialPolicyState, policyReducer } from './policy/policy.reducer';
import { initialLocation, locationReducer } from './location/location.reducer';

export type AppState = ReturnType<typeof appReducer>;
type RootReducer = ReturnType<typeof rootReducer>;

export const appReducer = combineReducers({
  session: sessionReducer,
  layout: layoutReducer,
  theme: themeReducer,
  nav: navReducer,
  policy: policyReducer,
  locations: locationReducer
});

const rootReducer = (state: AppState | undefined, action: AnyAction): AppState => {
  // reset store
  if (action.type === 'session/DELETE') {
    void storage.removeItem('persist:root');

    state = {
      ...state,
      session: initialSessionState,
      layout: initialLayout,
      theme: initialTheme,
      nav: initialNavState,
      policy: initialPolicyState,
      locations: initialLocation
    };
  }
  return appReducer(state, action);
};

export const persistedReducer: Reducer<RootReducer & PersistPartial, AnyAction> =
  persistReducer({ key: 'root', storage }, rootReducer);
