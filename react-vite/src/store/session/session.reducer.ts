import { AnyAction, createReducer } from "@reduxjs/toolkit";

import { getSession, updateSession, deleteSession, refreshSessionAsync } from "./session.action";
import { SessionState, UserStatus } from './session.type';

export const initialSession: SessionState = {
  status: UserStatus.REQUIRE_AUTH
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
    })
});

