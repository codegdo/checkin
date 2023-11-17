import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SessionData } from './session.type';

export const getSession = createAction<Partial<SessionData>>('session/GET');
export const updateSession = createAction<Partial<SessionData>>('session/UPDATE');
export const deleteSession = createAction<void>('session/DELETE');
export const refreshSessionAsync = createAsyncThunk('user/REFRESH', () => {
  const data = new Promise((resolve) =>
    setTimeout(() => resolve({ data: '' }), 5000)
  );
  return data;
});