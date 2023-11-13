import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { StatusState } from './status.type';

export const updateStatus = createAction<StatusState>(
  'app/UPDATE'
);
export const logoutStatus = createAction('status/LOGOUT');
