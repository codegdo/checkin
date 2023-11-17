import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { AppStatus } from '@/constants';
import {
  getSession,
  updateSession,
  deleteSession,
  refreshSessionAsync,
} from './session.action';
import { SessionData } from './session.type';

export const initialSession: SessionData = {
  accountId: null,
  clientId: null,
  status: AppStatus.UNAUTHENTICATED,
  auth: false,
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
    .addCase(deleteSession.type, () => {
      return initialSession;
    })
    .addCase(refreshSessionAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    });
});
