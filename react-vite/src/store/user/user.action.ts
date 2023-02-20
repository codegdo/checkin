import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from './user.type';

export const getUser = createAction('user/GET');
export const updateUser = createAction<UserData>('user/UPDATE');
export const deleteUser = createAction('user/DELETE');

export const refreshUserAsync = createAsyncThunk('user/REFRESH', () => {
  const data = new Promise((resolve) =>
    setTimeout(() => resolve({ data: '' }), 5000)
  );
  return data;
});
