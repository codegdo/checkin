import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SessionState } from './session.type';

export const getSession = createAction('session/GET');
export const updateSession = createAction<SessionState>(
  'session/UPDATE'
);
export const deleteSession = createAction('session/DELETE');

export const refreshSessionAsync = createAsyncThunk(
  'session/REFRESH',
  () => {
    const data = new Promise((resolve) =>
      setTimeout(() => resolve({ data: '' }), 5000)
    );
    return data;
  }
);
