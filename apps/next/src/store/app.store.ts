import {
  combineReducers,
  createAction,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  SessionState,
  sessionState,
  sessionReducer,
  updateSession,
} from './session.store'

// Define initial app state
export interface AppState {
  session: SessionState
}

// Define actions
const loginSuccess = createAction<{ session: SessionState }>('login/SUCCESS')

export const logoutSuccess = createAction<{ session: SessionState }>(
  'logout/SUCCESS'
)

const initialState: AppState = {
  session: sessionState,
}

// Define app reducer
export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      loginSuccess,
      (state, action: PayloadAction<{ session: SessionState }>) => {
        return { ...state, session: { ...action.payload.session } }
      }
    )
    .addCase(
      logoutSuccess,
      (state, action: PayloadAction<{ session: SessionState }>) => {
        return { ...state, session: { ...action.payload.session } }
      }
    )
});

// Combine reducers
export const combinedReducers = combineReducers({
  session: sessionReducer,
})

// Actions
export const actions = {
  loginSuccess,
  logoutSuccess,
  updateSession,
}
