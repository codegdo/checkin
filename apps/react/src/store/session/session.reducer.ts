import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { AppStatus } from '@/constants';
import {
  getSession,
  updateSession,
  refreshSessionAsync,
} from './session.action';
import { SessionData } from './session.type';

export const initialSession: SessionData = {
  status: AppStatus.UNAUTHENTICATED,
  accessType: 'public',
  clientId: null,
  isAuth: false,
};

type Action = PayloadAction<Partial<SessionData>>;

export const sessionReducer = createReducer(initialSession, (builder) => {
  builder
    .addCase(getSession.type, (state, action: Action) => {
      return { ...state, ...action.payload };
    })
    .addCase(updateSession.type, (state, action: Action) => {
      return { ...state, ...action.payload };
    })
    .addCase(refreshSessionAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    });
});
