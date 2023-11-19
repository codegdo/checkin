import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ThemeData } from './theme.type';

export const updateTheme = createAction<Partial<ThemeData>>('theme/UPDATE');

export const getThemeAsync = createAsyncThunk('theme/FETCH', () => {
  const data = new Promise((resolve) => setTimeout(() => resolve({ data: "" }), 5000));
  return data;
});
