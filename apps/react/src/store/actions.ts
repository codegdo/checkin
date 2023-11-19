import { AppState } from './reducers';

export * from './session/session.action';
export * from './model/model.action';
export * from './company/company.action';
export * from './user/user.action';

export const updateRootState = (appState: AppState) => ({
    type: 'login/SUCCESS',
    payload: appState,
  });

