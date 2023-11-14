import { AnyAction, createReducer } from '@reduxjs/toolkit';

import {
  updateStatus,
  logoutStatus
} from './status.action';
import { StatusState } from './status.type';
import { AppStatus } from '@/constants';

export const initialStatus: StatusState = {
  clientId: null,
  current: AppStatus.UNAUTHENTICATED,
  isLoggedIn: false
};

export const statusReducer = createReducer(initialStatus, (builder) => {
  builder
    .addCase(updateStatus.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(logoutStatus.type, () => {
      return initialStatus;
    });
});

/*
{
  current: {
    appId: 'accountId',

    appStatus: 'InProgress',
    userStatus: '',

    accessTokenId: '',
    refreshTokenId: '',
  },

  app: {
    id: 1,
    status: ''
  },
  auth: {
    accessToken: '',
    refreshToken: ''
  },
  user: {  
    id: 1,
    avatar: {},
    firstName: '',
    lastName: '',
    emailAddress: '',

    accessLevel: 'System',
    
    companyId: null,

    isActive: false,
    isOwner: false,
    
  },
  company: {},
  navigation: {},
  theme: {}
}
*/
