import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { UserStatus } from '../../constants';

import {
  getSession,
  updateSession,
  deleteSession,
  refreshSessionAsync,
} from './session.action';
import { SessionState } from './session.type';

export const initialSession: SessionState = {
  status: UserStatus.NOT_FOUND,
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
