import { PayloadAction, createReducer } from '@reduxjs/toolkit';

import {
  updateAppModel,
  updateModel,
  updateSysModel
} from './model.action';
import { ModelData } from './model.type';


export const initialModel: ModelData = {
  app: {},
  sys: {}
};

type Action = PayloadAction<Partial<ModelData>>;

export const modelReducer = createReducer(initialModel, (builder) => {
  builder
    .addCase(updateModel.type, (state, action: Action) => {
      return { ...state, ...action.payload };
    })
    .addCase(updateAppModel.type, (state, action: Action) => {
      return { ...state, app: action.payload };
    })
    .addCase(updateSysModel.type, (state, action: Action) => {
      return { ...state, sys: action.payload };
    });
});