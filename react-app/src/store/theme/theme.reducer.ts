import { AnyAction, createReducer } from "@reduxjs/toolkit";

import { getThemeAsync, updateTheme } from "./theme.action";
import { ThemeState } from './theme.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('!css-loader!postcss-loader!sass-loader!../../assets/css/root.scss')?.default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const light = require('!css-loader!postcss-loader!sass-loader!../../assets/css/theme.scss')?.default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dark = require('!css-loader!postcss-loader!sass-loader!../../assets/css/theme-dark.scss')?.default;

export const initialTheme: ThemeState = {
  mode: 'light',
  colors: colors.flat()[1],
  light: light.flat()[1],
  dark: dark.flat()[1]
};

export const themeReducer = createReducer(initialTheme, (builder) => {
  builder
    .addCase(updateTheme.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload }
    })
    .addCase(getThemeAsync.fulfilled, (state, action: AnyAction) => {
      return { ...state, ...action.payload }
    })
});
