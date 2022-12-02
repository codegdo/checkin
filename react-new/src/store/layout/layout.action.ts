import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const updateLayout = createAction('layout/UPDATE_LAYOUT');
export const getLayoutAsync = createAsyncThunk('layout/FETCH_LAYOUT', async () => {

  return new Promise((_, resolve) => setTimeout(() => resolve({ data: "" }), 5000));

  // const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(response => response.json())
  //   .then(json => json);

  // return { data }
});

