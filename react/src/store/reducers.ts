import { AnyAction, combineReducers, Reducer } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const { routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  routerReducerKey: 'router',
  savePreviousLocations: 1,
});

import { initialSessionState, sessionReducer } from './session/session.reducer';
import { initialLayoutState, layoutReducer } from './layout/layout.reducer';
import { initialNavState, navReducer } from './nav/nav.reducer';
import { initialPolicyState, policyReducer } from './policy/policy.reducer';
import { initialLocationState, locationReducer } from './location/location.reducer';

export type AppState = ReturnType<typeof appReducer>;
type RootReducer = ReturnType<typeof rootReducer>;

export const appReducer = combineReducers({
  session: sessionReducer,
  layout: layoutReducer,
  nav: navReducer,
  policy: policyReducer,
  locations: locationReducer,
  router: routerReducer,
});

const rootReducer = (state: AppState | undefined, action: AnyAction): AppState => {
  // reset store
  if (action.type === 'session/SESSION_DELETE') {
    storage.removeItem('persist:root');

    state = {
      ...state,
      session: initialSessionState,
      layout: initialLayoutState,
      nav: initialNavState,
      policy: initialPolicyState,
      locations: initialLocationState,
      router: state?.router || {},
    };
  }
  return appReducer(state, action);
};

export const persistedReducer: Reducer<RootReducer & PersistPartial, AnyAction> =
  persistReducer({ key: 'root', storage }, rootReducer);
