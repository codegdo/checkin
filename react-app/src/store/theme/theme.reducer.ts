import { AnyAction, createReducer } from "@reduxjs/toolkit";

import { getThemeAsync, updateTheme } from "./theme.action";
import { ThemeState } from './theme.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const css = require('!css-loader!postcss-loader!sass-loader!../../assets/css/theme-dark.scss')?.default;

console.log(css);

export const initialTheme: ThemeState = {
  mode: 'light',
  default: css?.toString(),
  light: '',
  dark: ''
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
