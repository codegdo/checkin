import { AnyAction, createReducer } from "@reduxjs/toolkit";

import { updateLayout } from "./layout.action";
import { LayoutState } from './layout.type';

export const initialLayout: LayoutState = {};

export const layoutReducer = createReducer(initialLayout, (builder) => {
  builder
    .addCase(updateLayout.type, (state, action: AnyAction) => {
      return { ...state, ...action.payload }
    })
});
