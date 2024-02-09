import { UnknownAction, configureStore } from '@reduxjs/toolkit';
import { AppState, appReducer, combinedReducers } from './app.store';

// Combine appReducer with combinedReducer
const rootReducer = (state: AppState | undefined, action: UnknownAction) =>
  combinedReducers(appReducer(state, action), action);

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
