import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { AppStatus } from '../../constants';

import {
  getSession,
  updateSession,
  deleteSession,
  refreshSessionAsync,
} from './session.action';
import { SessionState } from './session.type';

export const initialSession: SessionState = {
  status: AppStatus.UNAUTHENTICATED,
};

export const sessionReducer = createReducer(initialSession, (builder) => {
  builder
    .addCase(getSession.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(updateSession.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(deleteSession.type, () => {
      return initialSession;
    })
    .addCase(refreshSessionAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    });
});

/*
{
  session: {
    appId: 'accountId',

    appStatus: 'InProgress',
    userStatus: '',

    accessTokenId: '',
    refreshTokenId: '',
  },
  user: {  
    id: 1,
    avatar: {},
    firstName: '',
    lastName: '',
    emailAddress: '',
    accessLevel: 'System',
    isActive: false,
    isOwner: false,
    companyId: null
  },
  company: {},
  navigation: {},
  theme: {}
}
*/
