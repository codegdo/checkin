import { AnyAction, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import { encryptTransform } from 'redux-persist-transform-encrypt';

import { initialStatus, statusReducer } from './status/status.reducer';
import { initialTheme, themeReducer } from './theme/theme.reducer';
import { initialUser, userReducer } from './user/user.reducer';
import userEncryptionTransform from './user/user.encrypt';

// Define the root reducer type
export type AppState = ReturnType<typeof appReducer>;

// Combine individual reducers
export const appReducer = combineReducers({
  status: statusReducer,
  user: userReducer,
  theme: themeReducer,
});

// Root reducer with reset functionality
const rootReducer = (
  state: AppState | undefined,
  action: AnyAction
): AppState => {
  // Reset store on logout
  if (action.type === 'status/LOGOUT') {
    void storage.removeItem('persist:root');
    state = {
      ...state,
      status: initialStatus,
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
  whitelist: ['status', 'user', 'theme'],
  transforms: [userEncryptionTransform],
};

// Create the persisted reducer
export const persistedReducer = persistReducer(persistConfig, rootReducer);
