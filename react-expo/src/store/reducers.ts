import { AnyAction, combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import storage from 'redux-persist/lib/storage';

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
  locations: locationReducer
});

const rootReducer = (state: AppState | undefined, action: AnyAction): AppState => {
  // reset store
  if (action.type === 'session/SESSION_DELETE') {
    //storage.removeItem('persist:root');

    state = {
      ...state,
      session: initialSessionState,
      layout: initialLayoutState,
      nav: initialNavState,
      policy: initialPolicyState,
      locations: initialLocationState
    };
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

export const persistedReducer: Reducer<RootReducer & PersistPartial, AnyAction> = persistReducer(persistConfig, rootReducer);
