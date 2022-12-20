import { AnyAction, createReducer } from "@reduxjs/toolkit";

import { getThemeAsync, updateTheme } from "./theme.action";
import { ThemeState } from './theme.type';

export const initialTheme: ThemeState = {};

export const themeReducer = createReducer(initialTheme, (builder) => {
  builder
    .addCase(updateTheme.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload }
    })
    .addCase(getThemeAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload }
    })
});
