import { AnyAction, PayloadAction, createReducer } from "@reduxjs/toolkit";

import { getThemeAsync, updateTheme } from "./theme.action";
import { ThemeData } from './theme.type';

export const initialTheme: ThemeData = {
  system: {},
  internal: {},
  external: {},
  public: {}
};

type Action = PayloadAction<Partial<ThemeData>>;

export const themeReducer = createReducer(initialTheme, (builder) => {
  builder
    .addCase(updateTheme.type, (state, action: Action) => {
      return { ...state, ...action.payload }
    })
    .addCase(getThemeAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload }
    })
});