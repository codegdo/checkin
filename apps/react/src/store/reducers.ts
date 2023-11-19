import { AnyAction, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { initialSession, sessionReducer } from './session/session.reducer';
import { initialModel, modelReducer } from './model/model.reducer';
import { initialTheme, themeReducer } from './theme/theme.reducer';
import { initialCompany, companyReducer } from './company/company.reducer';
import { initialUser, userReducer } from './user/user.reducer';

import encrypted from './encrypted';

// Define the root reducer type
export type AppState = ReturnType<typeof appReducer>;

// Combine individual reducers
export const appReducer = combineReducers({
  session: sessionReducer,
  model: modelReducer,
  company: companyReducer,
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
    console.log('session/LOGOUT');
    void storage.removeItem('persist:root');
    state = {
      ...state,
      session: initialSession,
      model: initialModel,
      company: initialCompany,
      user: initialUser,
      theme: initialTheme,
    };
  }
  // Update root state
  if (action.type === 'login/SUCCESS') {
    console.log('login/SUCCESS');
    const {session, model, company, user, theme} = action.payload;
    state = {
      ...state,
      session: {...state?.session, ...session},
      model: {...state?.model, ...model},
      company: {...state?.company, ...company},
      user: {...state?.user, ...user},
      theme: {
        ...state?.theme,
        system: { ...(state?.theme?.system || {}), ...(theme?.system || {}) },
        internal: { ...(state?.theme?.internal || {}), ...(theme?.internal || {}) },
        external: { ...(state?.theme?.external || {}), ...(theme?.external || {}) },
        public: { ...(state?.theme?.public || {}), ...(theme?.public || {}) },
      },
    };
  }
  return appReducer(state, action);
};

// Configure persistence with whitelist and encryption transform
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'model', 'company', 'user', 'theme'],
  transforms: [encrypted],
};

// Create the persisted reducer
export const persistedReducer = persistReducer(persistConfig, rootReducer);
