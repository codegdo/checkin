import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getSession = createAction('session/GET_SESSION');
export const updateSession = createAction('session/UPDATE_SESSION');
export const deleteSession = createAction('session/DELETE_SESSION');

export const refreshSessionAsync = createAsyncThunk('session/REFRESH_SESSION', () => {
  const data = new Promise((resolve) => setTimeout(() => resolve({ data: "" }), 5000));
  return data;
});
