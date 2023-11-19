import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { AppStatus } from '@/constants';
import {
  getSession,
  updateSession,
  logoutSession,
  refreshSessionAsync,
} from './session.action';
import { SessionData } from './session.type';

export const initialSession: SessionData = {
  status: AppStatus.UNAUTHENTICATED,
  accessType: null,
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
    .addCase(logoutSession.type, () => {
      return initialSession;
    })
    .addCase(refreshSessionAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    });
});
