import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const updateTheme = createAction('theme/UPDATE');

export const getThemeAsync = createAsyncThunk('theme/FETCH', () => {
  const data = new Promise((resolve) => setTimeout(() => resolve({ data: "" }), 5000));
  return data;
});
