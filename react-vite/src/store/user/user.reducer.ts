import { AnyAction, createReducer } from '@reduxjs/toolkit';

import {
  getUser,
  updateUser,
  deleteUser,
  refreshUserAsync,
} from './user.action';
import { UserData } from './user.type';

export const initialUser: UserData = {};

export const userReducer = createReducer(initialUser, (builder) => {
  builder
    .addCase(getUser.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(updateUser.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(deleteUser.type, () => {
      return initialUser;
    })
    .addCase(refreshUserAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    });
});
