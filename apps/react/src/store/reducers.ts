import { AnyAction, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { initialSession, sessionReducer } from './session/session.reducer';
import { initialTheme, themeReducer } from './theme/theme.reducer';
import { initialUser, userReducer } from './user/user.reducer';
import { initialModel, modelReducer } from './model/model.reducer';

import encryptedSession from './session/session.encrypt';
import encryptedModel from './model/model.encrypt';
import encryptedUser from './user/user.encrypt';

// Define the root reducer type
export type AppState = ReturnType<typeof appReducer>;

// Combine individual reducers
export const appReducer = combineReducers({
  session: sessionReducer,
  model: modelReducer,
  user: userReducer,
  theme: themeReducer,
});

// Root reducer with reset functionality
const rootReducer = (
  state: AppState | undefined,
  action: AnyAction
): AppState => {
  // Reset store on logout
  if (action.type === 'session/LOGOUT') {
    void storage.removeItem('persist:root');
    state = {
      ...state,
      session: initialSession,
      model: initialModel,
      user: initialUser,
      theme: initialTheme,
    };
  }
  return appReducer(state, action);
};

// Configure persistence with whitelist and encryption transform
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'model', 'user', 'theme'],
  transforms: [encryptedSession, encryptedModel, encryptedUser],
};

// Create the persisted reducer
export const persistedReducer = persistReducer(persistConfig, rootReducer);
