import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const updateLayout = createAction('layout/UPDATE_LAYOUT');
export const getLayoutAsync = createAsyncThunk('layout/FETCH_LAYOUT', () => {

  const data = new Promise((resolve) => setTimeout(() => resolve({ data: "" }), 5000));

  return data;
});

