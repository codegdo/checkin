import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from './user.type';

export const getUser = createAction<UserData>('user/GET');
export const updateUser = createAction<Partial<UserData>>('user/UPDATE');
export const deleteUser = createAction<object>('user/DELETE');

export const refreshUserAsync = createAsyncThunk('user/REFRESH', () => {
  const data = new Promise((resolve) =>
    setTimeout(() => resolve({ data: '' }), 5000)
  );
  return data;
});
