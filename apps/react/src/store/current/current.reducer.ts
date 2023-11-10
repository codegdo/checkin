import { AnyAction, createReducer } from '@reduxjs/toolkit';

import {
  updateCurrent,
  logoutCurrent
} from './current.action';
import { CurrentState } from './current.type';
import { AppStatus } from '@/constants';

export const initialCurrent: CurrentState = {
  status: AppStatus.UNAUTHENTICATED,
};

export const currentReducer = createReducer(initialCurrent, (builder) => {
  builder
    .addCase(updateCurrent.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(logoutCurrent.type, () => {
      return initialCurrent;
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
