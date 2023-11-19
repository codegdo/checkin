import { AnyAction, PayloadAction, createReducer } from "@reduxjs/toolkit";

import { getThemeAsync, updateTheme } from "./theme.action";
import { ThemeData } from './theme.type';

export const initialTheme: ThemeData = {
  system: {
    base: `<div></div>`
  },
  internal: {
    base: `<div></div>`
  },
  external: {
    base: `<div></div>`
  },
  public: {
    base: `<div></div>`
  }
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