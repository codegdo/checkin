import { createAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';

export * from './session/session.action';
export * from './model/model.action';
export * from './account/account.action';
export * from './user/user.action';

export const logoutSuccess = createAction('logout/SUCCESS');
export const loginSuccess = createAction<Partial<AppState>>('login/SUCCESS');
export const enterClientMode = createAction<Partial<AppState>>('enter/CLIENT_MODE');
export const exitClientMode = createAction<Partial<AppState>>('exist/CLIENT_MODE');