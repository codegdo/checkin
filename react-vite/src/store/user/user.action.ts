import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState } from './user.type';

export const getUser = createAction('user/GET');
export const updateUser = createAction<UserState>('user/UPDATE');
export const deleteUser = createAction('user/DELETE');

export const refreshUserAsync = createAsyncThunk('user/REFRESH', () => {
  const data = new Promise((resolve) =>
    setTimeout(() => resolve({ data: '' }), 5000)
  );
  return data;
});
