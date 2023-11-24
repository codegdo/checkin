import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { createReducer } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import {
  initialSession,
  sessionReducer
} from './session/session.reducer';
import {
  initialModel,
  modelReducer
} from './model/model.reducer';
import {
  initialTheme,
  themeReducer
} from './theme/theme.reducer';
import {
  initialCompany,
  companyReducer
} from './company/company.reducer';
import {
  initialUser,
  userReducer
} from './user/user.reducer';

import encrypted from './encrypted';
import { updateStateOnClientSwitch, updateStateOnLoginSuccess, updateStateOnLogoutSuccess } from './actions';

// Combine individual reducers
export const appReducer = combineReducers({
  session: sessionReducer,
  model: modelReducer,
  company: companyReducer,
  user: userReducer,
  theme: themeReducer,
});

const initialState = {
  // Initial State
  session: initialSession,
  model: initialModel,
  company: initialCompany,
  user: initialUser,
  theme: initialTheme,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateStateOnLogoutSuccess, (state) => {
      console.log('logout/SUCCESS');
      void storage.removeItem('persist:root');
      return {
        ...state,
        ...initialState
      };
    })
    .addCase(updateStateOnLoginSuccess, (state, action) => {
      console.log('login/SUCCESS');
      const { session, model, company, user, theme } = action.payload;
      return {
        ...state,
        session: { ...state.session, ...session },
        model: {
          ...state.model,
          app: { ...(state.model.app || {}), ...(model?.app || {}) },
          sys: { ...(state.model.sys || {}), ...(model?.sys || {}) },
        },
        company: { ...state.company, ...company },
        user: { ...state.user, ...user },
        theme: {
          ...state.theme,
          system: { ...(state.theme.system || {}), ...(theme?.system || {}) },
          internal: {
            ...(state.theme.internal || {}),
            ...(theme?.internal || {}),
          },
          external: {
            ...(state.theme.external || {}),
            ...(theme?.external || {}),
          },
          public: { ...(state.theme.public || {}), ...(theme?.public || {}) },
        },
      };
    })
    .addCase(updateStateOnClientSwitch, (state, action) => {
      console.log('client/SWITCH');
      const { session, model } = action.payload;
      return {
        ...state,
        session: { ...state?.session, ...session },
        model: {
          ...state?.model,
          app: { ...(state?.model?.app || {}), ...(model?.app || {}) },
        },
        // theme: {
        //   ...state.theme,
        //   internal: {
        //     ...(state.theme.internal || {}),
        //     ...(theme?.internal || {}),
        //   },
        // },
      };
    });
});

// Configure persistence with whitelist and encryption transform
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'model', 'company', 'user', 'theme'],
  transforms: [encrypted],
};

// Create the persisted reducer
//export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const persistedReducer = persistReducer(persistConfig, (state, action) => {
  const stateWithAppReducer = appReducer(state, action);
  return rootReducer(stateWithAppReducer, action);
});

// Define the root reducer type
export type AppState = ReturnType<typeof appReducer>;


/* const rootReducer = (
  state: AppState | undefined,
  action: AnyAction
): AppState => {
  const resetState = {
    session: initialSession,
    model: initialModel,
    company: initialCompany,
    user: initialUser,
    theme: initialTheme,
  };

  const updateStateOnLogout = () => {
    console.log('session/LOGOUT');
    void storage.removeItem('persist:root');
    state = { ...state, ...resetState } as AppState;
  };

  const updateStateOnLoginSuccess = () => {
    console.log('login/SUCCESS');
    const { session, model, company, user, theme } = action.payload;
    state = {
      ...state,
      session: { ...state?.session, ...session },
      model: {
        ...state?.model,
        app: { ...(state?.model?.app || {}), ...(model?.app || {}) },
        sys: { ...(state?.model?.sys || {}), ...(model?.sys || {}) },
      },
      company: { ...state?.company, ...company },
      user: { ...state?.user, ...user },
      theme: {
        ...state?.theme,
        system: { ...(state?.theme?.system || {}), ...(theme?.system || {}) },
        internal: { ...(state?.theme?.internal || {}), ...(theme?.internal || {}) },
        external: { ...(state?.theme?.external || {}), ...(theme?.external || {}) },
        public: { ...(state?.theme?.public || {}), ...(theme?.public || {}) },
      },
    } as AppState;
  };

  const updateStateOnClientSwitch = () => {
    console.log('client/SWITCH');
    const { session, model, theme } = action.payload;
    state = {
      ...state,
      session: { ...state?.session, ...session },
      model: {
        ...state?.model,
        app: { ...(state?.model?.app || {}), ...(model?.app || {}) },
      },
      theme: {
        ...state?.theme,
        internal: { ...(state?.theme?.internal || {}), ...(theme?.internal || {}) },
      },
    } as AppState;
  };

  if (action.type === 'session/LOGOUT') {
    updateStateOnLogout();
  } else if (action.type === 'login/SUCCESS') {
    updateStateOnLoginSuccess();
  } else if (action.type === 'client/SWITCH') {
    updateStateOnClientSwitch();
  }

  return appReducer(state, action);
}; */
