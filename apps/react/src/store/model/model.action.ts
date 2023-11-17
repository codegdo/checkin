import { createAction } from '@reduxjs/toolkit';
import { ModelData } from './model.type';

export const updateModel = createAction<ModelData>(
  'model/UPDATE'
);

export const updateAppModel = createAction<ModelData>(
  'model/APP_UPDATE'
);

export const updateSysModel = createAction<ModelData>(
  'model/SYS_UPDATE'
);