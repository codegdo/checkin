import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CurrentState } from './current.type';

export const updateCurrent = createAction<CurrentState>(
  'current/UPDATE'
);
export const logoutCurrent = createAction('current/LOGOUT');
