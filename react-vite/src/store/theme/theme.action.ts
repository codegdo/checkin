import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const updateTheme = createAction('theme/UPDATE_THEME');

export const getThemeAsync = createAsyncThunk('theme/FETCH_THEME', () => {
  const data = new Promise((resolve) => setTimeout(() => resolve({ data: "" }), 5000));
  return data;
});
