import { createAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';

export * from './session/session.action';
export * from './model/model.action';
export * from './company/company.action';
export * from './user/user.action';

export const updateStateOnLogoutSuccess = createAction('logout/SUCCESS');
export const updateStateOnLoginSuccess = createAction<Partial<AppState>>('login/SUCCESS');
export const updateStateOnClientSwitch = createAction<Partial<AppState>>('client/SWITCH');